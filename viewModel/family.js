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
        hasFamily: false,
        familyData: {},
        userToken: '',
        applicationFamilyID: ''
    },
    methods: {
        getinfo() {
            let self = this;
            let token = getQueryVariable('token');
            this.userToken = token;
            if (token) {
                reqwest({
                    url: 'http://127.0.0.1:8000/api/v1/family/familyManage/?token=' + self.userToken
                    , type: 'json'
                    , method: 'get'
                    , contentType: 'application/json'
                    , error: function (err) {
                        console.log(this.url + "请求失败")
                    }
                    , success: function (resp) {
                        if(resp['code'] ===  200) {
                            if(resp['family'] === 'null') {
                                self.hasFamily = false;
                            } else {
                                self.hasFamily = true;
                                self.familyData = resp;
                            }
                        } else {
                            console.log("获取家庭信息失败！！！")
                        }
                    }
                })
            }
        },

        application() {
            /**
             * 用户申请加入家庭
             * @type {methods}
             */
            let self = this;
            reqwest({
                url: 'http://127.0.0.1:8000/api/v1/user_manage/about_family/?token=' + self.userToken
                , method: 'post'
                , data: {
                    family_id: self.applicationFamilyID,
                }
                , type: 'json'
                , success: function (resp) {
                    if(resp['code'] ===  200) {
                        alert("已向家长发出请求，请耐心等待。。。")
                    } else if(resp['code'] === 460) {
                        alert(resp['msg'])
                    } else if(resp['code'] === 600) {
                        alert("家庭人数达到上限！！！")
                    } else if(resp['code'] === 400) {
                        alert(resp['msg'])
                    }
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