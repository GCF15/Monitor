<template>
	<div class="grid">
		<div v-for="item in cardData" :key="item" class="col-12 lg:col-6 xl:col-3">
			<div class="card mb-0" style="height: 90px;">
				<div  class="flex justify-content-between mb-3">
					<div style="margin-top:0px;">
						<span class="block text-500 font-medium mb-3">{{item.value.name}}</span> 
            <span style="margin-left:0px;">
							<a v-tooltip.bottom="'编辑'" @click="editCheckItem(item)">Edit</a>
              <!--<Button size="small" v-tooltip.bottom="'编辑'" icon="pi pi-pencil" class="p-button-rounded p-button-text" @click="editCheckItem(item)"/>	-->
              <n-popconfirm
                @positive-click="deleteCheckItem(item.value.id)"
                @negative-click="handleNegativeClick"
              >
                <template #trigger>
                  <a v-tooltip.bottom="'删除'" style="margin-left:10px;">delete</a>
                  <!--<button v-tooltip.bottom="'删除'" icon="pi pi-times" class="p-button-rounded  p-button-text"/>	-->
                </template>
                确定要移除 “{{item.value.title}}” 吗？
              </n-popconfirm>
              </span>
					</div>
					<Button v-if="item.state" v-tooltip.bottom="'健康'" icon="pi pi-check" class="p-button-rounded p-button-success mr-2 mb-2" @click="linkToHealthUrl(item.value.url)"/>
          <Button v-else v-tooltip.bottom="'异常'" icon="pi pi-times" class="p-button-rounded p-button-danger mr-2 mb-2" @click="linkToHealthUrl(item.value.url)" />
        </div>
			</div>
		</div>
    <div class="col-12 lg:col-6 xl:col-3">
			<div class="card mb-0" style="height: 90px;text-align:center;" >
				<Button v-tooltip.bottom="'添加'" icon="pi pi-plus-circle" class="p-button-rounded p-button-text" @click="addCheckItemModalShow=true"/>	
        <n-modal :show="addCheckItemModalShow">
          <n-card 
          style="width:600px" 
          :bordered="false" 
          size="huge" 
          role="dialog" 
          aria-modal="true"
          >
          
          <h5  style="margin-top:-10px;">添加监控服务</h5>
          <hr/>
          <p></p>
          
          <n-form        
								label-placement="left"     
								label-width="auto" 
								require-mark-placement="right-hanging"
								:size="size"  
								:style="{       maxWidth: '640px'     }"    
							> 
						<n-form-item label="显示名称" style="margin-top:20px;">
							<n-input width="50px" size="small" placeholder="输入名称！" v-model:value="newStateItem.name"></n-input>
						</n-form-item>  
            
            <n-form-item label="服务链接" style="margin-top:-20px;" >
							<n-input size="small" placeholder="输入链接！" v-model:value="newStateItem.url"></n-input>
						</n-form-item>  
            
            <n-form-item label="响应方式" style="margin-top:-20px;" >
							<n-input v-model:value="newStateItem.responseResult" type="textarea"/>
						</n-form-item> 
					</n-form>
            <!--<n-input placeholder="输入名称！" v-model:value="newStateItem.title"></n-input>
            <p></p>
            <n-input placeholder="输入链接！" v-model:value="newStateItem.healthUrl"></n-input>
            <p></p>-->
						<n-space>
							<n-button round @click="addSaveItem()">确定</n-button>
							<n-button round @click="addCheckItemModalShow=false">取消</n-button>
						</n-space>
          </n-card>
        </n-modal>
        <n-modal :show="editCheckItemModalShow">
          <n-card 
          style="width:600px" 
          :bordered="false" 
          size="huge" 
          role="dialog" 
          aria-modal="true"
          >
          
          <h5  style="margin-top:-10px;">编辑监控服务</h5>
          <hr/>
          <p></p>
          <n-form        
								label-placement="left"     
								label-width="auto" 
								require-mark-placement="right-hanging"
								:size="size"  
								:style="{       maxWidth: '640px'     }"    
							> 
						<n-form-item label="显示名称" style="margin-top:20px;">
							<n-input placeholder="编辑名称！" size="small" v-model:value="editStateItem.name"></n-input>
						</n-form-item>  
            
            <n-form-item label="服务链接" style="margin-top:-20px;">
							<n-input placeholder="编辑链接！" size="small" v-model:value="editStateItem.url"></n-input>
						</n-form-item> 
            
            <n-form-item label="响应方式" style="margin-top:-20px;" >
							<!-- <n-select v-model:value="value" size="small" :options="options" /> -->
							<n-input v-model:value="editStateItem.responseResult" type="textarea" placeholder=""/>
						</n-form-item>
					</n-form>
          
						<n-space>
							<n-button round @click="editSaveItem()">确定</n-button>
							<n-button round @click="editCheckItemModalShow=false">取消</n-button>
						</n-space>
          </n-card>
        </n-modal>
			</div>
		</div>
		
	</div>
	<p></p>
	<div class="grid p-fluid">
			<div class="col-12 lg:col-4">
					
        <Panel :toggleable="true" v-model:collapsed="isCollapsed">
          <template #header>
            <img v-if="nodeNeedMsg.isLinux" src="../assets/images/linux-svgrepo-com.svg" width="20"/>
            <img v-else src="../assets/images/microsoft-windows-svgrepo-com.svg" width="20"/>
						<b style="margin-left:0px;">{{nodeNeedMsg.name}}</b>
          </template>
          <n-grid :x-gap="18" :y-gap="16" :item-responsive="true" cols='1'>
						<n-grid-item>
							<!--<n-data-table 
								:bordered=false 
								:bottom-bordered=false 
								style="margin-top:10px;white-space:nowrap;opacity: 0.7;" 
								:columns="columns" 
								:data="tableData"
								:scoll-x="180"
							/>	-->
              <n-descriptions label-placement="left" title="" column="2">
                <n-descriptions-item label="类型">
                  <n-tag size="small" type="info">{{this.nodeNeedMsg.type}}</n-tag>
                </n-descriptions-item>
                <n-descriptions-item label="Kubernet版本">
                  {{this.nodeNeedMsg.kubernetVersion}}
                </n-descriptions-item>
                <n-descriptions-item label="状态">
                  <n-tag size="small" v-if="true" type="success">{{this.nodeNeedMsg.state}}</n-tag>
                  <n-tag size="small" v-else type="error">{{this.nodeNeedMsg.state}}</n-tag>
                </n-descriptions-item>
                <n-descriptions-item label="容器运行时版本">
                  {{this.nodeNeedMsg.containerRTVersion}}
                </n-descriptions-item>
                <n-descriptions-item label="IP地址">
                  {{this.nodeNeedMsg.ipAddress}}
                </n-descriptions-item>
              </n-descriptions>
						</n-grid-item>
						<n-grid-item>
              <n-collapse>
                <n-collapse-item title="容器组" name="1">
                  
                  <n-grid cols="4" item-responsive responsive="screen">
                    <n-grid-item span="0 m:1 l:2">
                      <div>
                        <n-select
                          size="small"
                          v-model:value="selectedValue"
                          filterable
                          placeholder="容器类型"
                          :options="nodeNeedMsg.Containeroptions"
                          @update:value="handleUpdateValue"
                        />
                      </div>
                    </n-grid-item>
                  </n-grid>
                  <div v-for="item in nodeNeedMsg.nodeDetial" :key="item" >
										<!--<p>{{item}}</p>-->
                    <n-grid cols="4" item-responsive responsive="screen">
                      <n-grid-item span="0 m:1 l:3">
                        <div class="light-green">
                          <p>{{item}}</p>
                        </div>
                      </n-grid-item>
                      <hr/>
                      <n-grid-item>
                        <div class="green">
                          <a>detail</a>
                        </div>
                      </n-grid-item>
                    </n-grid>
                  </div>
                  
                </n-collapse-item>
              </n-collapse>
						</n-grid-item>
					</n-grid>  
        </Panel>
          
        <p></p>
          
        <!--TODO-->
				<!--<Panel header="时间线-事件记录" :toggleable="true" :collapsed="false">
					<n-grid :x-gap="18" :y-gap="16" :item-responsive="true" cols='2'>
						<n-grid-item>
							<p>警告</p>
							<n-timeline size="large" >
								<n-timeline-item v-for="item in timelines_warning.value.reverse()" :key="item.type" v-bind="item" v-tooltip.bottom="'点击查看详细记录'">
									<template #footer>
										<p>{{item.time}}</p>
									</template>
								</n-timeline-item>
							</n-timeline>
						</n-grid-item>
						<n-grid-item>
							<p>异常</p>
							<n-timeline size="large" >
								<n-timeline-item v-for="item in timelines_error.value" :key="item.type" v-bind="item" v-tooltip.bottom="'点击查看详细记录'"/>
							</n-timeline>
						</n-grid-item>
					</n-grid>
				</Panel>-->
			</div>
			<div class="col-12 lg:col-8">
        <!--TODO-->
        <!--<Panel header="资源用量" :toggleable="true" :collapsed="false">
				<div class="flex flex-column align-items-center">
					<div style="width:100%;height: 100%;">
						<div class="leftbox" id="containerRadar">
						</div>
						<div class="rightbox">
							<div id="container-div">
								<div id="container0" v-tooltip.bottom="'点击查看CPU记录'">
									<div id="cpu-show" style="justify-content:center;display:flex;max-width:70px;height: 80px;" @click="handleliquidClick($event)"></div>
								</div>
								<div id="container1">
									<div>
										<div><b>{{this.dataAccuracy(this.luquid_CPU.percentdata*100)}}%</b></div>
										<div>CPU</div>	
									</div>
								</div>
								<div id="container2">
									<div>
										<div><b>4.11 cores</b></div>
										<div>已使用</div>	
									</div>
								</div>
								<div id="container3">
									<div>
										<div><b>92 cores</b></div>
										<div>总计</div>	
									</div>
								</div>
							</div>
							<div id="container-div">
								<div id="container0" v-tooltip.bottom="'点击查看Props记录'">
									<div id="Props-show" style="justify-content:center;display:flex;max-width:70px;height: 80px;" @click="handleliquidClick($event)"></div>
								</div>
								<div id="container1">
									<div>
										<div><b>{{this.dataAccuracy(this.luquid_Props.percentdata*100)}}%</b></div>
										<div>Props</div>	
									</div>
								</div>
								<div id="container2">
									<div>
										<div><b>4.11 cores</b></div>
										<div>已使用</div>	
									</div>
								</div>
								<div id="container3">
									<div>
										<div><b>92 cores</b></div>
										<div>总计</div>	
									</div>
								</div>
							</div>
							<div id="container-div" >
								<div id="container0" v-tooltip.bottom="'点击查看内存记录'">
									<div id="container_menmory" style="justify-content:center;display:flex;max-width:70px;height: 80px;" @click="handleliquidClick($event)"></div>
								</div>
								<div id="container1">
									<div>
										<div><b>35.6%</b></div>
										<div>内存</div>	
									</div>
								</div>
								<div id="container2">
									<div>
										<div><b>4.11 Gi</b></div>
										<div>已使用</div>	
									</div>
								</div>
								<div id="container3">
									<div>
										<div><b>92 Gi</b></div>
										<div>总计</div>	
									</div>
								</div>
							</div>
							<div id="container-div">
								<div id="container0" v-tooltip.bottom="'点击查看容器组记录'">
									<div id="container_group" style="justify-content:center;display:flex;max-width:70px;height: 80px;" @click="handleliquidClick($event)"></div>
								</div>
								<div id="container1">
									<div>
										<div><b>35.6%</b></div>
										<div>容器组</div>	
									</div>
								</div>
								<div id="container2">
									<div>
										<div><b>4.11 </b></div>
										<div>已使用</div>	
									</div>
								</div>
								<div id="container3">
									<div>
										<div><b>92 </b></div>
										<div>总计</div>	
									</div>
								</div>
							</div>
							<div id="container-div">
								<div id="container0" v-tooltip.bottom="'点击查看磁盘记录'">
									<div id="container_disk" style="justify-content:center;display:flex;max-width:70px;height: 80px;" @click="handleliquidClick($event)"></div>
								</div>
								<div id="container1">
									<div>
										<div><b>35.6%</b></div>
										<div>磁盘空间</div>	
									</div>
								</div>
								<div id="container2">
									<div>
										<div><b>4.11 GB</b></div>
										<div>已使用</div>	
									</div>
								</div>
								<div id="container3">
									<div>
										<div><b>92 GB</b></div>
										<div>总计</div>	
									</div>
								</div>
							</div>
						</div>
					</div>
					
				</div>
        </Panel>
        <p></p>
        
        <Panel header="网络状态" :toggleable="true" :collapsed="false">
					<div id="containerline"></div>
        </Panel>-->
			</div>	
		</div>
		
</template>

<script>
import EventBus from '@/AppEventBus';
import ProductService from '../service/ProductService';
import { reactive, ref } from 'vue'
import { Liquid, Radar, Line} from '@antv/g2plot';
import { NGrid, NGridItem } from 'naive-ui';
//import { NTimeline, NTimelineItem } from 'naive-ui';
//import NDataTable from 'naive-ui';
import { luquiddefault, luquiddefault_orange, luquiddefault_red, radardefault, linedefault } from './js/Graph'
import { linedata_default, radardata_default, tabledata_default, columns_default, timeline_warn_default, timeline_error_default } from './js/Data'
import ApipsService from '../service/ApipsService';
import * as math from  'mathjs';//解决计算精度问题
import NodeDetailService from '../service/NodeDetailService'
//import { TimelineData } from './TimelineData'

export default {
	
	components:{
		//NDataTable,
		NGrid,
		NGridItem,
//    TODO
//		NTimeline,
//		NTimelineItem
	},
	
	data() {
    //图形数据初始化定义
		let luquid_CPU={ luquidref:Liquid, percentdata:Number, };
		let luquid_Props={ luquidref:Liquid, percentdata:Number, };
		let luquid_Menmory={ luquidref:Liquid, percentdata:Number, };
		let luquid_group={ luquidref:Liquid, percentdata:Number, };
		let luquid_disk={ luquidref:Liquid, percentdata:Number, };
		
		const linedata = linedata_default;
		let lineshow;
		//let cardData = reactive({ value:carddata_default });
		let radarPlot;
		let radarData = reactive({ value:radardata_default })
		const columns = columns_default;
		let tableData = tabledata_default;
		let timelines_error = reactive({ value:timeline_error_default });
		let timelines_warning = reactive({ value:timeline_warn_default });

		let global_refresh_time=reactive();
    let nodedetialMsg;
		
		return {
			products: null,
			
			nowTime:"",
			cardData:[],
			checkItem:[],
			columns,
			tableData,
			linedata,
			//水波图
			luquid_CPU,
			luquid_Props,
			luquid_Menmory,
			luquid_group,
			luquid_disk,
      //雷达图
			radarData,
			radarPlot,
      //折线图
			timelines_error,
			timelines_warning,
			lineshow,

			global_refresh_time,
      
      //节点信息
      nodedetialMsg,
      nodeNeedMsg:{
        name:'',
				isLinux:false,
        status:false,
        type:'',
        state:'',
        ipAddress:'',
        containerRTVersion:'',
        kubernetVersion:'',
        
        nodeDetial:[],
        Containeroptions:[],
        selectContiner:''
      },
      
      //
      addCheckItemModalShow:ref(false),
      editCheckItemModalShow:ref(false),
      
      newStateItem:
      {
		name: '',
		url: '',
		responseStatus: 200,
		responseResult: ''
      },
      
      editStateItem:{
		id:0,
        name: '',
        url: '',
		responseStatus: 200,
        responseResult: ''	
      },
      
      apipsservice:new ApipsService()
		}
	},
	
	productService: null,
	themeChangeListener: null,
	
	mounted() {
		this.productService.getProductsSmall().then(data => this.products = data);

		this.themeChangeListener = (event) => {
            if (event.dark)
                this.applyDarkTheme();
            else
                this.applyLightTheme();
        };
        EventBus.on('change-theme', this.themeChangeListener);

		if (this.isDarkTheme()) {
            this.applyDarkTheme();
        }
        else {
            this.applyLightTheme();
        }
        
    //循环执行定时器
		this.global_refresh_time=this.$refresh_time
		this.timer = setInterval(()=>{
		//this.getallCheckItem()
			this.updateApisStatus();
      //TODO
			//this.updateLiuqiStatus();
			//this.updateLineStatus();
      this.getNodeDetail()
			this.global_refresh_time=this.$refresh_time  
		}, this.global_refresh_time)
    
		//图表渲染
		//this.initShow();
    this.getNodeDetail()
    
    this.getallCheckItem()
    //this.updateApisStatus();
	},
	beforeUnmount() {
      EventBus.off('change-theme', this.themeChangeListener );
			//销毁定时器
			clearInterval(this.timer);
			this.timer = null
    },
	created() {
		this.productService = new ProductService();
		
		this.updateApisStatus();
	},
	
	methods: {
		
		initShow(){
			//水波图
			this.luquid_CPU = {
				luquidref:new Liquid('cpu-show',luquiddefault),
				percentdata:luquiddefault.percent,
			}
			this.luquid_Props = {
				luquidref:new Liquid('Props-show',luquiddefault),
				percentdata:luquiddefault.percent,
			}
			this.luquid_Menmory = {
				luquidref:new Liquid('container_menmory', luquiddefault),
				percentdata:luquiddefault.percent,
			}
			this.luquid_group = {
				luquidref:new Liquid('container_group', luquiddefault),
				percentdata:luquiddefault.percent,
			}
			this.luquid_disk = {
				luquidref:new Liquid('container_disk', luquiddefault),
				percentdata:luquiddefault.percent,
			}
			this.luquid_CPU.luquidref.render();
			this.luquid_Props.luquidref.render();
			this.luquid_Menmory.luquidref.render();
			this.luquid_group.luquidref.render();
			this.luquid_disk.luquidref.render();
			
			//雷达图
			this.radarPlot=new Radar('containerRadar', radardefault);
			this.radarPlot.changeData(this.radarData.value)
			this.radarPlot.render();
			
      //折线图
			this.lineshow = new Line("containerline", linedefault);
			this.lineshow.changeData(this.linedata);
			this.lineshow.render();
		},
		
    updateLineStatus(){
      for(var i=1;i<(this.linedata.length-2);i++){
				this.linedata[i].Time=this.linedata[i+1].Time;
        this.linedata[i].rate=this.linedata[i+1].rate;
      }
      
      this.linedata[this.linedata.length-2].Time = this.formatime();
      this.linedata[this.linedata.length-2].rate = Math.round(Math.random()*100);

			this.lineshow.changeData(this.linedata);
      this.lineshow.render();
    },
		
		updateLiuqiStatus(){
			//this.columns.tags.NTag.type='error';
			//let luquidStatus = liquiddata_default;

				var check_CPU = this.luquid_CPU.percentdata;
				var check_Props = this.luquid_Props.percentdata;
				this.luquid_CPU.percentdata = (this.luquid_CPU.percentdata + 0.1)%1;
				this.luquid_Props.percentdata = (this.luquid_Props.percentdata + 0.2)%1;
				
				if(this.luquid_CPU.percentdata!=check_CPU){
					//绿色正常
					if(this.luquid_CPU.percentdata < 0.5){
						this.luquid_CPU.luquidref.destroy();
						this.luquid_CPU.luquidref = new Liquid('cpu-show',luquiddefault);
						this.luquid_CPU.luquidref.changeData(this.luquid_CPU.percentdata);
						this.luquid_CPU.luquidref.render();
					}
					//橙色警告
					else if(this.luquid_CPU.percentdata>=0.5 && this.luquid_CPU.percentdata<0.75 ){
						this.luquid_CPU.luquidref.destroy();
						this.luquid_CPU.luquidref = new Liquid('cpu-show',luquiddefault_orange);
						this.luquid_CPU.luquidref.changeData(this.luquid_CPU.percentdata);
						this.luquid_CPU.luquidref.render();
            
					}
					//红色异常
					else if(this.luquid_CPU.percentdata>=0.75 ){
						this.luquid_CPU.luquidref.destroy();
						this.luquid_CPU.luquidref = new Liquid('cpu-show',luquiddefault_red);
						this.luquid_CPU.luquidref.changeData(this.luquid_CPU.percentdata);
						this.luquid_CPU.luquidref.render();
            
            //this.timelines_warning.value.push({ type: 'warning', title: 'CPU占用过高', content: 'CPU占用率:'+Math.round(this.luquid_CPU.percentdata*100)+'%', time: this.formatime() });
					}	
				}
				
				if(this.luquid_Props.percentdata!=check_Props){
					//绿色正常
					if(this.luquid_Props.percentdata < 0.5){
						this.luquid_Props.luquidref.destroy();
						this.luquid_Props.luquidref = new Liquid('Props-show',luquiddefault);
						this.luquid_Props.luquidref.changeData(this.luquid_Props.percentdata);
						this.luquid_Props.luquidref.render();
					}
					//橙色警告
					else if(this.luquid_Props.percentdata>=0.5 && this.luquid_Props.percentdata<0.75 ){
						this.luquid_Props.luquidref.destroy();
						this.luquid_Props.luquidref = new Liquid('Props-show',luquiddefault_orange);
						this.luquid_Props.luquidref.changeData(this.luquid_Props.percentdata)
						this.luquid_Props.luquidref.render();
					}
					//红色异常
					else if(this.luquid_Props.percentdata>=0.75 ){
						this.luquid_Props.luquidref.destroy();
						this.luquid_Props.luquidref = new Liquid('Props-show',luquiddefault_red);
						this.luquid_Props.luquidref.changeData(this.luquid_Props.percentdata);
						this.luquid_Props.luquidref.render();
            
//            this.timelines_warning.value.push({ type: 'warning', title: 'Props占用过高', content: 'CPU占用率:'+Math.round(this.luquid_Props.percentdata*100)+'%', time: this.formatdate() });
//            if(this.timelines_warning.value.length>10){
//              this.timelines_warning.value = this.timelines_warning.value.reverse();
//							this.timelines_warning.value.pop();
//              this.timelines_warning.value = this.timelines_warning.value.reverse();
//            }
            //this.timelines_warning.value.reverse();
          }
				}
				
				this.radarData.value[0].star=this.luquid_CPU.percentdata*100;
				this.radarData.value[1].star=this.luquid_Props.percentdata*100;
				this.radarPlot.changeData(this.radarData.value)
				this.radarPlot.render();
		},
    
    async getallCheckItem(){
		var cardDate_copy=[]
		await this.apipsservice.getCheckItem().then(res=>{
			this.checkItem=res.data
			res.data.forEach(element => {
				var item={
					state:false,
					value:element
				}
				cardDate_copy.push(item)
			});
		})

		this.cardData=cardDate_copy
		this.updateApisStatus();
    },
    
		async updateApisStatus(){
			for(var i=0; i<this.cardData.length;i++)
			{
				try{
					await this.apipsservice.getapistate(this.cardData[i].value.url).then(res=>{
						if(res.data.healthStatus==='Healthy'){
							this.cardData[i].state=true
						}
					})
				}catch(err){
					this.cardData[i].state = false;
				}
			}
		},

		async checkItemStatus(itemurl){
			//console.log(itemurl)
			var ret=false
			try{
				await this.apipsservice.getapistate(itemurl).then(res=>{
					if(res.data.healthStatus==='Healthy'){
						ret=true
					}
				})
			}catch(err){
				ret=false
			}

			return ret
		},
    
    async getNodeDetail(){
			const nodeService= new NodeDetailService()
      
      await nodeService.getnodedetail().then(res=>{
				this.nodedetialMsg=res.data
        //console.log(this.nodedetialMsg)
        this.initNodeDetaiTableData()
      })
    },
    
    async getNodeContainerDetialByName(value){
		const nodeService= new NodeDetailService()

		//Node信息
		this.nodeNeedMsg.name=this.nodedetialMsg.items[0].metadata.name
		//this.nodeNeedAddress.status=this.nodedetialMsg.items[0].status.conditions[4].status==='True'?true:false
		this.nodeNeedMsg.type='Worker'
		this.nodeNeedMsg.state=this.nodedetialMsg.items[0].status.conditions[4].type
		this.nodeNeedMsg.ipAddress=this.nodedetialMsg.items[0].status.addresses[0].address
		this.nodeNeedMsg.containerRTVersion=this.nodedetialMsg.items[0].status.nodeInfo.containerRuntimeVersion
		this.nodeNeedMsg.isLinux=this.nodedetialMsg.items[0].status.nodeInfo.operatingSystem==='linux'?true:false
		this.nodeNeedMsg.kubernetVersion=this.nodedetialMsg.items[0].status.nodeInfo.kubeletVersion
		await nodeService.getNodeContainerDetialByName(value).then(res=>{
				this.nodeNeedMsg.nodeDetial=res.data
		//console.log(res.data)
		})
    },
    
    async filterContainerDetialByType(value){
			const nodeService= new NodeDetailService()
      this.nodeNeedMsg.nodeDetial=[]
      await nodeService.filterContainerDetialByType(value).then(res=>{
				//this.nodeNeedMsg.nodeDetial=res.data
        for(var i=0;i<res.data.items.length;i++){
          var item=res.data.items[i].metadata.name
          //console.log(item)
          this.nodeNeedMsg.nodeDetial.push(item)
        }
        console.log(this.nodeNeedMsg.nodeDetial)
      })
    },
    
    async getNodeContainerType(){
			const nodeService= new NodeDetailService()
      var temp=[]
      await nodeService.getNodeContainerType().then(res=>{
				temp=res.data
      })
      
      this.nodeNeedMsg.Containeroptions=[]
      for(var i=0;i<temp.items.length;i++){
        const optionsItem={
					label:temp.items[i].metadata.name,
          value:temp.items[i].metadata.name
        }
				this.nodeNeedMsg.Containeroptions.push(optionsItem)
      }
      //console.log(this.nodeNeedMsg.Containeroptions)
    },
    
    handleUpdateValue (value) {
      this.nodeNeedMsg.selectContiner=value
      
      this.filterContainerDetialByType(value)
    },
    
    initNodeDetaiTableData(){

        if(this.nodeNeedMsg.selectContiner===''){
          this.getNodeContainerDetialByName(this.nodeNeedMsg.name)	
        }else{
					//this.filterContainerDetialByType(this.nodeNeedMsg.selectContiner)
        }

        this.getNodeContainerType()
    },
    
    editCheckItem(item){
		this.editCheckItemModalShow=true
		this.editStateItem.id=item.value.id
        this.editStateItem.name=item.value.name
        this.editStateItem.url = item.value.url	
		this.editStateItem.responseResult=item.value.responseResult

    },
    editSaveItem(){
		//TODO
		//将编辑保存到数据库
		console.log(this.editStateItem)
		this.apipsservice.updateCheckItem(this.editStateItem).then(res=>{
			if(res.status===200)
			this.getallCheckItem()
		})
		this.editCheckItemModalShow=false
    },
    
    deleteCheckItem(id){
		this.apipsservice.deleteCheckItemById(id).then(res=>{
			if(res.status===200){
				this.$message.info()
				this.getallCheckItem()
			}
			
		})
		//this.getallCheckItem()
    },
    
    addSaveItem(){
		this.addCheckItemModalShow=false
		this.apipsservice.addCheckItem(this.newStateItem).then(res=>{
			console.log(res)
			this.getallCheckItem()
		})
      
      this.newStateItem.name=''
      this.newStateItem.url=''
      this.newStateItem.healthUrl=''
      
		this.getallCheckItem()
    },
    
    formatime() {
			const dates = new Date();
	
			const hour = dates.getHours();//北京时间
			const minute = dates.getMinutes() < 10 ? '0' + dates.getMinutes() : dates.getMinutes();
      const seconds = dates.getSeconds() < 10 ? '0' + dates.getSeconds() : dates.getSeconds();
			
			return hour + ':' + minute + ':' + seconds;
		},
    formatdate() {
			const dates = new Date();
      
			const hour = dates.getHours();//北京时间
			const minute = dates.getMinutes() < 10 ? '0' + dates.getMinutes() : dates.getMinutes();
      const seconds = dates.getSeconds() < 10 ? '0' + dates.getSeconds() : dates.getSeconds();
			
			return dates.getFullYear()+'-'+dates.getMonth()+'-'+dates.getDate()+' '+hour + ':' + minute + ':' + seconds;
		},
    
    linkToHealthUrl(url){
      window.open(url, '_blank')
    },
		
		dataAccuracy(value){
			return Number(math.format(value, 14));
		},
		
		formatCurrency(value) {
			return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
		},
		isDarkTheme() {
      return this.$appState.darkTheme === true;
    },
		applyLightTheme() {
			this.lineOptions = {
				plugins: {
					legend: {
						labels: {
							color: '#495057'
						}
					}
				},
				scales: {
					x: {
						ticks: {
							color: '#495057'
						},
						grid: {
							color:  '#ebedef',
						}
					},
					y: {
						ticks: {
							color: '#495057'
						},
						grid: {
							color:  '#ebedef',
						}
					},
				}
			};
		},
		applyDarkTheme() {
//			this.lineOptions = {
//				plugins: {
//					legend: {
//						labels: {
//							color: '#ebedef'
//						}
//					}
//				},
//				scales: {
//					x: {
//						ticks: {
//							color: '#ebedef'
//						},
//						grid: {
//							color:  'rgba(160, 167, 181, .3)',
//						}
//					},
//					y: {
//						ticks: {
//							color: '#ebedef'
//						},
//						grid: {
//							color:  'rgba(160, 167, 181, .3)',
//						}
//					},
//				}
//			};
//			this.NDataTable.lineOptions={
				
//			}
		},
    
    handleliquidClick(a){
			switch(a.currentTarget.id){
				case 'container_group':
          this.$router.push('/containergroup')
          break;
        case 'cpu-show':
          this.$router.push('/containergroup')
          break;
        case 'Props-show':
          this.$router.push('/containergroup')
          break;
        case 'container_menmory':
          this.$router.push('/containergroup')
          break;
        case 'container_disk':
          this.$router.push('/containergroup')
          break;
        
      }
    }
	
	}
}
</script>

<style>
.leftbox{
	width: 50%;
	height: 100%;
	float: left;
}

.rightbox{
	width: 50%;
	height: 100%;
	float: right;
}
.rightbox #container-div{
	height: 80px;
	width: 100%;
	/*background-color: #9ea7b1;*/
	border-radius: 0.5em;
	margin-bottom:0px;
	border-bottom: 1.5px solid #eff3f8;
	
}

.rightbox #container-div #container0{
	height: 100%;
	width: 25%;
	float: left;
	
	font-size: 14px;
  line-height: 1.67;
	display: flex;
	align-items: center;
	
	cursor: pointer;
}
.rightbox #container-div #container1{
	height: 100%;
	width: 25%;
	float: left;
	
	font-size: 14px;
	color: #79879c;
  line-height: 1.67;
	display: flex;
	align-items: center;
}
.rightbox #container-div #container2{
	height: 100%;
	width: 25%;
	float: left;
	
	font-size: 14px;
	color: #79879c;
  line-height: 1.67;
	display: flex;
	align-items: center;
}
.rightbox #container-div #container3{
	height: 100%;
	width: 25%;
	float: right;
	
	font-size: 14px;
	color: #79879c;
  line-height: 1.67;
	display: flex;
	align-items: center;
}
#containerline{
	margin: 3em;
	width: 100%;
}

.light-green {
  height: 25px;
  /*background-color: rgba(0, 128, 0, 0.12);*/
}
.green {
  height: 25px;
  /*background-color: rgba(0, 128, 0, 0.24);*/
}

</style>
