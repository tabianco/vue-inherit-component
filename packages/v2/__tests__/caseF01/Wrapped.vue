<template>
  <inherited-component />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import InheritedComponent from './Inherited.vue'

export default defineComponent({
  components: {
    InheritedComponent
  }
})
</script>
