<template>
  <el-container>
    <div class="box"
         :style="{'width':classToggle?'0px':'280px'}">
      <div class="header">
        <el-input placeholder="请输入分类名"
                  prefix-icon="el-icon-search"
                  size="medium"
                  clearable
                  @change="getClassList"
                  v-model="classSearch">
        </el-input>
        <el-button circle
                   plain
                   icon="el-icon-plus"
                   size="mini"
                   @click="addClass"></el-button>
      </div>
      <div class="body" :style="{'overflow-y':classToggle?'auto':'auto'}">
        <el-menu :default-active="activeMenu"
                 router>
          <el-menu-item :index="item.id + ''"
                        :route="item.id + ''"
                        v-for="item of classList"
                        :key="item.id">
            <span style="float:left;margin-left:10px;"
                  slot="title">{{item.class_name}}</span>
            <!-- 删除 -->
            <el-button v-if="$route.params.classId ==item.id"
                       icon="el-icon-circle-close-outline"
                       @click="deleteClass(item)"></el-button>
            <!-- 修改 -->
            <el-button v-if="$route.params.classId ==item.id"
                       icon="el-icon-edit-outline"
                       @click="editClass(item)"></el-button>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <router-view></router-view>
  </el-container>
</template>

<script>
import mix from './Class-mixins.js'
export default {
  mixins: [mix]
}
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
  .box {
    width: 230px;
    transition: all 0.5s;
  }
  .header {
    height: 60px;
    line-height: 60px;
    border: 1px solid #eee;
    overflow: hidden;
    .el-input {
      width: 180px;
    }
    .el-button {
      margin-left: 10px;
    }
  }
  .body {
    overflow-x: hidden;
    height: 91%;
  }
  .el-menu {
    width: 230px;
    height: 100%;
    .el-button {
      padding: 0;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      float: right;
      margin-right: 0px;
      border: none;
      margin-top: 15px;
      background-color: unset;
    }
  }
}
</style>
