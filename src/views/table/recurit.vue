<template>
  <div>
    <br />
    <el-form inline>
      <el-form-item label="职位名称">
        <el-input v-model="searchMap.jobname" placeholder="职位名称"></el-input
      ></el-form-item>
      <el-form-item label="薪资范围">
        <el-input v-model="searchMap.salary" placeholder="薪资范围"></el-input
      ></el-form-item>
      <el-form-item label="经验要求">
        <el-input
          v-model="searchMap.condition"
          placeholder="经验要求"
        ></el-input
      ></el-form-item>
      <el-form-item label="学历要求">
        <el-input
          v-model="searchMap.education"
          placeholder="学历要求"
        ></el-input
      ></el-form-item>
      <el-form-item label="办公地址">
        <el-input v-model="searchMap.address" placeholder="办公地址"></el-input
      ></el-form-item>
      <el-form-item label="企业ID">
        <el-input v-model="searchMap.eid" placeholder="企业ID"></el-input
      ></el-form-item>
      <el-form-item label="创建日期">
        <el-input
          v-model="searchMap.createtime"
          placeholder="创建日期"
        ></el-input
      ></el-form-item>
      <el-form-item label="状态">
        <el-input v-model="searchMap.state" placeholder="状态"></el-input
      ></el-form-item>
      <el-form-item label="网址">
        <el-input v-model="searchMap.url" placeholder="网址"></el-input
      ></el-form-item>
      <el-form-item label="标签">
        <el-input v-model="searchMap.label" placeholder="标签"></el-input
      ></el-form-item>
      <el-form-item label="职位描述">
        <el-input v-model="searchMap.content1" placeholder="职位描述"></el-input
      ></el-form-item>
      <el-form-item label="职位要求">
        <el-input v-model="searchMap.content2" placeholder="职位要求"></el-input
      ></el-form-item>

      <el-button @click="fetchData()" type="primary">查询</el-button>
      <el-button @click="handleAdd()" type="primary">新增</el-button>
    </el-form>
<!-- ****************** 001、查询条件结束  ****************** -->

    <el-table :data="dataList" :height="tableHeight" border style="width: 100%">
          <el-table-column prop="id" label="ID" width="80"></el-table-column>
          <el-table-column prop="jobname" label="职位名称" width="80"></el-table-column>
          <el-table-column prop="salary" label="薪资范围" width="80"></el-table-column>
          <el-table-column prop="condition" label="经验要求" width="80"></el-table-column>
          <el-table-column prop="education" label="学历要求" width="80"></el-table-column>
          <el-table-column prop="type" label="任职方式" width="80"></el-table-column>
          <el-table-column prop="address" label="办公地址" width="80"></el-table-column>
          <el-table-column prop="eid" label="企业ID" width="80"></el-table-column>
          <el-table-column prop="createtime" label="创建日期" width="80"></el-table-column>
          <el-table-column prop="state" label="状态" width="80"></el-table-column>
          <el-table-column prop="url" label="网址" width="80"></el-table-column>
          <el-table-column prop="label" label="标签" width="80"></el-table-column>
          <el-table-column prop="content1" label="职位描述" width="80"></el-table-column>
          <el-table-column prop="content2" label="职位要求" width="80"></el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row.id)" type="text" size="small">修改</el-button>
        <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- ****************** 002、数据列表结束  ****************** -->

    <el-pagination
      @size-change="fetchData"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <el-dialog title="编辑" :visible.sync="dialogVisible">
      <el-form label-width="80px">
        <el-form-item label="职位名称"><el-input v-model="pojo.jobname"></el-input></el-form-item>
        <el-form-item label="薪资范围"><el-input v-model="pojo.salary"></el-input></el-form-item>
        <el-form-item label="经验要求"><el-input v-model="pojo.condition"></el-input></el-form-item>
        <el-form-item label="学历要求"><el-input v-model="pojo.education"></el-input></el-form-item>
        <el-form-item label="任职方式">
          <template>
            <el-radio v-model="pojo.type" label="1">全职</el-radio>
            <el-radio v-model="pojo.type" label="2">兼职</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="办公地址"><el-input v-model="pojo.address"></el-input></el-form-item>
        <el-form-item label="企业">         
         
            <el-select v-model="pojo.eid" filterable placeholder="请选择">
              <el-option
                v-for="item in enterpriseList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          
          </el-form-item>
       
        <el-form-item label="状态">
          <el-switch v-model="pojo.state" active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="网址"><el-input v-model="pojo.url"></el-input></el-form-item>
        <el-form-item label="标签"><el-input v-model="pojo.label"></el-input></el-form-item>
        <el-form-item label="职位描述"><el-input v-model="pojo.content1"></el-input></el-form-item>
        <el-form-item label="职位要求"><el-input v-model="pojo.content2"></el-input></el-form-item>

        <el-button type="primary" @click="handleSave()">保存</el-button>
        <el-button @click="dialogFormVisible = false" >关闭</el-button>

    </el-form>
  </el-dialog>
  </div>
</template>

<script>
import recruitApi from "@/api/recruit";
import cityApi from "@/api/city";
export default {
  data() {
    return {
      tableHeight: null,
      tableHeightSuffix: 300,
      dataList: [],
      searchMap: {}, // 查询条件
      total: 0,
      currentPage: 1,
      pageSize: 10,
      queryMap: {},
      dialogVisible: false,
      pojo: {},
      cityList: [],
    };
  },

  created() {
    this.fetchData();
    let that = this;
    that.tableHeight = window.innerHeight - that.tableHeightSuffix;
  },

  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        let heightStyle = that.$refs.tableCot.offsetHeight;
        that.tableHeight = window.innerHeight - that.tableHeightSuffix;
      })();
    };
  },
  methods: {
    
    fetchData() {
      var that = this;

      /* //ES6
            // recruitApi.getList.then(response=>{
            //     that.dataList=response.data;
            // })

            recruitApi.getList().then(function(response){
                // 钩子中，有时候this不顶用，所以使用that转换下
                that.dataList=response.data;
            }) */

      // 分页查询 search(1,10,{})
      recruitApi
        .search(that.currentPage, that.pageSize, that.queryMap)
        .then(function (response) {
          // 钩子中，有时候this不顶用，所以使用that转换下
          that.dataList = response.data.rows;
          that.total = response.data.total;

          // 每次查询或者其他操作完后，需要重新设置下表格高度
          that.tableHeight = window.innerHeight - that.tableHeightSuffix;
        });
    },

    // 切换到某页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },

    handleSave() {
      var that = this;
      recruitApi.save(this.pojo).then((response) => {
        if (response.flag) {
          that.pojo = [];
          that.dialogVisible = false;
          that.fetchData();

          // this.$message({
          //   message: response.message,
          //   type: 'success'
          // });
        }
        // else {
        //   this.$message({
        //     message: response.message,
        //     type: 'error'
        //   });
        // }

        this.$message({
          message: response.message,
          type: response.flag ? "success" : "error",
        });
      });
      //  window.alert("ok123");
    },

    handleAdd() {
      var that = this;
      cityApi.getList().then(function (response) {
        that.cityList = response.data;
        // 初始化
        that.pojo = [];
        that.dialogVisible = true;
      });
    },

    handleEdit(id) {
      var that = this;
      recruitApi.getById(id).then((response) => {
        if (response.flag) {
          that.pojo = response.data;
          if (that.pojo.state) {
            that.pojo.state = "1";
          } else {
            that.pojo.state = "0";
          }
          that.dialogVisible = true;
        }
      });
    },
    handleDelete(id) {
      let that = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          recruitApi.deleteById(id).then((response) => {
            this.$message({
              message: response.message,
              type: response.flag ? "success" : "error",
            });
            that.fetchData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>