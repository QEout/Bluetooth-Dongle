<template>
  <div class="center">
    <h1 class="title">登录</h1>
    <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" @finish="onFinish"
      @finishFailed="onFinishFailed">
      <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox :checked="formState.remember">记住此账号</a-checkbox>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit" :loading="loading">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance, reactive } from 'vue';
import { useRouter } from "vue-router"
const router = useRouter()
const currentInstance = getCurrentInstance();
const { $message } = currentInstance.appContext.config.globalProperties;
const formState = reactive({
  username: '',
  password: '',
  remember: true
});
const loading = ref(false);
const onFinish = (values) => {
  loading.value = true;
  Bmob.User.login(values.username, values.password).then(user => { 
    loading.value = false;
    if (user.isLogin) return $message.error('该用户已在其他设备登录，请重新登录')
      if (formState.remember) {
        console.log('tt')
        const query = Bmob.Query('_User');
        query.set('id', user.objectId)
        query.set('isLogin', true);
        query.save().then(res => {
          localStorage.setItem('token', user.sessionToken)
          router.push('/');
        })
      } else {
        router.push('/');
      }
  }).catch(err => {
    loading.value = false;
    $message.error(err.error);
    // 登录失败
  });
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
</script>
<style lang="scss" scoped>
.center {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	flex-direction: column;
}
.title {
	margin-bottom: 30px;
	font-weight: 700;
	color: white;
}
:deep .ant-form-item-label > label {
	color: white !important;
}
</style>