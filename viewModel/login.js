let app = new Vue({
    el: '#app',
    data: {
        username: '',
        password: '',
        error: '',
    },
    methods: {
        getData: function () {
            let self = this;
            reqwest({
                url: 'http://127.0.0.1:8000/api/v1/user_manage/login/'
                , method: 'post'
                , data: {
                    username: self._data.username,
                    password: self._data.password,
                }
                , type: 'json'
                , success: function (data) {
                    if (data) {
                        if(data['code']===200){
                            let token = data['token'];
                            window.location.href = "http://127.0.0.1/fpms/index.html?token=" + token;
                            console.log("ok")
                        } else {
                            alert('登录失败');
                            window.location.href = "./login.html";
                        }

                    } 
                }
            })
        },

        toRegister() {
            window.location.href="./register.html"
        }
    },
    computed: {

    }

})