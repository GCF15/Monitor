import axios from 'axios'

export default class SettingService {

  //获取所有报警方式
  getAllAlarmRule(){
    return (axios.get("http://192.168.158.17:30872/api/Alarm"));
  }
    
  //获取所有电话方式电话号码
  getAllNumbersByPhone(){
    return (axios.get("http://192.168.158.17:30872/api/PhoneOrMessage"));
  }
  
  //获取所有邮箱
  getAllEmails(){
    return (axios.get("http://192.168.158.17:30872/api/Email"));
  }
  
  //开启/关闭
  updateAlarmRule(selectType,isSelect){
    var selectMethod=0
    switch(selectType){
      case 'phone':
        selectMethod=3
        break
        case 'sms':
          selectMethod=4
          break
        case 'mail':
          selectMethod=2
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

  //添加企业微信
  addWeComText(model){
    return (axios.post("http://192.168.158.17:30872/api/WeComText/Add", model));
  }
  
  //添加电话号码
  addNumberForPhone(model){
    console.log(model)
    return (axios.post("http://192.168.158.17:30872/api/PhoneOrMessage/Add", model));
  }
  
  //添加邮箱
  addEmail(model){
    return (axios.post("http://192.168.158.17:30872/api/Email/Add",model))
  }
  
  //删除邮箱
  deleteEmail(id){
    return (axios.get("http://192.168.158.17:30872/api/Email/Delete/"+id))
  }

  //更新企业微信
  updateWeComText(item){
    return (axios.post("http://192.168.158.17:30872/api/WeComText/Update", item));
  }
  
  //更新电话Or短信
  updateNumberForPhone(item) {
    return (axios.post("http://192.168.158.17:30872/api/PhoneOrMessage/Update", item));
  }
  
  //更新邮箱
  editEmail(item){
  console.log(item)
    return (axios.post("http://192.168.158.17:30872/api/Email/Update", item));
  }
  
  deleteWeConText (id){
    return (axios.get("http://192.168.158.17:30872/api/WeComText/Delete/"+id))
  }
  
  deleteNumberForPhone(id){
    return (axios.get("http://192.168.158.17:30872/api/PhoneOrMessage/Delete/"+id))
  }
  
  getAllWeComText(){
    return (axios.get("http://192.168.158.17:30872/api/WeComText"))
  }
  
  //测试企业微信
  testWeComtext(model){
    var body= model.message
    //console.log(body)
    var url="http://192.168.158.17:30346/api/Alarm/WeComText?webhookUrl="+model.webhookUrl
    return (axios.post(url, body))
  }
  
  //测试电话Or短信
  testPhoneOrSms(model){
    return (axios.post("http://192.168.158.17:30346/api/Alarm/PhoneOrMessage",model))
  }
  
  //测试邮箱
  testEmail(model){
    console.log(model)
    return (axios.post("http://192.168.158.17:30346/api/Alarm/Email",model))
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