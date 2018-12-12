<template>
  <el-container>
    <el-header>
    </el-header>
    <el-container>
      <el-menu default-active="1"
               :collapse="collapse"
               class="el-menu-vertical-demo"
               text-color="#fff"
               router
               active-text-color="#fff">
        <el-menu-item index="1"
                      route="">
          <i class="el-icon-menu"></i>
          <span slot="title">问题列表</span>
        </el-menu-item>
        <el-menu-item index="2"
                      route="/login">
          <i class="el-icon-loading"></i>
          <span slot="title">退出</span>
        </el-menu-item>
        <!-- 折叠箭头 -->
        <!-- <i class="el-icon-arrow-left"></i> -->
      </el-menu>
      <router-view></router-view>
    </el-container>
  </el-container>
</template>
<script>
import mix from './Home-mixins.js'

export default {
  mixins: [mix]
}
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
  width: 100%;
  .el-header {
    background: url(../../assets/bg.png) center no-repeat;
    background-size: cover;
    transform: rotateZ(180deg);
    height: 60px;
  }
  .el-menu {
    border: none;
    transition: all 0.5s;
    background: url(../../assets/bg.png) center no-repeat;
  }
}
</style>
