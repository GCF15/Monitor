﻿<template>
  <div>
                <n-modal :show="AddPhoneItem">
									<n-card
									style="width:600px"
									:bordered="false"
									size="huge"
									role="dialog"
									aria-modal="true"
									>
									<h5  style="margin-top:-10px;">添加短信发送号码</h5>
									<hr/>
									<p></p>
									<n-form   
                    ref="formRef" 
                    :model="newPhoneModel" 
                    :rules="rules_new"
										label-placement="left"     
										label-width="auto" 
										require-mark-placement="right-hanging"
										:size="size"  
										:style="{       maxWidth: '640px'     }"    
									> 
										<n-form-item label="号码主人" path="name" style="margin-top:20px;">
											<n-input placeholder="马大哈" v-model:value="newPhoneModel.name"></n-input>
										</n-form-item>
										<n-form-item label="号码" path="phone">
											<n-input placeholder="135********" v-model:value="newPhoneModel.phone"></n-input>
										</n-form-item>
									</n-form>
									<p></p>
									<n-space>
										<n-button v-if="!loading_commint" round @click="addPhoneItem()">确定</n-button>
                    <n-spin size="small" v-else stroke="#21a35c">
                      <n-button round>确定</n-button>
                    </n-spin>
                    <n-button v-if="!loading_test" round @click="TestPhoneOrSmsSend(newPhoneModel)">测试</n-button>
                    <n-spin size="small" v-else stroke="#21a35c">
                      <n-button round>测试</n-button>
                    </n-spin>
										<n-button round @click="AddPhoneItem=false">取消</n-button>
									</n-space>
									</n-card>
								</n-modal>
                <n-modal :show="EditPhoneItem">
									<n-card
									style="width:600px"
									:bordered="false"
									size="huge"
									role="dialog"
									aria-modal="true"
									>
									<h5  style="margin-top:-10px;">编辑短信发送号码</h5>
									<hr/>
									<p></p>
									<n-form        
                    ref="formRef" 
                    :model="editPhoneModel" 
                    :rules="rules_edit"
										label-placement="left"     
										label-width="auto" 
										require-mark-placement="right-hanging"
										:size="size"  
										:style="{       maxWidth: '640px'     }"    
									> 
										<n-form-item label="号码主人" style="margin-top:20px;" path="name">
											<n-input placeholder="马大哈" v-model:value="editPhoneModel.name"></n-input>
										</n-form-item>
										<n-form-item label="号码" path="phone">
											<n-input placeholder="135********" v-model:value="editPhoneModel.phone"></n-input>
										</n-form-item>
									</n-form>
									<p></p>
									<n-space>
										<n-button v-if="!loading_commint" round @click="editPhoneItemSend()">确定</n-button>
                    <n-spin size="small" v-else stroke="#21a35c">
                      <n-button round>确定</n-button>
                    </n-spin>
                    
                    <n-button v-if="!loading_test" round @click="TestPhoneOrSmsSend(editPhoneModel)">测试</n-button>
                    <n-spin size="small" v-else stroke="#21a35c">
                      <n-button round>测试</n-button>
                    </n-spin>
                    
										<n-button round @click="EditPhoneItem=false">取消</n-button>
									</n-space>
									</n-card>
								</n-modal>
								<n-form        
									label-placement="left"     
									label-width="auto" 
									require-mark-placement="right-hanging"
									:size="size"  
									:style="{       maxWidth: '640px'     }"   
								>     
                <div v-for="item in allNumbersByPhone" :key="item">
									<n-form-item >
                    <template #label><n-tag round>{{item.name+': '+item.phone}}</n-tag></template>
										<!--<n-tag style="margin-left:30px;" :bordered="false" round>{{item.phone}}</n-tag><br/>-->
										<n-button style="margin-left:30px;" round type="success" secondary size="small" @click="editPhoneItem(item)">编辑</n-button> 
                    <n-popconfirm
                      @positive-click="deletePhoneItem(item)"
                      @negative-click="handleNegativeClick"
                    >
                      <template #trigger>
                        <n-button style="margin-left:10px;" round type="success" secondary size="small">删除</n-button>
                      </template>
                      确定要删除吗？
                    </n-popconfirm>
									</n-form-item> 
								</div>
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
                    <n-button round secondary type="info" size="small" @click="AddPhoneItem=true">添加</n-button>
                    <n-button round secondary type="info" size="small" @click="showPhoneAdvanceOption=true" v-if="!showPhoneAdvanceOption">高级选项</n-button>	
                    <n-button round secondary type="info" size="small" @click="showPhoneAdvanceOption=false" v-else>隐藏高级选项</n-button>	
									</n-space>
									</div> 
								</n-form>
								
								<!--<n-form        
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
								</n-form>-->
							</div>
</template>

<script>
import {ref} from 'vue'
import SettingService from '../../service/SettingService.js'
import {func} from '../js/Rules'

export default {
  mounted(){
		this.getAllNumbersByPhone()
  },
  
  data(){
		//表单验证规则
    const formRef = ref(null);
    const rules_new = ref(null);
    const rules_edit = ref(null);
    
		return{
      formRef,
      rules_new,rules_edit,
      settingService:new SettingService(),
      
			AddPhoneItem:ref(false),
			EditPhoneItem:ref(false),
      showPhoneAdvanceOption:ref(false),
      
      //电话列表
      allNumbersByPhone:[],
      
      //编辑
      editPhoneModel:{},
      
      loading_commint:ref(false),
      loading_test:ref(false),
      
      //新增Phone model
			newPhoneModel:{
        name:"",
        isVoice:false,
        url: "http://yzxtz.market.alicloudapi.com/yzx/notifySms",
        phone: "",
        templateId: "TP21090211",
        variable: "servername:短信测试",
        appcode: "cc2b702e050c417db4f8a36d35ebfd38"
			},
      
      phonemodel:ref({
				url:"",
				phone:"",
				message:"",
				templateid:"",
				appcode:""
			}),
      
    }
  },
  
  methods:{
  
		//添加短信通知号码
    addPhoneItem(){
			this.loading_commint=true
			
				this.settingService.addNumberForPhone(this.newPhoneModel).then(res=>{
					if(res.status===200){
						window.$message.success('添加成功！', { duration: 5e3 })
            this.newPhoneModel.Phone=''
            this.AddPhoneItem=false
            this.loading_commint=false
						this.getAllNumbersByPhone()
					}else{
						window.$message.error('添加失败！', { duration: 5e3 })
					}
				}).catch(err=>{
					this.loading_commint=false
          window.$message.error(err.message, { duration: 5e3 })
        })
			
		},
    
    //拉起Phone编辑
		editPhoneItem(item){
      this.EditPhoneItem=true
			this.editPhoneModel=JSON.parse(JSON.stringify(item))//深拷贝
      //console.log(this.editPhoneModel)
		},
    
    //删除电话报警方式号码
    deletePhoneItem(item){
			this.settingService.deleteNumberForPhone(item.id).then(res=>{
				if(res.status===200){
					window.$message.success('删除成功！', { duration: 5e3 })
					this.getAllNumbersByPhone()
				}else{
					window.$message.error('删除失败！', { duration: 5e3 })
				}
			}).catch(err=>{
				window.$message.error(err.message, { duration: 5e3 })
      })
    },
    
    //编辑Phone item
		editPhoneItemSend(){
      this.loading_commint=true
      //console.log(this.editPhoneModel)
			this.settingService.updateNumberForPhone(this.editPhoneModel).then(res=>{
				if(res.status===200){
					window.$message.success('编辑成功！', { duration: 5e3 })
          this.EditPhoneItem=false
          this.loading_commint=false
          this.getAllNumbersByPhone()
				}else{
					window.$message.error('编辑失败！', { duration: 5e3 })
				}
			}).catch(err=>{
        this.loading_commint=false
				window.$message.error(err.message, { duration: 5e3 })
      })
		},
    
    //测试电话短信验证方式
		TestPhoneOrSmsSend(modelItem){
			this.loading_test=true
			var msg
			var phonemsg={
				success:'拨通电话成功，请注意查收！',
				fail:'拨通电话失败，请检查接口是否正常！',
			}
			var smsmsg={
				success:'短信发送成功，请注意查看短信验证！',
				fail:'短信发送失败，请检查接口是否正常！'
			}
			if(modelItem.isVoice===true){
				msg = phonemsg
			}else{
				msg = smsmsg
			}
      
				this.settingService.testPhoneOrSms(modelItem).then(res=>{
					if(res.status===200 && res.data.return_code==="00000"){
						window.$message.success(msg.success, { duration: 5e3 })
            this.loading_test=false
          }else{
						window.$message.error(msg.fail, { duration: 5e3 })
            this.loading_test=false
          }
        }).catch(err=>{
          this.loading_test=false
          window.$message.error(err.message, { duration: 5e3 })
        })
      
		},
    
    //获取电话列表
    getAllNumbersByPhone(){
			this.settingService.getAllNumbersByPhone().then(res=>{
        var elements=[]
        res.data.forEach(item=>{
					if(!item.isVoice){
						elements.push(item)
          }
        })
        this.allNumbersByPhone=elements
        
        //刷新表单验证规则
        this.rules_new=func.validator_phone(this.allNumbersByPhone,true)
        this.rules_edit=func.validator_phone(this.allNumbersByPhone,false)
      }).catch(err=>{
				window.$message.error(err.message, { duration: 5e3 })
      })
    },
    
  }
}
</script>

<style>

</style>