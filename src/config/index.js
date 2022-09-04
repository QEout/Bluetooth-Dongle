const serialConfig = {
	baudRate: [115200, 57600, 38400, 19200, 9600, 4800, 2400, 1800], // 波特率
	parity: ['none', 'even', 'mark', 'odd', 'space'], // 校验位
	dataBits: [8, 7, 6, 5], // 数据位
	stopBits: [1, 2] // 停止位
};

//脉冲类型
const pulseType = [
	{ value: '00', label: '秒脉冲输出' },
	{ value: '01', label: '需量周期' },
	{ value: '02', label: '时段投切' },
	{ value: '03', label: '正向谐波脉冲' },
	{ value: '04', label: '反向谐波脉冲' },
	{ value: '05', label: '无功脉冲' },
	{ value: '06', label: '有功脉冲' },
  { value: 'FF', label: '退出检定模式' }
];
//发射功率
const power = [
	{ value: '00', label: '4dnm' },
	{ value: '01', label: '0dnm' },
	{ value: '02', label: '-4dnm' },
	{ value: '03', label: '-8dnm' },
	{ value: '04', label: '-20dnm' }
];
//频段选择
const frequency = [
	{ value: '00', label: '全频段' },
	{ value: '01', label: '带外频段' },
	{ value: '02', label: '带内频段' }
];
//通道生成方式
const channelType = [
	{ value: '00', label: '上位机输入' },
	{ value: '01', label: '自动生成' }
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
	{ value: '7E7E7E5A070400DF7EA5', label: '2400bps' },
	{ value: '7E7E7E5A070401E07EA5', label: '4800bps' },
	{ value: '7E7E7E5A070402E17EA5', label: '9600bps' },
	{ value: '7E7E7E5A070403E27EA5', label: '19200bps' },
	{ value: '7E7E7E5A070404E37EA5', label: '38400bps' },
	{ value: '7E7E7E5A070405E47EA5', label: '57600bps' }
];
export { serialConfig, baudRate, channelNum, pulseType, power, frequency, channelType, communicationMode };
