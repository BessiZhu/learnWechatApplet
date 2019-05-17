// 传参形式
// obj = {
//     url:'',
//     success: function(res){}
// }

// 封装请求数据函数
var baseUrl = 'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine';
function request(params){
    wx.request({
        url: baseUrl + params.url,
        success:function(res){
            if(res.data.code == 0){
                params.success(res.data.data);
            }else{
                showError();
            }
        },
        fail:function(){
            showError()
        }
    })
}

function showError(){
    wx.showToast({
        title: "请求错误",
        icon: "none"
    })
}

module.exports = request;





// 优化后

/*function request(url, success, method='GET', data={}){
    wx.request({
        url: baseUrl + url,
        method: method,
        data: data,
        success:function(res){
            if(res.data.code == 0){
                success(res.data.data);
            }else{
                showError();
            }
        },
        fail:function(){
            showError()
        }
    })
}*/


// function request(params){
    
//     if(!params.method){
//         params.method = 'GET'
//     }
//     if(!params.data){
//         params.data = {}
//     }
//     wx.request({
//         url: baseUrl + params.url,
//         method: params.method,
//         data: params.data,
//         success:function(res){
//             if(res.data.code == 0){
//                 params.success(res.data.data);
//             }else{
//                 showError();
//             }
//         },
//         fail:function(){
//             showError()
//         }
//     })
// }
