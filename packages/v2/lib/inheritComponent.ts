import type { Component, ComponentOptions, DefaultProps, PropsDefinition } from 'vue/types/options'
import type { CombinedVueInstance, Vue } from 'vue/types/vue'

import proxyScopedSlots from './proxyScopedSlots'

declare module 'vue/types/vue' {
  interface VueConstructor<V extends Vue = Vue> {
    options?: ComponentOptions<V>
  }
}

type Listeners = Record<string, Function | Function[]>

declare interface InheritComponentOptions<BaseProps, Props> {
  computedClass?: (this: typeof Vue, props: Props & BaseProps) => any
  computedProps?: (this: typeof Vue, props: Props & BaseProps) => Props & BaseProps
  listeners?: Listeners
  name?: string
  props?: PropsDefinition<Props>
}

function mergeListeners (a: Listeners, b?: Listeners): Listeners {
  const map = new Map<string, Function | Function[]>(Object.entries(a))

  b && Object.keys(b).forEach((key) => {
    if (map.has(key)) {
      map.set(key, ([] as Function[]).concat(map.get(key)!).concat(b[key]))
    } else {
      map.set(key, b[key])
    }
  })

  return Object.fromEntries(map.entries())
}

export default function inheritComponent
  <
    V extends Vue,
    BaseProps=DefaultProps,
    Props=DefaultProps,
    BaseComponent=Component<any, any, any, BaseProps>
  >
(
  baseComponent: BaseComponent,
  options: InheritComponentOptions<BaseProps, Props>
): ComponentOptions<V, any, any, any, PropsDefinition<BaseProps> & PropsDefinition<Props>> &
  ThisType<CombinedVueInstance<V, any, any, any, BaseProps & Props>> {
  const instance = baseComponent as Extract<BaseComponent, typeof Vue>
  const componentDef = baseComponent as Extract<BaseComponent, ComponentOptions<V, any, any, any, PropsDefinition<BaseProps>>>

  const originalProps = 'options' in instance
    ? instance.options!.props as PropsDefinition<BaseProps>
    : 'props' in componentDef
      ? componentDef.props
      : undefined

  return {
    model: 'options' in instance
      ? instance.options!.model
      : componentDef.model,
    name: options.name,

    props: {
      ...originalProps,
      ...options.props
    } as PropsDefinition<BaseProps> & PropsDefinition<Props>,

    render (h) {
      const $props = this.$props as Props & BaseProps
      const on = mergeListeners(this.$listeners, options.listeners)
      const props = options.computedProps?.call(this, $props) ?? $props
      const scopedSlots = proxyScopedSlots(this)

      return h(baseComponent, {
        attrs: this.$attrs,
        class: options.computedClass?.call(this, props),
        on,
        props,
        scopedSlots
      }, this.$slots.default)
    }
  }
}
