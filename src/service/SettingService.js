import axios from 'axios'

export default class SettingService {

  //获取所有报警方式
  getAllAlarmRule(){

  }

  updateAlarmRule(selectType,isSelect){
    var selectMethod=0
    switch(selectType){
      case 'phone':
        selectMethod=2
        break
        case 'sms':
          selectMethod=2
          break
        case 'email':
          selectMethod=3
          break
        default:
          selectMethod=1
          break
    }
    var alarmRulebody={
      alarmMethod: selectMethod,
      isEnabled: isSelect,
      intervalTime: 0,
      alarmNumber: 0
    }

    return (axios.post("http://192.168.158.17:30872/api/Alarm/Update", alarmRulebody));
  }

  addWeComText(url,text){
    var model={
      WebhookUrl: url,
      Content: text
    }
    return (axios.post("http://192.168.158.17:30872/api/WeComText/Add", model));
  }

  updateWeComText(item){
    return (axios.post("http://192.168.158.17:30872/api/WeComText/Update", item));
  }

  deleteWeConText(id){
    return (axios.get("http://192.168.158.17:30872/api/WeComText/Delete/"+id))
  }

  getAllWeComText(){
    return (axios.get("http://192.168.158.17:30872/api/WeComText"))
  }

	getWechatSetting(){	
    // var checkUrl = "http://192.168.158.17:30872/api/WeComText"
    // return (axios.get(checkUrl));
    return {
        curl:"https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=cfcfd8ae-b0be-408d-8e3f-28295615cc97",
        messagetype:"text",
        user: ['all'],
        content:'系统炸了！'
    }
  }

  updateWechetSetting(wechatModel){
    return wechatModel
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
    return ['all']
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

  setAlertTimeCycle(){

  }
  
}