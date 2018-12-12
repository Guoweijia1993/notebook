export default {
  data() {
    return {
      questionList: [],
      classId: 1,
      queryInfo: {
        classId: 1,
        pageIndex: 1,
        pageSize: 5,
        questionSearch: ''
      },
      total: 0
    }
  },
  created() {
    this.getQuestionsList()
  },
  watch: {
    $route: 'getQuestionsList'
  },
  methods: {
    handleSizeChange(Size) {
      this.queryInfo.pageSize = Size
      this.getQuestionsList()
    },
    handleCurrentChange(Index) {
      this.queryInfo.pageIndex = Index
      this.getQuestionsList()
    },
    async getQuestionsList() {
      this.classId = this.$route.params.classId
      this.queryInfo.classId = this.$route.params.classId
      const { data: res } = await this.$http.post('getquestionslist', this.queryInfo)
      console.log(res)
      if (res.code !== 200) return this.$message.error('获取问题列表失败!')
      this.questionList = res.data
      this.total = res.total
    },
    deleteQuestion(info) {
      console.log(info)
      this.$confirm('此操作将永久删除该问题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const { data: res } = await this.$http.post('deleteQuestion', { questionId: info.id })
          if (res.code !== 200) return this.$message.error('删除问题失败!')
          this.$message.success('删除成功!')
          this.getQuestionsList()
        })
        .catch(() => {
          return false
        })
    }
  }
}
