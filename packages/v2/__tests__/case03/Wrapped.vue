<template>
  <inherited-component :index="value">
    <div
      v-for="(_, index) in Array(value).fill()"
      :key="index"
    >
      Child {{ index + 1 }}
    </div>
  </inherited-component>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import InheritedComponent from './Inherited.vue'

export default defineComponent({
  components: {
    InheritedComponent
  },

  props: {
    value: {
      type: Number,
      default: 3
    }
  }
})
</script>
