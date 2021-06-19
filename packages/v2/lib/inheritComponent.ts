import type { Component, ComponentOptions, DefaultProps, PropsDefinition } from 'vue/types/options'
import type { CombinedVueInstance, Vue } from 'vue/types/vue'

import proxyScopedSlots from './proxyScopedSlots'

declare module 'vue/types/vue' {
  interface VueConstructor<V extends Vue = Vue> {
    options?: ComponentOptions<V>
  }
}

declare interface InheritComponentOptions<BaseProps, Props> {
  computedClass?: (props: Props & BaseProps) => any
  computedProps?: (props: Props & BaseProps) => Props & BaseProps
  name?: string
  props?: PropsDefinition<Props>
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

      return h(baseComponent, {
        attrs: this.$attrs,
        class: options.computedClass?.($props),
        on: this.$listeners,
        props: options.computedProps?.($props) ?? $props,
        scopedSlots: proxyScopedSlots(this)
      })
    }
  }
}
