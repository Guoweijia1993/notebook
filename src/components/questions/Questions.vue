<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>问题分类</el-breadcrumb-item>
      <el-breadcrumb-item>问题列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div class="input-box">
        问题关键字：<el-input placeholder="请输入问题名"
                  prefix-icon="el-icon-search"
                  size="medium"
                  clearable
                  @change="getQuestionsList"
                  v-model="queryInfo.questionSearch">
        </el-input>
        <router-link :to="{name: 'Answer',params: {info: {class_name:classId},classId: classId}}">
          <el-button type="primary">添加</el-button>
        </router-link>
      </div>
      <el-table :data="questionList"
                border
                max-height="473"
                style="width: 100%">
        <el-table-column prop="date"
                         label="序号"
                         type="index"
                         align="center"
                         width="50">
        </el-table-column>
        <el-table-column prop="question"
                         label="问题"
                         width="">
        </el-table-column>
        <!-- <el-table-column prop="class_name"
                         label="分类">
        </el-table-column>
        <el-table-column prop="important"
                         width="50"
                         label="星标">
        </el-table-column> -->
        <el-table-column label="创建日期"
                         width="160">
          <template slot-scope="scope">
            {{scope.row.create_time | formatTime}}
          </template>
        </el-table-column>
        <el-table-column prop="address"
                         label="操作"
                         width="210"
                         align="center">
          <template slot-scope="scope">
            <router-link :to="{name:`Answer`,params:{info:scope.row,look:true,classId: classId}}">
              <el-button size="mini">查看</el-button>
            </router-link>
            <router-link :to="{name:'Answer',params:{info:scope.row,edit:true,classId: classId}}">
              <el-button size="mini"
                         type="primary">编辑</el-button>
            </router-link>
            <el-button size="mini"
                       type="danger"
                       @click="deleteQuestion(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryInfo.pageIndex"
                     :page-sizes="[3, 5, 8, 12]"
                     :page-size="queryInfo.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import mix from './Question-mixins.js'
export default {
  mixins: [mix]
}
</script>
<style lang="less">
.container {
  padding: 20px;
  padding-right: 0;
  box-sizing: border-box;
  width: 100%;
  background: url(../../assets/bg.png) center no-repeat;
  .el-breadcrumb {
    span {
      color: #fff !important;
    }
  }
  .el-card {
    margin-top: 20px;
    height: 94%;
    width: 98%;
    .input-box {
      width: 100%;
      text-align: left;
      .el-input {
        width: 200px;
      }
      .el-button {
        float: right;
      }
    }
    .el-table {
      margin-top: 20px;
      width: 100%;
    }
    .el-pagination {
      margin-top: 20px;
    }
  }
}
</style>
