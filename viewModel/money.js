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
        who: 0,
        money: 0,
        pay_back_date: "0000-00-00",
        borrow_bills: [],
        borrow_money : 0,
        bank_money: 0,
        bank_data: "",
        bank_name: "",
        is_add_to_family: false,
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
        },
        get_borrow_bill() {
            let self = this;
            let token = getQueryVariable('token');
            this.userToken = token;
            if (token) {
                reqwest({
                    url: 'http://127.0.0.1:8000/api/v1/borrow_money/payBack/?token=' + token
                    , method: 'get'
                    , error(err) {
                        alert("请求失败！")
                    }
                    , success(resp) {
                        console.log("请求成功！");
                        if (resp['code'] === 200) {
                            self.borrow_bills = resp['data'];
                            self.borrow_money = resp['data']['money']
                        }else if(resp['code'] === 201) {
                            self.borrow_bills = []
                        } else {
                            alert(resp['msg'])
                        }

                    }
                });
            }
        },
        payback(who, bill_id) {
            let self = this;
            let token = getQueryVariable('token');
            this.userToken = token;
            if (token) {
                reqwest({
                    url: 'http://127.0.0.1:8000/api/v1/borrow_money/payBack/?token=' + token
                    , method: 'post'
                    , type: 'json'
                    , data: {
                        who: who,
                        money: self.borrow_money,
                        bill_id: bill_id
                    }
                    , error(err) {
                        alert("请求失败！")
                    }
                    , success(resp) {
                        console.log("请求成功！");
                        if (resp['code'] === 200) {
                            alert("还款成功")
                        } else {
                            alert(resp['msg'])
                        }

                    }
                });
            }
        },

        bank() {
            let self = this;
            let token = getQueryVariable('token');
            this.userToken = token;
            let addFamily = 0;
            if(self.is_add_to_family)
                addFamily = 1;
            if (token) {
                reqwest({
                    url: 'http://127.0.0.1:8000/api/v1/bill/Income/?token=' + token
                    , method: "POST"
                    , type: 'json'
                    , data: {bill_type: 0,
                        money: self.bank_money,
                        is_add_to_family: addFamily,
                        remarks: "存款到" + self.bank_name,
                        time: self.bank_data + " 12:00:00",
                        concrete_type: self.bank_name
                    }
                    , success: function (resp) {
                        if(resp['code']===200) {
                            alert("存款成功！");
                        } else {
                            alert(resp['msg'])
                        }
                    }
                })
            }
        }
    },
    mounted(){
        this.get_borrow_bill();
    }
});