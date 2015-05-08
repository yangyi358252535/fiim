$(document).ready(function() {
	var validShow = $('#validShow').val();
	if (validShow == 'valid') {
		$('#validCode').show();
	}
	
	$('#email').focus(function() {
		if ($('#email').val() == '请输入手机号') {
			$('#email').val('');
		}
	});
	
	$('#email').blur(function() {
		if ($('#email').val() == '') {
			$('#email').val('请输入手机号');
		}
	});
	
	//使用短信密码登陆提示
	$(".pass_tip").mouseover(function(){
		$(".pass_tip_content").fadeIn(111);
		$(this).attr("style","background-position:0px -36px;");
	});
	
	//使用短信密码登陆提示
	$(".pass_tip").mouseleave(function(){
		$(".pass_tip_content").fadeOut(111);
		$(".pass_tip").attr("style","");
	});
	
	// 发送随机密码
	$('.forget, #bindMath').click(function() {
		//判断是否在倒计时中
		if($(this).hasClass("aashy_inline")||$(this).hasClass("small_load")){return ;}
		var email = $('#email').val();
		// 用户名和密码都未输入
		if (email == '请输入手机号' || email == '') {
			$('#error_tip').html("请输入手机号");
			return false;
		}
		if (/^0{0,1}1[0-9]{10}$/.test(email)) {
			//$(this).text("再次发送短信密码");
			$('#error_tip').html('');
			$.ajax({
				type: 'POST',
				url: basePath + "login.do?m=sendSms",
				data: {"mobile": email},
				beforeSend : function(XMLHttpRequest) {
					$('.forget, #bindMath').addClass("small_load");
					$('.pass_tip').hide();
				},
				success: function (data) {
					var rest = eval('(' + data + ')');
					if (rest.flag == 'success') {
						$('#error_tip').html(rest.text);
						loginShowtime();//启动倒计时
						$(".pass_tip").addClass("pass_tip_countdown").next(".pass_tip_content").addClass("pass_tip_content_countdown");
					} else {
						$('#error_tip').html(rest.text);
					}
					$('.forget, #bindMath').removeClass("small_load");
					$('.pass_tip').show();
				}
		   	});
		} else if (/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(email)) {
			//$(this).text("再次发送短信密码");
			$('#error_tip').html('');
			$.ajax({
				type: 'POST',
				url: basePath + "login.do?m=sendMail",
				data: {"email": email},
				beforeSend : function(XMLHttpRequest) {
					$('.forget, #bindMath').addClass("small_load");
					$('.pass_tip').hide();
				},
				success: function (data) {
					var rest = eval('(' + data + ')');
					$('#error_tip').html(rest.text);
					
					if (rest.flag == 'success') {
						$('#error_tip').html(rest.text);
						//设置倒计时
						loginShowtime();
						$(".pass_tip").addClass("pass_tip_countdown").next(".pass_tip_content").addClass("pass_tip_content_countdown");
					} else {
						$('#error_tip').html(rest.text);
					}
					$('.forget, #bindMath').removeClass("small_load");
					$('.pass_tip').show();
				}
		   	});
		} else {
			$('#error_tip').html("请输入正确的邮箱或手机号");
			return false;
		}
	});
	
	// 登录
	$("#dl").click(function() {
		var email = $('#email').val();
		var password = $('#password').val();
		var code = $('#yzm').val();
		var autoLogin = $('#autoLogin').attr('checked');
		var isBinding = $('#isBinding').val();
		var source = $('#source').val();
		var thirdToken = $('#thirdToken').val();
		var tokenSecret = $('#tokenSecret').val();
		
		// 用户名和密码都未输入
		if ((email == '请输入手机号' || email == '') && password == '') {
			$('#error_tip').html("请输入用户名、密码");
			return false;
		}
		// 用户名输入、密码未输入
		if ((email != '请输入手机号' || email == '') && password == '') {
			$('#error_tip').html("登录信息与密码不匹配");
			return false;
		}
		// 用户名未输入、密码输入
		if ((email == '请输入手机号' || email == '') && password != '') {
			$('#error_tip').html("登录信息与密码不匹配");
			return false;
		}
		// 验证码不能为空
		if ($('#validCode').is(':visible')) {
			if (code == '') {
				$('#error_tip').html("请输入验证码");
				return false;
			}
		}
		
		$('#error_tip').html('');
		//$('#dl').attr('disabled', true);
		
		var dataMap = {"email": email, "password": password, "autoLogin": autoLogin, "code": code,
				"isBinding": isBinding, "source": source, "thirdToken": thirdToken, "tokenSecret":tokenSecret};
		$.ajax({
			type: 'POST',
			url: basePath + "login.do?m=ajaxLogin",
			data: dataMap,
			beforeSend : function() {
				$('#dl').hide();
				$('#dlloading').show();
			},
			success: function (data) {
				var rest = eval('(' + data + ')');
				var lts = rest.lts;	// 还可登录次数
				if (rest.flag == '0') {
					//location.href = basePath + "user/m1_init.html";	// 登录成功，跳转到用户中心首页
					//location.href = basePath;	// 登录成功，跳转到首页
					var redirectUrl = $('#redirectUrl').val();
					if (redirectUrl == 'null' || redirectUrl == '') {
						location.href = basePath;	// 登录成功，跳转到首页
					} else {
						location.href = redirectUrl;	// 跳转到登录之前的页面
					}
				} else {
					//$('#dl').attr('disabled', false);
					$('#dlloading').hide();
					$('#dl').show();
					$('#password').val('');
					$('#yzm').val('');
					$("#spcode").click();
					if (rest.flag == '1') {
						$('#error_tip').html('存在非法字符');	// 存在非法字符
					} else if (rest.flag == '2') {
						$('#error_tip').html('用户名不存在');		// 用户名不存在
					} else if (rest.flag == '3') {
						$('#error_tip').html('没有激活');	// 没有激活
					} else if (rest.flag == '4') {
						$('#error_tip').html('登录错误5次，账号锁定30分钟');	// 账号锁定
					} else if (rest.flag == '5') {
						location.href = basePath + "/signup/oldUser.jsp";	// 转向旧版
					} else if (rest.flag == '6') {
						//$('#error_tip').html('登录密码或随机密码不正确');		// 随机密码错误
						$('#error_tip').html('用户名与密码不匹配，还可登录' + lts + '次，如登录失败账户将被冻结30分钟。');
						$('#validCode').show();
					} else if (rest.flag == '7') {
						$('#error_tip').html('用户名与密码不匹配，还可登录' + lts + '次，如登录失败账户将被冻结30分钟。');
						//$('#error_tip').html('登录信息与密码不匹配');		// 其它情况
						$('#validCode').show();
					} else if (rest.flag == '8') {
						location.href = basePath + 'common/bind_faild.jsp';	// 第三方绑定失败
					} else if (rest.flag == '9') {
						location.href = basePath + 'common/bind_success.jsp';	// 绑定成功，跳转到绑定成功页面
					} else if (rest.flag == '10') {
						$('#error_tip').html('验证码不正确，请重新输入');		// 其它情况 
						$('#validCode').show();
					} else if (rest.flag == '11') {
						$('#error_tip').html('接收验证码的手机号或邮箱不正确，如需更换用户名，请重新获取验证码');		// 接收验证码的手机号或邮箱不正确
					}
				}
			}
	   	});
	});
	
	//回车登陆
	document.onkeydown = function(event) {
		e = event ? event :(window.event ? window.event : null); 
		if (e.keyCode == 13) {
			$("#dl").click();
		} 
	}
	
	
	if ($(".rightAds").width() < 300) {
		$(".login_tab").css("margin", "50px auto");
	} else {
		$(".login_tab").css("margin", "50px 0");
	}
});

var secondVal = 60;
//倒计时
function loginShowtime() {
	//将信息展示到网页上
	$(".forget").next('a').css('left','343px')
	$(".forget").addClass("aashy_inline").children("span").text("再次发送随机密码").end().children(".countdown").show();
	secondVal--;
	$(".forget").children(".countdown").text("("+secondVal+")");
	if(secondVal<=0){
		secondVal = 60;
		$(".forget").next('a').css('left','300px');
		$(".forget").removeClass("aashy_inline").children("span").text("获取随机密码").end().children(".countdown").hide().text(""+secondVal);
		$(".pass_tip").removeClass("pass_tip_countdown").next(".pass_tip_content").removeClass("pass_tip_content_countdown");
	}else{
		setTimeout("loginShowtime()",1000);	//每一秒执行一次，实现倒计时效果
	}
}