<template>
  <div>
    <transition-group name="list">
      <PxCategoryItem
        v-if="showCategory"
        @toggle="isActive = !isActive"
        :item="category"
        :key="`category_${category.id}`"
        @remove="$emit('remove', category)"
      />
      <div
        v-if="isActive"
        class="ms-4"
        :key="`items_block_${category.id}`"
      >
        <draggable
          :list="items"
          class="dropzone"
          handle=".handle"
          :group="{ name: 'documents', pull: true }"
          ghost-class="ghost-item"
          chosen-class="chosen-item"
          drag-class="drag-item"
          animation="220"
          :remove-clone-on-hide="false"
          @start="onStart"
        >
          <PxDocumentListItem
            v-for="item in computedItems"
            :item="item"
            :key="`item_${item.id}`"
            @remove="onRemove"
          />
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
    },
    noCategory: {
      type: Boolean,
      default: false
    },
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
      if (this.noCategory) {
        return false
      }

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
    onStart({ clone }) {
      clone.classList.add('draggable')
    },
    onRemove(removeItem) {
      const index = this.items.findIndex(item => item.id === removeItem.id)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    },
  }
}
</script>


<style>
.dropzone {
  min-height: 20px;
}
</style>