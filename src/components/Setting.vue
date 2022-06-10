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
							间隔刷新时间
						</n-text>
					</n-h3>
				</n-divider>

				<div style="margin-left:40px;">
					<n-form        
								label-placement="left"     
								label-width="auto" 
								require-mark-placement="right-hanging"
								:size="size"  
								:style="{       maxWidth: '640px'     }"   
							> 
						<n-form-item label="请输入" >
							<n-input-number v-model:value="timeRefresh" :show-button="true" clearable round style="width:200px;">
								<template #suffix>s</template>
							</n-input-number>
							<n-button style="margin-left:20px;" round secondary type="success" @click="setRefreshTime()">应用</n-button>
						</n-form-item>  
	
								
					</n-form>
					
				</div>
				
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
						<n-switch v-model:value="wechat" size="small" @click="checkallIsCheck()" disabled>
							<template #checked>企业微信</template>
							<template #unchecked>企业微信</template>
						</n-switch>
						<n-icon style="margin-left:20px;" size="28" :component="AttachEmailOutlined"></n-icon>
						<n-switch v-model:value="mail"  size="small">
							<template #checked>邮件</template>
							<template #unchecked>邮件</template>
						</n-switch>
						<n-icon style="margin-left:20px;" size="28" :component="PhoneInTalkRound"></n-icon>
						<n-switch v-model:value="phone"  size="small">
							<template #checked>电话</template>
							<template #unchecked>电话</template>
						</n-switch>
						<n-icon style="margin-left:20px;" size="28" :component="SmsOutlined"></n-icon>
						<n-switch v-model:value="sms"  size="small">
							<template #checked>短信</template>
							<template #unchecked>短信</template>
						</n-switch>	 
					</n-space>
					
					<p></p>
					<n-collapse :default-expanded-names="['wechat','mail','phone','sms']">	
						<!--企业微信-->
						<n-collapse-item title="企业微信" v-if="wechat" name="wechat">
							<div>
								<n-form        
									label-placement="left"     
									label-width="auto" 
									require-mark-placement="right-hanging"
									:size="size"  
									:style="{       maxWidth: '640px'     }"   
									v-if="!editwechat"
								>     
								<n-form-item label="Webhook URL:" >
									<n-tag type="success" :bordered="false" round>{{model.curl}}</n-tag>
								</n-form-item> 
								<n-form-item label="特别提醒:">  
									<div v-for="item in model.user" :key="item.id" v-bind="item" style="margin-right:5px;">
										<!-- <n-avatar 
										:style="{color:'yellow',backgroundColor:'',}" 
										round 
										v-tooltip.bottom="item.name"
										>{{item.element}}</n-avatar>	 -->
										<n-tag round :bordered="false" type="success">
										{{item.element}}
										<template #avatar>
											<n-avatar
											src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
											/>
										</template>
										</n-tag>
									</div>
									
								</n-form-item>  
								<n-form-item label="消息类型:" >     
									<n-tag type="success" :bordered="false" round>{{model.messagetype}}</n-tag>
								</n-form-item> 
								<div style="display: flex; justify-content: ">   
									<n-space>
										<n-button round type="success" secondary @click="editWechat()">编辑</n-button>
									</n-space>  
								</div> 
								</n-form>
								
								<n-form        
									label-placement="left"     
									label-width="auto" 
									require-mark-placement="right-hanging"
									:size="size"  
									:style="{maxWidth: '640px'}"
									v-else
								>     
								<n-form-item label="Webhook URL" >
									<n-input placeholder="Input" round v-model:value="model.curl"></n-input>	
								</n-form-item> 
								<n-form-item label="特别提醒">  
								<n-select      
									v-model:value="alluser"
									placeholder="Select"      
									:options="generalOptions"      
									multiple 
									round    
								/>   
								</n-form-item>  
								<n-form-item label="消息类型" >     
									<n-radio-group  name="radiogroup2" v-model:value="messagetype">    
									<n-radio value="1">    
									文本类型  
									</n-radio>     
									<n-radio value="2">      
									markdown类型      
									</n-radio>    
									<n-radio value="3">     
									图片类型    
									</n-radio>     
									</n-radio-group>   
								</n-form-item>   
								<div style="display: flex; justify-content: ">     
									<n-space>
										<n-button round @click="saveChange()" secondary type="success">保存</n-button>  
										<n-button round type="success" secondary @click="ModalShow=true">发送消息测试</n-button>  	
										<n-spin size="small" v-if="showmodel.testingWechat_spin" stroke="#21a35c">
											<n-button round :bordered="false">消息发送中...</n-button>
										</n-spin>
									</n-space>
								</div> 
								</n-form>
								<n-modal :show="ModalShow">
									<n-card
									style="width:600px"
									:bordered="false"
									size="huge"
									role="dialog"
									aria-modal="true"
									>
									<n-input type="textarea" placeholder="输入要发送消息，点击“发送”按钮进行测试！" v-model:value=wechatModel.content.text.content></n-input>
									<p></p>
									<n-space>
										<n-button round @click="TestWechatChange()">发送</n-button>
										<n-button round @click="ModalShow=false">取消</n-button>
									</n-space>
									</n-card>
								</n-modal>
							</div>
						</n-collapse-item>
						<!--邮件-->
						<n-collapse-item title="邮件" v-if="mail" name="mail">
						Todo
						</n-collapse-item>
						<!--电话-->
						<n-collapse-item title="电话" v-if="phone" name="phone">
							<div>
								<n-form        
									label-placement="left"     
									label-width="auto" 
									require-mark-placement="right-hanging"
									:size="size"  
									:style="{       maxWidth: '640px'     }"   
									v-if="!editphone"
								>     
								<n-form-item label="电话号码:" >
									<!-- <n-tag type="info" v-for="item in phonemodel.phones" :key="item.message" :v-bind="item">{{item}}</n-tag> -->
									<n-tag type="info" :bordered="false" round>{{phonemodel.phone}}</n-tag>
								</n-form-item>  
								<n-form-item label="templateId:" >
									<n-tag type="info" :bordered="false" round>{{phonemodel.templateid}}</n-tag>
								</n-form-item> 
								<n-form-item label="APPCODE:" >
									<n-tag type="info" :bordered="false" round>{{phonemodel.appcode}}</n-tag>
								</n-form-item> 
								<div style="display: flex; justify-content: ">     
									<n-space>
										<n-button round secondary type="info"  @click="editPhone()">编辑</n-button> 	
									</n-space>
									</div> 
								</n-form>
								
								<n-form        
									label-placement="left"     
									label-width="auto" 
									require-mark-placement="right-hanging"
									:size="size"  
									:style="{       maxWidth: '640px'     }"   
									v-else
								>     
								<n-form-item label="电话号码:" >
									<n-input round stroke="blue" placeholder="Input" v-model:value="phonemodel.phone"></n-input>	
								</n-form-item>  
								<n-form-item label="templateId:" >
									<n-input round placeholder="TP2109015" v-model:value="phonemodel.templateid"></n-input>	
								</n-form-item>
								<n-form-item label="APPCODE:" >
									<n-input round placeholder="cc2b702e050c417db4f8a36d35ebfd38" v-model:value="phonemodel.appcode"></n-input>	
								</n-form-item>
	
								<div style="display: flex; justify-content: ">     
									<n-space>
										<n-button round secondary type="info" @click="saveChange_phone()">保存</n-button>  
										<n-button round secondary type="info" @click="SmsModalShow=true">拨通电话测试</n-button>  	
										<n-spin size="small" v-if="showmodel.testingphone_spin" stroke="#21a35c">
											<n-button round :bordered="false">电话拨通中...</n-button>
										</n-spin>
										<n-modal :show="SmsModalShow">
											<n-card
											style="width:600px"
											:bordered="false"
											size="huge"
											role="dialog"
											aria-modal="true"
											>
											<n-input type="textarea" placeholder="输入要发送消息，点击“发送”按钮进行测试！"></n-input>
											<p></p>
											<n-space>
												<n-button round @click="TestSmsChange()">发送</n-button>
												<n-button round @click="SmsModalShow=false">取消</n-button>
											</n-space>
											</n-card>
										</n-modal>
									</n-space>
									
								</div> 
								</n-form>
							</div>
						</n-collapse-item>
						<!--短信-->
						<n-collapse-item title="短信" v-if="sms" name="sms">
							<div>
								<n-form        
									label-placement="left"     
									label-width="auto" 
									require-mark-placement="right-hanging"
									:size="size"  
									:style="{       maxWidth: '640px'     }"   
									v-if="!editsms"
								>     
								<n-form-item label="电话号码:" >
									<n-tag type="warning" :bordered="false" round>{{smsmodel.phone}}</n-tag>
								</n-form-item>  
								<n-form-item label="templateId:" >
									<n-tag type="warning" :bordered="false" round>{{smsmodel.templateid}}</n-tag>
								</n-form-item> 
								<n-form-item label="APPCODE:" >
									<n-tag type="warning" :bordered="false" round>{{smsmodel.appcode}}</n-tag>
								</n-form-item> 
								<div style="display: flex; justify-content: ">   
									<n-space>
										<n-button round secondary type="warning" @click="editSms()">编辑</n-button>	
									</n-space>  
									</div> 
								</n-form>
								
								<n-form        
									label-placement="left"     
									label-width="auto" 
									require-mark-placement="right-hanging"
									:size="size"  
									:style="{       maxWidth: '640px'     }"   
									v-else
								>     
								<n-form-item label="电话号码:" >
									<n-input round status="warning" placeholder="Input" v-model:value="smsmodel.phone"></n-input>	
								</n-form-item>  
								<n-form-item label="templateId:" >
									<n-input round status="warning" placeholder="Input" v-model:value="smsmodel.templateid"></n-input>	
								</n-form-item>
								<n-form-item label="APPCODE:" >
									<n-input round status="warning" placeholder="Input" v-model:value="smsmodel.appcode"></n-input>	
								</n-form-item>
	
								<div style="display: flex; justify-content: ">     
									<n-space>
										<n-button round secondary type="warning" @click="saveChange_sms()">保存</n-button>  
										<n-button round secondary type="warning" @click="SmsModalShow=true">发送短信测试</n-button>  	
										<n-spin size="small" v-if="showmodel.testingsms_spin" stroke="#f5d1ab">
											<n-button round :bordered="false">短信发送中...</n-button>
										</n-spin>
										<n-modal :show="SmsModalShow">
											<n-card
											style="width:600px"
											:bordered="false"
											size="huge"
											role="dialog"
											aria-modal="true"
											>
											<n-input status="warning" type="textarea" placeholder="输入要发送消息，点击“发送”按钮进行测试！" v-model:value="smsmodel.message"></n-input>
											<p></p>
											<n-space>
												<n-button round @click="TestSmsChange()">发送</n-button>
												<n-button round @click="SmsModalShow=false">取消</n-button>
											</n-space>
											</n-card>
										</n-modal>
									</n-space>
									
								</div> 
								</n-form>
							</div>
						</n-collapse-item>
					</n-collapse>
						
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
import {reactive, ref, getCurrentInstance} from 'vue'
import { AddCircleOutline } from '@vicons/ionicons5'
import { AttachEmailOutlined, PhoneInTalkRound,WechatFilled,SmsOutlined} from '@vicons/material'
import axios from 'axios'
import { useMessage } from 'naive-ui'
import SettingService from '../service/SettingService.js'

export default {
	setup() {
      window.$message = useMessage()
    },
	data(){
		return{
			timeRefresh:ref(5),

			wechat:ref(true),
			mail:ref(false),
			phone:ref(true),
			sms:ref(true),

			ModalShow:ref(false),
			SmsModalShow:ref(false),

			showmodel:reactive({
				testingWechat_spin:ref(false),
				testingsms_spin:ref(false),
				testingphone_spin:ref(false),
			}),
				
			editwechat:ref(true),
			editsms:ref(false),
			editphone:ref(true),

			messagetype:ref("1"),
			
			model:reactive({
				curl:"",
				messagetype:"",
				user: []	
			}),

			wechatModel:reactive({
				curl:"",
				content:{
					msgtype:"",
					text:{
						content:"",
						mentioned_list:[],
						mentioned_mobile_list:null
					}
				}
			}),

			smsmodel:ref({
				url:"",
				phone:"",
				message:"",
				templateid:"",
				appcode:""
			}),

			phonemodel:ref({
				url:"",
				phone:"",
				message:"",
				templateid:"",
				appcode:""
			}),
			
			generalOptions:[],
			
			alluser :[],

			AddCircleOutline,AttachEmailOutlined,PhoneInTalkRound,
			WechatFilled,SmsOutlined,

			global_api:getCurrentInstance()?.appContext.config.globalProperties.$global_api,

			//settingservice:new SettingService()
		}
	},
	mounted(){
		this.init();
	},
	
	methods:{
		editWechat(){	this.editwechat = true	},
		editSms(){	this.editsms = true;	},
		editPhone(){	this.editphone = true;	},

		setRefreshTime(){
			this.$refresh_time=this.timeRefresh;

			//var v =getCurrentInstance()?.appContext.config.globalProperties.$refresh_time;
			console.log(this.$refresh_time)
		},
		
		saveChange(){
			if(this.checkValidity()){
				switch(this.messagetype){
					case "1":
						this.model.messagetype = "text"
						break;
					case "2":
						this.model.messagetype = "markdown"
						break;
					case "3":
						this.model.messagetype = "picture"
						break;
					default:
						break;
				}
				this.editwechat = false
				this.model.user=[]
				this.alluser.forEach(element => {
					this.model.user.push({element})
				});
			}
			
		},
		saveChange_sms(){
			if(this.checkValidity()){
				this.editsms = false
				//console.log(this.model)	
			}
		},
		saveChange_phone(){
			if(this.checkValidity()){
				this.editphone = false
				//console.log(this.model)	
			}
		},

		TestWechatChange(){
			this.ModalShow=false
			this.showmodel.testingWechat_spin=true

			this.model.user=this.alluser

			this.wechatModel.curl=this.model.curl
			this.wechatModel.content.msgtype=this.model.messagetype
			this.wechatModel.content.text.mentioned_list = this.model.user

			var sendMessageTestUrl = this.global_api + "/WeComText?url="+this.wechatModel.curl+"&content="+JSON.stringify(this.wechatModel.content)
			
			console.log(this.global_api)
			var config = {
				method: 'post',
				url: sendMessageTestUrl
			};

			axios(config)
			.then((res)=>{
				console.log(JSON.stringify(res.data));
				this.showmodel.testingWechat_spin=false
				if(res.data.errcode==0){
					//this.notify('success')
					window.$message.success('发送成功，请前往企业微信群查看验证！', { duration: 5e3 })
				}
				else{
					window.$message.warning('发送失败，请检查接口是否保熟！', { duration: 5e3 })
				}
			})
			.catch((err)=>{
				this.showmodel.testingWechat_spin = false
				console.log(err)
				window.$message.error(err.message, { duration: 5e3 })
			});
		},

		TestSmsChange(){
			this.SmsModalShow=false
			this.showmodel.testingsms_spin=true
			var model = this.smsmodel
			var sendMessageTestUrl =  this.global_api + "?url="
				+model.url+"&phone="
				+model.phone
				+"&templateId="+model.templateid
				+"&variable=servername:"+model.message
				+"&appcode="+model.appcode
			var config = {
				method: 'post',
				url: sendMessageTestUrl
			};

			axios(config)
			.then((res)=>{
				console.log(JSON.stringify(res.data));
				this.showmodel.testingsms_spin=false
				if(res.data.return_code=="00000"){
					window.$message.success('发送成功，请注意查看短信验证！', { duration: 5e3 })
				}
				else{
					window.$message.warning('发送失败，请检查接口是否保熟！', { duration: 5e3 })
				}
			})
			.catch((err)=>{
				this.showmodel.testingsms_spin=false
				console.log(err)
				window.$message.error(err.message, { duration: 5e3 })
			});
		},

		sendMessageTest(){
			this.testModelShow=true
		},


		//校验合法性
		checkValidity(){
			return true
		},
		
		init(){
			const settingservice=new SettingService();
			this.model=settingservice.getWechatSetting()
			switch(this.messagetype){
				case "1":
					this.model.messagetype = "text"
					break;
				case "2":
					this.model.messagetype = "markdown"
					break;
				case "3":
					this.model.messagetype = "picture"
					break;
				default:
					this.model.messagetype = "text"
					break;
			}

			this.smsmodel=settingservice.getSmsSetting()
			this.phonemodel=settingservice.getPhoneSetting()
			
			this.model.user.forEach(element => {
				this.alluser.push(element)
			});
			
			this.generalOptions=settingservice.getRemindAllUser().map((v)=>({label:v,value:v}))
		}
	}
}
</script>

<style scoped>
avatatstyle{
	color:'yellow';
	backgroundColor :'red'
}
</style>