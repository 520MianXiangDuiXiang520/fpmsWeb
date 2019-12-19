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
        username: '',
        uesrid: '',
        userToken: '',
        family: '',
        userinfo: {}
    },
    methods: {
        getinfo() {
            /**
             * 获取用户信息
             */
            console.log("请求成功");
            let self = this;
            let token = getQueryVariable('token');
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
                        console.log("请求成功" + resp);
                        self.userinfo = resp;
                        self.username = resp['username'];
                        self.uesrid = resp['id'];
                        self.userToken = token;
                        self.family = resp['family1'];
                        let main = document.getElementById('main');
                        main.innerHTML = ("<iframe frameborder = 0 width = 100% height=100%" +
                            " src = 'http://127.0.0.1/FPMS/data.html?token="+ token +"' ></iframe >")
                    }
                });
            }
        },
        tologin() {
            /**
             * 重定向到登录页面
             * @type {string}
             */
            window.location.href = "http://127.0.0.1/fpms/login.html"
        },

        toregister() {
            /**
             * 重定向到注册页面
             * @type {string}
             */
            window.location.href = "http://127.0.0.1/fpms/register.html"
        },

        innerUserInfo() {
            /**
             * 查看和修改用户信息
             * @type {HTMLElement}
             */
            let main = document.getElementById('main')
            main.innerHTML = ("<iframe frameborder = 0 width = 100% height=1000 marginheight = 0 marginwidth = 0 scrolling = no" +
                " src = 'http://127.0.0.1/fpms/userinfo.html?token="+ this.userToken +"' ></iframe >")
        },

        logout() {
            /**
             * 注销登录
             * @type {methods}
             */
            let self = this;
            reqwest({
                url: 'http://127.0.0.1:8000/api/v1/user_manage/logout/?token=' + self.userToken
                , type: 'json'
                , method: 'delete'
                , contentType: 'application/json'
                , error: function (err) {
                    console.log(this.url + "请求失败")
                }
                , data: {
                    token: self.userToken
                }
                , success: function (resp) {
                    if(resp.code === 200){
                        alert("登出成功");
                        self.userToken = '';
                        self.username = '';
                        self.uesrid = '';
                        window.location.replace("http://127.0.0.1/fpms/index.html")
                    }
                    else if(resp.code === 400)
                        alert("登出失败")
                }
            })
        },

        innerMessage() {
            /**
             * 用户消息页面
             * @type {HTMLElement}
             */
            let main = document.getElementById('main');
            main.innerHTML = ("<iframe frameborder = 0 width = 100% height=100%" +
                " src = 'http://127.0.0.1/fpms/message.html?token="+ this.userToken +"' ></iframe >")
        },

        innerMoneyManage() {
            let main = document.getElementById('main');
            main.innerHTML = ("<iframe frameborder = 0 width = 100% height=100%" +
                " src = 'http://127.0.0.1/fpms/moneyManage.html?token="+ this.userToken +"' ></iframe >")
        },

        innerFamily() {
            let main = document.getElementById('main');
            main.innerHTML = ("<iframe frameborder = 0 width = 100% height=100%" +
                " src = 'http://127.0.0.1/fpms/family.html?token="+ this.userToken +"' ></iframe >")
        },
        innerData() {

        }
    },
    computed(){

    },
    mounted(){
        this.getinfo();
    }
});