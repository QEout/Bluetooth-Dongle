<template>
  <div class="main">
    <Side />
    <div style="flex:1">
      <Header />
      <router-view />
    </div>
  </div>
</template>


<script setup>
import Header from '@/components/Header';
import Side from '@/components/Side';
</script>
<style scoped>
.main {
	display: flex;
	background-image: linear-gradient(135deg, #3c8ce7 10%, #00eaff 100%);
	color: white !important;
}
</style>