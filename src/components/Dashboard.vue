<template>
	<div class="grid">
		<div v-for="item in cardData.value" :key="item.id" class="col-12 lg:col-6 xl:col-3">
			<div class="card mb-0" style="height: 90px;">
				<div  class="flex justify-content-between mb-3">
					<div>
						<span class="block text-500 font-medium mb-3">{{item.title}}</span> 
            <span>
							<b v-tooltip.bottom="'编辑'" @click="editCheckItem(item)">Edit</b>
              <n-popconfirm
                @positive-click="deleteCheckItem(item)"
                @negative-click="handleNegativeClick"
              >
                <template #trigger>
                  <a v-tooltip.bottom="'删除'" style="margin-left:20px">delete</a>
                </template>
                确定要移除 “{{item.title}}” 吗？
              </n-popconfirm>
              </span>
					</div>
					<Button v-if="item.state" v-tooltip.bottom="'健康'" icon="pi pi-check" class="p-button-rounded p-button-success mr-2 mb-2" @click="linkToHealthUrl(item.healthUrl)"/>
          <Button v-else v-tooltip.bottom="'异常'" icon="pi pi-times" class="p-button-rounded p-button-danger mr-2 mb-2" @click="linkToHealthUrl(item.healthUrl)" />
        </div>
			</div>
		</div>
    <div class="col-12 lg:col-6 xl:col-3">
			<div class="card mb-0" style="height: 90px;text-align:center;" >
				<Button v-tooltip.bottom="'添加'" icon="pi pi-plus" class="p-button-rounded p-button-text" @click="editCheckItem(null)"/>	
        <n-modal :show="addCheckItemModalShow">
          <n-card 
          style="width:600px" 
          :bordered="false" 
          size="huge" 
          role="dialog" 
          aria-modal="true"
          >
            <n-input placeholder="输入名称！" v-model:value="newStateItem.title"></n-input>
            <p></p>
            <n-input placeholder="输入链接！" v-model:value="newStateItem.healthUrl"></n-input>
            <p></p>
						<n-space>
							<n-button round @click="addCheckItem()">确定</n-button>
							<n-button round @click="addCheckItemModalShow=false">取消</n-button>
						</n-space>
          </n-card>
        </n-modal>
			</div>
		</div>
		
	</div>
	<p></p>
	<div class="grid p-fluid">
			<div class="col-8 lg:col-4">
					
        <Panel header="Ubuntu-master1" :toggleable="true" v-model:collapsed="isCollapsed">
          <n-grid :x-gap="18" :y-gap="16" :item-responsive="true" cols='1'>
						<n-grid-item>
							<n-data-table 
								:bordered=false 
								:bottom-bordered=false 
								style="margin-top:10px;white-space:nowrap;opacity: 0.7;" 
								:columns="columns" 
								:data="tableData"
								:scoll-x="180"
							/>	
						</n-grid-item>
						<n-grid-item>
							
						</n-grid-item>
					</n-grid>  
        </Panel>
          
        <p></p>
          
				<Panel header="时间线-事件记录" :toggleable="true" :collapsed="false">
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
				</Panel>
			</div>
			<div class="col-16 lg:col-8">
        <Panel header="资源用量" :toggleable="true" :collapsed="false">
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
								<div id="container0" v-tooltip.bottom="'点击查看GPU记录'">
									<div id="gpu-show" style="justify-content:center;display:flex;max-width:70px;height: 80px;" @click="handleliquidClick($event)"></div>
								</div>
								<div id="container1">
									<div>
										<div><b>{{this.dataAccuracy(this.luquid_GPU.percentdata*100)}}%</b></div>
										<div>GPU</div>	
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
					<div id="containerline"></div>
				</div>
        </Panel>
			</div>	
		</div>
		
</template>

<script>
import EventBus from '@/AppEventBus';
import ProductService from '../service/ProductService';
import { reactive, ref } from 'vue'
import { Liquid, Radar, Line} from '@antv/g2plot';
import { NDataTable, NGrid, NGridItem, NTimeline, NTimelineItem } from 'naive-ui';
import { luquiddefault, luquiddefault_orange, luquiddefault_red, radardefault, linedefault } from './js/Graph'
import { linedata_default, carddata_default, radardata_default, tabledata_default, columns_default, timeline_warn_default, timeline_error_default } from './js/Data'
import ApipsService from '../service/ApipsService';
import * as math from  'mathjs';//解决计算精度问题
//import { TimelineData } from './TimelineData'

export default {
	
	components:{
		NDataTable,
		NGrid,
		NGridItem,
		NTimeline,
		NTimelineItem
	},
	
	data() {
    //图形数据初始化定义
		let luquid_CPU={ luquidref:Liquid, percentdata:Number, };
		let luquid_GPU={ luquidref:Liquid, percentdata:Number, };
		let luquid_Menmory={ luquidref:Liquid, percentdata:Number, };
		let luquid_group={ luquidref:Liquid, percentdata:Number, };
		let luquid_disk={ luquidref:Liquid, percentdata:Number, };
		
		const linedata = linedata_default;
		let lineshow;
		let cardData = reactive({ value:carddata_default });
		let radarPlot;
		let radarData = reactive({ value:radardata_default })
		const columns = columns_default;
		let tableData = tabledata_default;
		let timelines_error = reactive({ value:timeline_error_default });
		let timelines_warning = reactive({ value:timeline_warn_default });

		let global_refresh_time=reactive()
		
		return {
			products: null,
			
			nowTime:"",
			cardData,
			columns,
			tableData,
			linedata,
			//水波图
			luquid_CPU,
			luquid_GPU,
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
      addCheckItemModalShow:ref(false),
      
      newStateItem:{
          id:"123",
          state: false,
          title: '',
          healthUrl: ''	
      },
      editStateItem:{
          id:"0",
          state: false,
          title: '',
          healthUrl: ''	
      },
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
			this.updateApisStatus();
			this.updateLiuqiStatus();
			this.updateLineStatus();
			this.global_refresh_time=this.$refresh_time   
			console.log(this.global_refresh_time)
		}, this.global_refresh_time)
    
		//图表渲染
		this.initShow();
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
			this.luquid_GPU = {
				luquidref:new Liquid('gpu-show',luquiddefault),
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
			this.luquid_GPU.luquidref.render();
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
				var check_GPU = this.luquid_GPU.percentdata;
				this.luquid_CPU.percentdata = (this.luquid_CPU.percentdata + 0.1)%1;
				this.luquid_GPU.percentdata = (this.luquid_GPU.percentdata + 0.2)%1;
				
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
            
            this.timelines_warning.value.push({ type: 'warning', title: 'CPU占用过高', content: 'CPU占用率:'+Math.round(this.luquid_CPU.percentdata*100)+'%', time: this.formatime() });
					}	
				}
				
				if(this.luquid_GPU.percentdata!=check_GPU){
					//绿色正常
					if(this.luquid_GPU.percentdata < 0.5){
						this.luquid_GPU.luquidref.destroy();
						this.luquid_GPU.luquidref = new Liquid('gpu-show',luquiddefault);
						this.luquid_GPU.luquidref.changeData(this.luquid_GPU.percentdata);
						this.luquid_GPU.luquidref.render();
					}
					//橙色警告
					else if(this.luquid_GPU.percentdata>=0.5 && this.luquid_GPU.percentdata<0.75 ){
						this.luquid_GPU.luquidref.destroy();
						this.luquid_GPU.luquidref = new Liquid('gpu-show',luquiddefault_orange);
						this.luquid_GPU.luquidref.changeData(this.luquid_GPU.percentdata)
						this.luquid_GPU.luquidref.render();
					}
					//红色异常
					else if(this.luquid_GPU.percentdata>=0.75 ){
						this.luquid_GPU.luquidref.destroy();
						this.luquid_GPU.luquidref = new Liquid('gpu-show',luquiddefault_red);
						this.luquid_GPU.luquidref.changeData(this.luquid_GPU.percentdata);
						this.luquid_GPU.luquidref.render();
            
            this.timelines_warning.value.push({ type: 'warning', title: 'GPU占用过高', content: 'CPU占用率:'+Math.round(this.luquid_GPU.percentdata*100)+'%', time: this.formatdate() });
            if(this.timelines_warning.value.length>10){
              this.timelines_warning.value = this.timelines_warning.value.reverse();
							this.timelines_warning.value.pop();
              this.timelines_warning.value = this.timelines_warning.value.reverse();
            }
            //this.timelines_warning.value.reverse();
          }
				}
				
				this.radarData.value[0].star=this.luquid_CPU.percentdata*100;
				this.radarData.value[1].star=this.luquid_GPU.percentdata*100;
				this.radarPlot.changeData(this.radarData.value)
				this.radarPlot.render();
		},
		async updateApisStatus(){
			const apipsservice=new ApipsService()
			
      var i=0
      
			for(i; i<this.cardData.value.length;i++)
			{
				try{
					//var strApiName=this.cardData.value[i].id+"服务异常";
          await apipsservice.getapistate(this.cardData.value[i].healthUrl).then(res=>{this.checkApiStatus(res,i)})
				}catch(err){
          this.cardData.value[i].state = false;
					console.log(err.message)
				}
			}
		},
    
    checkApiStatus(res, i){
					if(res.data.healthStatus==='Healthy'){
						this.cardData.value[i].state = true;
					}else{
						this.cardData.value[i].state = false;
          }
        //添加错误事件显示
        var strApiName=this.cardData.value[i].id+"服务异常";
        if(!this.cardData.value[i].state){
          this.timelines_error.value.push({ type: 'error', title: strApiName, content: '', time: this.formatime() });
        } 
    },
    
    editCheckItem(item){
			this.addCheckItemModalShow=true
      console.log(item)
      if(item!=null){
        this.newStateItem.id=item.id
        this.newStateItem.title=item.title
        this.newStateItem.healthUrl = item.healthUrl	
      }else{
				this.newStateItem.title=''
        this.newStateItem.healthUrl = ''
        //console.log(this.cardData.value)
      }
    },
    
    deleteCheckItem(item){
      
      
      let index = this.cardData.value.indexOf(item);
      if(index!=-1){
        this.cardData.value.splice(index,1);	
      }
      
    },
    
    addCheckItem(){
      var isNew=true

      this.cardData.value.forEach((item,index,arr)=>{
				if(item.id==this.newStateItem.id){
					arr[index].title=this.newStateItem.title
          arr[index].healthUrl=this.newStateItem.healthUrl
          isNew=false
        }
      })
      
      if(isNew){
        this.cardData.value.push(this.newStateItem)	
      }
      
			this.addCheckItemModalShow=false
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
        case 'gpu-show':
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

</style>