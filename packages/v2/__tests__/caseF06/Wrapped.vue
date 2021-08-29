<template>
  <inherited-component
    :named="value ? 'true' : 'false'"
    :value="value"
  >
    <div>Child 1</div>
    <div>Child 2</div>
    <div>Child 3</div>

    <template #false>
      <div>Child 4</div>
      <div>Child 5</div>
    </template>

    <template #true>
      <div>Child 6</div>
    </template>

    <template #scoped="{ flag }">
      <div v-if="flag">
        Child 7
      </div>
      <div v-else>
        Child 8
      </div>
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
