<template>
  <div>
    <div class="slot-default">
      <slot />
    </div>

    <div class="slot-named">
      <slot name="named" />
    </div>

    <div class="slot-scoped">
      <slot
        name="scoped"
        v-bind="{ value }"
      />
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
