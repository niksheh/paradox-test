<template>
  <div>
    <button
      class="btn rounded-pill"
      :class="classes"
      @click="onClick"
      @mouseleave="$emit('mouseleave')"
      @mouseover="$emit('mouseover')"
      :disabled="isDisabled"
    >
      <div class="d-flex justify-content-center align-items-center">
        <div
          v-if="$slots.icon"
          class="d-flex justify-content-center align-items-center"
        >
          <slot name="icon" />
        </div>
        <div
          v-if="$slots.default"
          :class="{'ms-2': $slots.icon}"
        >
          <slot />
        </div>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'PxPxButton',
  props: {
    type: {
      type: String,
      default: 'secondary'
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    classes () {
      return {
        [`btn-outline-${this.type}`]: this.type,
        'btn-circle': this.$slots.icon && !this.$slots.default
      }
    }
  },
  methods: {
    onClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>
