<template>
  <a-modal v-model:visible="visible" width="30%">
    <template #title>
    </template>
    <div class="item_div">
      <span>串口号</span>
      <a-select class="home_input" style="width: 120px" :disabled="open" v-model:value="port">
        <a-select-option v-for="(item, index) in ports" :key="index" :value="item.path">{{ item.path }}</a-select-option>
      </a-select>
    </div>
    <div class="item_div">
      <span>波特率</span>
      <a-select class="home_input" style="width: 120px" :disabled="open" v-model:value="option.baudRate">
        <a-select-option v-for="item in serialConfig.baudRate" :key="item" :value="item">{{ item }}</a-select-option>
      </a-select>
    </div>
    <div class="item_div">
      <span>校验位</span>
      <a-select class="home_input" style="width: 120px" :disabled="open" defaultValue="none" v-model:value="option.parity">
        <a-select-option v-for="item in serialConfig.parity" :key="item" :value="item">{{ item }}</a-select-option>
      </a-select>
    </div>

    <div class="item_div">
      <span>数据位</span>
      <a-select class="home_input" style="width: 120px" :disabled="open" :defaultValue="8" v-model:value="option.dataBits">
        <a-select-option v-for="item in serialConfig.dataBits" :key="item" :value="item">{{ item }}bit</a-select-option>
      </a-select>
    </div>
    <div class="item_div">
      <span>停止位</span>
      <a-select class="home_input" style="width: 120px" :disabled="open" :defaultValue="1" v-model:value="option.stopBits">
        <a-select-option v-for="item in serialConfig.stopBits" :key="item" :value="item">{{ item }}bit</a-select-option>
      </a-select>
    </div>

    <template #footer>
      <div class="footer_div">
        <span>开/关</span>
        <a-switch v-model:checked="open" />
      </div>
    </template>
  </a-modal>
</template>

<script setup>
import { onBeforeMount, ref, getCurrentInstance, watch, nextTick, computed, onBeforeUnmount, defineEmits } from 'vue';
import { useComStore } from '@/store';
import { storeToRefs } from 'pinia';
import serialport from 'serialport';
import { serialConfig } from '@/config';
//props：dialogVisible

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:visible'])
let visible = computed({
  get: () => {
    return props.visible
  },
  set: (param) => {
    emit("update:visible", param)
  },
})

const comer = useComStore();
let { open, value: port, option } = storeToRefs(comer);
let ports = ref([]);
let comTimer = null;
let com = window.COM;

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

// 开关串口
const handleSwitch = checked => {
  console.log(checked);
  if (checked) {
    if (!com) {
      com = new serialport(port.value, option.value, false);
      window.COM = com;
      // comer.setCom(com);
      com.on('error', function () {
        $message.error('端口已经被占用');
        open.value = false;
        window.COM = null;
      });
    }
    // 接受消息
    com.on('readable', () => {
      let content = '';
      if (hexDisplay) {
        com.read().map(item => {
          content += item.toString(16);
        });
      } else {
        content = com.read().toString();
      }

      if (content === '\n') {
        return;
      }
      msg.value.push({ chat: 'roboto', content });
    });
  } else {
    if (com) {
      com.close(() => { });
      com = null;
      window.COM = null;
    }
  }
};
watch(
  () => open.value,
  () => handleSwitch(open.value),
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.item_div {
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 12px 0;
}
.footer_div {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	width: 100%;
	gap: 12px;
}
</style>