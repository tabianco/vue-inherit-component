<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
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

  render (h) {
    const children = Array(this.value).fill('').map((_, i) => {
      return h('div', `Element ${i + 1}`)
    })

    children.splice(this.index, 0, this.$slots.default)

    return h('div', children)
  }
})
</script>
