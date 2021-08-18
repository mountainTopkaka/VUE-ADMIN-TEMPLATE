<template>
  <div>
    <br />
    
    <!-- ******************  001、查询条件开始  ****************** -->
    <el-form inline>
      <el-form-item label="企业名称">
        <el-input placeholder="企业名称" v-model="queryMap.name"></el-input>
      </el-form-item>
      <el-button @click="fetchData()" type="primary">查询</el-button>
      <el-button @click="handleAdd()" type="primary">新增</el-button>
    </el-form>
    <!-- ****************** 001、查询条件结束  ****************** -->

    <!-- ****************** 002、数据列表开始  ****************** -->
    <el-table :data="dataList" :height="tableHeight" border style="width: 100%">
      <el-table-column prop="id" label="企业ID" width="180"> </el-table-column>
      <el-table-column prop="name" label="企业名称" width="180">  </el-table-column>
      <el-table-column prop="summary" label="企业简介"> </el-table-column>

      <el-table-column prop="address" label="企业地址"> </el-table-column>

      <el-table-column prop="labels" label="标签列表"> </el-table-column>

      <el-table-column prop="ishot" label="热门企业"> </el-table-column>
      <el-table-column prop="logo" label="LOGO"> </el-table-column>
      <el-table-column prop="jobcount" label="职位数"> </el-table-column>
      <el-table-column prop="url" label="URL"> </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row.id)" type="text" size="small"
            >编辑</el-button
          >
          <el-button
            @click="handleDelete(scope.row.id)"
            type="text"
            size="small"
            >删除</el-button
          >

          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- ****************** 002、数据列表结束  ****************** -->
    <!-- ****************** 002.1、分页控件开始  ****************** -->
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
    <!-- ****************** 002.1、分页控件结束  ****************** -->


    <!-- ****************** 003、点击新增、编辑后弹出窗界面开始  ****************** -->
    <el-dialog title="编辑" :visible.sync="dialogVisible">
      <el-form label-width="80px">
        <el-form-item label="企业名称">
          <el-input v-model="pojo.name" placeholder="企业名称" />
        </el-form-item>

        <el-form-item label="企业简介">
          <el-input type="textarea" :rows="4" v-model="pojo.summary" placeholder="企业简介" />
        </el-form-item>

        <el-form-item label="企业地址">
          <el-input v-model="pojo.address" placeholder="企业地址" />
        </el-form-item>

        <el-form-item label="标签列表">
          <el-input  v-model="pojo.labels" placeholder="企业简介" />
        </el-form-item>
        <el-form-item label="是否热门">
          <el-switch v-model="pojo.ishot" active-value="1" inactive-value="0"/>
        </el-form-item>
        <el-form-item label="LOGO">
          <!-- <el-input  v-model="pojo.logo" placeholder="LOGO" /> -->
          <el-upload 
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="职位数">
          <el-input  v-model="pojo.jobcount" placeholder="职位数" />
        </el-form-item>
        <el-form-item label="URL">
          <el-input  v-model="pojo.url" placeholder="url" >
          <template slot="prepend">http://</template>
          </el-input>
        </el-form-item>

        <el-form-item label="选择城市">
          <el-select v-model="pojo.city" placeholder="选择城市">
            <!-- : v-bind的缩写，会变化的属性一般会添加冒号 -->
            <el-option
              v-for="item in cityList"
              :key="item.id"
              :label="item.name"
              v-bind:value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button @click="handleSave()" type="primary">保存</el-button>
          <el-button @click="dialogVisible = false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- ****************** 003、点击新增、编辑后弹出窗界面结束  ****************** -->


  </div>
</template>

<script>
import enterpriseApi from "@/api/enterprise";
import cityApi from "@/api/city";
export default {
  data() {
    return {
      tableHeight: null,
      tableHeightSuffix: 170,
      dataList: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      queryMap: {},
      dialogVisible: false,
      pojo: {},
      cityList: [],
      imageUrl: ''
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
      debugger;
      var that = this;

      /* //ES6
            // enterpriseApi.getList.then(response=>{
            //     that.dataList=response.data;
            // })

            enterpriseApi.getList().then(function(response){
                // 钩子中，有时候this不顶用，所以使用that转换下
                that.dataList=response.data;
            }) */

      // 分页查询 search(1,10,{})
      enterpriseApi
        .search(that.currentPage, that.pageSize, that.queryMap)
        .then(function (response) {
          // 钩子中，有时候this不顶用，所以使用that转换下
          that.dataList = response.data.rows;
          that.total = response.data.total;

          // 每次查询或者其他操作完后，需要重新设置下表格高度
          that.tableHeight = window.innerHeight - that.tableHeightSuffix;
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },

    handleSave() {
      var that = this;
      debugger;
      enterpriseApi.save(this.pojo).then((response) => {
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
        that.imageUrl='';
        that.dialogVisible = true;
      });
    },

    handleEdit(id) {
      var that = this;
      enterpriseApi.getById(id).then((response) => {
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
          enterpriseApi.deleteById(id).then((response) => {
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
    

    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.pojo.logo = this.imageUrl;
    },

    beforeAvatarUpload(file) {
        let isJPG = file.type === 'image/jpeg';
        if(!isJPG) {
          isJPG = file.type==='image/png';
        }
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  },
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 50px;
    display: block;
  }
</style>