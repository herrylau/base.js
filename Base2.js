/*********** 获取时间的某部份 begin ***********/
var myDate = new Date(); 
    //获取当前年份(2位) 
    myDate.getYear();

    // 获取完整的年份(4位,1970-????) 
    myDate.getFullYear();

    // 获取当前月份(0-11,0代表1月) 
    myDate.getMonth();

    // 获取当前日(1-31) 
    myDate.getDate();

    // 获取当前星期X(0-6,0代表星期天) 
    myDate.getDay();

    // 获取当前时间(从1970.1.1开始的毫秒数) 
    myDate.getTime();

    // 获取当前小时数(0-23)
    myDate.getHours();

    // 获取当前分钟数(0-59)
    myDate.getMinutes();

    // 获取当前秒数(0-59) 
    myDate.getSeconds();

    // 获取当前毫秒数(0-999) 
    myDate.getMilliseconds();

    // 获取当前日期       
    myDate.toLocaleDateString();

    // 获取当前时间
    myDate.toLocaleTimeString();

    // 获取日期与时间
    myDate.toLocaleString( );

/*********** 获取时间的某部份 end ***********/


var Base = {
    /*************************
    * input中val改变触发
    *
    * @parmValue    {string}    ele  指定元素ID
    * @return       {function}  cb   回调函数
    *
    *************************/
    inputChange : function( ele, cb ) {
        var dom = $("#"+ele)[0];
        if(dom == undefined) return;
        if( "\v" == "v" ) {
            dom.onpropertychange = cb;
        }else{
            dom.addEventListener("input", cb, false);
        }
        return cb;
    },

    /***********************
    * 验证是否为数字类型
    *
    * @parmValue    {string}    val     value值
    * @return       {boolean}   true匹配正确  false匹配错误
    *
    ***********************/
    isInt : function( val ) {
        var patrn = /^[0-9]\d*$/;
        if (!patrn.exec(val)) return false; 
        return true; 
    },

    /***********************
    * 验证是否为身份证号码
    *
    * @parmValue    {string}    val     value值
    * @return       {boolean}   true匹配正确  false匹配错误
    *
    ***********************/
    isIDCard : function( val ) {
        var patrn = /^\d{15}(\d{2}[A-Za-z0-9])?$/;
        if (!patrn.exec(val)) return false; 
        return true; 
    },

    /***********************
    * 验证是否为电话号码
    *
    * @parmValue    {string}    val value值
    * @return       {boolean}   true匹配正确  false匹配错误
    *
    ***********************/
    isPhone : function( val ) {
        var patrn = /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/;
        if (!patrn.exec(val)) return false; 
        return true; 
    },

    /***********************
    * 验证是否为手机号码
    *
    * @parmValue    {number}    val value值
    * @return       {boolean}   true匹配正确  false匹配错误
    *
    ***********************/
    isMobile : function( val ) {
        var patrn = /^0?1[3|4|5|8][0-9]\d{8}$/;
        if (!patrn.exec(val)) return false; 
        return true; 
    },

    /***********************
    * 验证图片是否全部加载完成
    *
    * @parmValue    {object}     imgObj需要查找的img
    * @return       {function}   callback 全部加载完毕回调
    *
    ***********************/
    isImgLoad : function(imgObj, callback){
        var t_img // 定时器
            , isLoad = true // 控制变量
            ;
        // 判断图片加载的函数
        var isImgLoad = function(){
            imgObj.each(function(){
                // 找到为0就将isLoad设为false，并退出each
                if(this.height === 0){
                    isLoad = false;
                    return false;
                }
            });

            // 为true，没有发现为0的。加载完毕
            if(isLoad){ 
                // 清除定时器
                clearTimeout(t_img);
                // 回调函数
                callback();
            }else{
                isLoad = true;
                t_img = setTimeout(function(){
                    // 递归扫描
                    isImgLoad(callback);
                },17);
            }
        }
        isImgLoad();
    },

    /***********************
    * 获取几分钟前、几小时前、几天前等时间差
    *
    * @parmValue    {date}      publishTime 时间戳
    * @return       {string}    返回剩余时间提示
    *
    ***********************/
    timeDifference : function(publishTime){
        var timeNow = Date.parse(new Date())
          , d = (timeNow - publishTime)/1000
          , d_seconds = parseInt(d);      // 秒
          , d_minutes = parseInt(d/60);   // 分
          , d_hours = parseInt(d/3600);   // 时   
          , d_days = parseInt(d/86400);   // 天
          ;

        if(d_days > 0 && d_days < 4) {       
            return d_days+"天前";       
        }
        else if(d_days <= 0 && d_hours > 0) {       
            return d_hours + "小时前";       
        }
        else if(d_hours <= 0 && d_minutes > 0) {       
            return d_minutes+"分钟前";       
        }
        else if(d_minutes <= 0 && d_seconds >= 0) {       
            // return d_seconds+"秒前";
            return "刚刚之前";       
        }
        else{       
            var s = new Date(publishTime);
            return s.getFullYear() + '年' + (s.getMonth() + 1) + "月" + s.getDate() + "日 " + s.getHours() + ':' + ':' + s.getMinutes() + ':' + s.getSeconds();
        }
    },

    /***********************
    * 解析获取URL参数
    *
    * @parmValue    {string}      url   url地址
    * @parmValue    {string}      key   key值
    * @return       {string}      返回获取到的key
    *
    ***********************/
    getUrlParm: function(url, key) {
        var thisUrl = url
            , parmValue = ""
            , re = new RegExp(key + "=.*", "i")
            , mResult = re.exec(thisUrl)
            ;
        if(mResult != null) {
            mResult = mResult[0];
            if(mResult.indexOf("&") != -1){
                mResult = mResult.split("&")[0];
            }
            return mResult.split("=")[1];
        }
    },

    /***********************
    * 判断是否为有效的数字
    *
    * @parmValue    {number}      val   验证val
    * @return       {boolean}     验证通过返回true 验证失败返回false
    *
    ***********************/
    isNumber: function(val) {
        if( isNaN(val) ){
            return true;
        }
        return false;
    },

    /***********************
    * 判断是否为有效的数字
    *
    * @parmValue    {string}      url   加载地址
    *
    ***********************/
    LoadStyle: function(url) {
        try {
            document.createStyleSheet(url)
        } catch(e) {
            var cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.type = 'text/css';
            cssLink.href = url;
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(cssLink)
        }
    },
    /***********************
    * 格式化CSS样式代码
    *
    * @parmValue    {string}      s   css样式
    * @return       {string}      返回格式化的css样式
    *
    ***********************/
    formatCss: function(s) {
        var s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");

        //清除连续分号
        s = s.replace(/;\s*;/g, ";"); 
        s = s.replace(/\,[\s\.\#\d]*{/g, "{");
        s = s.replace(/([^\s])\{([^\s])/g, "$1 {\n\t$2");
        s = s.replace(/([^\s])\}([^\n]*)/g, "$1\n}\n$2");
        s = s.replace(/([^\s]);([^\s\}])/g, "$1;\n\t$2");
        return s;
    },

    /***********************
    * 压缩CSS样式代码
    *
    * @parmValue    {string}      s   css样式
    * @return       {string}      返回压缩过的css样式
    *
    ***********************/
    yasuoCss: function(s){
        //删除注释
        s = s.replace(/\/\*(.|\n)*?\*\//g, ""); 
        s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");

        //容错处理
        s = s.replace(/\,[\s\.\#\d]*\{/g, "{"); 

        //清除连续分号
        s = s.replace(/;\s*;/g, ";"); 

        //去掉首尾空白
        s = s.match(/^\s*(\S+(\s+\S+)*)\s*$/); 
        return (s == null) ? "" : s[1];
    },

    /***********************
    * 检验URL链接是否有效
    *
    * @parmValue    {string}      URL   url地址
    * @return       {boolean}     验证通过返回true  验证失败返回false
    *
    ***********************/
    getIsUrlState = function(URL) { 
        var xmlhttp = new ActiveXObject("microsoft.xmlhttp"); 
        xmlhttp.Open("GET",URL, false);  
        try {  
            xmlhttp.Send(); 
        } catch(e) {
            // 
        } finally { 
            var result = xmlhttp.responseText; 
            if(result) { 
                if(xmlhttp.Status == 200) { 
                    return(true); 
                }else{ 
                    return(false); 
                } 
            }else{ 
                return(false); 
            } 
        } 
    }
};















