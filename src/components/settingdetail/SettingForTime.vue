<template>
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
								<template #suffix>min</template>
							</n-input-number>
							<n-button style="margin-left:20px;" round secondary type="success" size="small" @click="setAlertTime()">应用</n-button>
						</n-form-item>  
            
            <!--<n-form-item label="数据刷新时间" >
							<n-input-number v-model:value="timeRefresh" :show-button="true" clearable round style="width:150px;">
								<template #suffix>s</template>
							</n-input-number>
							<n-button style="margin-left:20px;" round secondary type="success" size="small" @click="setRefreshTime()">应用</n-button>
						</n-form-item>  -->
					</n-form>
				</div>
</template>

<script>
import SettingService from '../../service/SettingService.js'
import {ref} from 'vue'

export default {
  
  data(){
		return{
			timeRefresh:ref(5),
      settingService:new SettingService(),
    }
  },
  methods:{
		setAlertTime(){
			this.settingService.setTimeRefresh(this.timeRefresh*60).then(res=>{
					if(res.data==='Started'){
						window.$message.success("成功将报警间隔时间设置为： "+this.timeRefresh+"分钟")
          }
          else{
						window.$message.error("设置失败")
          }
        })
    },
  }
}
</script>

<style>

</style>