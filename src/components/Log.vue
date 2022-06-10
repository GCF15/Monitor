<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h5>日志记录页面</h5>
				<n-form        
							label-placement="left"     
							label-width="auto" 
							require-mark-placement="right-hanging"
							:size="size"  
							:style="{       maxWidth: '640px'     }"   
							>     
							<n-form-item label="Webhook URL" >
									<n-input round placeholder="Input"></n-input>	
								</n-form-item>
								<n-form-item label="群联系人" >
									<n-input round placeholder="Input"></n-input>	
								</n-form-item>
							<n-form-item label="Input" >
								<n-input placeholder="Input" />
								</n-form-item>     
							<n-form-item label="Textarea">       
							<n-input 
								placeholder="Textarea" 
								type="textarea" 
								:autosize="{   
								minRows: 3,  
								maxRows: 5}"      
							/>   
							</n-form-item>
							<n-form-item label="Select" path="selectValue">
								
							<n-select 
							
							value="model.selectValue"   
							
							placeholder="Select"      
							
							:options="generalOptions"    
							
							/>     </n-form-item>   
							<n-form-item label="Multiple Select">  
								
							<n-select       
							
							placeholder="Select"      
							
							:options="generalOptions"      
							
							multiple    
							
							/>   
							
							</n-form-item>  
							<n-form-item label="Datetime">     
								
							<n-date-picker type="datetime" />   
							</n-form-item>     <n-form-item label="Switch">    
								

							</n-form-item>  
							<n-form-item label="Checkbox Group">     
								
							<n-checkbox-group >  
								
							<n-space>     
								
							<n-checkbox value="Option 1">      
								
							Option 1           </n-checkbox>       
							<n-checkbox value="Option 2">        
								
							Option 2           </n-checkbox>   
							<n-checkbox value="Option 3">     
								Option 3   
								
							</n-checkbox>   
							</n-space>    
							</n-checkbox-group>   
							</n-form-item>  
							<n-form-item label="Radio Group" >     
								
							<n-radio-group  name="radiogroup1">     
								
							<n-space>     
								
							<n-radio value="Radio 1">  
								
							Radio 1     
							
							</n-radio>   
							<n-radio value="Radio 2">       
								
							Radio 2       
							
							</n-radio>     
							<n-radio value="Radio 3">       
								
							Radio 3     
							
							</n-radio>      
							</n-space>   
							</n-radio-group>  
							</n-form-item>    
							<n-form-item label="Radio Button Group" >     
								
							<n-radio-group  name="radiogroup2">    
								
							<n-radio-button value="Radio 1">    
								
							Radio 1   
							
							</n-radio-button>     
							<n-radio-button value="Radio 2">      
								
							Radio 2       
							
							</n-radio-button>    
							<n-radio-button value="Radio 3">     
								
							Radio 3     
							
							</n-radio-button>     
							</n-radio-group>   
							</n-form-item>   
							<n-form-item label="Input Number" >   
								
							<n-input-number  />     
							</n-form-item>   
							<n-form-item label="Time Picker" >  
								
							<n-time-picker  />   
							</n-form-item>     <n-form-item label="Slider">    
								
							<n-slider  :step="5" />    
							</n-form-item>   
							<n-form-item label="Nested Path" :show-feedback="false">   
								
							<n-grid :cols="2" :x-gap="24">     
								<n-form-item-gi>       
								
							<n-input      

							placeholder="Nested Path 1"        
							/>   
							
							</n-form-item-gi>      
							<n-form-item-gi >      
								
							<n-select                
							
							placeholder="Nested Path 2"     
							
							:options="generalOptions"       
							/>  
							
							</n-form-item-gi>   
							</n-grid>     
							</n-form-item>  
							<div style="display: flex; justify-content: flex-end">     
								
							<n-button round type="primary">    
								
							验证   
							
							</n-button>  
							</div> 
							</n-form>
			</div>
		</div>
	</div>
</template>

<script>
export default {

}
</script>