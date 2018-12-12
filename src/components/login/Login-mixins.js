export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  beforeCreate() {
    window.localStorage.clear()
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('login', this.ruleForm)
        console.log(res)
        if (res.code !== 200) {
          if (res.code === 888) return this.$message.error('用户名不存在!')
          if (res.code === 999) return this.$message.error('密码错误!')
          return this.$message.error('登录失败!')
        }
        this.$message.success('登录成功!')
        window.localStorage.setItem('token', res.data.token)
        window.localStorage.setItem('userinfo', JSON.stringify(res.data))
        this.$router.push('/home')
      })
    }
  }
}
