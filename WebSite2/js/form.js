
window.onload = function () {
    //querySelector()仅仅返回dom元素中的第一个跟类名选择器一样
    var form_login = document.querySelector('.form_login');
    var form_register = document.querySelector('.form_register');
    var switchBtns = document.querySelectorAll('.switch');

    switchBtns.forEach(function (item) {
        item.addEventListener('click', function () {
            if (this.innerText == '注册账号') {
                addStyle(form_login, { height: '0', transitionDelay: '0s' });
                addStyle(form_register, { height: '720px', transitionDelay: '1.2s' })
            } else if (this.innerText == '登录') {
                addStyle(form_login, { height: '400px', transitionDelay: '1.2s' });
                addStyle(form_register, { height: '0', transitionDelay: '0s' })
            }
        })
    });
    function addStyle(ele, orignStyle) {
        for (var item in orignStyle) {
            if (ele) {
                ele.style[item] = orignStyle[item]
            }
        }

    }

    /*身份证验证*/
    var checkCode = function (val) {
        var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        var code = val.substring(17)
        if (p.test(val)) {
            var sum = 0;
            for (var i = 0; i < 17; i++) {
                sum += val[i] * factor[i];
            }
            if (parity[sum % 11] == code.toUpperCase()) {
                return true;
            }
        }
        return false;
    };
    var checkDate = function (val) {
        var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
        if (pattern.test(val)) {
            var year = val.substring(0, 4);
            var month = val.substring(4, 6);
            var date = val.substring(6, 8);
            var date2 = new Date(year + "-" + month + "-" + date);
            if (date2 && date2.getMonth() == (parseInt(month) - 1)) {
                return true;
            }
        }
        return false;
    };
    var checkProv = function (val) {
        var pattern = /^[1-9][0-9]/;
        var provs = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门"
        };
        if (pattern.test(val)) {
            if (provs[val] && provs[val] == $("#personArea").val()) {
                return true;
            }
        }
        return false;
    };
    var checkID = function (val) {

        if (checkCode(val)) {
            var date = val.substring(6, 14);
            if (checkDate(date)) {
                if (checkProv(val.substring(0, 2))) {
                    return true;
                } else {
                    return "省份与证件不匹配";
                }
            } else {
                return "日期输入错误";
            }
        }
        return "证件格式错误";
    };
    /*显示错误信息*/
    function ErrorMsg(txtBox, msg) {
        var errSpan = txtBox.nextSibling;
        if (errSpan != null && errSpan.nodeName == "SPAN" && errSpan.className == "error") {
            errSpan.innerHTML = msg;
        } else {
            errSpan = document.createElement('span');
            errSpan.className = "error";
            errSpan.innerHTML = msg;            

            if (txtBox.nextSibling != null) {
                txtBox.parentNode.insertBefore(errSpan, txtBox.nextSibling);
            } else {
                txtBox.parentNode.appendChild(errSpan);
            }

        }

    }
    var isValidate = new Array();
    isValidate["username"] = false;
    isValidate["pwd1"] = false;
    isValidate["email"] = false;
    isValidate["get"] = false;
    isValidate["personID"] = false;
    //用户名验证
    $("#username").bind('blur', function () {
        isValidate["username"] = false;
        var username = $('#username').val();
        if (username.length > 6) {
            ErrorMsg(this, "用户名不能超过六位")
        } else {
            ErrorMsg(this, "");
            $.getJSON("AjaxValidate.ashx", {
                "field": "username",
                "value": username,
            }, function (data) {
                var inputBox = $('#username').get(0);
                if (data.error == 1) {
                    ErrorMsg(inputBox, data.msg);
                } else {
                    isValidate["username"] = true;
                    ErrorMsg(inputBox, "");
                }
            });
        }
    });
    //密码重复验证
    $("#password1").bind('blur', function () {
        isValidate["pwd1"] = false;
        var pwd1 = $("#password1").val();
        var pwd = $("#password").val();
        if (pwd1.trim() !== pwd.trim()) {
            ErrorMsg(this, "密码输入不一致");
        } else {
            isValidate["pwd1"] = true;
            ErrorMsg(this, "");
        }
    });
    //邮箱格式验证
    $("#email").bind('blur', function () {
        isValidate["email"] = false;
        var email = $("#email").val();
        var emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!emailReg.test(email)) {
            ErrorMsg(this, "邮箱格式不正确");
        } else {
            $.getJSON("AjaxValidate.ashx", {
                "field": "email",
                "value": email.toString(),
            }, function (data) {
                var inputBox = $('#email').get(0);
                if (data.error == 1) {
                    ErrorMsg(inputBox, data.msg);
                } else {
                    ErrorMsg(inputBox, data.msg);
                    isValidate["email"] = true;
                }
            });
        }
    });
    //获取验证码验证
    $("#get").bind('click', function () {
        isValidate["get"] = false;
        if (isValidate["email"]) {
            isValidate["get"] = true;
            settime(this);
            $.getJSON("AjaxValidate.ashx", {
                "field": "get",
                "value": true
            }, function (data) {
                alert(data.msg);
            });
        }
        else {
            alert("请填写正确的邮箱地址");
        }
    });
    $("#personID").bind('blur', function () {
        //console.log(this.val())
        isValidate["personID"] = false;
        var IDVal = $("#personID").val();
        if (IDVal != "") {
            var result = checkID(IDVal);
            if (result == true) {
                ErrorMsg(this, "");
                isValidate["personID"] = true;
            } else {
                ErrorMsg(this, result);
            }
        }


    });
    $("#password").bind('blur', function () {
        //   强：字母 + 数字 + 特殊字符 & nbsp;
        var easy1 = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\\d!@#$%^&*]+$/;
        // 中：字母 + 数字，字母 + 特殊字符，数字 + 特殊字符
        var easy2 = /^(?![a-zA-z] +$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
        // 弱：纯数字，纯字母，纯特殊字符
        var easy3 = /^(?:\d+|[a - zA - Z]+|[!@#$%^&*]+)$/;
        var pwdVal = $("#password").val();
        if (pwdVal != "") {
            if (easy1.test(pwdVal)) {
                ErrorMsg(this, "密码强度 : 强");
                $(this).next().css('color', 'green');
            }else
            if (easy2.test(pwdVal)) {
                ErrorMsg(this, "密码强度 : 中");
                $(this).next().css('color', 'yellow');

            }else
            if (easy3.test(pwdVal)) {
                ErrorMsg(this, "密码强度 : 弱");
                $(this).next().css('color', 'red');

            }
        }
    });
 
    function validate() {
        for (var k in isValidate) {
            if (!isValidate[k]) {
                console.log(k);
                return false;
            }
        }
        return true;
    };

    var countdown = 30;
    function settime(obj) {
        if (countdown == 0) {
            obj.removeAttribute("disabled");
            obj.value = "获取验证码";
            countdown = 30;
            return;
        } else {
            obj.setAttribute("disabled", "disabled");
            obj.value = countdown + "秒后重新发送";
            countdown--;
        }
        setTimeout(function () {
            settime(obj);
        }
            , 1000);
    }

    /*****
     ajax  最终目的是 获取服务器的返回值   ，页面不做跳转
     而表单的 post 是 把数据传递到后段页面 没有返回值  ，页面跳转到后段

 function login() {
            $.ajax({
            //几个参数需要注意一下
                type: "POST",//方法类型
                dataType: "json",//预期服务器返回的数据类型
                url: "/users/login" ,//url
                data: $('#form1').serialize(),
                success: function (result) {
                    console.log(result);//打印服务端返回的数据(调试用)
                    if (result.resultCode == 200) {
                        alert("SUCCESS");
                    }
                    ;
                },
                error : function() {
                    alert("异常！");
                }
            });
        }    
     ******/
    function login() {
        $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "Login.ashx",//url
            data: $('#form_login').serialize(),
            success: function (data) {
                console.log(data);
                alert(data.msg);
                if (data.error == 0) {
                    window.location.href = "hacker.html";
                }
            },
            error: function () {
                alert("网络异常，请刷新页面重新提交");
            }
        });
    }
    function reg() {
        $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "Reg.ashx",//url
            data: $('#from_reg').serialize(),
            success: function (data) {
                alert(data.msg);
                if (data.error == 0) {
                    addStyle(form_login, { height: '400px', transitionDelay: '1.2s' });
                    addStyle(form_register, { height: '0', transitionDelay: '0s' })
                }
            },
            error: function () {
                alert("网络异常，请刷新页面重新提交");
            }
        });
    }
    //登陆验证
    $('#Login').bind('click', function () {
        if ($('#loginusername').val() == "" ||$('#password').val() == "") {
        console.log($('#username').val());

        }
        if ($('#loginusername').val() == ""|| $('#loginpassword').val()=="") {
            alert("请填写用户名密码");
        } else {
            login();
        }
    });
    //注册验证
    $('#Reg').bind('click', function () {
        if (validate()) { reg() } else {
            alert("请正确填写表单");
        }
    });
};
