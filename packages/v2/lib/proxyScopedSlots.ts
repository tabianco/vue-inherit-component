import type { Vue } from 'vue/types/vue'
import type { NormalizedScopedSlot, ScopedSlotsData } from 'vue/types/vnode'

declare module 'vue/types/vnode' {
  type ScopedSlotsData = Array<{ key: string, fn: NormalizedScopedSlot, proxy: boolean } | ScopedSlotsData>
}

declare module 'vue/types/vue' {
  interface Vue {
    _u: (scopedSlots: ScopedSlotsData, res?: Object) => {
      [key: string]: NormalizedScopedSlot
    } & {
      $stable: boolean
    }
  }
}

export default function proxyScopedSlots (vm: InstanceType<typeof Vue>) {
  const fns = Object.entries(vm.$scopedSlots).map(([key, fn]) => ({
    fn,
    key,
    proxy: true
  })).filter(item => item.fn !== undefined) as Required<ScopedSlotsData>

  return vm._u(fns)
}
