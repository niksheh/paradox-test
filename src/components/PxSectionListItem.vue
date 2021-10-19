<template>
  <div
    @dragenter="onDragenter"
    @dragleave="onDragleave"
  >
    <pre>{{ onDrag }}</pre>
    <transition-group name="list">
      <PxCategoryItem
        v-if="showCategory"
        @toggle="isActive = !isActive"
        :item="category"
        :key="`category_${category.categoryId}`"
        @remove="$emit('remove', category)"
      />
      <div
        v-if="isActive"
        class="ms-4"
        :key="`items_block_${category.categoryId}`"
      >
        <draggable
          :list="items"
          handle=".handle"
          :group="{ name: 'documents', pull: true }"
        >
          <transition-group name="list">
            <PxDocumentListItem
              v-for="item in computedItems"
              :item="item"
              :key="`item_${item.itemId}`"
              @remove="onRemove"
            />
          </transition-group>
        </draggable>
      </div>
    </transition-group>
  </div>
</template>

<script>
import PxCategoryItem from '@/components/PxCategoryItem'
import PxDocumentListItem from '@/components/PxDocumentListItem'
import draggable from 'vuedraggable'

export default {
  name: 'PxSectionListItem',
  components: { PxCategoryItem, PxDocumentListItem, draggable },
  props: {
    category: {
      type: Object,
      default: () => ({})
    },
    query: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isActive: true,
      items: this.category.items,
      onDrag: false,
    }
  },
  watch: {
    computedItems: {
      handler (value) {
        if (value.length > 0 && this.query) {
          this.isActive = true
        }
      }
    }
  },
  computed: {
    showCategory () {
      if (!this.query) {
        return true
      }

      const condition = new RegExp(this.query, 'i')
      return this.computedItems.length || condition.test(this.category.name)
    },
    computedItems () {
      if (!this.query) {
        return this.items
      }
      const condition = new RegExp(this.query, 'i')
      return this.items.filter(item => condition.test(item.name))
    }
  },
  methods: {
    onDragenter() {
      this.onDrag = true
    },
    onDragleave() {
      this.onDrag = false
    },
    onRemove(removeItem) {
      const index = this.items.findIndex(item => item.itemId === removeItem.itemId)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    },
  }
}
</script>
