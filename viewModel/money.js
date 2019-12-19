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

laydate.render({
    elem: '#test1'
    ,type: 'date'
    ,format: 'yyyy-MM-dd'
    ,change:function(value, date, endDate){
        vm.pay_back_date=value;
    }
    ,trigger: 'click'
    ,done(value, date, endDate) {
        vm.pay_back_date=value;
    }
});

let vm = new Vue({
    el: "#app",
    data: {
        who: 0,
        money: 0,
        pay_back_date: ""
    },
    methods: {
        borrow() {
            let self = this;
            let token = getQueryVariable('token');
            this.userToken = token;
            if (token) {
                reqwest({
                    url: 'http://127.0.0.1:8000/api/v1/borrow_money/borrow/?token=' + token
                    , method: 'post'
                    , type: 'json'
                    , data: {
                        who: self.who,
                        money: self.money,
                        pay_back_date: self.pay_back_date
                    }
                    , error(err) {
                        alert("请求失败！")
                    }
                    , success(resp) {
                        console.log("请求成功！");
                        if (resp['code'] === 200) {
                            alert("已成功发出请求，请耐心等待")
                        } else {
                            alert(resp['msg'])
                        }

                    }
                });
            }
        }
    }
});