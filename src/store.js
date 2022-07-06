import { defineStore } from 'pinia';

// 对外部暴露一个 use 方法，该方法会导出我们定义的 state
const useComStore = defineStore({
	// 每个 store 的 id 必须唯一
	id: 'comer',
	// state 表示数据源
	state: () => ({
    COM:null,
    // 串口号
    value: 'COM1',
    // 是否打开
    open: false,
    // 串口配置
		option:  {
      	baudRate: 9600, // 波特率
      	dataBits: 8, // 数据位
      	parity: 'none', // 校验位
      	stopBits: 1, // 停止位
      	flowControl: false
      },
	}),
	// // getters: {
	// // 	double() {
	// // 		// getter 中的 this 指向👉 state
	// // 		return this.count * 2;
	// // 	}
	// // },
	// // actions 用来修改 state
	actions: {
		setCom(com) {
			this.COM = com
		}
	}
});

export { useComStore };
