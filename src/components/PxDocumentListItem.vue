<template>
  <PxListItemLayout
    @remove="$emit('remove', item)"
  >
    <div class="me-3 fs-08">
      {{ item.name }}
    </div>
    <div
      v-if="item.colors"
      class="me-2"
    >
      <PxDots :colors="item.colors" />
    </div>
    <div
      v-if="item.required"
      class="me-3 fs-07 text-magenta d-flex align-items-center"
    >
      Обязательный
    </div>
    <div class="me-3 fs-07 text-grey d-flex flex-fill ">
      {{ item.desc }}
    </div>
  </PxListItemLayout>
</template>

<script>
import PxDots from '@/components/PxDots'
import PxListItemLayout from '@/components/PxListItemLayout'

export default {
  name: 'PxDocumentListItem',
  components: { PxListItemLayout, PxDots },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
}
</script>
