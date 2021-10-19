<template>
  <div class="input-group">
    <div class="input-group-prepend d-flex align-items-center">
      <MagnifierIcon fill="input-group-text" size="18" />
    </div>
    <input
      v-on="listeners"
      id="search"
      name="search"
      placeholder="Поиск"
      :value="value"
      class="form-control"
    />
    <div class="input-group-append d-flex align-items-center">
      <transition name="fade">
        <PxButton
          v-if="value"
          type="icon"
          @click="$emit('clear')"
        >
          <CloseIcon size="11" />
        </PxButton>
      </transition>
    </div>
  </div>
</template>

<script>
import MagnifierIcon from '@/components/icons/MagnifierIcon'
import CloseIcon from '@/components/icons/CloseIcon'
import PxButton from '@/components/PxButton'

export default {
  name: 'PxSearchInput',
  components: {
    PxButton,
    CloseIcon,
    MagnifierIcon
  },
  props: {
    value: [String, Number]
  },
  computed: {
    listeners () {
      return {
        input: this.onInput,
        change: this.onChange
      }
    }
  },
  methods: {
    onInput (event) {
      const { value } = event.target
      this.$emit('input', value)
    },
    onChange (event) {
      const { value } = event.target
      this.$emit('change', value)
    }
  }
}
</script>
