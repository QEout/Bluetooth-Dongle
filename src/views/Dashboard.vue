<template>
	<div class="com_container">
		<!-- <Header /> -->
		<div class="home_c">
			<div class="home_left shadow-card">
				<div>
					<span>串口号</span>
					<a-select class="home_input" style="width: 120px" :disabled="open" v-model:value="port">
						<a-select-option v-for="(item, index) in ports" :key="index" :value="item.path">{{ item.path }}</a-select-option>
					</a-select>
				</div>
				<div>
					<span>波特率</span>
					<a-select class="home_input" style="width: 120px" :disabled="open" v-model:value="option.baudRate">
						<a-select-option v-for="item in serialConfig.baudRate" :key="item" :value="item">{{ item }}</a-select-option>
					</a-select>
				</div>
				<div>
					<span>校验位</span>
					<a-select class="home_input" style="width: 120px" :disabled="open" defaultValue="none" v-model:value="option.parity">
						<a-select-option v-for="item in serialConfig.parity" :key="item" :value="item">{{ item }}</a-select-option>
					</a-select>
				</div>

				<div>
					<span>数据位</span>
					<a-select class="home_input" style="width: 120px" :disabled="open" :defaultValue="8" v-model:value="option.dataBits">
						<a-select-option v-for="item in serialConfig.dataBits" :key="item" :value="item">{{ item }}bit</a-select-option>
					</a-select>
				</div>
				<div>
					<span>停止位</span>
					<a-select class="home_input" style="width: 120px" :disabled="open" :defaultValue="1" v-model:value="option.stopBits">
						<a-select-option v-for="item in serialConfig.stopBits" :key="item" :value="item">{{ item }}bit</a-select-option>
					</a-select>
				</div>
				<div>
					<span>开/关</span>
					<a-switch v-model:checked="open" @click="handleSwitch(open)" />
				</div>

				<div>
					<a-divider>接收区设置</a-divider>
					<div class="home_check" style="display:flex">
						<a-checkbox @change="handleHexDisplay">HEX显示</a-checkbox>
						<div style="display: flex;flex:1">
							<span>间隔：</span>
							<a-input-number style="flex:1" size="small" :disabled="open" v-model:value="timeout" :min="1" :max="9999">
								<template #addonAfter>ms</template>
							</a-input-number>
						</div>
					</div>
					<a-button type="primary" danger @click="clearMsg" style="width:100%">清空窗口</a-button>
				</div>
			</div>
			<div class="home_right">
				<div class="home_text shadow-card" ref="scrollRef">
					<div v-for="(item, index) in msg" :key="index" :class="item.chat === 'roboto' ? 'right_msg' : 'left_msg'">
						<div v-if="item.chat == 'roboto'" style="display:flex;align-items:center">
							<a-avatar shape="square" :size="32">
								R
							</a-avatar>
							<div class="msgContent">{{ item.content }}</div>
						</div>
						<div v-else class="msgContent">{{ item.content }}</div>
						<!-- {{ item.content }} -->
					</div>
				</div>
			</div>
		</div>
		<div class="home_b">
			<!-- <div class="home_send"> -->
				<a-textarea :rows="4" class="home_send_input" placeholder="请输入要发送的信息" @change="handleSendValue" allowClear  />
			<!-- </div> -->
			<div class="home_sendConfig">
				<div class="home_check" style="margin-bottom: 12px;display: flex;align-items: center;">
					<a-checkbox @change="handleHexSend">HEX发送</a-checkbox>
					<a-button type="primary" style="flex:1" :disabled="!open" @click="handleSendMsg">发送</a-button>
				</div>
				<div class="home_check" style="display: flex;align-items: center;">
					<a-checkbox @change="openInterval">定时发送</a-checkbox>
					<a-input-number style="flex:1" :disabled="isInterval" v-model="time" :defaultValue="time" :min="1" :max="99999" @change="handleSetInterval">
						<template #addonAfter>ms</template>
					</a-input-number>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { onBeforeMount, ref, getCurrentInstance, watch, nextTick, onBeforeUnmount } from 'vue';
import { useComStore } from '@/store';
import { storeToRefs } from 'pinia';
import serialport from 'serialport';
import { serialConfig } from '@/config';
import InterByteTimeoutParser from '@serialport/parser-inter-byte-timeout';
// import robots from '@/assets/robots.png';
const currentInstance = getCurrentInstance();
let { $message } = currentInstance.appContext.config.globalProperties;
const comer = useComStore();
let { open, value: port, option } = storeToRefs(comer);
// 串口列表
let ports = ref([]);
// 超时时间
let timeout = ref(30);
// 是否是十六进制显示
let hexDisplay = false;
// 是否是十六进制发送
let hexSend = false;
let comTimer = null;

// 获取串口列表
onBeforeMount(() => {
	comTimer = setInterval(() => {
		serialport.list().then(list => {
			ports.value = list;
		});
	}, 2000);
});

onBeforeUnmount(() => {
	clearInterval(comTimer);
});

const handleHexDisplay = e => {
	hexDisplay = e.target.checked;
};

const handleHexSend = e => {
	hexSend = e.target.checked;
};
// 串口
let COM = window.COM;
// 消息
const msg = ref([]);
// 发送的信息
let sendMsg = '';

// 定时时间
let time = ref(1000);
let timer = ref(null);
let isInterval = ref(false);

const openInterval = e => {
	isInterval.value = e.target.checked;
	timer.value && window.clearInterval(timer.value);
	if (e.target.checked) {
		timer.value = window.setInterval(() => {
			handleSendMsg();
		}, time.value);
	}
};
const handleSetInterval = value => {
	time.value = value;
};
// 清空消息
const clearMsg = () => {
	msg.value = [];
};
// 开关串口
const handleSwitch = checked => {
	if (checked) {
		COM = new serialport(port.value, option.value, false);

		const pipe = COM.pipe(new InterByteTimeoutParser({ interval: 30 }));
		window.COM = COM;

		comer.setCom(COM);
		// 接受消息
		pipe.on('readable', () => {
			let content = '';
			if (hexDisplay) {
				pipe.read().map(item => {
					content += item.toString(16);
				});
			} else {
				content = pipe.read()?.toString();
			}

			if (content === '\n') {
				return;
			}
			msg.value.push({ chat: 'roboto', content });
		});
	} else {
		if (COM) {
			COM?.close(() => {});
			COM = null;
			window.COM = null;
		}
	}
};

// 设置发送消息
const handleSendValue = e => {
	sendMsg = e.currentTarget.value;
};

// hex发送
function hexSendMsg(msg) {
	let hex = msg.replace(/\s+/g, '');
	let arr = [];
	for (let i = 0; i < hex.length; i += 2) {
		arr.push(parseInt(hex.substr(i, 2), 16));
	}
	return arr;
}

// 发送消息
const handleSendMsg = () => {
	if (open.value) {
		msg.value.push({ chat: 'me', content: sendMsg });
		if (hexSend) {
			COM.write(hexSendMsg(sendMsg));
		} else {
			COM.write(sendMsg);
		}
	}
};

const scrollRef = ref(null);
watch(
	() => [...msg.value],
	async () => {
		await nextTick();
		scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
	}
);
</script>
<style scoped>
.com_container {
	flex: 1;
	display: flex;
	flex-direction: column;
	padding-bottom: 20px;
}
.home_c {
	display: flex;
	flex: 1;
	max-height: 72vh;
	margin: 10px;
}

.home_left {
	width: 240px;
	padding-bottom: 20px;
	box-sizing: border-box;
	border: 1px solid #ededed;
	user-select: none;
}

.home_left > div {
	margin-left: 10px;
	margin-right: 10px;
	padding-top: 20px;
}

.home_left > div > span {
	display: inline-block;
	width: 50px;
	margin-right: 10px;
}

.home_left > div .home_input {
	width: 150px !important;
}
.home_left > div > .home_check {
	margin-bottom: 10px;
}
.home_right {
	display: flex;
	flex-direction: column;
	flex: 1;
}
.home_text {
	flex: 1;
	margin-left: 10px;
	border: 1px solid #ededed;
}
.home_send {
	height: calc(16vh + 6px);
	flex: 1;
	display: flex;
	overflow: scroll;
}
.home_send_input {
	margin-right: 10px !important;
	height: 100% !important;
}
::v-deep .home_send_input > textarea {
  padding-right: 24px !important;
}
.home_text {
	box-sizing: border-box;
	padding-top: 10px;
	overflow-y: scroll;
}
.left_msg,
.right_msg {
	display: flex;
	align-items: center;
	position: relative;
	width: 100%;
	margin-bottom: 10px;
}

.left_msg .ant-avatar {
	width: 38px;
	height: 38px;
	margin-left: 5px;
}
.right_msg .ant-avatar {
	order: 2;
	width: 38px;
	height: 38px;
	margin-right: 5px;
}
.right_msg {
	display: flex;
	justify-content: flex-end;
}
.left_msg .msgContent {
	position: relative;
	display: inline-block;
	min-width: 38px;
	min-height: 38px;
	margin-left: 10px;
	word-break: break-word;
	padding: 5px 8px;
	border-radius: 5px;
	/* background-color: #348dfe; */
	border: 1px solid #ededed;
	width: auto;
	max-width: 490px;
	font-size: 14px;
	letter-spacing: 0px;
	color: white;
}
.right_msg .msgContent {
	position: relative;
	display: inline-block;
	min-width: 38px;
	min-height: 34px;
	margin-right: 10px;
	padding: 5px 8px;
	border-radius: 5px;
	background-color: #5a64c1;
	max-width: 500px;
	font-size: 14px;
	font-weight: normal;
	color: #e9e9e9;
}
.right_msg .msgContent::before {
	content: '';
	position: absolute;
	width: 0;
	height: 0;
	right: -5px;
	top: 14px;
	border-style: solid;
	border-width: 5px 0 5px 5px;
	border-color: transparent transparent transparent #5fc5f5;
}
.home_b {
	display: flex;
	margin: 0 10px;
}
.home_sendConfig {
	width: 240px;
	padding: 10px;
	height: calc(16vh + 2px);
	border: 1px solid #ededed;
	user-select: none;
}
.home_btn {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.size-btn {
	width: 8vw;
	height: 6vh !important;
}

::-webkit-scrollbar {
	z-index: 50;
	width: 7px;
	height: 3px;
}

::-webkit-scrollbar-track {
	background-color: rgba(0, 0, 0, 0);
}

::-webkit-scrollbar-thumb {
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	border-radius: 5px;
	background-color: rgba(0, 0, 0, 0.1);
	transition: all 0.2s;
	height: 20px;
}
:hover::-webkit-scrollbar-thumb {
	transition: all 0.2s;
}
::-webkit-scrollbar-button {
	display: none;
}
::-webkit-scrollbar-corner {
	display: none;
}
</style>
