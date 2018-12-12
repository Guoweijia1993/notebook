export default {
  data() {
    return {
      classList: [],
      newClass: '',
      classSearch: '',
      classToggle: false,
      activeMenu: ''
    }
  },
  created() {
    this.getClassList()
    this.activeMenu = this.$route.params.classId
  },
  watch: {
    $route: 'classClose'
  },
  methods: {
    classClose() {
      if (this.$route.path === '/answer') return (this.classToggle = true)
      else this.classToggle = false
      this.activeMenu = this.$route.params.classId
    },
    // 获取分类列表
    async getClassList() {
      const { data: res } = await this.$http.post('getclasslist', { keyWord: this.classSearch })
      if (res.code !== 200) return this.$message.error('获取分类列表失败!')
      this.classList = res.data.reverse()
      this.$store.commit('saveClassList', this.classList)
    },
    // 新增分类
    async addClass() {
      try {
        const res = await this.$prompt('请输入分类名', {
          confirmButtonText: '添加分类',
          cancelButtonText: '取消',
          inputErrorMessage: '分类名不能为空!',
          inputPattern: /\S/
        })
        this.newClass = res.value
      } catch (e) {
        return
      }
      const { data: res } = await this.$http.post('addClass', { className: this.newClass })
      if (res.code !== 200) return this.$message.error('添加分类失败!')
      this.$message.success('添加分类成功!')
      this.getClassList()
    },
    // 修改分类
    async editClass(item) {
      try {
        const res = await this.$prompt('请输入分类名', {
          confirmButtonText: '修改',
          cancelButtonText: '取消',
          inputValue: item.class_name,
          inputErrorMessage: '分类名不能为空!',
          inputPattern: /\S/
        })
        this.newClass = res.value
      } catch (e) {
        return false
      }
      const { data: res } = await this.$http.post('editClass', {
        classId: item.id,
        className: this.newClass
      })
      if (res.code !== 200) return this.$message.error('修改分类失败!')
      this.$message.success('修改成功!')
      this.getClassList()
    },
    // 删除分类
    async deleteClass(item) {
      this.$confirm('此操作将永久删除该分类，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const { data: res } = await this.$http.post('deleteClass', { classId: item.id })
          if (res.code !== 200) return this.$message.error('删除分类失败!')
          this.$message.success('删除成功!')
          this.getClassList()
        })
        .catch(() => {
          return false
        })
    }
  }
}
