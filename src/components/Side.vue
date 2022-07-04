<template>
  <div class="left_container">
    <div class="logo">
      <img src="@/assets/logo.png" alt="logo" @Click="logout" />
    </div>
    <button id="minimize" @click="router.push('/')" :class="{ active: onRoutes === '/' }">
      <i class="iconfont icon-jiekou"></i>
      <span>串口</span>
    </button>
    <button id="minimize" @click="router.push('/bluetooth')" :class="{ active: onRoutes === '/bluetooth' }">
      <i class="fa fa-bluetooth-b lh-28"></i>
      <span>蓝牙</span>
    </button>
    <button id="minimize" @click="router.push('/net')" :class="{ active: onRoutes === '/net' }">
      <i class="iconfont icon-wangluo"></i>
      <span>网络</span>
    </button>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const onRoutes = computed(() => {
  return route.path;
});
const logout = () => {
  let current = Bmob.User.current()
  const query = Bmob.Query('_User');
  query.set('id', current.objectId)
  query.set('isLogin', false);
  query.save().then(res => {
    localStorage.removeItem('token');
    router.push('/login');
  })
};
</script>

<style scoped>
.left_container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 30px;
	width: 82px;
	/* background: #f3f5f6; */
	user-select: none;
}
.left_container .logo {
	padding-bottom: 16px;
	color: #ff936b;
}
.left_container .logo img {
	width: 50px;
	height: 70px;
}
.lh-28 {
	line-height: 28px;
}
.left_container button {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;
	width: 72px;
	height: 72px;
	background: transparent;
	border: 0;
	border-radius: 7px;
	outline: none;
	font-size: 16px;
	font-weight: 600;
	cursor: pointer;
}
.left_container button i {
	font-size: 18px;
}
.left_container button:hover {
	background: #fafafa !important;
}
.active {
	color: #00dac6 !important;
	background: #fafafa !important;
}
</style>
