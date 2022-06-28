<template>
	<div class="layout-topbar">
		<router-link to="/" class="layout-topbar-logo">
			<img alt="Logo" :src="topbarImage()" />
			<span>Appeon服务监控</span>
		</router-link>
		<button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle" v-tooltip.bottom="expandmenu.value">
			<i class="pi pi-bars"></i>
		</button>

		<button class="p-link layout-topbar-menu-button layout-topbar-button"
			v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', 
			leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}">
			<i class="pi pi-ellipsis-v"></i>
		</button>
		<ul class="layout-topbar-menu lg:flex origin-top">
			<li v-tooltip.bottom="'北京时间'">
				<button class="p-link layout-topbar-button-time" style="width: 11em;">
					<p>{{nowtime.value}}</p>
				</button>
			</li>
			<li v-tooltip.bottom="'今天是个好日子！'">
				<button class="p-link layout-topbar-button-time" style="width: 5em;">
					<p style="margin-left:5px;">{{nowweek.value}}</p>
				</button>
			</li>
			<li v-tooltip.bottom="fullscreen.value">
				<!--<icon-gridicons-fullscreen  class="text-18px" />-->
				<button class="p-link layout-topbar-button" @click="fullScreanClick()">
						<i class="pi pi-stop"></i>
						<!--<icon-gridicons-fullscreen v-else class="text-18px" />-->
						<span>全屏/退出全屏</span>
				</button>
			</li>
			<li v-tooltip.bottom="'事件'">
				<button class="p-link layout-topbar-button" @click="gotoLog()">
					<i class="pi pi-calendar" v-badge.danger="'10'"></i>
					<span>事件</span>
				</button>
			</li>
			<li v-tooltip.bottom="'设置'">
				<button class="p-link layout-topbar-button"  @click="gotoSetting()">
					<i class="pi pi-cog"></i>
					<span>设置</span>
				</button>
			</li>
			<li v-tooltip.bottom="'用户'">
				<Menu ref="menu" :model="overlayMenuItems" :popup="true" />
				<button class="p-link layout-topbar-button" @click="toggleMenu">
					<i class="pi pi-user"></i>
					<span>用户</span>
				</button>
			</li>
			<!--<img :src='images/avatar/annafali.png' width="32" style="vertical-align: middle" />-->
		</ul>
	</div>
</template>

<script>
import { reactive } from 'vue'
import screenfull from 'screenfull'

export default {
	beforeUnmount() {
				//销毁定时器
			clearInterval(this.timer);
			this.timer = null
  },
	created() {
		
		//循环执行定时器
		this.timer = setInterval(this.setTime, 1000)
	},
	
	data(){
		let nowtime=reactive({ value:'' });
		let nowweek=reactive({ value:'' });
		let fullscreen=reactive({ value:'全屏' });
		let expandmenu=reactive({ value:'展开/收缩菜单' });
		
		return {
			nowtime,
			nowweek,
			fullscreen,
			expandmenu,
			
			overlayMenuItems: [
					{
						label: 'Admin',
						icon: 'pi pi-user-edit'
					},
					{
						separator: true
					},
					{
						label: '退出登录',
						icon: 'pi pi-sign-out'
					},
				],
		}
	},
  methods: {
		toggleMenu(event) {
				this.$refs.menu.toggle(event);
		},
    onMenuToggle(event) {
      this.$emit('menu-toggle', event);
    },
		onTopbarMenuToggle(event) {
      this.$emit('topbar-menu-toggle', event);
    },
		topbarImage() {
			//return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
      return 'images/monitor.png'
		},
		fullScreanClick(){
			if(screenfull.isEnabled){
				if(screenfull.isFullscreen){
					screenfull.exit()
					this.fullscreen.value = "退出全屏"
				}else{
					screenfull.toggle()
					this.fullscreen.value = "退出全屏"
				}
			}
		},
		setTime(){
			const dates = new Date();
			
			const year = dates.getFullYear();//year
			const month = (dates.getMonth() + 1) < 10 ? '0' + (dates.getMonth() + 1) : (dates.getMonth() + 1);//month
			const day = dates.getDate() < 10 ? '0' + dates.getDate() : dates.getDate();
	
			const hour = dates.getHours();//北京时间
			const minute = dates.getMinutes() < 10 ? '0' + dates.getMinutes() : dates.getMinutes();
			const seconds = dates.getSeconds()<10 ? '0' + dates.getSeconds() : dates.getSeconds();
			
			var week = '星期一';
			switch(dates.getDay()){
				case 2:
					week='星期二';
					break;
				case 3:
					week='星期三';
					break;
				case 4:
					week='星期四';
					break;
				case 5:
					week='星期五';
					break;
				case 6:
					week='星期六';
					break;
				case 7:
					week='星期天';
					break;
				default:
					week='星期一';
					break;
			}
			
			this.nowtime.value = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + seconds;
			this.nowweek.value = week;
		},
    
    gotoSetting(){
			this.$router.push("/setting")
    },

	gotoLog(){
		this.$router.push("/log")
	},
		
		setting(){
			
		}
  },
	computed: {
		darkTheme() {
			return this.$appState.darkTheme;
		}
	},
}
</script>