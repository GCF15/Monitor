<template>
	<div id="layout-config" :class="containerClass">
		<a href="#" class="layout-config-button" id="layout-config-button" @click="toggleConfigurator">
			<i class="pi pi-cog"></i>
		</a>
		<Button class="p-button-danger layout-config-close p-button-rounded p-button-text" icon="pi pi-times" @click="hideConfigurator" :style="{'z-index': 1}"></Button>

		<div class="layout-config-content">
			<n-divider title-placement="left">
				<b class="mt-0">尺寸</b>
			</n-divider>
			<div class="config-scale">
				<Button icon="pi pi-minus" @click="decrementScale()" class="p-button-text" :disabled="scale === scales[0]"/>
				<i class="pi pi-circle-on" v-for="s of scales" :class="{'scale-active': s === scale}" :key="s"/>
				<Button icon="pi pi-plus"  @click="incrementScale()" class="p-button-text" :disabled="scale === scales[scales.length - 1]" />
			</div>
			
			<n-divider title-placement="left">
				<b>间隔刷新时间</b>
			</n-divider>
			
			<n-input round :placeholder=refreshTime>
					<template #suffix>秒</template>
			</n-input>
			
			<n-divider title-placement="left">
				<b>报警方式</b>
			</n-divider>
			<n-checkbox-groud :value="selectAlert">
				<n-space>
					<n-checkbox value="3" label="企业微信" size="medium"></n-checkbox>
					<n-checkbox value="0" label="邮件" size="medium"></n-checkbox>
					<n-checkbox value="1" label="短信" size="medium"></n-checkbox>
					<n-checkbox value="2" label="电话" size="medium"></n-checkbox>
				</n-space>
			</n-checkbox-groud>
			<p></p>
			<div class="p-formfroup-inline">
				<n-button tertiary round type="success" @click="applyRefreshTineSet()">应用</n-button>
				<n-button tertiary round type="success" style="margin-left:10px;" @click="moreSetting()">更多设置</n-button>
			</div>
			
			<n-divider title-placement="left">
				<b>菜单类型</b>
			</n-divider>
			<div class="p-formgroup-inline">
				<div class="field-radiobutton">
					<RadioButton id="static" name="layoutMode" value="static" v-model="d_layoutMode" @change="changeLayout($event, 'static')" />
					<label for="static">默认</label>
					<RadioButton style="margin-left:10px;" id="overlay" name="layoutMode" value="overlay" v-model="d_layoutMode" @change="changeLayout($event, 'overlay')" />
					<label for="overlay">抽屉</label>
				</div>
			</div>

			<n-divider title-placement="left">
				<b>主题</b>
			</n-divider>
			<div class="grid free-themes">
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'saga-blue', false)">
						<img class="block" src="images/themes/saga-blue.png" alt="Saga Blue" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'saga-green', false)">
						<img class="block" src="images/themes/saga-green.png" alt="Saga Green" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'saga-orange', false)">
						<img class="block" src="images/themes/saga-orange.png" alt="Saga Orange" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'saga-purple', false)">
						<img class="block" src="images/themes/saga-purple.png" alt="Saga Purple" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'vela-blue', true)">
						<img class="block" src="images/themes/vela-blue.png" alt="Vela Blue" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'vela-green', true)">
						<img class="block" src="images/themes/vela-green.png" alt="Vela Green" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'vela-orange', true)">
						<img class="block" src="images/themes/vela-orange.png" alt="Vela Orange" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'vela-purple', true)">
						<img class="block" src="images/themes/vela-purple.png" alt="Vela Purple" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'arya-blue', true)">
						<img class="block" src="images/themes/arya-blue.png" alt="Arya Blue" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'arya-green', true)">
						<img class="block" src="images/themes/arya-green.png" alt="Arya Green" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'arya-orange', true)">
						<img class="block" src="images/themes/arya-orange.png" alt="Arya Orange" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'arya-purple', true)">
						<img class="block" src="images/themes/arya-purple.png" alt="Arya Purple" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import EventBus from './AppEventBus';
import { NInput,NButton,useMessage } from 'naive-ui';

	export default {
		components:{
			NInput,NButton
		},
		props: {
			layoutMode: {
				type: String,
				default: null
			}
		},
		data() {
			let refreshTime=5
			//const message = useMessage();
			
			return {
				active: false,
				d_layoutMode: this.layoutMode,
				scale: 14,
				scales: [12,13,14,15,16],
				refreshTime,
				//message
			}
		},
		outsideClickListener: null,
		themeChangeListener: null,
		watch: {
			$route() {
				if (this.active) {
					this.active = false;
					this.unbindOutsideClickListener();
				}
			},
			layoutMode(newValue) {
				this.d_layoutMode = newValue;
			}
		},
		beforeUnmount() {
			EventBus.off('theme-change', this.themeChangeListener);
		},
		mounted() {
			this.themeChangeListener = () => {
				this.applyScale();
			};

			EventBus.on('theme-change', this.themeChangeListener);
		},
		methods: {
			moreSetting(){
				this.$router.push("/setting")
			},
			applyRefreshTineSet(){
				const message = useMessage();
				//message.warning("成功将刷新时间设置为：",{})
				message.success("123456")
			},
			toggleConfigurator(event) {
				this.active = !this.active;
				event.preventDefault();

				if (this.active)
					this.bindOutsideClickListener();
				else
					this.unbindOutsideClickListener();
			},
			hideConfigurator(event) {
				this.active = false;
				this.unbindOutsideClickListener();
				event.preventDefault();
			},
			changeInputStyle(value) {
				this.$primevue.config.inputStyle = value;
			},
			changeRipple(value) {
				this.$primevue.config.ripple = value;
			},
			changeLayout(event, layoutMode) {
				this.$emit('layout-change', layoutMode);
				event.preventDefault();
			},
			bindOutsideClickListener() {
				if (!this.outsideClickListener) {
					this.outsideClickListener = (event) => {
						if (this.active && this.isOutsideClicked(event)) {
							this.active = false;
						}
					};
					document.addEventListener('click', this.outsideClickListener);
				}
			},
			unbindOutsideClickListener() {
				if (this.outsideClickListener) {
					document.removeEventListener('click', this.outsideClickListener);
					this.outsideClickListener = null;
				}
			},
			isOutsideClicked(event) {
				return !(this.$el.isSameNode(event.target) || this.$el.contains(event.target));
			},
			decrementScale() {
				this.scale--;
				this.applyScale();
			},
			incrementScale() {
				this.scale++;
				this.applyScale();
			},
			applyScale() {
				document.documentElement.style.fontSize = this.scale + 'px';
			},
			changeTheme(event, theme, dark) {
				EventBus.emit('theme-change', { theme: theme, dark: dark });
				event.preventDefault();
			}
		},
		computed: {
			containerClass() {
				return ['layout-config', {'layout-config-active': this.active}];
			},
			rippleActive() {
				return this.$primevue.config.ripple;
			},
			inputStyle() {
				return this.$appState.inputStyle;
			}
		}
	}
</script>
