let app = new Vue({
    el: '#app',
    data: {
        message: '',
        username: '',
        password: '',
        pwdagain: '',
        error: '',
        state: 'error',
        username_error: "",
        isa: '',
        isb: '',
        isc: '',
    },
    methods: {
        isPasswordTrue() {
            console.log(this.isa && this.isb && this.isc);
            if (app.$data.password.length < 8) {
                app.$data.error = "密码长度小于8位";
                this.isa = false;
            } else if (app.$data.password.length >= 8 && app.$data.password.search("[a-zA-Z]") < 0){
                app.$data.error = "密码必须包含字母";
                this.isa = false;
            } else {
                app.$data.error = "";
                this.isa = true;
            }
            console.log(this.isa);
        },
        isUserNameTrue() {

            if (app.$data.username.length < 1) {
                app.$data.error = "用户名至少1个字符";
                this.isb = false;
            } else {
                this.isb = true;
                app.$data.error = "";
            }
            console.log(this.isb);
        },
        isPWDTrue() {
            // console.log(this.isa && this.isb && this.isc);
            if (this.pwdagain !== this.password) {
                app.$data.error = "两次密码不一致";
                this.isc = false;
            } else {
                app.$data.error = "";
                this.isc = true;
            }
            console.log(this.isc);
        },
        getData: function () {
            let self = this;
            reqwest({
                url: 'http://127.0.0.1:8000/api/v1/user_manage/register/'
                , method: 'post'
                , data: {
                    username: self._data.username,
                    password: self._data.password,
                    pwdagain: self._data.pwdagain }
                , type: 'json'
                , success: function (data) {
                    console.log(data);
                    if (data.code === 200 && data.msg === 'ok') {
                        // 登录
                        window.location.href = 'http://127.0.0.1/fpms/index.html?token=' + data.token;
                        console.log("ok");
                        self._data.state = data.state
                    } else {
                        self._data.state = data.state;
                        console.log(data);
                        self._data.username_error = data['msg'];
                    }
                }
            })
        },


    },
    computed: {
    
    }
    
})