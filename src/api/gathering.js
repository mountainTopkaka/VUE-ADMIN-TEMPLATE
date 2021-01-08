import request from "@/utils/request"

export default{
    // getList: function(){...}
    getList(){
        return request(
            {
                url:'/gathering/gathering',
                method:'get'
            }
        )
    },

    search(page,size,queryMap){
        // 传统拼接
        /* return request(
            {
                url:'/gathering/gathering/search/'+page+'/'+size,
                method:'post',
                data:queryMap
            }
        ); */

        // ES 6 模板方法
        return request(
            {
                url:`/gathering/gathering/search/${page}/${size}`,
                method:'post',
                data:queryMap
            }
        );
    },
} 
// import gatheringApi from "@/api/gathering"
// gatheringApi.getList


// export function getList(){
//     ...
// }

// import {getList} from "@/api/gathering"