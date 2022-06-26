import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import ant, { message } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@/assets/font/iconfont.css';
import './index.css'
const app = createApp(App);
app.config.globalProperties.$message = message;
app.use(ant);
app.use(router);
app.mount('#app');
