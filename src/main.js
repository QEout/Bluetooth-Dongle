import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import ant, { message } from 'ant-design-vue';
import { createPinia } from 'pinia';
import Bmob from 'hydrogen-js-sdk';
import 'ant-design-vue/dist/antd.css';
import '@/assets/font/iconfont.css';
import './index.css';

Bmob.initialize('0d92db2f8243e2bd', 'yszn11');

const app = createApp(App);
app.config.globalProperties.$message = message;
// app.config.globalProperties.$com = null;
//引入serveless
app.config.globalProperties.Bmob = Bmob;

app.directive('focus', {
	inserted: function(el) {
		if (el.tagName === 'INPUT') {
			// 如果是input标签的话，直接获取焦点
			el.focus();
		} else {
			// 契合antd的ui框架，做的配置，这里的el并不是input输入框！
			el.getElementsByTagName('input')[0].focus();
		}
	}
});

app.use(ant);
app.use(createPinia());
app.use(router);
app.mount('#app');
