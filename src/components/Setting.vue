<template>
	<n-message-provider>
		<content />
	</n-message-provider>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4>设置</h4>
				<n-divider title-placement="left">
					<n-h3 prefix="bar" align-text>
						<n-text type="primary">
							时间设置
						</n-text>
					</n-h3>
				</n-divider>
        
        <!--报警时间设置--> 
        <SettingForTime></SettingForTime>
				
				<n-divider title-placement="left">
					<n-h3 prefix="bar" align-text>
						<n-text type="primary">
							报警方式
						</n-text>
					</n-h3>
				</n-divider>
				
				<div style="margin-left:40px;">
					<n-space>
						<n-icon style="margin-left:10px;" size="28" :component="WechatFilled"></n-icon>	
						<n-switch v-model:value="wechat" @click="wechatSwitchClick()" size="small">
							<template #checked>企业微信</template>
							<template #unchecked>企业微信</template>
						</n-switch>
						<n-icon style="margin-left:20px;" size="28" :component="AttachEmailOutlined"></n-icon>
						<n-switch v-model:value="mail" @click="emailSwitchClick()" size="small">
							<template #checked>邮件</template>
							<template #unchecked>邮件</template>
						</n-switch>
						<n-icon style="margin-left:20px;" size="28" :component="PhoneInTalkRound"></n-icon>
						<n-switch v-model:value="phone" @click="phoneSwitchClick()" size="small">
							<template #checked>电话</template>
							<template #unchecked>电话</template>
						</n-switch>
						<n-icon style="margin-left:20px;" size="28" :component="SmsOutlined"></n-icon>
						<n-switch v-model:value="sms" @click="smsSwitchClick()" size="small">
							<template #checked>短信</template>
							<template #unchecked>短信</template>
						</n-switch>	 
					</n-space>
					
					<p></p>
					<n-collapse :default-expanded-names="['wechat','mail','phone','sms']">	
						<!--企业微信-->
						<n-collapse-item title="企业微信" v-if="wechat" name="wechat">
              <SettingForWecom :allWeComText="allWeComText"></SettingForWecom>
						</n-collapse-item>
						<!--邮件-->
						<n-collapse-item title="邮件" v-if="mail" name="mail">
              <!--<p>mail</p>-->
              <SettingForEmail></SettingForEmail>
						</n-collapse-item>
						<!--电话-->
						<n-collapse-item title="电话" v-if="phone" name="phone">
							<SettingForPhone></SettingForPhone>
						</n-collapse-item>
						<!--短信-->
						<n-collapse-item title="短信" v-if="sms" name="sms">
							<SettingForSms></SettingForSms>
						</n-collapse-item>
					</n-collapse>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {reactive, ref, getCurrentInstance, computed } from 'vue'
import { AddCircleOutline } from '@vicons/ionicons5'
import { AttachEmailOutlined, PhoneInTalkRound,WechatFilled,SmsOutlined} from '@vicons/material'
import { useMessage } from 'naive-ui'
import SettingService from '../service/SettingService.js'

import SettingForTime from './settingdetail/SettingForTime.vue'
import SettingForWecom from './settingdetail/SettingForWecom.vue'
import SettingForPhone from './settingdetail/SettingForPhone.vue'
import SettingForEmail from './settingdetail/SettingForEmail.vue'
import SettingForSms from './settingdetail/SettingForSms.vue'

export default {
	setup() {
      window.$message = useMessage()
      
      const inputValueRef=ref("");
      return{
				emailAutoComplete: inputValueRef,
        emailOptions: computed(() => {
        return ["@dev.appeon.net", "@163.com", "@qq.com"].map((suffix) => {
          const prefix = inputValueRef.value.split("@")[0];
          return {
            label: prefix + suffix,
            value: prefix + suffix
          };
        });
      })
      }
    },
  components:{
		'SettingForTime':SettingForTime,
    'SettingForWecom':SettingForWecom,
    'SettingForPhone':SettingForPhone,
    'SettingForEmail':SettingForEmail,
    'SettingForSms':SettingForSms
  },
	data(){
    
		return{
      settingService:new SettingService(),

      //四种报警方式是否开启
			wechat:ref(true),
			mail:ref(false),
			phone:ref(false),
			sms:ref(false),

			ModalShow:ref(false),
			SmsModalShow:ref(false),
			PhoneModalShow:ref(false),
			MailModalShow:ref(false),

			showmodel:reactive({
				testingWechat_spin:ref(false),
				testingsms_spin:ref(false),
				testingphone_spin:ref(false),
        testingmail_spin:ref(false),
			}),
				
			editwechat:ref(true),
			editsms:ref(false),
			editphone:ref(true),
      editmail:ref(true),

			AddCircleOutline,AttachEmailOutlined,PhoneInTalkRound,
			WechatFilled,SmsOutlined,

			global_api:getCurrentInstance()?.appContext.config.globalProperties.$global_api,
      
		}
	},
	mounted(){
		this.initSettingValue()
	},
	
	methods:{
		
    TestMailChange(){
			this.MailModalShow=false
      window.$message.info("Todo", { duration: 5e3 })
    },
    
    //启动or关闭短信报警方式
    smsSwitchClick(){
		if(this.sms){
			this.settingService.updateAlarmRule('sms',true).then(res=>{
				if(res.status===200){
					window.$message.success("已开启短信通知！")
				}else{
					window.$message.error("开启短信通知失败！")
					this.sms=false
				}
			})
		}else{
      try{
        this.settingService.updateAlarmRule('sms',false).then(res=>{
          if(res.status===200){
            window.$message.success("已关闭短信通知！")
          }else{
            window.$message.error("关闭短信通知失败！")
            this.sms=true
          }
        })	
      }catch(err){
				window.$message.error("接口异常："+err)
        this.sms=!this.sms
      }
			
		}
    },
    
    //启动or关闭电话报警方式
    phoneSwitchClick(){
		if(this.phone){
			this.settingService.updateAlarmRule('phone',true).then(res=>{
				if(res.status===200){
					window.$message.success("已开启电话通知！")
				}else{
					window.$message.error("开启电话通知失败！")
					this.phone=false
				}
			})
		}else{
			this.settingService.updateAlarmRule('phone',false).then(res=>{
				if(res.status===200){
					window.$message.success("已关闭电话通知！")
				}else{
					window.$message.error("关闭电话通知失败！")
					this.phone=true
				}
			})
		}
    },
    
    emailSwitchClick(){
    if(this.mail){
			this.settingService.updateAlarmRule('mail',true).then(res=>{
				if(res.status===200){
					window.$message.success("已开启邮件通知！")
				}else{
					window.$message.error("开启邮件通知失败！")
					this.mail=false
				}
			})
		}else{
			this.settingService.updateAlarmRule('mail',false).then(res=>{
				if(res.status===200){
					window.$message.success("已关闭邮件通知！")
				}else{
					window.$message.error("关闭邮件通知失败！")
					this.mail=true
				}
			})
		}
    },
    
    wechatSwitchClick(){
    if(this.wechat){
			this.settingService.updateAlarmRule('wechat',true).then(res=>{
				if(res.status===200){
					window.$message.success("已开启企业微信通知！")
				}else{
					window.$message.error("开启企业微信通知失败！")
					this.wechat=false
				}
			})
		}else{
			this.settingService.updateAlarmRule('wechat',false).then(res=>{
				if(res.status===200){
					window.$message.success("已关闭企业微信通知！")
				}else{
					window.$message.error("关闭企业微信通知失败！")
					this.wechat=true
				}
			})
		}
    },

		//校验合法性
		checkValidity(){
			return true
		},
    //初始化设置项
		initSettingValue(){
      //初始化获取四种监控方式数据状态
      /*default
        wechat:ref(true)
			  mail:ref(false)
			  phone:ref(false)
			  sms:ref(false)
      */
      this.settingService.getAllAlarmRule().then(res=>{
				if(res.status===200){
					res.data.forEach(item=>{
						switch(item.alarmMethod){
							case 1://WeCom
                this.wechat=item.isEnabled
                break
              case 2://mail
                this.mail=item.isEnabled
                break
              case 3://phone
                this.phone=item.isEnabled
                break
              case 4://sms
                this.sms=item.isEnabled
                break
              default:
                break
            }
          })
        }
      })
		},
	}
}
</script>

<style scoped>
avatatstyle{
	color:'yellow';
	backgroundColor :'red'
}
</style>