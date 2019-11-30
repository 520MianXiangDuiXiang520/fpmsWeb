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
        userID: '',
        userToken: '',
        messages: [],
        messageID: '',
    },
    methods: {
        getinfo() {
            let self = this;
            let token = getQueryVariable('token');
            this.userToken = token;
            if (token) {
                reqwest({
                    url: ' http://127.0.0.1:8000/api/v1/message/?token=' + token
                    , type: 'json'
                    , method: 'get'
                    , contentType: 'application/json'
                    , error: function (err) {
                        console.log(this.url + "请求失败")
                    }
                    , success: function (resp) {
                        self.messages = resp;
                        console.log(self.messages)
                    }
                })
            }
        },
        changeState(id, state) {
            console.log(id);
            let self = this;
            reqwest({
                url: ' http://127.0.0.1:8000/api/v1/message/?token=' + self.userToken
                , type: 'json'
                , method: 'put'
                , data: {
                    id: id,
                    state: state
                }
                , contentType: 'application/json'
                , error: function (err) {
                    if(err.status === 429){
                        alert(err.response);
                        console.log(err.response)
                    }

                }
                , success: function (resp) {
                    // window.location.href="http://127.0.0.1:8000/api/v1/message/?token=" + self.userToken;
                    self.messages = resp;
                    console.log(self.messages)
                }
            })
        },

        deleteMessage(id) {
            let self = this;
            reqwest({
                url: ' http://127.0.0.1:8000/api/v1/message/?token=' + self.userToken
                , type: 'json'
                , method: 'delete'
                , data: {
                    id: id,
                }
                , contentType: 'application/json'
                , error: function (err) {
                    console.log(this.url + "请求失败")
                }
                , success: function (resp) {
                    self.messages = resp;
                    console.log(self.messages)
                }
            })
        },

        agreeApplication(isAgree, family_id, child_id) {
            let self = this;
            reqwest({
                url: 'http://127.0.0.1:8000/api/v1/family/familyMember/?token=' + self.userToken
                , method: 'put'
                , contentType: 'application/json'
                , data: {
                    parent_id: family_id,
                    user_id: child_id,
                    is_agree: isAgree,
                }
                , type: 'json'
                , success: function (resp) {
                    if(resp['code'] === 200) {
                        alert("已同意！！！")
                    } else {
                        alert(resp['msg'])
                    }
                }
                , error: function (err) {
                    console.log(this.url + "请求失败")
                }
            })
        }
    },
    computed: {

    },
    mounted(){
        this.getinfo();
    }
});