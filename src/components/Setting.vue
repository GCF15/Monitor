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

				<div style="margin-left:40px;">
					<n-form        
								label-placement="left"     
								label-width="auto" 
								require-mark-placement="right-hanging"
								:size="size"  
								:style="{       maxWidth: '640px'     }"    
							> 
						<n-form-item label="报警间隔时间" >
							<n-input-number v-model:value="timeRefresh" :show-button="true" clearable round style="width:150px;">
								<template #suffix>s</template>
							</n-input-number>
							<n-button style="margin-left:20px;" round secondary type="success" size="small" @click="setAlertTime()">应用</n-button>
						</n-form-item>  
            
            <n-form-item label="数据刷新时间" >
							<n-input-number v-model:value="timeRefresh" :show-button="true" clearable round style="width:150px;">
								<template #suffix>s</template>
							</n-input-number>
							<n-button style="margin-left:20px;" round secondary type="success" size="small" @click="setRefreshTime()">应用</n-button>
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
						<n-switch v-model:value="wechat" @click="wechatSwitchClick()" size="small" disabled>
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
							<div>
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
								<n-modal :show="AddWechatItem">
									<n-card
									style="width:600px"
									:bordered="false"
									size="huge"
									role="dialog"
									aria-modal="true"
									>
									<h5  style="margin-top:-10px;">添加微信群</h5>
									<hr/>
									<p></p>
									<n-form        
										label-placement="left"     
										label-width="auto" 
										require-mark-placement="right-hanging"
										:size="size"  
										:style="{       maxWidth: '640px'     }"    
									> 
										<n-form-item label="群名称" style="margin-top:20px;">
											<n-input placeholder="群名称"></n-input>
										</n-form-item>
										<n-form-item label="机器人">
											<n-input placeholder="webhookUrl" v-model:value=newWechatModel.WebhookUrl></n-input>
										</n-form-item>
									</n-form>
									<!-- <n-input placeholder="输入群机器人webhookUrl" v-model:value=newWechatModel.WebhookUrl></n-input> -->
									<p></p>
									<n-space>
										<n-button round @click="addWechatItem()">发送</n-button>
										<n-button round @click="AddWechatItem=false">取消</n-button>
									</n-space>
									</n-card>
								</n-modal>
								<n-modal :show="EditWechatItem">
									<n-card
									style="width:600px"
									:bordered="false"
									size="huge"
									role="dialog"
									aria-modal="true"
									>
									<h5  style="margin-top:-10px;">编辑微信群</h5>
									<hr/>
									<p></p>
									<n-form        
										label-placement="left"     
										label-width="auto" 
										require-mark-placement="right-hanging"
										:size="size"  
										:style="{       maxWidth: '640px'     }"    
									> 
										<n-form-item label="群名称" style="margin-top:20px;">
											<n-input placeholder="群名称"></n-input>
										</n-form-item>
										<n-form-item label="机器人">
											<n-input placeholder="webhookUrl" v-model:value=editWechatModel.webhookUrl></n-input>
										</n-form-item>
									</n-form>
									<!-- <n-input placeholder="输入群机器人webhookUrl" v-model:value=newWechatModel.WebhookUrl></n-input> -->
									<p></p>
									<n-space>
										<n-button round @click="editWeConTextItem()">发送</n-button>
										<n-button round @click="EditWechatItem=false">取消</n-button>
									</n-space>
									</n-card>
								</n-modal>
								<n-form        
									label-placement="left"     
									label-width="auto" 
									require-mark-placement="right-hanging"
									:size="size"  
									:style="{       maxWidth: '640px'     }"   
									v-if="editwechat"
								>   
								<div v-for="item in allWeComText" :key="item">
									<n-form-item label="Webhook URL:" >
										<n-tag :bordered="false" round>{{item.webhookUrl}}</n-tag><br/>
										<n-button style="margin-left:15px;" round type="success" secondary size="small" @click="editItem(item)">编辑</n-button> 
										<n-button style="margin-left:15px;" round type="success" secondary size="small" @click="deleteItem(item)">删除</n-button> 	
									</n-form-item> 
								</div>
								<!-- <n-form-item label="特别提醒:">  
									<div v-for="item in model.user" :key="item.id" v-bind="item" style="margin-right:5px;">
										<n-tag round :bordered="false">
										{{item.element}}
										<template #avatar>
											<n-avatar
											src="images/user.png"
											/>
										</template>
										</n-tag>
									</div>
									
								</n-form-item>  
								<n-form-item label="消息类型:" >     
									<n-tag :bordered="false" round>{{model.messagetype}}</n-tag>
								</n-form-item>  -->
								<div style="display: flex; justify-content: ">   
									<n-space>
										<!-- <n-button round type="success" secondary size="small" @click="editWechat()">编辑</n-button>
                    <n-button round type="success" secondary size="small" @click="ModalShow=true">发送消息测试</n-button>   -->
					<n-button round type="success" secondary size="small" @click="AddWechatItem=true">添加</n-button> 	
										<n-spin size="small" v-if="showmodel.testingWechat_spin" stroke="#21a35c">
											<n-button round :bordered="false">消息发送中...</n-button>
										</n-spin>
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
								<n-form-item label="Webhook URL:" >
									<n-input placeholder="Input" v-model:value="model.curl"></n-input>
								</n-form-item> 
								<n-form-item label="特别提醒:">  
								<n-select      
									v-model:value="alluser"
									placeholder="Select"      
									:options="generalOptions"      
									multiple 
									round  
									clearable
								/>   
								</n-form-item>  
								<n-form-item label="消息类型:" >     
									<n-radio-group  name="radiogroup2" v-model:value="messagetype">    
									<n-radio value="text">    
									文本类型  
									</n-radio>     
									<n-radio value="markdown">      
									markdown类型      
									</n-radio>    
									<n-radio value="picture">     
									图片类型    
									</n-radio>     
									</n-radio-group>   
								</n-form-item>   
								<n-form-item label="报警提示信息:" >     
									<n-input type="textarea" placeholder="Warning!"/>
								</n-form-item>  
								<div style="display: flex; justify-content: ">     
									<n-space>
										<n-button round size="small" @click="saveChange()" secondary type="success">保存</n-button>  
										<n-button round size="small" type="success" secondary @click="ModalShow=true">发送消息测试</n-button>  	
										<n-spin size="small" v-if="showmodel.testingWechat_spin" stroke="#21a35c">
											<n-button round :bordered="false">消息发送中...</n-button>
										</n-spin>
									</n-space>
								</div> 
								</n-form>
							</div>
						</n-collapse-item>
						<!--邮件-->
						<n-collapse-item title="邮件" v-if="mail" name="mail">
              <div>
                <n-modal :show="MailModalShow">
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
										<n-button round @click="TestMailChange()">发送</n-button>
										<n-button round @click="MailModalShow=false">取消</n-button>
									</n-space>
									</n-card>
								</n-modal>
								<n-form        
									label-placement="left"     
									label-width="auto" 
									require-mark-placement="right-hanging"
									:size="size"  
									:style="{       maxWidth: '640px'     }"   
									v-if="!editmail"
								>     
								<n-form-item label="邮箱账号:" >
									<n-tag :bordered="false" round>{{emailmodel.email}}</n-tag>
								</n-form-item>  
								<div style="display: flex; justify-content: ">     
									<n-space>
										<n-button round type="primary" dashed size="small" @click="editMail()">编辑</n-button> 	
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
								<n-form-item label="邮箱账号:" >
									<!--<n-input round stroke="blue" placeholder="Input" v-model:value="emailmodel.email"></n-input>	-->
                  <n-auto-complete
                    v-model:value="emailmodel.email"
                    :input-props="{
                      autocomplete: 'disabled'
                    }"
                    :options="emailOptions"
                    placeholder="邮箱"
                  />
								</n-form-item>  
	
								<div style="display: flex; justify-content: ">     
									<n-space>
										<n-button round type="primary" dashed size="small" @click="saveChange_mail()">保存</n-button>  
										<n-button round type="primary" dashed size="small" @click="MailModalShow=true">发送邮件测试</n-button>  	
										<n-spin size="small" v-if="showmodel.testingmail_spin" stroke="#21a35c">
											<n-button round size="small" :bordered="false">邮件测试信息发送中...</n-button>
										</n-spin>
									</n-space>
									
								</div> 
								</n-form>
							</div>
						</n-collapse-item>
						<!--电话-->
						<n-collapse-item title="电话" v-if="phone" name="phone">
							<div>
                <n-modal :show="PhoneModalShow">
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
										<n-button round @click="TestSmsChange('phone')">发送</n-button>
										<n-button round @click="PhoneModalShow=false">取消</n-button>
									</n-space>
									</n-card>
								</n-modal>
								<n-form        
									label-placement="left"     
									label-width="auto" 
									require-mark-placement="right-hanging"
									:size="size"  
									:style="{       maxWidth: '640px'     }"   
									v-if="!editphone"
								>     
								<n-form-item label="电话号码:" >
									<n-tag :bordered="false" round>{{phonemodel.phone}}</n-tag>
								</n-form-item>  
                <div v-if="showPhoneAdvanceOption">
								<n-form-item label="templateId:" >
									<n-tag :bordered="false" round>{{phonemodel.templateid}}</n-tag>
								</n-form-item> 
								<n-form-item label="APPCODE:" >
									<n-tag :bordered="false" round>{{phonemodel.appcode}}</n-tag>
								</n-form-item> 
                </div> 
								<div style="display: flex; justify-content: ">     
									<n-space>
										<n-button round secondary type="info" size="small"  @click="editPhone()">编辑</n-button> 	
                    <n-button round secondary type="info" size="small" @click="showPhoneAdvanceOption=true" v-if="!showPhoneAdvanceOption">高级选项</n-button>	
                    <n-button round secondary type="info" size="small" @click="showPhoneAdvanceOption=false" v-else>隐藏高级选项</n-button>	
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
                <div v-if="showPhoneAdvanceOption">
								<n-form-item label="templateId:" >
									<n-input round placeholder="TP2109015" v-model:value="phonemodel.templateid"></n-input>	
								</n-form-item>
								<n-form-item label="APPCODE:" >
									<n-input round placeholder="cc2b702e050c417db4f8a36d35ebfd38" v-model:value="phonemodel.appcode"></n-input>	
								</n-form-item>
                </div>
	
								<div style="display: flex; justify-content: ">     
									<n-space>
										<n-button round secondary type="info" size="small" @click="saveChange_phone()">保存</n-button>  
										<n-button round secondary type="info" size="small" @click="PhoneModalShow=true">拨通电话测试</n-button>  	
										<n-spin size="small" v-if="showmodel.testingphone_spin" stroke="#21a35c">
											<n-button round :bordered="false" size="small" >电话拨通中...</n-button>
										</n-spin>
									</n-space>
									
								</div> 
								</n-form>
							</div>
						</n-collapse-item>
						<!--短信-->
						<n-collapse-item title="短信" v-if="sms" name="sms">
							<div>
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
										<n-button round size="small" @click="TestSmsChange('sms')">发送</n-button>
										<n-button round size="small" @click="SmsModalShow=false">取消</n-button>
									</n-space>
									</n-card>
								</n-modal>
								<n-form        
									label-placement="left"     
									label-width="auto" 
									require-mark-placement="right-hanging"
									:size="size"  
									:style="{       maxWidth: '640px'     }"   
									v-if="!editsms"
								>     
								<n-form-item label="电话号码:" >
									<n-tag :bordered="false" round>{{smsmodel.phone}}</n-tag>
								</n-form-item> 
                <div v-if="showSmsAdvanceOption">
								<n-form-item label="templateId:" >
									<n-tag :bordered="false" round>{{smsmodel.templateid}}</n-tag>
								</n-form-item> 
								<n-form-item label="APPCODE:" >
									<n-tag :bordered="false" round>{{smsmodel.appcode}}</n-tag>
								</n-form-item> 	
                </div>
								
								<div style="display: flex; justify-content: ">   
									<n-space>
										<n-button round secondary type="warning" size="small" @click="editSms()">编辑</n-button>	
                    <n-button round secondary type="warning" size="small" @click="showSmsAdvanceOption=true" v-if="!showSmsAdvanceOption">高级选项</n-button>	
                    <n-button round secondary type="warning" size="small" @click="showSmsAdvanceOption=false" v-else>隐藏高级选项</n-button>	
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
                <div v-if="showSmsAdvanceOption">
								<n-form-item label="templateId:" >
									<n-input round status="warning" placeholder="Input" v-model:value="smsmodel.templateid"></n-input>	
								</n-form-item>
								<n-form-item label="APPCODE:" >
									<n-input round status="warning" placeholder="Input" v-model:value="smsmodel.appcode"></n-input>	
								</n-form-item>
                </div>
	
								<div style="display: flex; justify-content: ">     
									<n-space>
										<n-button round secondary type="warning" size="small" @click="saveChange_sms()">保存</n-button>  
										<n-button round secondary type="warning" size="small" @click="SmsModalShow=true">发送短信测试</n-button>  	
										<n-spin size="small" v-if="showmodel.testingsms_spin" stroke="#f5d1ab">
											<n-button round size="small" :bordered="false">短信发送中...</n-button>
										</n-spin>
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
import {reactive, ref, getCurrentInstance, computed } from 'vue'
import { AddCircleOutline } from '@vicons/ionicons5'
import { AttachEmailOutlined, PhoneInTalkRound,WechatFilled,SmsOutlined} from '@vicons/material'
import axios from 'axios'
import { useMessage } from 'naive-ui'
import SettingService from '../service/SettingService.js'

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
	data(){
    
		return{
			timeRefresh:ref(5),
      settingService:new SettingService(),

			wechat:ref(true),
			mail:ref(false),
			phone:ref(true),
			sms:ref(true),
      
      showSmsAdvanceOption:ref(false),
      showPhoneAdvanceOption:ref(false),

			ModalShow:ref(false),
			SmsModalShow:ref(false),
			PhoneModalShow:ref(false),
			MailModalShow:ref(false),

			AddWechatItem:ref(false),
			EditWechatItem:ref(false),

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

			messagetype:ref("text"),
			
			model:reactive({
				curl:"",
				messagetype:"",
				user: []	
			}),

			allWeComText:[],

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
			newWechatModel:ref({
				WebhookUrl: '',
				Content: 'Boon!'
			}),

			editWechatModel:{
				id:0,
				WebhookUrl: '',
				Content: ''
			},
			// xx={
			// 	WebhookUrl: 'string;',
			// 	Content: 'string;'
			// },

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
      
      emailmodel:ref({
				email:""
      }),
			
			generalOptions:[],
			
			alluser :[],

			AddCircleOutline,AttachEmailOutlined,PhoneInTalkRound,
			WechatFilled,SmsOutlined,

			global_api:getCurrentInstance()?.appContext.config.globalProperties.$global_api,
      
		}
	},
	mounted(){
		this.init();
		this.initSettingValue()
	},
	
	methods:{
		editWechat(){	this.editwechat = true	},
		editSms(){	this.editsms = true;	},
		editPhone(){	this.editphone = true;	},
    editMail(){	this.editmail = true;	},

		setRefreshTime(){
			this.$refresh_time=this.timeRefresh;

			//var v =getCurrentInstance()?.appContext.config.globalProperties.$refresh_time;
			//console.log(this.$refresh_time)
      window.$message.success('刷新时间成功设置为 '+this.timeRefresh+' s', { duration: 5e3 })
		},
    
    setAlertTime(){
			this.settingService.setTimeRefresh(this.timeRefresh).then(res=>{
					if(res.data==='Started'){
						window.$message.success("成功将报警间隔时间设置为： "+this.timeRefresh+"s")
          }
          else{
						window.$message.error("设置失败")
          }
        })
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
			}
		},
		saveChange_mail(){
			if(this.checkValidity()){
				this.editmail = false
			}
		},
		addWechatItem(){
			//console.log(this.newWechatModel)
			this.AddWechatItem=false
			try{
				this.settingService.addWeComText(this.newWechatModel.WebhookUrl,this.newWechatModel.Content).then(res=>{
					if(res.status===200){
						window.$message.success('添加成功！', { duration: 5e3 })
						this.initSettingValue()
					}else{
						window.$message.error('添加失败！', { duration: 5e3 })
					}
				})
			}catch(err){
				console.log(err)
				window.$message.error('添加失败！', { duration: 5e3 })
			}
		},

		editItem(item){
			this.editWechatModel=item
			this.EditWechatItem=true
			console.log(this.editWechatModel)
		},

		deleteItem(item){
			this.settingService.deleteWeConText(item.id).then(res=>{
				if(res.status===200){
					window.$message.success('删除成功！', { duration: 5e3 })
					this.initSettingValue()
				}else{
					window.$message.error('删除失败！', { duration: 5e3 })
				}
			})
		},

		editWeConTextItem(){
			//this.editWechatModel=item
			this.EditWechatItem=false
			console.log(this.editWechatModel)

			this.settingService.updateWeComText(this.editWechatModel).then(res=>{
				if(res.status===200){
					window.$message.success('编辑成功！', { duration: 5e3 })
				}else{
					window.$message.error('编辑失败！', { duration: 5e3 })
				}
			})
		},

		TestWechatChange(){
			this.ModalShow=false
			this.showmodel.testingWechat_spin=true

			this.model.user=this.alluser

			this.wechatModel.curl=this.model.curl
			this.wechatModel.content.msgtype=this.model.messagetype
			this.wechatModel.content.text.mentioned_list = this.model.user
      this.wechatModel.content.text.mentioned_list.forEach(function(item, index, array){
        if(item==="all"){
					array[index]="@"+item
        }
      })

			var sendMessageTestUrl = this.global_api + "/WeComText?url="+this.wechatModel.curl+"&content="+JSON.stringify(this.wechatModel.content)
			
			console.log(sendMessageTestUrl)
			var config = {
				method: 'post',
				url: sendMessageTestUrl
			};

			axios(config)
			.then((res)=>{
				console.log(JSON.stringify(res.data));
				this.showmodel.testingWechat_spin=false
				if(res.data.errcode==0){
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
      
      this.showmodel.testingWechat_spin=false
		},

		TestSmsChange(type){
			
			this.showmodel.testingsms_spin=true

			var model
			var msg
			var phonemsg={
				success:'拨通电话成功，请注意查收！',
				fail:'拨通电话失败，请检查接口是否正常！',
			}
			var smsmsg={
				success:'短信发送成功，请注意查看短信验证！',
				fail:'短信发送失败，请检查接口是否正常！'
			}
			if(type==="phone"){
				this.PhoneModalShow=false
				model = this.phonemodel
				msg = phonemsg
			}else{
				this.SmsModalShow=false
				model = this.smsmodel
				msg = smsmsg
			}
			var sendMessageTestUrl =  this.global_api + "/phoneormessage?url="
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
					window.$message.success(msg.success, { duration: 5e3 })
				}
				else{
					window.$message.warning(msg.fail, { duration: 5e3 })
				}
			})
			.catch((err)=>{
				this.showmodel.testingsms_spin=false
				console.log(err)
				window.$message.error(err.message, { duration: 5e3 })
			});
		},
    
    TestMailChange(){
			this.MailModalShow=false
      window.$message.info("Todo", { duration: 5e3 })
    },
    
    smsSwitchClick(){
		if(this.sms){
			this.settingService.updateAlarmRule('sms',true).then(res=>{
				if(res.status===200){
					window.$message.success("已开启短信通知！")
				}else{
					window.$message.error("开启短信通知失败！")
					this.phone=false
				}
			})
		}else{
			this.settingService.updateAlarmRule('sms',false).then(res=>{
				if(res.status===200){
					window.$message.success("已关闭短信通知！")
				}else{
					window.$message.error("关闭短信通知失败！")
					this.phone=true
				}
			})
		}
    },
    
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
		// if(this.mail){

		// 	window.$message.success("已开启邮件通知！")
		// }else{
		// 			window.$message.info("已关闭邮件通知！")
		// }
		window.$message.info("Todo")
		this.mail=this.mail?false:true
    },
    
    wechatSwitchClick(){
			window.$message.info("企业微信为必选报警方式，不允许关闭！")
    },

		//校验合法性
		checkValidity(){
			return true
		},
		initSettingValue(){
			this.settingService.getAllWeComText().then(res=>{
				this.allWeComText=res.data
				console.log(this.allWeComText)
			})
		},
		init(){
			const settingservice=new SettingService();
			this.model=settingservice.getWechatSetting()
			switch(this.messagetype){
				case "text":
					this.model.messagetype = "text"
					break;
				case "markdown":
					this.model.messagetype = "markdown"
					break;
				case "picture":
					this.model.messagetype = "picture"
					break;
				default:
					this.model.messagetype = "text"
					break;
			}

			this.smsmodel=settingservice.getSmsSetting()
			this.phonemodel=settingservice.getPhoneSetting()
      this.emailmodel=settingservice.getMailSetting()
			
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