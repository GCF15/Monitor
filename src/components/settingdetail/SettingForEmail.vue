﻿<template>
  <div>
                
								<n-form        
									label-placement="left"     
									label-width="auto" 
									require-mark-placement="right-hanging"
									:size="size"  
									:style="{       maxWidth: '640px'     }"   
									v-if="!editmail"
								>     
                <div v-for="item in allEmails" :key="item">
                  <n-form-item >
                    <template #label>{{item.recipient}}</template>
                    <n-tag :bordered="false" round>{{item.to}}</n-tag>
                    <n-button style="margin-left:30px;" round type="success" secondary size="small" @click="editEmailItem(item)">编辑</n-button> 
                    <n-popconfirm
                      @positive-click="deleteEmailItem(item)"
                      @negative-click="handleNegativeClick"
                    >
                      <template #trigger>
                        <n-button style="margin-left:10px;" round type="success" secondary size="small">删除</n-button>
                      </template>
                      确定要删除吗？
                    </n-popconfirm>
                  </n-form-item>    
                </div>
								
								<div style="display: flex; justify-content: ">     
									<n-space>
										<n-button round type="success" secondary size="small" @click="addEmailItem()">添加</n-button> 	
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
              
              <!--编辑模态框-->
              <n-modal :show="EditEmailItem">
									<n-card
									style="width:600px"
									:bordered="false"
									size="huge"
									role="dialog"
									aria-modal="true"
									>
									<h5  style="margin-top:-10px;"> 编辑邮箱信息</h5>
									<hr/>
									<p></p>
									<n-form    
                    ref="formRef" 
                    :model="editEmailModel" 
                    :rules="rules_edit"
										label-placement="left"     
										label-width="auto" 
										require-mark-placement="right-hanging"
										:size="size"  
										:style="{       maxWidth: '640px'     }"    
									> 
										<n-form-item label="收件人:" style="margin-top:20px;" path="recipient">
											<n-input placeholder="马大哈" v-model:value="editEmailModel.recipient"></n-input>
										</n-form-item>
										<n-form-item label="邮箱账号:" path="to">
                      <n-auto-complete
                        v-model:value="editEmailModel.to"
                        :input-props="{
                          autocomplete: 'disabled'
                        }"
                        :options="emailOptions"
                        placeholder="邮箱"
                      />
                    </n-form-item>
                    <n-form-item label="主题:" path="subject">
											<n-input v-model:value="editEmailModel.subject"></n-input>
										</n-form-item>
                    <n-form-item label="内容:" path="body">
											<n-input type="textarea" v-model:value="editEmailModel.body"></n-input>
										</n-form-item>
									</n-form>
									<p></p>
									<n-space>
                    <n-button v-if="!loading_commint" round @click="editEmailItemSend(editEmailModel)">确定</n-button>
                    <n-spin size="small" v-else stroke="#21a35c">
                      <n-button round @click="editEmailItemSend(editEmailModel)">确定</n-button>
                    </n-spin>
                    
                    <n-button v-if="!loading_test" round @click="TestEmailSend(editEmailModel)">测试</n-button>
                    <n-spin size="small" v-else stroke="#21a35c">
                      <n-button round @click="TestEmailSend(editEmailModel)">测试</n-button>
                    </n-spin>
                    
										<n-button round @click="cancelEdit()">取消</n-button>
									</n-space>
									</n-card>
								</n-modal>
                
            <!--新建模态框-->
              <n-modal :show="AddEmailItem">
									<n-card
									style="width:600px"
									:bordered="false"
									size="huge"
									role="dialog"
									aria-modal="true"
									>
									<h5  style="margin-top:-10px;">添加邮箱</h5>
									<hr/>
									<p></p>
									<n-form        
                    ref="formRef" 
                    :model="newEmailmodel" 
                    :rules="rules_new"
										label-placement="left"     
										label-width="auto" 
										require-mark-placement="right-hanging"
										:size="size"  
										:style="{       maxWidth: '640px'     }"    
									> 
										<n-form-item label="收件人:" path="recipient" style="margin-top:20px;">
											<n-input placeholder="马大哈" v-model:value="newEmailmodel.recipient"></n-input>
										</n-form-item>
										<n-form-item label="邮箱账号:" path="to">
                      <n-auto-complete
                        v-model:value="newEmailmodel.to"
                        :input-props="{
                          autocomplete: 'disabled'
                        }"
                        :options="emailOptions"
                        placeholder="邮箱"
                      />
                    </n-form-item>
                    <n-form-item label="主题:" path="subject">
											<n-input v-model:value="newEmailmodel.subject"></n-input>
										</n-form-item>
                    <n-form-item label="内容:" path="body">
											<n-input type="textarea" v-model:value="newEmailmodel.body"></n-input>
										</n-form-item>
									</n-form>
									<p></p>
									<n-space>
										<n-button v-if="!loading_commint" round @click="addEmailItemSend()">确定</n-button>
                    <n-spin size="small" v-else stroke="#21a35c">
                      <n-button round>确定</n-button>
                    </n-spin>
                    
                    <n-button v-if="!loading_test" round @click="TestEmailSend(newEmailmodel)">测试</n-button>
                    <n-spin size="small" v-else stroke="#21a35c">
                      <n-button round>测试</n-button>
                    </n-spin>
										<n-button round @click="AddEmailItem=false">取消</n-button>
									</n-space>
									</n-card>
								</n-modal>
</template>

<script>
import {ref,computed} from 'vue'
import SettingService from '../../service/SettingService.js'
import {func} from '../js/Rules'

export default {
    setup() {
      
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
			//表单验证规则
      const formRef = ref(null);
      const rules_new = ref(null);
      const rules_edit = ref(null);
      
      return{
        formRef,
        rules_new,rules_edit,
        settingService:new SettingService(),
        
        //邮箱列表
        allEmails:[],
        AddEmailItem:ref(false),
        EditEmailItem:ref(false),
        
        loading_commint:ref(false),
        loading_test:ref(false),
        
				editmail:ref(false),
        newEmailmodel:{
					name: "Richard Hernandez",
          host: "smtp.mxhichina.com",
          port: 465,
          isUseSsl: true,
          sender: "Appeon Monitor",
          from: "no-reply@aipuyang.com",
          recipient: "Edward Martinez",
          to: "x.ufwcjdd@163.com",
          subject: "Appeon服务监控报警",
          body: "New emial",
          password: "na&uOaZ!"
        },
        
        editEmailModel:{},

      }
    },
    
    mounted(){
			this.getAllEmail()
    },
    
    methods:{
      //取消编辑
      cancelEdit(){
				this.EditEmailItem=false
      },
      
      //获取所有邮箱
      getAllEmail(){
				this.settingService.getAllEmails().then(res=>{
          this.allEmails=res.data
          this.rules_new=func.validator_email(this.allEmails,true)//新建model的表单验证
          this.rules_edit=func.validator_email(this.allEmails,false)//新建model的表单验证
        })
      },
      
      //拉起编辑
			editEmailItem(item){
				this.EditEmailItem=true
        this.editEmailModel=JSON.parse(JSON.stringify(item))//深拷贝
      },
      
      //拉起新增
      addEmailItem(){
				this.AddEmailItem=true
      },
      
      //删除邮箱
      deleteEmailItem(item){
				this.settingService.deleteEmail(item.id).then(res=>{
					if(res.status===200){
						window.$message.success('删除成功！', { duration: 5e3 })
            this.getAllEmail()
          }
          else{
            window.$message.error(res.data.errmsg, { duration: 5e3 })
          }
        })
      },
      
      //发送新增
      addEmailItemSend(){
        this.loading_commint=true
				this.settingService.addEmail(this.newEmailmodel).then(res=>{
					if(res.status===200){
						window.$message.success('添加成功！', { duration: 5e3 })
            this.AddEmailItem=false
            this.getAllEmail()
          }
          else{
            window.$message.error(res.data.errmsg, { duration: 5e3 })
          }
          this.loading_commint=false
        })
      },
      
      //发送测试
      TestEmailSend(model){
        this.loading_test=true
				this.settingService.testEmail(model).then(res=>{
					if(res.status===200){
						window.$message.success('发送成功，请注意查收邮件验证！', { duration: 5e3 })
          }else{
						window.$message.error(res.data.errmsg, { duration: 5e3 })
          }
          this.loading_test=false
        })
      },
      
      //发送编辑
      editEmailItemSend(model){
        this.loading_commint=true
				this.settingService.editEmail(model).then(res=>{
					if(res.status===200){
						window.$message.success('更新成功！', { duration: 5e3 })
            this.EditEmailItem=false
            this.getAllEmail()
          }else{
						window.$message.error(res.data.errmsg, { duration: 5e3 })
          }
          this.loading_commint=false
        })
      },
      
    }
}
</script>

<style>

</style>