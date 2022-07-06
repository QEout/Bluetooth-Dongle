const serialConfig = {
	baudRate: [115200, 57600, 38400, 19200, 9600, 4800, 2400, 1800], // 波特率
	parity: ['none', 'even', 'mark', 'odd', 'space'], // 校验位
	dataBits: [8, 7, 6, 5], // 数据位
	stopBits: [1, 2] // 停止位
};

//脉冲类型
const pulseType = [
	{ value: '0', label: '秒脉冲输出' },
	{ value: '1', label: '需量周期' },
	{ value: '2', label: '时段投切' },
	{ value: '3', label: '正向谐波脉冲' },
	{ value: '4', label: '反向谐波脉冲' },
	{ value: '5', label: '无功脉冲' },
	{ value: '6', label: '有功脉冲' }
];
//发射功率
const power = [
	{ value: '0', label: '4dnm' },
	{ value: '1', label: '0dnm' },
	{ value: '2', label: '-4dnm' },
	{ value: '3', label: '-8dnm' },
	{ value: '4', label: '-20dnm' }
];
//频段选择
const frequency = [
	{ value: '0', label: '全频段' },
	{ value: '1', label: '带外频段' },
	{ value: '2', label: '带内频段' }
];
//通道生成方式
const channelType = [
	{ value: '0', label: '上位机输入' },
	{ value: '1', label: '自动生成' }
];
//通信模式
const communicationMode = [
	{ value: '0', label: '普通检定模式' },
	{ value: '1', label: '脉冲跟随模式' }
];

// 通道数量
const channelNum = [
	{ value: 1, label: '1' },
	{ value: 2, label: '2' },
	{ value: 3, label: '3' },
	{ value: 4, label: '4' },
	{ value: 5, label: '5' }
];

// 485波特率
const baudRate = [
	{ value: 0, label: '2400bps' },
	{ value: 1, label: '4800bps' },
	{ value: 2, label: '9600bps' },
	{ value: 3, label: '19200bps' },
	{ value: 4, label: '38400bps' },
	{ value: 5, label: '57600bps' }
];
export { serialConfig, baudRate, channelNum, pulseType, power, frequency, channelType, communicationMode };
