<script lang="ts">
import { inheritComponent } from '../../'
import BaseComponent from './Base.vue'

export default inheritComponent(BaseComponent, {
  computedClass: () => 'inherited-component'
})
</script>
