<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  functional: true,

  props: {
    index: {
      type: Number,
      default: 0
    },

    value: {
      type: Number,
      default: 3
    }
  },

  render (h, { data, props, slots }) {
    const children = Array(props.value).fill('').map((_, i) => {
      return h('div', `Element ${i + 1}`)
    })

    children.splice(props.index, 0, slots().default)

    return h('div', data, children)
  }
})
</script>
