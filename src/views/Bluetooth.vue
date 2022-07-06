<template>
  <div class="com_container">
    <!-- <Header /> -->
    <div class="home_c">
      <div class="home_left shadow-card">
        <div style="padding:0 10px">
          <a-input-search v-model:value="value" placeholder="请输入表地址" enter-button="连接" style="width: 100%" @search="onSearch" />
        </div>
        <div>
          <a-button class="full-btn" @click="quickMsg('7E7E7E5A0600DA7EA5')">
            <span>复位转换器</span>
          </a-button>
        </div>
        <div>
          <a-button class="full-btn" @click="quickMsg('7E7E7E5A0607E17EA5','蓝牙检定预处理')">
            <span>蓝牙检定预处理</span>
          </a-button>
        </div>
        <div>
          <a-button class="full-btn" @click="quickMsg('7E7E7E5A0608E27EA5')">
            <span>查询蓝牙检定预处理状态</span>
          </a-button>
        </div>

        <div>
          <a-divider>选择操作</a-divider>

          <div class="home_send">
            <a-textarea class="home_send_input" placeholder="请输入要发送的信息" @change="handleSendValue" allowClear autoSize />
          </div>

          <div class="toped flex-selector">
            <span>重试次数</span>
            <a-select class="home_input" style="width: 120px" :disabled="open" :defaultValue="1" @change="handleChangeStopBits">
              <a-select-option v-for="item in serialConfig.stopBits" :key="item" :value="item">{{ item }}</a-select-option>
            </a-select>
          </div>
          <a-button class="full-btn toped" @click="handleStart">
            一键发送
          </a-button>
          <a-button class="full-btn toped" @click="handleStart">
            清空接收
          </a-button>
        </div>
      </div>

      <div class="home_right">
        <div class="home_text shadow-card" ref="scrollRef" style="margin-bottom: 10px;">
          <div v-for="(item, index) in msg" :key="index" :class="item.chat === 'roboto' ? 'right_msg' : 'left_msg'">
            <div v-if="item.chat=='roboto'" style="display:flex;align-items:center">
              <a-avatar shape="square" :size="32">
                R
              </a-avatar>
              <div class="msgContent">收→{{ formatMsg(item.content) }}</div>
            </div>
            <div v-else class="msgContent">{{ item.chat ?? '发' }}→{{ formatMsg(item.content) }}</div>
            <!-- {{ item.content }} -->
          </div>
        </div>
        <div style="min-height: 354px;">
          <a-row>
            <a-col :span="12" class="home_text shadow-card">
              <div class="home-item">
                <a-button>切换待测表进检定模式</a-button>
                <a-row>
                  <a-row class="top-5">
                    <span class="little-span">脉冲类型：</span>
                    <a-select class="m-selector" size="small" v-model:value="testMode.pulseType" placeholder="脉冲类型" :options="pulseType"></a-select>
                  </a-row>
                  <a-row class="top-5">
                    <span class="little-span">发射功率：</span>
                    <a-select class="m-selector" size="small" v-model:value="testMode.power" placeholder="发射功率" :options="power"></a-select>
                  </a-row>
                  <a-row class="top-5">
                    <span class="little-span">频段选择：</span>
                    <a-select class="m-selector" size="small" v-model:value="testMode.frequency" placeholder="频段选择" :options="frequency"></a-select>
                  </a-row>
                  <a-row class="top-5">
                    <span class="little-span">通道生成方式：</span>
                    <a-select class="m-selector" size="small" v-model:value="testMode.channelType" placeholder="通道生成方式" :options="channelType"></a-select>
                  </a-row>
                  <a-row class="top-5">
                    <span class="little-span">通道数量：</span>
                    <a-select class="m-selector" size="small" v-model:value="testMode.channelNum" placeholder="通道数量" :options="channelNum"></a-select>
                  </a-row>
                </a-row>
                <a-row v-for="i in testMode.channelNum" :key="i">
                  <div class="top-5">
                    <a-input size="small" v-model:value="testMode.channelList[i]" placeholder="频点" :prefix="'通道'+ i" />
                  </div>
                </a-row>
              </div>
            </a-col>

            <a-col :span="12">

              <a-row class="home_text shadow-card">
                <div class="home-item">
                  <a-button>切换转换器检定模式</a-button>
                  <a-row>
                    <a-row class="top-5">
                      <span class="little-span">脉冲类型：</span>
                      <a-select class="m-selector" size="small" v-model:value="testMode2.pulseType" placeholder="脉冲类型" :options="pulseType"></a-select>
                    </a-row>
                    <a-row class="top-5">
                      <span class="little-span">发射功率：</span>
                      <a-select class="m-selector" size="small" v-model:value="testMode2.power" placeholder="发射功率" :options="power"></a-select>
                    </a-row>
                    <a-row class="top-5">
                      <span class="little-span">通信模式：</span>
                      <a-select class="m-selector" size="small" v-model:value="testMode2.channelType" placeholder="通信模式" :options="communicationMode"></a-select>
                    </a-row>
                  </a-row>
                </div>
              </a-row>

              <a-row style="flex-direction:column;margin-right:10px;">
                <a-row class="top-5 home_text shadow-card" style="padding:10px">
                  <span>设置转换器RS485波特率：</span>
                  <a-select style="flex:1" size="small" :disabled="open" :defaultValue="3" @change="handleChangeStopBits">
                    <a-select-option v-for="item in baudRate" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
                  </a-select>
                </a-row>
                <a-row class="top-5 home_text shadow-card" style="flex-direction:column;padding:10px;">
                  <span>版本：</span>
                  <a-button @click="quickMsg('7E7E7E5A0605DF7EA5')">抄读管理单元固件版本号</a-button>
                </a-row>
                <a-row class="top-5 home_text shadow-card" style="flex-direction:column;padding:10px;">
                  <span>版本：</span>
                  <a-button @click="quickMsg('7E7E7E5A0606E07EA5')">抄读蓝牙模块固件版本号</a-button>
                </a-row>
              </a-row>

            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount, ref, getCurrentInstance, watch, nextTick } from 'vue';
// import Header from '@/components/Header';
import { formatMsg } from '@/utils'
import { useComStore } from '@/store';
import serialport from 'serialport';
import {serialConfig,baudRate,channelNum, pulseType, power, frequency, channelType, communicationMode} from '@/config';
// import robots from '@/assets/robots.png';
const comer = useComStore();
let { COM } = comer;
const currentInstance = getCurrentInstance();
const { $message } = currentInstance.appContext.config.globalProperties;

// 待测表进检定模式
const testMode=ref({
  //脉冲类型
  pulseType:null,
  //发射功率
  power:null,
  //频段选择
  frequency:null,
  //通道生成方式
  channelType:null,
  //通道数量
  channelNum:1,
  channelList:[null,null,null,null,null],
})
// 转换器检定模式
const testMode2=ref({
  //脉冲类型
  pulseType:null,
  //发射功率
  power:null,
  //通信模式
  channelType:null,
  //通道数量
  channelNum:1,
})

// 串口
// let COM = null;

// 消息
const msg = ref([]);

// 发送的信息
let sendMsg = '';

onBeforeMount(()=>{
  console.log(window.COM)
})

// onBeforeUnmount(() => {
// 	clearInterval(comTimer);
// 	if (open.value && COM) COM.close(() => {});
// });

// 开关串口
const handleSwitch = checked => {
	console.log(checked);
	if (checked) {
		COM = new serialport(port.value, option.value, false);
		COM.on('error', function() {
			$message.error('端口已经被占用');
			open.value = false;
		});
		// 接受消息
		COM.on('readable', () => {
			let content = '';
			if (hexDisplay) {
				COM.read().map(item => {
					content += item.toString(16);
				});
			} else {
				content = COM.read().toString();
			}

			if (content === '\n') {
				return;
			}
			msg.value.push({ chat: 'roboto', content });
		});
		open.value = true;
	} else {
		open.value = false;
		if (COM) COM.close(() => {});
	}
};

// 设置发送消息
const handleSendValue = e => {
  sendMsg = e.currentTarget.value;
};
function strToHexCharCode(str) {
  if (str === '') return '';
  var hexCharCode = [];
  for (var i = 0; i < str.length; i += 2) {
    if (i + 1 < str.length) {
      hexCharCode.push(parseInt(`${str[i]}${str[i]}`, 16));
    } else {
      hexCharCode.push(parseInt(str[i], 16));
    }
  }
  return hexCharCode;
}

// 快捷发送消息
const quickMsg = (value, type = 'ss') => {
  msg.value.push({ chat: type, content: value });
  COM.write(new Uint8Array(strToHexCharCode(value)));
}

// 发送消息
const handleSendMsg = () => {
  if (open.value) {
    msg.value.push({ chat: 'me', content: sendMsg });
    // COM.write(sendMsg);
    if (hexSend) {
      COM.write(new Uint8Array(strToHexCharCode(sendMsg)));
    } else {
      COM.write(sendMsg);
    }
  }
};

// 清空消息
const clearMsg = () => {
  msg.value = [];
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
<style lang="scss" scoped>
.m-selector {
	min-width: 130px;
}
.bottom .border-card {
	border: 1px solid #e8e8e8;
}
.top-5 {
	margin-top: 5px;
	justify-content: space-between;
	width: 100%;
}
.home-item {
	width: 100%;
	padding: 10px;
	padding-top: 0px;
	display: flex;
	flex-direction: column;
}
.flex-selector {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 10px;
}
.toped {
	margin-top: 20px !important;
}
.full-btn {
	width: -webkit-fill-available;
	margin: auto 10px;
}
.com_container {
	flex: 1;
	display: flex;
	flex-direction: column;
	padding-bottom: 20px;
}
.home_c {
	display: flex;
	flex: 1;
	margin: 10px;
}

.home_left {
	padding-top: 10px;
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
	width: 100px !important;
}
.home_left > div > .home_check {
	margin-bottom: 10px;
}
.home_right {
	height: calc(100vh - 76px);
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
	height: calc(16vh + 4px);
	flex: 1;
	display: flex;
	margin-left: 10px;
	overflow: scroll;
}
.home_send_input {
	margin-right: 0px !important;
	height: 100%;
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
	min-height: 34px;
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
	background-color: #26bd4b;
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
	margin: 10px 0px 0px 10px;
}
.home_sendConfig {
	width: 240px;
	padding: 10px;
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
