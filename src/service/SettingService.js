//import axios from 'axios'

export default class SettingService {
	getWechatSetting(){	
        return {
            curl:"https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=cfcfd8ae-b0be-408d-8e3f-28295615cc97",
            messagetype:"test",
            user: ['@all']
        }
    }
	
	getMailSetting(){
        
    }

    getPhoneSetting() {
        return {
            url:"http://yzxyytz.market.alicloudapi.com/yzx/voiceNotifySms",
            phone:"13500042947",
            message:"拨通电话测试",
            templateid:"TP2109015",
            appcode:"cc2b702e050c417db4f8a36d35ebfd38"
        }
    }

    getSmsSetting(){
        return {
            url:"http://yzxyytz.market.alicloudapi.com/yzx/NotifySms",
            phone:"13500042947",
            message:"短信消息测试",
            templateid:"TP21090211",
            appcode:"cc2b702e050c417db4f8a36d35ebfd38"
        }
    }

    getRemindAllUser(){
        return ['@Vico','@Sam']
    }
  
}