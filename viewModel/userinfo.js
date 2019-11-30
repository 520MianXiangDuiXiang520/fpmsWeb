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
    el: '#app',
    data: {
        userID: '',  // 用于参数传递，不会展示给用户
        userinfo: [],
        userToken: '',
        // TODO:如果后端增加了新字段，要改这里
        username: 'null',
        email: 'null',
        telephone: 'null',
        sex: 'null',
        changeUsername: '',
        ChangeEmail: '',
        changeTelephone: '',
        changeSex: ''
    },
    methods: {
        getinfo() {
            let self = this;
            let token = getQueryVariable('token');
            this.userToken = token;
            if(token) {
                reqwest({
                    url: 'http://127.0.0.1:8000/api/v1/user_manage/user_info/?token=' + token
                    , type: 'json'
                    , method: 'get'
                    , contentType: 'application/json'
                    , error: function (err) {
                        console.log(this.url + "请求失败")
                    }
                    , success: function (resp) {
                        self.userID = resp['id'];
                        self.username = resp['username'];
                        self.telephone = resp['telephone'];
                        self.sex = resp['sex'] === 1 ? "女" : "男";
                        self.email = resp['email'];
                        console.log(self.userinfo)
                    }
                })
            }
        },
        changeInfo() {
            let self = this;
            reqwest({
                url: 'http://127.0.0.1:8000/api/v1/user_manage/user_info/?token=' + self.userToken
                , type: 'json'
                , method: 'put'
                , contentType: 'application/json'
                , error: function (err) {
                    console.log(this.url + "请求失败")
                }
                , data: {
                    telephone: self.changeTelephone,
                    sex: self.changeSex,
                    email: self.ChangeEmail,
                }
                , success: function (resp) {
                    if(resp.code === 200){
                        alert("修改成功");
                        self.userID = resp['id'];
                        self.username = resp['username'];
                        self.telephone = resp['telephone'];
                        self.sex = resp['sex'] === 1 ? "女" : "男";
                        self.email = resp['email'];
                    }
                    else if(resp.code === 400)
                        alert("修改失败")
                }
            })
        },
    },
    computed: {

    },
    mounted(){
        this.getinfo();
    }
});