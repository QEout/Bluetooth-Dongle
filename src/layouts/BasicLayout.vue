<template>
	<div class="basic">
		<Side />
		<div class="basic-div">
			<router-view />
		</div>
	</div>
</template>

<script setup>
import Header from '@/components/Header';
import Side from '@/components/Side';
</script>
<style scoped>
.basic {
	display: flex;
	background-image: linear-gradient(135deg, #3c8ce7 10%, #00eaff 100%);
	color: white !important;
  width:100%;
  height:100%;
}
.basic-div {
	flex: 1 1 0%;
	display: flex;
	flex-direction: column;
}
</style>
