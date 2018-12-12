export default {
  data() {
    return {
      classList: [],
      edit: this.$route.params.edit,
      look: this.$route.params.look,
      editorOption: {
        placeholder: '请输入内容',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['code-block'],
            [{ color: [] }, { background: [] }, 'image'],
            [{ align: [] }]
          ]
        }
      },
      ruleForm: {
        question: this.$route.params.info.question,
        className: parseInt(this.$route.params.classId),
        analyse: this.$route.params.info.analyse,
        questionId: this.$route.params.info.id
      },
      rules: {
        question: [{ required: true, message: '请输入问题描述', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getClassList()
    console.log(this.$route.params)
  },
  methods: {
    getClassList() {
      const list = this.$store.state.classList
      list.map(item => {
        this.classList.push({ value: item.id, label: item.class_name })
      })
      console.log(this.classList)
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) {
          console.log('error submit!!')
          return false
        }
        const { data: res } = await this.$http.post('addQuestion', this.ruleForm)
        if (this.ruleForm.questionId) {
          if (res.code !== 200) {
            if (res.code === 767) {
              return this.$message.error('请检查代码段是否有单引号(\'\'),请改为双引号("")')
            }
            return this.$message.error('修改问题失败!')
          }
          this.$message.success('修改问题成功!')
        } else {
          if (res.code !== 200) {
            if (res.code === 767) {
              return this.$message.error('请检查代码段是否有单引号(\'\'),请改为双引号("")')
            }
            return this.$message.error('添加问题失败!')
          }
          this.$message.success('添加问题成功!')
        }
        this.$router.push(`/questions/${this.ruleForm.className}`)
      })
    },
    resetForm(formName) {
      this.$router.push(`/questions/${this.ruleForm.className}`)
    }
  }
}
