<template>
  <PxListItemLayout
    class="py-2 hide-item"
    @remove="$emit('remove')"
  >
    <template #toggle>
      <PxButton type="small" @click="toggle">
        <template #icon>
          <DropdownIcon
            :style="itemStyle"
            class="smooth-rotate"
          />
        </template>
      </PxButton>
    </template>
    <div class="me-3 fs-09 fw-medium">
      {{ item.name }}
    </div>
    <div
      v-if="item.colors"
      class="me-2"
    >
      <PxDots :colors="item.colors" />
    </div>
    <div class="me-3 fs-07 text-grey d-flex flex-fill ">
      {{ item.desc }}
    </div>
  </PxListItemLayout>
</template>

<script>
import PxButton from '@/components/PxButton'
import PxListItemLayout from '@/components/PxListItemLayout'
import PxDots from '@/components/PxDots'
import DropdownIcon from '@/components/icons/DrowdownIcon'

export default {
  name: 'PxCategoryItem',
  components: { PxDots, DropdownIcon, PxListItemLayout, PxButton },
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    isNoItems: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isToggle: false
    }
  },
  computed: {
    itemStyle () {
      const degree = this.isToggle ? 0 : 180
      return { transform: `rotate(${degree}deg)` }
    }
  },
  methods: {
    toggle () {
      if (!this.isNoItems) {
        return
      }

      this.isToggle = !this.isToggle
      this.$emit('toggle')
    }
  }
}
</script>
