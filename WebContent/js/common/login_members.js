$(document).ready(function() {

	$('#member').click(function() {
		if ($("#member").is(':checked') == true) {
			$('#mobile').show();
			$('#emcode1').hide();
			$('#emcode2').show();
		} else {
			$('#mobile').hide();
			$('#emcode1').show();
			$('#emcode2').hide();
		}
	});
	
	// 手机号注册时的密码显示
	$('#passwd').mouseover(function() {
		var mobilePass = $('#mobilePass').val();
		if (mobilePass == '') {
			return false;
		}
		$('#mobilePass').hide();
		$('#password2').show();
		$('#password2').focus();
		$('#password2').val(mobilePass);
		//$('#password')[0].type = 'text';
	});
	$('#passwd').mouseout(function() {
		var mobilePass = $('#mobilePass').val();
		if (mobilePass == '') {
			return false;
		}
		var password2 = $('#password2').val();
		$('#password2').hide();
		$('#mobilePass').show();
		$('#mobilePass').focus();
		
		if (password2 != '') {
			$('#mobilePass').val(password2);
		} else {
			$('#mobilePass').val(mobilePass);
		}
		//$('#password')[0].type = 'password';
	});

	// 手机号验证
	$('#mobile').focusin(function() {
		$('#mobileError').html('');
//		$('#mobileError').removeClass('err');
//		$('#mobileError').addClass('key_tip');
//		$('#mobileError').html('请输入正确的手机号');
	}).focusout(function() {
//		$('#mobileError').removeClass('key_tip');
//		$('#mobileError').addClass('err');
		$('#mobileError').html('');
		
		var mobile = $('#mobile').val();
		if (mobile == '') {
			return false;
		}
		
		if (!checkMobile()) {
			return false;
		}
	});
	
	// 密码验证
	$("#mobilePass").focusin(function() {
		$('#mobilePassError').html('');
//		$('#mobilePassError').removeClass('err');
//		$('#mobilePassError').addClass('key_tip');
//		$('#mobilePassError').html('密码由6-20个字符组成');
	}).focusout(function() {
//		$('#mobilePassError').removeClass('key_tip');
//		$('#mobilePassError').addClass('err');
		$('#mobilePassError').html('');
		var mobilePass = $('#mobilePass').val();
		if (mobilePass == '') {
			$('#mobilePassError').html('');
			return false;
		}
		
		if (!checkPass()) {
			return false;
		}
	});
	
	// 手机验证码验证
	$("#mobileCode").focusin(function() {
		$('#mobileCodeError').html('');
	}).focusout(function() {
		$('#mobileCodeError').html('');
		var mobileCode = $('#mobileCode').val();
		if (mobileCode == '') {
			$('#mobileCodeError').html('');
			return false;
		}
		
		if (!checkMobileCode()) {
			return false;
		}
	});
	
	// 发送手机验证码
	$('#button_orange_hqyzm').click(function() {
		if($(this).hasClass("aashy_inline")||$(this).hasClass("small_load")){return ;}//判断是否在倒计时中
		var mobileError = $('#mobileError').html();
		//清空提示
		var authCodeError = $('#authCodeError').html();
		var authCode = $('#authCode').val().trim();
		var mobile = $('#mobile').val().trim();
		if (mobile == '') {
			$('#mobileError').html('请输入手机号');
			return false;
		}
//		alert('authCode：'+authCode);
		
		
		if (checkMobile()) {
			
			if (authCode == '') {
				$("#authCode").nextAll(".err_block").html("请先输入验证码");
				return false;
			}
			
			$('#mobileError').html('');
//			$('#button_orange_hqyzm').attr('disabled', true);
			$.ajax({
				type: 'POST',
				url: basePath + "signup/register.do?m=sendSms",
				data: {"mobile": mobile,"authCode":authCode},
				beforeSend : function(XMLHttpRequest) {
					$("#button_orange_hqyzm").addClass("small_load");
					//$("#button_orange_hqyzm").html('<img src="' + basePath +'imges/movie/loading.gif" />');
				},
				success: function (data) {
					$("#button_orange_hqyzm").removeClass('small_load');
					var rest = eval('(' + data + ')');
					if (rest.flag == 'success') {
						$('#mobileError').html(rest.text);
						registShowtime();//启动倒计时
					} else {
						if(rest.flag == 'authCodeError'){
							$('#authCodeError').html(rest.text);
						}else{
							$('#mobileError').html(rest.text);
						}
					}
				}
		   	});
		}
	});
	
	// 手机注册时触发
	$('#mobileBtn').click(function() {
		//var perfectId = $("#perfectId").val();
		var mobile = $('#mobile').val();
		var mobilePass = $('#mobilePass').val();
		var reMobilePass = $('#reMobilePass').val();
		var mobileCode = $('#mobileCode').val();
		
		//手机缺人码
		if (!checkMobile() || !checkMobileCode() ||  !checkPass() ) {
			return false;
		}
		//密码校验
		if (mobilePass != reMobilePass) {
			$('#reMobilePassError').html("密码输入不一致");
			return false;
		}
		
		var mobilePolicy = $('#mobilePolicy').attr("checked");
		
		if (!mobilePolicy) {
			$('#mobilePolicyError').html("请阅读《万达电影网用户协议》");
			return false;
		}
		
		$('#mobileError').html('');
		$('#mobilePassError').html('');
		$('#mobileCodeError').html('');
		$('#mobilePolicyError').html('');
		
		var isBinding = $('#isBinding').val();
		var source = $('#source').val();
		var thirdToken = $('#thirdToken').val();
		var tokenSecret = $('#tokenSecret').val();
		
		var dataMap = {"mobile": mobile, "password": mobilePass, "rePassword": reMobilePass, "mobileCode": mobileCode, "isBinding": isBinding, 
				"source": source, "thirdToken": thirdToken, "tokenSecret":tokenSecret};
		$.ajax({
			type: 'POST',
			url: basePath + "signup/register.do?m=regUser",
			data: dataMap,
			beforeSend : function(XMLHttpRequest) {
				$('#mobileBtn').hide();
				$('#regloading').show();
			},
			success: function (data) {
				var msg = eval('(' + data + ')');
				if (msg.flag == 'success') {
					/*
					 * if(msg.text!=''){
						Boxy.alert(msg.text);
					}*/
					setTimeout("location.href='"+basePath+"'",0);
				} else {
					$('#regloading').hide();
					$('#mobileBtn').show();
					
					$('#mobileError').html(msg.text);
				}
			}
	   	});
	});
	
	//验证码更新 
	$("b[name='spcode']").bind("click", function () {
		var spcode = $(this).prev('span').children('img');
//		alert(spcode);
		var imgCode = chgUrl(spcode.attr('src'));
		//spcode.attr("src", );
		
		$("img[name='srccode']").each(function() {
			$(this).attr('src', imgCode);
		})
	});	
});


// 手机号码校验
function checkMobile() {
//	var mobileReg = /^0{0,1}1[0-9]{10}$/;
	//150,153,156,158,159，157，188，189 开头的号码
	var mobileReg = /^(13[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/;
	
	var mobile = $('#mobile').val();
	var mobileError = $('#mobileError').val();
	if (mobile == '') {
		$('#mobileError').html('请输入手机号');
		return false;
	}
	if (!mobileReg.test(mobile)) {
		$('#mobileError').html('请输入正确的手机号');
		return false;
	}
	return true;
}

// 邮箱校验
function checkPass() {
	var reg = /^(?=.*\d+)(?=.*[a-zA-Z]+).{8,20}$/;
	
	var mobilePass = $('#mobilePass').val();
	if (mobilePass == '') {
		$('#mobilePassError').html('密码不能为空');
		return false;
	}
	if (!reg.test(mobilePass)) {
		$('#mobilePassError').html('密码由8-20个数字和字母组成');
		return false;
	}
	return true;
}

// 手机验证码校验
function checkMobileCode() {
	var codeReg = /^[0-9]{6}$/;
	
	var mobileCode = $('#mobileCode').val();
	if (mobileCode == '') {
		$('#mobileCodeError').html('手机确认码不能为空');
		return false;
	}
//	if (!codeReg.test(mobileCode)) {
//		$('#mobileCodeError').html('验证码只能为6位数字');
//		return false;
//	}
	return true;
}

function chgUrl(url) {
	var timestamp = (new Date()).valueOf();
	url = url.substring(0,url.indexOf("?"));
	if((url.indexOf("&") >= 0)) {
		url = url + "×tamp=" + timestamp;
	}else{
		url = url + "?timestamp=" + timestamp;
	}
	return url;
}

var registSecondVal = 60;
//倒计时
function registShowtime() {
	//将信息展示到网页上
	$("#button_orange_hqyzm").addClass("aashy_inline").children(".countdown").show();
	$("#button_orange_hqyzm").children(".countdown").text("("+(--registSecondVal)+")");
	if(registSecondVal<=0){
		registSecondVal = 60;
		$("#button_orange_hqyzm").removeClass("aashy_inline").children(".countdown").hide().text(""+registSecondVal);
	}else{
		setTimeout("registShowtime()",1000);	//每一秒执行一次，实现倒计时效果
	}
}