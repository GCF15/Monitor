export const linedata_default=[
	{
		"Time":"past",
		"rate":0
	},
	{
		"Time": "",
		"rate": 0
	},
	{
		"Time": "",
		"rate": 0
	},
	{
		"Time": "",
		"rate": 0
	},
	{
		"Time": "",
		"rate": 0
	},
	{
		"Time": "",
		"rate": 0
	},
	{
		"Time": "",
		"rate": 0
	},
	{
		"Time": "",
		"rate": 0
	},
	{
		"Time": "",
		"rate": 0
	},
	{
		"Time": "",
		"rate": 0
	},	
	{
		"Time":"",
		"rate":0
	},
	{
		"Time": "",
		"rate": 0
	},
	{
		"Time": "",
		"rate": 0
	},
	{
		"Time": "",
		"rate": 0
	},
	{
		"Time": "",
		"rate": 0
	},
	{
		"Time": "",
		"rate": 0
	},
	{
		"Time": "",
		"rate": 0
	},
	{
		"Time": "",
		"rate": 0
	},
	{
		"Time": "",
		"rate": 0
	},
	{
		"Time": "",
		"rate": 0
	},
	{
		"Time": "feature",
		"rate": 0
	},
	
];

export const carddata_default=[
	{
		//id:"apips",
		state: true,
		title: 'APIPS',
    healthUrl: 'https://apips.appeon.com/health'
	},
	{
		//id:"apipsinfo",
    state: true,
		title: 'APIPSINFO',
    healthUrl: 'https://apipsinfo.appeon.com/health'
	},
	{
		//id:"apipsoa",   		
    state: false,
		title: 'APIPSOA',
    healthUrl: 'https://apipsoa.appeon.com/health'
	},
	{
		//id:"apips2",   		
    state: true,
		title: 'License备份服务器',
    healthUrl: 'https://apips2.appeon.com/health'
	}
];

export const radardata_default=[
	{ name: 'CPU', star: 85.12},
	{ name: 'GPU', star: 52.13},
	{ name: '内存', star: 21.40},
	{ name: '容器组', star: 18.85},
	{ name: '磁盘', star: 45.32},
];

export const tabledata_default=[
	{
		key: 1,
		show: '类型',
		tags: []
	},
	{
		key: 2,
		show: '状态',
		tags: []
	},
	{
		key: 3,
		show: 'IP地址',
		tags: []
	},
	{
		key: 4,
		show: '容器运行时版本',
		tags: []
	},
	{
		key: 5,
		show: 'Kubernet版本',
		tags: []
	}
];

import { h } from 'vue';
import { NTag } from 'naive-ui';
export const columns_default=[
	{
		//title: '监控项',
		key: 'show',
		width: 80,
		fix:'left'
	},
	{
		//title: '值',
		key: 'tags',
		width: 100,
		render(row) {
			const tags = row.tags.map(tagKey => {
				return h(
				NTag,
				{
					style: {
						marginRight: '6px'
					},
					type: 'info'
					},
					{
						default: () => tagKey
					}
				);
			});
				return tags;
			}
	}
];

export const timeline_error_default=[
	{ type: 'error', title: '发生异常', content: 'apipsinfo崩溃',linetype: 'dashed', time: '2021-10-10 20:46' }
];
	
export let timeline_warn_default=[
	{ type: 'warning', title: 'CPU占用过高', content: 'CPU占用率85%', time: '2021-10-10 20:46' }
];

export const liquiddata_default=[
	{
		key: 'CPU',
		used: 31,
		totol: 100
	},
	{
		key: 'GPU',
		used: 45,
		totol: 100
	}
];


	