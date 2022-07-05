<template>
  <div class="main">
    <div class="main-div">
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
	height: 100vh;
  overflow: hidden;
	display: flex;
	background-image: linear-gradient(135deg, #3c8ce7 10%, #00eaff 100%);
	color: white !important;
}
.main-div {
	flex: 1 1 0%;
	display: flex;
	flex-direction: column;
}
</style>
