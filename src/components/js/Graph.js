//默认水波图-绿色-正常
export const luquiddefault = {
    width: 70,
    pixelRatio: 1,
    percent: 0.05,
    statistic: {
        content: {
            style: {
                fontSize: 15,
            },
        }
    },		
    outline: {
        border: 1,
        distance: 1,
        style: {
            stroke: '#22c55e',
        }
    },
    wave: {
        length: 40
    },
    liquidStyle: {
        fill: '#22c55e',
    }
}
//默认水波图-橙色-警告
export const luquiddefault_orange = {
    width: 70,
    pixelRatio: 1,
    percent: 0.5,
    statistic: {
        content: {
            style: {
                fontSize: 15,
            },
        }
    },		
    outline: {
        border: 1,
        distance: 1,
        style: {
            stroke: '#fbc02d',
        }
    },
    wave: {
        length: 40
    },
    liquidStyle: {
        fill: '#fbc02d',
    }
}
//默认水波图-红色-异常
export const luquiddefault_red = {
    width: 70,
    pixelRatio: 1,
    percent: 0.5,
    statistic: {
        content: {
            style: {
                fontSize: 15,
            },
        }
    },		
    outline: {
        border: 1,
        distance: 1,
        style: {
            stroke: '#ef4444',
        }
    },
    wave: {
        length: 40
    },
    liquidStyle: {
        fill: '#ef4444',
    }
}

//默认雷达图
export const radardefault = {
    xField: 'name',
    yField: 'star',
    title: {
		text: 'Vico'
    },
    appendPadding: [0, 10, 0, 10],
    meta: {
		star: {
			alias: '使用率:',
			min: 0,
			max:100,
			nice: true,
			tickInterval:25,
			formatter: (v) => Number(v).toFixed(2),
		}
    },
    xAxis: {
        tickLine: null,
	},
    yAxis: {
        label: false,
        grid: {
			alternateColor: ['raba(0,0,0,0.04)', null],
		},
    },
    point: {
        size: 2,
	},
    color:'#a8ddb5',
    smooth: false,
    area: {
		style: () => {
			return {
			fill: 'blue',
			fillOpacity:0.2
			}
		}
    },
	//style:{
	//	fill:'yellow',
	//	fillOpacity:0.5,
	//	stroke:'black',
	//	lineWidth:1,
	//	lineDash:[4,5],
	//	strokeOpacity:0.7,
	//	shadowColor:'black',
	//	shadowBlur:10,
	//	shadowOffsetX:5,
	//	shadowPffsetY:5,
	//	cursor:'poiner'
	//}
}

//默认折线图
export const linedefault={
	data:[],
	height:200,
	padding:'auto',
	xField:'Time',
    yField:'rate',
	xAxis:{
		tickCount:11,
	},
    yAxis: {
        tickCount: 7,
    },
    lineStyle:{
        fill:'#55bc8a',
        fillOpacity:0.5
    },
    cursor:'pointer',
    shadowBlur:0,
	smooth:true,
}