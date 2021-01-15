<template>
<div>
  <br>
    <el-form inline>
      <el-form-item label="活动名称" >
        <el-input placeholder="活动名称" v-model="queryMap.name"></el-input>
      </el-form-item>

      <el-form-item label="活动时间">
        <el-date-picker type="date" placeholder="选择日期" v-model="queryMap.starttimeBegin" ></el-date-picker>
        <el-date-picker type="date" placeholder="选择日期" v-model="queryMap.starttimeEnd"  ></el-date-picker>
      </el-form-item>

      <el-button @click="fetchData()" type="primary">查询</el-button>
      <el-button @click="handleAdd()" type="primary">新增</el-button>
    </el-form>

    <el-table
    :data="dataList"
    :height="tableHeight"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="活动ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="活动名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="sponsor"
      label="主办方">
    </el-table-column>

    <el-table-column
      prop="address"
      label="活动地址">
    </el-table-column>

    <el-table-column
      prop="starttime"
      label="开始日期">
    </el-table-column>

    <el-table-column
      prop="endtime"
      label="结束日期">
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row.id)" type="text" size="small">编辑</el-button>
        <!-- <el-button type="text" size="small">编辑</el-button> -->
      </template>
    </el-table-column>

  </el-table>

  <el-pagination
      @size-change="fetchData"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog
      title="编辑" :visible.sync="dialogVisible"
    >
      <el-form label-width="80px">
        <el-form-item label="活动名称"> 
          <el-input v-model="pojo.name" placeholder="活动名称" />
        </el-form-item>

        <el-form-item label="主办方"> 
          <el-input v-model="pojo.sponsor" placeholder="主办方" />
        </el-form-item>

        <el-form-item label="活动地址"> 
          <el-input v-model="pojo.address" placeholder="活动地址" />
        </el-form-item>


        <el-form-item label="开始日期"> 
          <el-date-picker type="date" v-model="pojo.starttime" placeholder="开始日期" />
        </el-form-item>


        <el-form-item label="结束日期"> 
          <el-date-picker type="date" v-model="pojo.endtime" placeholder="结束日期" />
        </el-form-item>


        <el-form-item label="活动详情"> 
          <el-input type="textarea" v-model="pojo.detail" placeholder="活动详情" />
        </el-form-item>

        <el-form-item label="选择城市">
          <el-select v-model="pojo.city"  placeholder="选择城市">
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

        <el-form-item label="是否可见"> 
          <el-switch active-value="1" inactive-value="0" v-model="pojo.state" />
        </el-form-item>
        
        <el-form-item>
          <el-button @click="handleSave()" type="primary">保存</el-button>
          <el-button @click="dialogVisible = false" >关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

</div>
</template>

<script>
import gatheringApi from '@/api/gathering'
import cityApi from '@/api/city'
export default {
    data(){
        return{
            tableHeight:null,
            tableHeightSuffix:170,
            dataList:[],
            total:0,
            currentPage:1,
            pageSize:10,
            queryMap:{},
            dialogVisible:false,
            pojo:{},
            cityList:[]
        }
        
    },

    created(){
      debugger;
        this.fetchData();
        let that = this
        that.tableHeight = window.innerHeight-that.tableHeightSuffix;
    },

    mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        let heightStyle = that.$refs.tableCot.offsetHeight
        that.tableHeight = window.innerHeight-that.tableHeightSuffix;
      })()
    }
  },
    methods:{
        fetchData() {

            var that=this;

            /* //ES6
            // gatheringApi.getList.then(response=>{
            //     that.dataList=response.data;
            // })

            gatheringApi.getList().then(function(response){
                // 钩子中，有时候this不顶用，所以使用that转换下
                that.dataList=response.data;
            }) */
            
            // 分页查询 search(1,10,{})
            gatheringApi.search(that.currentPage,that.pageSize,that.queryMap).then(function(response){
                // 钩子中，有时候this不顶用，所以使用that转换下
                that.dataList=response.data.rows;
                that.total = response.data.total;

                // 每次查询或者其他操作完后，需要重新设置下表格高度
                that.tableHeight = window.innerHeight-that.tableHeightSuffix;

            }) 
        },
        handleCurrentChange(val) {
          this.currentPage=val;
          this.fetchData();
        },
        
        handleSave() {
          var that = this;
          gatheringApi.save(this.pojo).then(response=>{
            if(response.flag) {
              that.pojo=[];
              that.dialogVisible=false;
              that.fetchData();
            }
          });
        },

        handleAdd() {
          var that = this;
          cityApi.getList().then(function(response){
            that.cityList=response.data;
            // 初始化
            that.pojo=[];
            that.dialogVisible = true;
          });
        },

        handleEdit(id){
          var that = this;
          gatheringApi.getById(id).then(response=>{
            if(response.flag) {
              that.pojo = response.data;
              if(that.pojo.state) {
                that.pojo.state="1";
              } else {
                that.pojo.state="0";
              }
              that.dialogVisible=true;
            }
            
          }); 
        }
    }

}
</script>