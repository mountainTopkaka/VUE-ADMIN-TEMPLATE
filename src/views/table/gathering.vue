<template>
    <el-table
    :data="dataList"
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
</template>

<script>
import gatheringApi from '@/api/gathering'

export default {
    data(){
        return{
            dataList:[],
            total:0,
            currentPage:1,
            pageSize:10,
            queryMap:{}
        }
        
    },
    created(){
        this.fetchData()
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
            debugger;
            gatheringApi.search(that.currentPage,that.pageSize,that.queryMap).then(function(response){
                // 钩子中，有时候this不顶用，所以使用that转换下
                that.dataList=response.data.rows;
                that.total = response.data.total;
            }) 
        }
    }

}
</script>