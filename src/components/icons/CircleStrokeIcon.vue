<template>
  <svg width="22" height="22" viewBox="0 0 22 22" :fill="fill" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21ZM11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22Z"
            />
    </svg>
</template>

<script>
export default {
  name: 'CircleStrokeIcon',
  props: {
    fill: {
      type: String,
      default: '#8E9CBB'
    }
  }
}
</script>
