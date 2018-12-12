<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>问题详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="问题"
                      prop="question">
          <el-input v-model="ruleForm.question"></el-input>
        </el-form-item>
        <el-form-item label="分类"
                      prop="region">
          <el-select v-model="ruleForm.className"
                     filterable
                     placeholder="请选择">
            <el-option v-for="item in classList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="答案"
                      prop="desc">
          <quill-editor v-model="ruleForm.analyse"
                        ref="myQuillEditor"
                        :options="editorOption">
          </quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-if="!look" @click="submitForm('ruleForm')">{{edit?'更新':'立即创建'}}</el-button>

          <el-button @click="resetForm('ruleForm')">返回</el-button>

        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import mix from './Answer-mixins.js'
export default {
  mixins: [mix]
}
</script>
<style lang="less" scoped>
.container {
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  .el-card {
    margin-top: 20px;
    height: 94%;
    overflow-y: auto;
    .el-form {
      .el-select {
        width: 100%;
      }
    }
  }
}
</style>
