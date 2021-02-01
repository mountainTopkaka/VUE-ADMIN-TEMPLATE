import request from "@/utils/request"

const url_group = 'recruit'
const url_api = 'enterprise';

export default{
    // getList: function(){...}
    getList(){
        return request(
            {
                url:`/${url_group}/${url_api}`,
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
                url:`/${url_group}/${url_api}/search/${page}/${size}`,
                method:'post',
                data:queryMap
            }
        );
    },

    getById(id){
        // ES 6 模板方法
        return request(
            {
                url:`/${url_group}/${url_api}/${id}`,
                method:'get',
            }
        );
    },

    save(pojo) {
        return request(
            {
                url:`/${url_group}/${url_api}`,
                method:'post',
                data:pojo
            }
        );
    },

    deleteById(id){
        // ES 6 模板方法
        return request(
            {
                url:`/${url_group}/${url_api}/${id}`,
                method:'delete',
            }
        );
    }
} 
// import gatheringApi from "@/api/gathering"
// gatheringApi.getList


// export function getList(){
//     ...
// }

// import {getList} from "@/api/gathering"