<template>
    <div>
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
											<n-input placeholder="群名称" v-model:value=newWechatModel.name></n-input>
										</n-form-item>
										<n-form-item label="机器人">
											<n-input placeholder="webhookUrl" v-model:value=newWechatModel.webhookUrl></n-input>
										</n-form-item>
                    <n-form-item label="特别提醒:">  
                      <n-select      
                        v-model:value="newWechatModel.message.text.mentionedList"
                        placeholder="Select"      
                        :options="generalOptions"      
                        multiple 
                        round  
                        clearable
                      />   
                      </n-form-item>  
                        <n-form-item label="消息类型:" >     
                        <n-radio-group  name="radiogroup1" v-model:value="newWechatModel.message.messageType">    
                        <n-radio value='text'>    
                          文本类型  
                        </n-radio>     
                        <n-radio value='markdown1'>      
                          markdown类型      
                        </n-radio>    
                        <n-radio value='picture'>     
                          图片类型    
                        </n-radio>     
                      </n-radio-group>   
                    </n-form-item> 
                    <n-form-item style="margin-top:-20px;margin-left:78px;" v-if="newWechatModel.message.messageType!='picture'" >
                      <n-input v-model:value="newWechatModel.message.text.content" type="textarea" placeholder="报警提示信息！"/>
                    </n-form-item>
                    <n-form-item style="margin-top:-20px;margin-left:78px;" v-else >
                      <n-button>选择图片</n-button>
                    </n-form-item>
									</n-form>
									<p></p>
									<n-space>
                    <n-button v-if="!loading_commint" round @click="addWechatItem()">确定</n-button>
                    <n-spin size="small" v-else stroke="#21a35c">
                      <n-button round>确定</n-button>
                    </n-spin>
                    <n-button v-if="!loading_test" round @click="TestWeComSend(newWechatModel)">测试</n-button>
                    <n-spin size="small" v-else stroke="#21a35c">
                      <n-button round>测试</n-button>
                    </n-spin>
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
											<n-input placeholder="群名称" v-model:value=editWechatModel.name></n-input>
										</n-form-item>
										<n-form-item label="机器人">
											<n-input placeholder="webhookUrl" v-model:value=editWechatModel.webhookUrl></n-input>
										</n-form-item>
                    <n-form-item label="特别提醒:">  
                      <n-select      
                        v-model:value="editWechatModel.message.text.mentionedMobileList"
                        placeholder="Select"      
                        :options="generalOptions"      
                        multiple 
                        round  
                        clearable
                      />   
                      </n-form-item>  
                        <n-form-item label="消息类型:" >     
                        <n-radio-group  name="radiogroup2" v-model:value="editWechatModel.message.messageType">    
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
                    <n-form-item style="margin-top:-20px;margin-left:78px;" v-if="editWechatModel.message.messageType!='picture'" >
                      <n-input v-model:value="editWechatModel.message.text.content" type="textarea" placeholder="报警提示信息！"/>
                    </n-form-item>
                    <n-form-item style="margin-top:-20px;margin-left:78px;" v-else >
                      <n-button>选择图片</n-button>
                    </n-form-item>
									</n-form>
									<p></p>
									<n-space>
                    <n-button v-if="!loading_commint" round @click="editWeConTextItem()">确定</n-button>
                    <n-spin size="small" v-else stroke="#21a35c">
                      <n-button round>确定</n-button>
                    </n-spin>
                    <n-button v-if="!loading_test" round @click="TestWeComSend(editWechatModel)">测试</n-button>
                    <n-spin size="small" v-else stroke="#21a35c">
                      <n-button round>测试</n-button>
                    </n-spin>
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
								>   
								<div v-for="item in allWeComText" :key="item">
									<n-form-item >
                    <template #label><n-tag round>{{item.name}}</n-tag></template>
										<n-button style="margin-left:30px;" round type="success" secondary size="small" @click="editItem(item)">编辑</n-button> 
                    <n-popconfirm
                      @positive-click="deleteItem(item)"
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
					<n-button round type="success" secondary size="small" @click="AddWechatItem=true">添加</n-button> 	
									</n-space>  
								</div> 
								</n-form>
							</div>
</template>

<script>
import {ref} from 'vue'
import SettingService from '../../service/SettingService.js'

export default {
  props:{
		//allWeComText:{},
  },
  
  mounted(){
		this.init()
  },
  
  data(){
		return{
      allWeComText:{},
      settingService:new SettingService(),
      
      AddWechatItem:ref(false),
      EditWechatItem:ref(false),
      
      //加载转圈动画控制
      loading_commint:ref(false),
      loading_test:ref(false),
      
      //新增企业微信model
			newWechatModel:{
				name:'',
        webhookUrl: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxxx',
        message: {
            messageType: 'text',
            text: {
                content: '',
                mentionedList: [
                    '@all'
                ],
                mentionedMobileList: [
                    '18114853938'
                ]
            }
        }
      },
      
      //编辑wechat的model
			editWechatModel:{},
    }
  },
  
  methods:{
    init(){
      this.getAllWeComText()
    },
    
		//发送企业微信消息测试
    TestWeComSend(WechatModel){
      this.loading_test=true
      try{
        this.settingService.testWeComtext(WechatModel).then(res=>{
          if(res.data.errcode===0){
            window.$message.success('发送成功，请前往企业微信群查看验证！', { duration: 5e3 })
          }
          else{
            window.$message.error(res.data.errmsg, { duration: 5e3 })
          }
          this.loading_test=false
        })	
      }catch(err){
        this.loading_test=false
        window.$message.error(err, { duration: 5e3 })
      }
			
      this.ModalShow=false
    },
    
    //拉起wechat编辑
		editItem(item){
			this.editWechatModel=item
			this.EditWechatItem=true
		},
    
    //编辑企业微信item
		editWeConTextItem(){
			this.loading_commint=true
			this.EditWechatItem=false

			this.settingService.updateWeComText(this.editWechatModel).then(res=>{
				if(res.status===200){
					window.$message.success('编辑成功！', { duration: 5e3 })
				}else{
					window.$message.error('编辑失败！', { duration: 5e3 })
				}
        this.loading_commint=false
			})
		},
    
    //添加企业微信群聊
		addWechatItem(){
      this.loading_commint=true
			this.AddWechatItem=false
			try{
				this.settingService.addWeComText(this.newWechatModel).then(res=>{
					if(res.status===200){
						window.$message.success('添加成功！', { duration: 5e3 })
            this.newWechatModel.webhookUrl=''
            this.newWechatModel.message.messageType='text'
						this.getAllWeComText()
					}else{
						window.$message.error('添加失败！', { duration: 5e3 })
					}
          this.loading_commint=false
				})
			}catch(err){
        this.loading_commint=false
				window.$message.error('添加失败！', { duration: 5e3 })
			}
		},
    
    //删除企业微信群
		deleteItem(item){
			this.settingService.deleteWeConText(item.id).then(res=>{
				if(res.status===200){
					window.$message.success('删除成功！', { duration: 5e3 })
					this.getAllWeComText()
				}else{
					window.$message.error('删除失败！', { duration: 5e3 })
				}
			})
		},
    
    //获取微信群列表
    getAllWeComText(){
			this.settingService.getAllWeComText().then(res=>{
          this.allWeComText=res.data
        })	
    },
    
  }
}
</script>

<style>

</style>