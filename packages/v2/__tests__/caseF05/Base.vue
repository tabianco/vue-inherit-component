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

  render (h, { data, props, slots }) {
    return h(SubComponent, {
      class: data.class,
      props: {
        value: props.value
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
