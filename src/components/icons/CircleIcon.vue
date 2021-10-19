<template>
  <svg width="8" height="8" viewBox="0 0 8 8" :fill="fill" xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="4" r="4"/>
  </svg>

</template>

<script>
export default {
  name: 'CircleIcon',
  props: {
    fill: {
      type: String,
      default: '#0066FF'
    }
  }
}
</script>
