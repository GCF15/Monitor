import axios from 'axios'

export default class SettingService {
	getWechatSetting(){	
        return {
            curl:"https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=cfcfd8ae-b0be-408d-8e3f-28295615cc97",
            messagetype:"text",
            user: ['all']
        }
    }
	
	getMailSetting(){
    return{
      email:"gaochengfeng@dev.appeon.net"
    }
  }

  getPhoneSetting() {
      return {
          url:"http://yzxyytz.market.alicloudapi.com/yzx/voiceNotifySms",
          phone:"13500042947",
          message:"电话测试",
          templateid:"TP2109015",
          appcode:"cc2b702e050c417db4f8a36d35ebfd38"
      }
  }

  getSmsSetting(){
      return {
          url:"http://yzxtz.market.alicloudapi.com/yzx/notifySms",
          phone:"13500042947",
          message:"消息测试",
          templateid:"TP21090211",
          appcode:"cc2b702e050c417db4f8a36d35ebfd38"
      }
  }

  getRemindAllUser(){
    return ['all', '8166 高成锋（Vico）', '8150 宋国朋（Sam）','宋国朋','songguopeng']
  }
            
  startAlert(){
    return (axios.get("http://192.168.158.17:32524/api/HealthCheck/Start?interval=5"));
  }
  
  stopAlert(){
    return (axios.get("http://192.168.158.17:32524/api/HealthCheck/Stop"));
  }
  
  setTimeRefresh(value){
    return (axios.get("http://192.168.158.17:32524/api/HealthCheck/Start?interval=" + value));
  }
  
}