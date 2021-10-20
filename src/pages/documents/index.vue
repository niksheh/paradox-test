<template>
  <div>
    <div class="mt-4 d-flex justify-content-between">
      <div><h5>Документы</h5></div>
      <div class="d-flex">
        <PxButton>
          <template #icon>
            <BookmarkIcon class="btn-icon" />
          </template>
        </PxButton>
        <PxButton class="ms-2">
          <template #icon>
            <plus-icon class="btn-icon" />
          </template>
          Новый тип
        </PxButton>
        <PxButton class="ms-2">
          <template #icon>
            <plus-icon class="btn-icon" />
          </template>
          Новый документ
        </PxButton>
      </div>
    </div>
    <div class="mt-3 w-50">
      <PxSearchInput
        v-model="query"
        @clear="query = null"
      />
    </div>
    <div class="mt-3">
      <transition name="fade-in">
        <div
          v-if="isEmpty"
          class="text-grey fs-09 mt-5"
        >
          Ничего не найдено. Попробуйте изменить параметры поиска.
        </div>
      </transition>
      <draggable
        v-model="categories"
        handle=".handle"
        group="section"
        ghost-class="ghost-item"
        chosen-class="chosen-item"
        drag-class="drag-item"
        animation="220"
      >
        <transition-group>
          <PxSectionListItem
            v-for="category in computedCategories"
            :category="category"
            :query="query"
            :key="`category_${category.id}`"
            @remove="onRemoveSection"
          />
        </transition-group>
      </draggable>
    </div>
    <div class="mt-3">
      <draggable
        :list="itemsWithoutCategory"
        handle=".handle"
        :group="{ name: 'documents', pull: true }"
        ghost-class="ghost-item"
        chosen-class="chosen-item"
        drag-class="drag-item"
        animation="220"
      >
        <transition-group name="list">
          <PxDocumentListItem
            v-for="item in itemsWithoutCategory"
            :item="item"
            :key="`item_no_cat_${item.id}`"
            @remove="onRemoveItem"
          />
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import PxButton from '@/components/PxButton'
import BookmarkIcon from '@/components/icons/BookmarkIcon'
import PxDocumentListItem from '@/components/PxDocumentListItem'
import PxSearchInput from '@/components/PxSearchInput'
import PxSectionListItem from '@/components/PxSectionListItem'
import ITEMS from '../../data/items'
import CATEGORIES from '../../data/categories'
import PlusIcon from '@/components/icons/PlusIcon'
import draggable from 'vuedraggable'

export default {
  name: 'Documents',
  data () {
    return {
      items: ITEMS,
      categories: CATEGORIES,
      query: null,
      dragging: false,
      itemsWithoutCategory: undefined
    }
  },
  components: {
    PxSectionListItem,
    PxSearchInput,
    PxDocumentListItem,
    PxButton,
    PlusIcon,
    BookmarkIcon,
    draggable
  },
  created () {
    this.getItemsWithoutCategory()
  },
  watch: {
    computedItems: 'getItemsWithoutCategory'
  },
  computed: {
    isEmpty () {
      return !this.computedItems.length && !this.search('categories').length
    },
    computedCategories () {
      return this.categories.map(category => {
        const items = this.computedItems.filter(item => item.categoryId === category.id)
        return {
          ...category,
          items
        }
      })
    },
    computedItems () {
      return this.search('items')
    }
  },
  methods: {
    onRemoveItem (removeItem) {
      const index = this.itemsWithoutCategory.findIndex(item => item.id === removeItem.id)
      if (index !== -1) {
        this.itemsWithoutCategory.splice(index, 1)
      }
    },
    onRemoveSection (removeItem) {
      const index = this.categories.findIndex(category => category.id === removeItem.id)
      if (index !== -1) {
        this.categories.splice(index, 1)
      }
    },
    getItemsWithoutCategory () {
      this.itemsWithoutCategory = this.computedItems.filter(item => !item.categoryId)
    },
    search (entity) {
      if (!this.query) {
        return this[entity]
      }
      const condition = new RegExp(this.query, 'i')
      return this[entity].filter(item => condition.test(item.name))
    }
  }
}
</script>
