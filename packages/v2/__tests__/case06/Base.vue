<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SubComponent from './Sub.vue'

export default defineComponent({
  props: {
    named: {
      type: String,
      default: 'named'
    },

    value: Boolean
  },

  render (h) {
    return h(SubComponent, {
      props: {
        value: this.value
      },

      scopedSlots: {
        scoped: ({ value }) => h('div', {
          class: `scopedSlot-${value}`
        }, this.$scopedSlots.scoped({
          flag: value
        }))
      }
    }, [
      h('div', {
        staticClass: 'slot-default'
      }, this.$slots.default),

      h('div', {
        class: {
          [`slot-${this.named}`]: true
        },
        slot: 'named'
      }, this.$slots[this.named])
    ])
  }
})
</script>
