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

</div>
</template>

<script>
import gatheringApi from '@/api/gathering'

export default {
    data(){
        return{
            tableHeight:null,
            tableHeightSuffix:170,
            dataList:[],
            total:0,
            currentPage:1,
            pageSize:10,
            queryMap:{}
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

                that.tableHeight = window.innerHeight-that.tableHeightSuffix;

            }) 
        },
        handleCurrentChange(val) {
          this.currentPage=val;
          this.fetchData();
        }
    }

}
</script>