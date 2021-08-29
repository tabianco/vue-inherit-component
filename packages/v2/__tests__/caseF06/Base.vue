<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SubComponent from './Sub.vue'

export default defineComponent({
  functional: true,

  props: {
    named: {
      type: String,
      default: 'named'
    },

    value: Boolean
  },

  render (h, { data, props, scopedSlots, slots }) {
    return h(SubComponent, {
      class: data.class,
      props: {
        value: props.value
      },

      scopedSlots: {
        scoped: ({ value }) => h('div', {
          class: `scopedSlot-${value}`
        }, scopedSlots.scoped({
          flag: value
        }))
      }
    }, [
      h('div', {
        staticClass: 'slot-default'
      }, slots().default),

      h('div', {
        class: {
          [`slot-${props.named}`]: true
        },
        slot: 'named'
      }, slots()[props.named])
    ])
  }
})
</script>
