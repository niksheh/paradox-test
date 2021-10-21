<template>
  <div>
    <transition-group name="list" tag="div">
      <PxCategoryItem
        v-if="showCategory"
        @toggle="isToggle = !isToggle"
        :item="category"
        :key="`category_${category.id}`"
        @remove="$emit('remove', category)"
        :is-no-items="isNoItems"
      />
      <div
        v-if="isToggle"
        class="ms-4 hide-sub-items"
        :key="`items_block_${category.id}`"
      >
        <draggable
          :list="items"
          handle=".handle"
          :group="{ name: 'documents', pull: true }"
          ghost-class="ghost-item"
          chosen-class="chosen-item"
          drag-class="drag-item"
          animation="220"
          :remove-clone-on-hide="false"
          @start="onStart"
          :key="`item_cat_${category.id}`"
        >
          <transition-group name="fade" tag="div">
            <PxDocumentListItem
              v-for="item in computedItems"
              :item="item"
              :key="`item_${item.id}`"
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
    },
    noCategory: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isToggle: true,
      items: this.category.items,
      onDrag: false
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
    isNoItems () {
      return Boolean(this.computedItems.length)
    },
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
    onStart ({ clone }) {
      clone.classList.add('old-item')
    },
    onRemove (removeItem) {
      const index = this.items.findIndex(item => item.id === removeItem.id)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    }
  }
}
</script>
