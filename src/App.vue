<template>
  <div id="app">
   <div class="container-fluid">
   <div class="container px-0">
     <Document />
   </div>
   </div>
  </div>
</template>

<script>
import Document from '@/pages/documents'

export default {
  name: 'App',
  components: {
    Document
  }
}
</script>
