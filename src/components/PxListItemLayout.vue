<template>
  <div class="border-grey ps-3 pe-1 ">
    <div class="item-layout d-flex align-items-center justify-content-between">
      <div v-if="$slots.toggle" class="me-2">
        <slot name="toggle" />
      </div>
      <div class="d-flex align-items-center text-truncate flex-fill overlay">
        <slot />
      </div>
      <div class="d-flex align-items-center ms-4">
        <div class="me-1">
          <PxButton type="icon">
            <pencil-icon class="action-icon" />
          </PxButton>
        </div>
        <div class="me-1">
          <PxButton
            type="icon"
            @click="$emit('remove')"
          >
            <TrashBinIcon class="action-icon-magenta" />
          </PxButton>
        </div>
        <div class="handle">
          <PxButton type="icon">
            <UpDownArrowIcon class="action-icon" />
          </PxButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PencilIcon from '@/components/icons/PencilIcon'
import TrashBinIcon from '@/components/icons/TrashBinIcon'
import UpDownArrowIcon from '@/components/icons/UpDownArrowIcon'
import PxButton from '@/components/PxButton'

export default {
  name: 'PxListItemLayout',
  components: { UpDownArrowIcon, TrashBinIcon, PencilIcon, PxButton }
}
</script>

<style>
.handle {
  cursor: move;
}
</style>
