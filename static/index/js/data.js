laydate.render({
    elem: '#test' //或 elem: document.getElementById('test')、elem: lay('#test') 等（类型：String/DOM，默认值：无必填项，用于绑定执行日期渲染的元素，值一般为选择器，或DOM对象）
    ,type: 'year'//year-只提供年列表选择||month-只提供年、月选择||date-可选择：年、月、日。type默认值，一般可不填||time-只提供时、分、秒选择||datetime-可选择：年、月、日、时、分、秒
    ,range: true //或 range: '~' 来自定义分割字符
    ,format: 'yyyy年MM月dd日' //可任意组合 yyyy年MM月dd日 HH时mm分ss秒===2017年08月18日 20时08分08秒，'yyyy/mm/dd'
    ,value: '2018-08-18' //必须遵循format参数设定的格式String，默认值：new Date()
    ,min: '2017-1-1'//min/max - 最小/大范围内的日期时间值 类型：string，默认值：min: '1900-1-1'、max: '2099-12-31'
    ,max: '2017-12-31'
    ,trigger: 'click' // 自定义弹出控件的事件(类型：String，默认值：focus，如果绑定的元素非输入框，则默认事件为：click)-采用click弹出
    ,show: true //默认显示-类型：Boolean，默认值：false;;;;如果设置: true，则控件默认显示在绑定元素的区域。通常用于外部事件调用控件
    ,position: 'static'//类型：String，默认值：absolute  (fixed,absolute,static)
    ,zIndex: 99999999//层叠顺序-类型：Number，默认值：66666666一般用于解决与其它元素的互相被遮掩的问题。如果 position 参数设为 static 时，该参数无效
    ,showBottom: false//是否显示底部栏--类型：Boolean，默认值：true如果设置 false，将不会显示控件的底部栏区域
    ,btns: ['clear', 'now', 'confirm']//类型：Array，默认值：['clear', 'now', 'confirm'](显示清空，今天，确认)
    ,lang: 'en'//语言类型：String，默认值：cn--内置了两种语言版本：cn（中文版）、en（国际版，即英文版）
    ,theme: 'grid'//主题-类型：String，默认值：default，theme的可选值有：default（默认简约）、molv（墨绿背景）、#颜色值（自定义颜色背景）、grid（格子主题）
    ,calendar: true//是否显示公历节日--类型：Boolean，默认值：false
    ,mark: {//标注重要日子--类型：Object，默认值：无
        '0-10-14': '生日'
        ,'0-12-31': '跨年' //每年12月31日
        ,'0-0-10': '工资' //每个月10号
        ,'2017-8-15': '' //具体日期
        ,'2017-8-20': '预发' //如果为空字符，则默认显示数字+徽章
        ,'2017-8-21': '发布'
    }
    ,ready: function(date){//控件在打开时触发，回调返回一个参数
        console.log(date); //得到初始的日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
    }
    ,change: function(value, date, endDate){//日期时间被切换后的回调
        console.log(value); //得到日期生成的值，如：2017-08-18
        console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
        console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
    }
    ,done: function(value, date, endDate){//控件选择完毕后的回调---点击日期、清空、现在、确定均会触发。
        console.log(value); //得到日期生成的值，如：2017-08-18
        console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
        console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
    }
});