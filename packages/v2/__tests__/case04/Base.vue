<template>
  <div>
    <div
      v-if="value"
      class="slot-named"
    >
      <slot name="named" />
    </div>

    <div class="slot-default">
      <slot name="default" />
    </div>

    <div
      v-if="!value"
      class="slot-named"
    >
      <slot name="named" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    value: Boolean
  }
})
</script>
