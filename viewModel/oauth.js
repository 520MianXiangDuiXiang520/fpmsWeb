function getQueryVariable(variable)
{
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i=0;i<vars.length;i++) {
        let pair = vars[i].split("=");
        if(pair[0] === variable){return pair[1];}
    }
    return false;
}

let vm = new Vue({
   el: "#app",
   data: {
       token: ""
   },
    methods: {
       getToken() {
           let self = this;
           let code = getQueryVariable('code');
           reqwest({
               url: 'http://127.0.0.1:8000/api/v1/user_manage/oauth_by_github/?code=' + code
               , method: 'get'
               , error(err) {
                   alert("请求失败！")
               }
               , success(resp) {
                   console.log("请求成功！");
                   if(resp['code'] === 200) {
                       self.token = resp['data']['token'];
                       window.location.replace("./index.html?token=" + self.token)

                   } else {
                       window.location.replace("./login.html")
                   }

               }
           })
       }
    },
    mounted(){
        this.getToken();

    }
});