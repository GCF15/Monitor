// JavaScript source code

export const newCheckItemRules = {
  age: [
    {
      required: true,
      validator(newCheckItemRules, value) {
        if (!value) {
          return new Error('需要年龄')
        } else if (!/^\d*$/.test(value)) {
          return new Error('年龄应该为整数')
        } else if (Number(value) < 18) {
          return new Error('年龄应该超过十八岁')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  title: [
    {
      required: true,
      message: '请输入密码'
    }
  ]
}