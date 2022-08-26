export const func={
  //电话、短信的名称、号码验证
  /*
    existphones:[]  已添加的号码
    isnew:boolean   是否是新建
  */
  validator_phone:function(existphones,isnew){
    return {
      name: [
        {
          required: true,
          validator(rule, value) {
            console.log(value)
            if (!value) {
              return new Error("请输入名称");
            } 
            return true;
          },
          trigger: ["input", "blur"]
        }
      ],
      phone: [
        {
          required: true,
          validator(rule, value) {
            //不能输入重复号码
            var isExist=false
            for (var i = 0; i < existphones.length;i++){
              if (existphones[i].phone===value){
                isExist=true
                break
              }
            }
            
            const reg = /^1[3456789]\d{9}$/;
            if (!value) {
              return new Error("请输入电话号码！");
            }
            else if (!reg.test(value)) {
              return new Error("请输入正确的号码！");
            } else if (isnew && isExist){
              return new Error("号码已存在！");
            }
            return true;
          },
          trigger: ["input", "blur"]
        }
      ]
    }
  },
  
  //电话、短信的名称、号码验证-添加email
  /*
    existemails:[]  已添加的email
    isnew:boolean   是否是新建
  */
  validator_email: function(existemails,isnew) {
    return {
      recipient: [
        {
          required: true,
          validator(rule, value) {
            console.log(value)
            if (!value) {
              return new Error("请输入收件人");
            } 
            return true;
          },
          trigger: ["input", "blur"]
        }
      ],
      to: [
        {
          required: true,
          validator(rule, value) {
            //不能输入重复邮箱
            var isExist = false
            for (var i = 0; i < existemails.length; i++) {
              if (existemails[i].to === value) {
                isExist = true
                break
              }
            }
            
            const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
            if (!value) {
              return new Error("请输入邮箱！");
            }
            else if (!reg.test(value)) {
              return new Error("请输入正确的邮箱！");
            } else if (isnew && isExist) {
              return new Error("邮箱已存在！");//输入新建且已存在
            }
            return true;
          },
          trigger: ["input", "blur"]
        }
      ],
      subject: [
        {
          required: true,
          validator(rule, value) {
            console.log(value)
            if (!value) {
              return new Error("请输入邮件主题");
            } 
            return true;
          },
          trigger: ["input", "blur"]
        }
      ],
      body: [
        {
          required: true,
          validator(rule, value) {
            console.log(value)
            if (!value) {
              return new Error("请输入发送消息");
            } 
            return true;
          },
          trigger: ["input", "blur"]
        }
      ],
    }
  }
  
            
};
  
export const rules_wecom = {
  name: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error("请输入名称");
        } 
        return true;
      },
      trigger: ["input", "blur"]
    }
  ],
  webhookUrl: [
    {
      required: true,
      validator(rule, value) {
        const reg = /^https:\/\/qyapi.weixin.qq.com\/cgi-bin\/webhook\/send\?key=+([-a-zA-Z0-9]{36})$/;
        var res = reg.test(value)
        if (!value) {
          return new Error("群聊机器人webhookUrl！");
        }
        else if (!res) {
          return new Error("机器人webhookUrl似乎不正确！");
        }
        return true;
      },
      trigger: ["input", "blur"]
    }
  ]
};