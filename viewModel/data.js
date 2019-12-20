

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
    ,type: 'datetime'
    ,format: 'yyyy-MM-dd HH:mm:ss'
    ,change:function(value, date, endDate){
        vm.time=value;
    }
    ,trigger: 'click'
    ,done(value, date, endDate) {
        vm.time=value;
    }
});

let vm = new Vue({
    el: '#app',
    data: {
        get_all_income: 0,
        get_all_expends: 0,
        get_income_projects: [],
        get_income_money: [],
        get_expends_projects: [],
        get_expends_money: [],
        // 表单提交
        bill_type: 0,
        money: 0,
        remarks: "", // 备注
        time: "",
        is_add_to_family: false,
        concrete_type: "",
        income_bills: [],
        expend_bills: [],
        no_data: false

    },
    methods: {
        getinfo() {
            let self = this;
            let token = getQueryVariable('token');
            this.userToken = token;
            if (token) {
                reqwest({
                    url: 'http://127.0.0.1:8000/api/v1/bill/Income/?token=' + token
                    , method: 'get'
                    , error(err) {
                        alert("请求失败！")
                    }
                    , success(resp) {
                        console.log("请求成功！");
                        if(resp['code'] === 200) {
                            self.income_bills = resp['data']
                        } else {
                            alert(resp['msg'])
                        }

                    }
                });
                reqwest({
                    url: 'http://127.0.0.1:8000/api/v1/bill/expend/?token=' + token
                    , method: 'get'
                    , error(err) {
                        alert("请求失败！")
                    }
                    , success(resp) {
                        console.log("请求成功！");
                        if(resp['code'] === 200) {
                            self.expend_bills = resp['data']
                        } else {
                            alert(resp['msg'])
                        }

                    }
                });
                reqwest({
                    url: 'http://127.0.0.1:8000/api/v1/bill/data/?token=' + token
                    , type: 'json'
                    , method: 'get'
                    , error: function (err) {
                        console.log(this.url + "请求失败")
                    }
                    , success: function (resp) {
                        if(resp['code'] === 200) {
                            self.get_all_income = resp['data']['all_income'];
                            self.get_all_expends = resp['data']['all_expend'];
                            self.get_income_projects = resp['data']['income_projects'];
                            self.get_income_money = resp['data']['income_money'];
                            self.get_expends_projects = resp['data']['expend_projects'];
                            self.get_expends_money = resp['data']['expend_money'];
                            self.incomeView();
                            self.expendsView();
                            self.income_expendsView();

                        } else if(resp['code'] === 201) {
                            self.no_data = true;
                        }
                    }
                })
            }
        },

        postBill() {
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
                    , data: {bill_type: self.bill_type,
                        money: self.money,
                        is_add_to_family: addFamily,
                        remarks: self.remarks,
                        time: self.time,
                        concrete_type: self.concrete_type
                    }
                    , success: function (resp) {
                        if(resp['code']===200) {
                            alert("添加成功！");
                            self.get_all_income = resp['data']['all_income'];
                            self.get_all_expends = resp['data']['all_expend'];
                            self.get_income_projects = resp['data']['income_projects'];
                            self.get_income_money = resp['data']['income_money'];
                            self.get_expends_projects = resp['data']['expend_projects'];
                            self.get_expends_money = resp['data']['expend_money'];
                        } else {
                            alert(resp['msg'])
                        }
                    }
                })
            }
        },

        incomeView() {
            let self = this;

            new roughViz.Bar(
                {
                    element: '#vis0',
                    title: "收入情况",
                    titleFontSize: '1.5rem',
                    legend: false,
                    margin: {top: 50, bottom: 50, left: 60, right: 20},
                    data: {
                        labels: self.get_income_projects,
                        values: self.get_income_money
                    },
                    strokeWidth: 1,
                    highlight: 'gold',
                }
            );
        },

        expendsView() {
            let self = this;
            // alert("1112")
            new roughViz.Bar(
                {
                    element: '#vis1',
                    title: "支出情况",
                    titleFontSize: '1.5rem',
                    legend: false,
                    margin: {top: 50, bottom: 50, left: 60, right: 20},
                    data: {
                        labels: self.get_expends_projects,
                        values: self.get_expends_money
                    },

                    strokeWidth: 1,
                    highlight: 'gold',
                }
            );
        },
        income_expendsView() {
            let self = this;
            new roughViz.Pie(
                {
                    element: '#vis2',
                    title: "收支情况",
                    titleFontSize: '1.5rem',
                    legend: true,
                    margin: {top: 100, bottom: 100, left: 100, right: 20},
                    data: {
                        labels: ['收入', '支出'],
                        values: [self.get_all_income, self.get_all_expends]
                    },
                    strokeWidth: 1,
                    fillStyle: '',
                    highlight: 'gold',
                }
            );
        }


    },
    computed: {

    },
    mounted(){
        this.getinfo();

    }
});