<template>
  <inherited-component :value="value">
    <div>Child 1</div>
    <div>Child 2</div>
    <div>Child 3</div>

    <template #named>
      <div>Child 4</div>
    </template>
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
    value: Boolean
  }
})
</script>
