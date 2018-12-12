<template>
  <div class="container">
    <div class="login-form">
      <el-form :model="ruleForm"
               hide-required-asterisk
               status-icon
               :rules="rules"
               ref="ruleForm"
               label-width="40px"
               class="demo-ruleForm">
        <el-form-item label="账号"
                      prop="username">
          <el-input v-model="ruleForm.username"
                    clearable
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input type="password"
                    v-model="ruleForm.password"
                    clearable
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login('ruleForm')">登&nbsp;&nbsp;录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import mix from './Login-mixins.js'
export default {
  mixins: [mix]
}
</script>

<style lang="less">
.container {
  width: 100%;
  height: 100%;
  position: relative;
  background: url(../../assets/bg.png) center no-repeat;
  background-size: cover;
  .login-form {
    width: 400px;
    height: 500px;
    // background-color: rgba(255, 255, 255, 0.1);
    position: absolute;
    top: 50%;
    left: 20%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    padding: 40px;
    box-sizing: border-box;
    // border: 1px solid #fff;
    .el-form {
      width: 100%;
      margin-top: 80px;
      label {
        color: #fff;
      }
      .el-input {
        .el-input__inner {
          background-color: unset;
          color: #fff;
          border-radius: 10px;
        }
      }
      .el-button {
        background-color: unset;
        color: #fff;
        width: 100%;
        border-radius: 10px;
      }
    }
  }
}
</style>
