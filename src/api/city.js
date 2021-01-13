import request from "@/utils/request"

export default{
    // getList: function(){...}
    getList(){
        return request(
            {
                url:'/base/city',
                method:'get'
            }
        )
    }
}