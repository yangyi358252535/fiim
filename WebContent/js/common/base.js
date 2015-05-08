	/*
	*@author liujiangyu
	*全局js文件,head和foot页面所需js文件
	*/
	/**预加载函数,在页面加载完毕后会执行**/
	var cityMapIsOver = false;//触发标志位
	var cityIsOver = false;//触发标志位
	var qCityIsOver = false;//触发标志位
	var qFilmIsOver = false;//触发标志位
	var qCinemaIsOver = false;//触发标志位
	var qShowIsOver = false;//触发标志位
	var qNameList;
	$(document).ready(function () {
		$('#loginDiv').show();
		
		/*********选择城市-start-*******/
		$("#city").click(function(){
			cityIsOver = true;
			$(this).children('b').toggleClass('b-hover');
			$(this).next('.pop-wrap').toggle();
			$('#citybox').toggleClass("pop-hover");
			$('#city_map .other_city dt').eq(0).mouseenter();
		});
		$("#city").mouseover(function(){
			cityIsOver = true;
		});
		$("#city").mouseleave(function(){
			cityIsOver = false;
			setTimeout("if(!cityMapIsOver){$('#citybox').removeClass('pop-hover');$('#city').children('b').removeClass('b-hover');$('#city').next('.pop-wrap').hide();}",200);			
		});
		$("#city_map").mouseover(function(){
			cityMapIsOver = true;
		});	
		
		$("#city_map").mouseleave(function(){
			cityMapIsOver = false;
			setTimeout("if(!cityIsOver){$('#citybox').removeClass('pop-hover');$('#city').children('b').removeClass('b-hover');$('#city').next('.pop-wrap').hide();}",200);
		});
		$("#city_map dl dd a").click(function(){
			$('#city').next('.pop-wrap').hide();
			cityIsOver = false;//将标志位全部置为默认值
			cityMapIsOver = false;
//			$("#city").html($(this).text()+"<b class='transition'></b>");
//			$("#city .transition").removeClass("transition_active");
			$('#citybox').removeClass('pop-hover');
		});
		
		//鼠标指向城市字母交互操作
		$('#city_map .other_city dt').mouseenter(function(){
			var _width = $('#city_map').width();
			var _height = $(this).outerHeight(true)+ $(this).next('dd').outerHeight(true);
			$(this).addClass('current').next('dd').width(_width).show().parents('dl').height(_height);
			$(this).parents('.other_city').siblings('.other_city').height('auto')
						.find('dt').removeClass('current')
						.next('dd').hide();
		//	$('.tuan_info').width($('#city_map').width());//解决ie7 兼容性
		});
		
		//初始化城市选择框
		$('#city_map .other_city').eq(0).each(function(i){
//			$('#city_map').css({'display':'block','opacity':'0'});//将需操作的元素展示出来，以便获取其尺寸属性
			var _width = $('#city_map').width();
			var _height = $(this).find('dt').outerHeight(true)+ $(this).find('dd').outerHeight(true);
			$(this).height(_height).find('dt').addClass('current').next('dd').width(_width).show();
			$('#city').next('.pop-wrap').hide();
//			$('#city_map').css({'display':'none','opacity':''});//完成操作后隐藏元素
		//	$('.tuan_info').width($('#city_map').width());//解决ie7 兼容性
		});

		/*********选择城市-end-*******/
		
	/*
	//输入域焦点效果
		$("input[type='#'],input[type='text'],input[type='password'],textarea").focus(function(){
			$(this).attr("style","border:1px solid #5db6e0;");
		});
		
	//输入域焦点效果
		$("input[type='#'],input[type='text'],input[type='password'],textarea").blur(function(){
			$(this).attr("style","");
		});
	*/
		//解决ie下"集团新闻"兼容性问题
		
		$(".wanda_news").mouseenter(function(){
			$(".wanda_news *").show();
		});
		$(".wanda_news").mouseleave(function(){$(".wanda_news *").hide();
		});	
		
		//验证码更新 
		$("#spcode").bind("click", function () {
			var srccode = $("#srccode");
			var src = srccode.attr("src");
			srccode.attr("src", chgUrl(src));
		});	
		$("#srccode").bind("click", function () {
			var srccode = $("#srccode");
			var src = srccode.attr("src");
			srccode.attr("src", chgUrl(src));
		});
		
		/* 即将上映影片排行榜 start*/ 
		$.ajax({
			type: "post",
			url: basePath + "homePage.do?m=getNextFilmIndex",
			success: function(data) {
				var msg = eval('(' + data + ')');
				$('#nextfilm_level ul li').each(function(i){
				//	msg[i].filmName = msg[i].filmName +"测试用数据数据数据";
					var filmName = msg[i].filmName.length > 10 ?(msg[i].filmName.substring(0,10)+"..."):msg[i].filmName;
					var titleInfo = msg[i].filmName.length > 10 ?msg[i].filmName:"";
					$(this).children("a").eq(0).text(/*(i+1)+". "+*/filmName).attr("href",basePath+"baseInfo/film/filmIndex.do?m=film_info_init_next&filmId="+ msg[i].filmId)
						.attr('target','_blank').attr('title',titleInfo).addClass('alightblue');
					$(this).children("span").text( msg[i].filmAtt+"人想看").css('color','rgb('+i*26+','+i*26+','+i*26+')').css('font-size',22-(i*2));
				});
			}
		});
		
		$('#nextfilm_level ul li span').click(function(){
			window.open($(this).prev('a').attr('href'));
			//$(this).prev('a').click();
		});
		
		$('#nextfilm_level ul li span').mouseenter(function(){
			$(this).css('opacity','0.7').prev('a').css('opacity','0.7').hover();
		});
		$('#nextfilm_level ul li span').mouseleave(function(){
			$(this).css('opacity','1').prev('a').css('opacity','1');
		});
		/* 即将上映影片排行榜 end */
		
		/* 页脚观影指数start */
		$(".wanda_news *").hide();
		$.ajax({
			type: "post",
			url: basePath + "homePage.do?m=getFilmIndex",
			success: function(data) {
				var msg = eval('(' + data + ')');
				
				//加载万达观影指数
				$('.level_items li').each(function(i){
					var filmName = msg[i].filmName;
					$(this).find('.film_info').attr("title",msg[i].filmName).end().find('.film_num').attr("title",msg[i].filmName);
					$(this).find('.film_info').find('a').eq(0).text(filmName);
					$(this).find('.film_like').text(msg[i].goodVote);
					$(this).find('img').attr("src",GfileServerPath+msg[i].smallFilmImg);
					$(this).find('.film_num').text(parseInt(msg[i].likes+"" =="" ? 0 :(msg[i].likes+""),10) + parseInt(msg[i].dislike+"" =="" ? 0 :(msg[i].dislike+""),10) + "位已观影用户参与");
					$(this).find("a").attr("href",basePath+"baseInfo/film/film_info_init_hot_"+ msg[i].filmId +".html").attr('target','_blank');
				});
				
				//页脚观影指数
				$('#goodfilm_level ul li').each(function(i){
				//	msg[i].filmName = msg[i].filmName + "测试用数据数据"; 
					var filmName = msg[i].filmName;
					var fontSize = "";
					var titleInfo = "";
					if(filmName.length > 10){//若大于10个字则缩小字体达到一行显示
						fontSize = "14px";
						if(filmName.length >15){//若大于15个只能加省略号达到一行显示
							filmName = msg[i].filmName.substring(0,14)+"...";
							titleInfo =msg[i].filmName;
						}
					}
					$(this).children("a").attr("href",basePath+"baseInfo/film/film_info_init_hot_"+ msg[i].filmId +".html").attr('title',titleInfo);
					$(this).find("p").text(filmName).css('font-size',fontSize);
					$(this).find("span").text(msg[i].goodVote+"喜欢率");
				});
				
				//2013-07-05 by liujy 用于将‘太极侠’强制显示在观影指数中，等影片下架后应去掉
				for(var i = 0;i<msg.length;i++){
					if(msg[i].filmName == '太极侠' && i<=2){
						break;
					}
					if(msg[i].filmName == '太极侠' && i>2){
						var filmName = msg[i].filmName;
						var fontSize = "";
						var titleInfo = "";
						if(filmName.length > 10){//若大于10个字则缩小字体达到一行显示
							fontSize = "14px";
							if(filmName.length >15){//若大于15个只能加省略号达到一行显示
								filmName = msg[i].filmName.substring(0,14)+"...";
								titleInfo =msg[i].filmName;
							}
						}
						$('#goodfilm_level ul li').last().children("a").attr("href",basePath+"baseInfo/film/film_info_init_hot_"+ msg[i].filmId +".html").attr('title',titleInfo);
						$('#goodfilm_level ul li').last().find("p").text(filmName).css('font-size',fontSize);
						$('#goodfilm_level ul li').last().find("span").text(msg[i].goodVote+"喜欢率");
					}
				}
			}
		});
		
		var levelCurrNo = 0;//初始化	
		var levelTime=null; 
		//设定时间
		levelTime = setInterval(function(){
			showFocusLevel(levelCurrNo);
			levelCurrNo++;
			if(levelCurrNo==3){levelCurrNo=0;}
		} , 2000);	
		
		/* 页脚观影指数end */
		
		/* 返回顶部 start */
		$(window).bind("scroll", function(){ 
			//当滚动条滚动时
			var scrollObj = ScollPostion();
			if(scrollObj.top >= 300){
				$("#xiaomao").fadeIn("fast");
			}else{
				$("#xiaomao").hide();
			}
		});
		
		$("#xiaomao").mouseover(function(){
			$(this).stop().animate({'background-color':'#5db6e0','opacity':'1'},'fast');	
		});
		
		$("#xiaomao").mouseout(function(){
			$(this).stop().animate({'background-color':'#909090'},'fast');	
		});
		
		$("#xiaomao").click(function(){
			//$("#xiaomao #up").hide();
			//$("#xiaomao #up1").show();
			//$("html,body").animate({scrollTop: 0}, 100,function(){
			//	setTimeout('$("#xiaomao #up").show();$("#xiaomao #up1").hide();',150);
			//});
			$("html,body").scrollTop(0);
		});
		
		//获取滚动条位置
		 function  ScollPostion() {
		        var t;
		        if (document.documentElement && document.documentElement.scrollTop) {
		            t = document.documentElement.scrollTop;
		        } else if (document.body) {
		        	t = document.body.scrollTop;
		        }
		        return { top: t};
		    }
		 /* 返回顶部 end */
		 
		 //设置各地影城链接
		 $('#cinemaDetails,.cinamaMess').attr('href',basePath + 'service/service.do?m=toFilmCity&cityCode='+theCityCode);
		 
		 // 如果在订单页面，使用了兑换券或礼券，则提示订单取消
		 $('#head a, #footer a').click(function() {
			var movieBuyPay = $('#movieBuyPay').val();
			if (movieBuyPay == 'movieBuyPay') {
				// 如果是在当前窗口打开，则去判断是否取消订单
				var target = $(this).attr('target');
				if (target == '_self' || target == '') {
					var tid = $(this).attr('id');
					if (tid != 'city') {
						// 判断是否使用了兑换码或礼券，不用判断session，因为15分钟后自动跳转页面
						var orderId = $('#orderId').val();
						var ahref = $(this).attr('href');
						$.ajax({
							type: 'POST',
							async: false,
							url: basePath + "user/order_mgr.do?m=preferentialWay&orderId=" + orderId,
							success: function (data) {
								if(data == 'true') {
									showConfirm(
										"您尚未完成购票，确认要放弃本次购票？", 
										function() {	// 点击"确认"执行
											// 取消订单
											$.ajax({
												type: 'POST',
												async: false,
												url: basePath + "user/order_mgr.do?m=orderCancel&orderId=" + orderId + "&timestamp=" + new Date(),
												success: function (data) {
													location.href = ahref;
												}
										   	});
										},
										function() {	// 点击"取消执行"
											location.href = ahref;
										}
									);
								} else {	// 没有未使用了兑换码或礼券的订单
									location.href = ahref;
								}
							}
					   	});
						
						return false;
					}
				}
			}
		 });
	});
	
//升级提醒 
//如不想在某个页面进行升级提醒，只需在该页面中加入下面的隐藏域即可
//<input type="hidden" name="noLevelHintFlag" id="noLevelHintFlag" value="1" />
$(function(){
	//提醒标识
	var hintFlag=$("#showLevelHintFlag").val();
	//不提醒标识
	var noLevelHintFlag=$("#noLevelHintFlag").val();
	if(hintFlag == "1" && noLevelHintFlag != "1"){
		//升级期望分数
		var levelPoints=$("#levelPointsOffset").val();
		//提示文字
		var hintmsg='';
		//等级编码
		var levelCode=$("#memberLevelCode").val();
		if(levelCode=="1"){
			hintmsg='<p><span style="color:red;font-size:18px;padding-left:110px">好消息 !   您只需 '+levelPoints+' 分即可升级为二星会员</span></p><br/>' +
					'<p><span style="color:#000000;padding-left:110px">二星会员待遇：所有一星服务</span><br/>' +
					'<span style="color:#000000;padding-left:202px">生日享受卖品套餐一份</span></br>' +
					'<span style="color:#000000;padding-left:202px">指定卖品优惠</span></p>';
		}else if(levelCode=="2"){
			hintmsg='<p><span style="color:red;font-size:18px;padding-left:110px">好消息 !   您只需 '+levelPoints+' 分即可升级为三星会员</span></p><br/>' +
					'<p><span style="color:#000000;padding-left:110px">三星会员待遇：所有一星和二星服务</span><br/>' +
					'<span style="color:#000000;padding-left:202px">生日当天免费观影（仅限2D电影）</span></br>' +
					'<span style="color:#000000;padding-left:202px">优先参与明星见面会首映礼</span></p>';
		}else if(levelCode=="3"){
			hintmsg='<p><span style="color:red;font-size:18px;padding-left:110px">好消息 !   您只需 '+levelPoints+' 分即可升级为四星会员</span></p><br/>' +
					'<p><span style="color:#000000;padding-left:110px">四星会员待遇：所有一星、二星和三星服务</span><br/>' +
					'<span style="color:#000000;padding-left:202px">购买专享限量版电影衍生品</span></br>' +
					'<span style="color:#000000;padding-left:202px">生日当天免费观影</span></br>' +
					'<span style="color:#000000;padding-left:202px">参加四星会员专属活动</span></p>';
		}
		if(levelCode == "1" || levelCode =="2" || levelCode=="3"){
			showAlertWithoutButton(hintmsg,function(){
			$.ajax({
				type:"POST", 
				url: basePath + 'homePage.do?m=clearLevelHint',
				data:{"levelCode":levelCode},
				dataType:"json", 
				success:function (data) {
		        }
			});
		});
		}
		
	}
				
});

// 回调函数，在弹出框登录完成后调用
function callBack(data) {
	if (data != '') {
		eval('(' + data + ')');
	}
}

//关注影片ajax
function attention_submit(filmId, mobile, email, cityCode) {
	$.ajax({
		type: 'post',
		url: basePath + 'filmAttention.do?m=filmAttention',
		data: 'filmId=' + filmId + '&mobile=' + mobile + '&email=' + email + '&cityCode=' + cityCode,
		success: function(data) {
			var msg = eval('(' + data + ')')
			var flag = msg.flag;
			if (flag != '1' && flag != '2') {
				alert("关注失败！");
				return false;
			} else {
				return true;
			}
		}
	});
	return true;
};

// 取消关注影片
function payNoAttention(filmId) {
	$.ajax({
		type: "post",
		url: basePath + "filmAttention.do?m=payNoAttention&filmId=" + filmId,
		success: function(data) {
			if (data == '1') {
			//	alert("取消关注成功！");
			} else {
				alert("取消关注失败！");
				return false;
			}
		}
	});
};

// 验证码刷新
function chgUrl(url) {
	var timestamp = (new Date()).valueOf();
	url = url.substring(0, url.indexOf("?"));
	if ((url.indexOf("&") >= 0)) {
		url = url + "\xd7tamp=" + timestamp;
	} else {
		url = url + "?timestamp=" + timestamp;
	}
	return url;
}

/* 页脚观影指数start */
function showFocusLevel(i) {
	var vtop = -parseInt(i*64);
	if($.browser.msie && ($.browser.version.indexOf("7")!=-1 || $.browser.version.indexOf("8")!=-1)){//解决ie7,8兼容性问题
		vtop = -parseInt(i*68);
	}
	$('#goodfilm_level ul').stop().animate({top:vtop},200);
}
/* 页脚观影指数end */
/*
var alertThemeFlag =false;
$(document).ready(function(){
	$('#seat_sel dl dd ol li,.button_green_next').click(function(){alertThemeFlag = true;window.alert=showAlert;});
});

function showAlert(msg){
	if(alertThemeFlag){
		$('<div>'+msg+'</div>').dialog({
			width : 550,height : 'auto',position : 'center',modal : true
		});
	}else{
		window.alert(msg);
	}
}*/

var dialogObject = null;
function showAlert(msg,callback){
	var maxAlertWidth = 600; var minAlertWidth = 400; msgFontSize = 16;
	var msgWidth = msg.length * msgFontSize + 64;//计算宽度
	msgWidth = (msgWidth < maxAlertWidth)?msgWidth:maxAlertWidth;
	msgWidth = (msgWidth > minAlertWidth)?msgWidth:minAlertWidth;
	var dialogContent = "<div style='padding:.5em 32px'><p style='margin:2px 0 40px 0;text-align:center; color:#000; font:"+msgFontSize+"px/24px \"微软雅黑\";'>"+msg+"</p></div>";
	dialogObject = $(dialogContent).dialog({
		width : msgWidth,
		height : "auto",
		position : 'center',
		modal : true,
		buttons:{
			'确认':function(){
				if(callback ===undefined){}else{
					callback();	
				}
				dialogObject.dialog('destroy');
				dialogObject = null;
		    }
		},
		title : "提示信息",
		closeText : "X",
		open:function(event,ui){$('.ui-dialog .ui-dialog-buttonpane button').eq(0).children('span').addClass('set_attention_sub');}
	});
}

//无关闭按钮的提示框
//去掉右上角X关闭按钮，原因是当点击X关闭后，再次弹出时确定按钮样式会丢失
function showAlertWithoutCloseButton(msg,callback){
	var maxAlertWidth = 600; var minAlertWidth = 400; msgFontSize = 16;
	var msgWidth = msg.length * msgFontSize + 64;//计算宽度
	msgWidth = (msgWidth < maxAlertWidth)?msgWidth:maxAlertWidth;
	msgWidth = (msgWidth > minAlertWidth)?msgWidth:minAlertWidth;
	var dialogContent = "<div style='padding:.5em 32px'><p style='margin:2px 0 40px 0;text-align:center; color:#000; font:"+msgFontSize+"px/24px \"微软雅黑\";'>"+msg+"</p></div>";
	dialogObject = $(dialogContent).dialog({
		width : msgWidth,
		height : "auto",
		position : 'center',
		modal : true,
		buttons:{
			'确认':function(){
				if(callback ===undefined){}else{
					if(typeof callback == "function")
					callback();	
				}
				dialogObject.dialog('destroy');
				dialogObject = null;
		    }
		},
		title : "提示信息",
//		closeText : "X",
		open:function(event,ui){
			//隐藏关闭按钮
			$(".ui-dialog-titlebar-close").hide();
			$('.ui-dialog .ui-dialog-buttonpane button').eq(0).children('span').addClass('set_attention_sub');}
	});
}

//解决BUG：当callback不是function时会出现问题
function showAlertNew(msg,callback){
	var maxAlertWidth = 600; var minAlertWidth = 400; msgFontSize = 16;
	var msgWidth = msg.length * msgFontSize + 64;//计算宽度
	msgWidth = (msgWidth < maxAlertWidth)?msgWidth:maxAlertWidth;
	msgWidth = (msgWidth > minAlertWidth)?msgWidth:minAlertWidth;
	var dialogContent = "<div style='padding:.5em 32px'><p style='margin:2px 0 40px 0;text-align:center; color:#000; font:"+msgFontSize+"px/24px \"微软雅黑\";'>"+msg+"</p></div>";
	dialogObject = $(dialogContent).dialog({
		width : msgWidth,
		height : "auto",
		position : 'center',
		modal : true,
		buttons:{
			'确认':function(){
				if(callback ===undefined){}else{
					if(typeof callback == "function")
					callback();	
				}
				dialogObject.dialog('destroy');
				dialogObject = null;
		    }
		},
		title : "提示信息",
		closeText : "X",
		open:function(event,ui){$('.ui-dialog .ui-dialog-buttonpane button').eq(0).children('span').addClass('set_attention_sub');}
	});
}

//无按钮的提示框
function showAlertWithoutButton(msg,callback){
	var maxAlertWidth = 600; var minAlertWidth = 400; msgFontSize = 16;
	var msgWidth = msg.length * msgFontSize + 64;//计算宽度
	msgWidth = (msgWidth < maxAlertWidth)?msgWidth:maxAlertWidth;
	msgWidth = (msgWidth > minAlertWidth)?msgWidth:minAlertWidth;
	var dialogContent = "<div style='padding:.5em 32px'><p style='margin:2px 0 40px 0;text-align:center; color:#000; font:"+msgFontSize+"px/24px \"微软雅黑\";'>"+msg+"</p></div>";
	dialogObject = $(dialogContent).dialog({
		width : msgWidth,
		height : "auto",
		position : 'center',
		modal : true,
		title : "提示信息",
		closeText : "X",
		open:function(event,ui){$('.ui-dialog .ui-dialog-buttonpane button').eq(0).children('span').addClass('set_attention_sub');},
		beforeclose: function(event, ui) {if(typeof callback == "function") callback();}
	});
}

function showConfirm(msg, callback1, callback2){
	var maxAlertWidth = 600; var minAlertWidth = 400; msgFontSize = 16;
	var msgWidth = msg.length * msgFontSize + 64;//计算宽度
	msgWidth = (msgWidth < maxAlertWidth)?msgWidth:maxAlertWidth;
	msgWidth = (msgWidth > minAlertWidth)?msgWidth:minAlertWidth;
	var dialogContent = "<div style='padding:.5em 32px'><p style='margin:2px 0 40px 0;text-align:center; color:#000; font:"+msgFontSize+"px/24px \"微软雅黑\";'>"+msg+"</p></div>";
	dialogObject = $(dialogContent).dialog({
		width : msgWidth,
		height : "auto",
		position : 'center',
		modal : true,
		title : "提示信息",
		closeText : "X",
		buttons:{
			'确认':function(){
				callback1();
				dialogObject.dialog('destroy');
				dialogObject = null;
    		},
    		'取消':function(){
    			if(typeof callback2 == "function") 
    				callback2();
    			dialogObject.dialog('destroy');
    			dialogObject = null;
    		}
		},
		open:function(event,ui){
			$('.ui-dialog .ui-dialog-buttonpane button').eq(0).children('span').addClass('set_attention_sub');
			$('.ui-dialog .ui-dialog-buttonpane button').eq(1).children('span').addClass('cancel').attr('style','line-height:30px;width:auto;min-width:0px;margin-left:40px;+width:40px;+min-width:40px;');
		}
	});
}

/** 无关闭按钮的确认框 **/
//add by suicl at 2013/5/2
//解决bug：在一个dialog上弹出确认框，点击确认框的关闭按钮进行关闭后，再次弹出确认框时按钮样式会丢失
//微调了取消按钮的位置，使之与确认按钮对齐
function showConfirmWithoutCloseButton(msg, callback1, callback2){
	var maxAlertWidth = 600; var minAlertWidth = 400; msgFontSize = 16;
	var msgWidth = msg.length * msgFontSize + 64;//计算宽度
	msgWidth = (msgWidth < maxAlertWidth)?msgWidth:maxAlertWidth;
	msgWidth = (msgWidth > minAlertWidth)?msgWidth:minAlertWidth;
	var dialogContent = "<div style='padding:.5em 32px'><p style='margin:2px 0 40px 0;text-align:center; color:#000; font:"+msgFontSize+"px/24px \"微软雅黑\";'>"+msg+"</p></div>";
	dialogObject = $(dialogContent).dialog({
		width : msgWidth,
		height : "auto",
		position : 'center',
		modal : true,
		title : "提示信息",
		//closeText : "X",
		buttons:{
			'确认':function(){
				callback1();
				//解决bug：如果确认框在一个已有的dialog上弹出，关闭后会导致该dialog的关闭按钮消失
				$(".ui-dialog-titlebar-close").show();
				dialogObject.dialog('destroy');
				dialogObject = null;
    		},
    		'取消':function(){
    			//解决bug：如果确认框在一个已有的dialog上弹出，关闭后会导致该dialog的关闭按钮消失
    			$(".ui-dialog-titlebar-close").show();
    			if(typeof callback2 == "function") 
    				callback2();
    			dialogObject.dialog('destroy');
    			dialogObject = null;
    		}
		},
		open:function(event,ui){
			//隐藏关闭按钮
			$(".ui-dialog-titlebar-close").hide();
			$('.ui-dialog .ui-dialog-buttonpane button').eq(0).children('span').addClass('set_attention_sub');
			$('.ui-dialog .ui-dialog-buttonpane button').eq(1).children('span').addClass('cancel').attr('style','line-height:10px;width:auto;min-width:0px;margin-left:40px;+width:40px;+min-width:40px;');
		}
	});
}


/*添加省略号
function wordLimit(elements,maxHeight){
	if(typeof maxHeight == 'undefined'){return false;}
	if(typeof maxHeight == 'undefined'){maxHeight = $(elements).height();}
	$(elements).each(function(i){
		var container =$(elements).clone(true).text($(elements).eq(i).text()).css({"height":"auto","width":$(elements).eq(i).width()}).appendTo('body');
			//$('<div></div>').text($(elements).eq(i).text()).appendTo("body");
		alert(container.height()+"\n"+$(elements).eq(i).height());
		while (container.height()>maxHeight) {
			$(elements).text(function (index, text) {
		        return text.replace(/\W*\s(\S)*$/, '...');
		    });
		} 
	});
	
}*/


//我的订单
function listOrder() {
		var flag = 'listOrder()';
		var url = basePath + "user/m2_init.html";
		$.ajax({
			type: 'POST',
			url: basePath + "judgeUser.do?m=judgeSessionUser",
			success: function (data) {
				if (data == 'sessionIsNull') {
					if(typeof loginDialog =='undefined'){
						$("<div></div>").appendTo('html').load(basePath + "login/login_dialog.jsp",function(){
							openLoginDialog(url);
						});
					}else{
						openLoginDialog(url);
					}
				} else if (data == 'sessionIsNotNull') {
					// 跳转到订单页面
					location.href = url;
				}
			}
	   	});
}

//投诉建议
function tsjy() {
		var url = basePath + "wanda/findMyInnerMsg.do?m=findMsgList&setPenal=2";
		$.ajax({
			type: 'POST',
			url: basePath + "judgeUser.do?m=judgeSessionUser",
			success: function (data) {
				if (data == 'sessionIsNull') {
					if(typeof loginDialog =='undefined'){
						$("<div></div>").appendTo('html').load(basePath + "login/login_dialog.jsp",function(){
							openLoginDialog(url);
						});
					}else{
						openLoginDialog(url);
					}
				} else if (data == 'sessionIsNotNull') {
					// 跳转到订单页面
					location.href = url;
				}
			}
	   	});
		return false;
}

//会员卡激活
function membershipCardActivation(){
//	var flag = 'listOrder()';
	
	var url = basePath + "user_center/login_membershipCardActivation.jsp";
	$.ajax({
		type: 'POST',
		url: basePath + "judgeUser.do?m=judgeSessionUser",
		success: function (data) {
			if (data == 'sessionIsNull') {
				if(typeof loginDialog =='undefined'){
					$("<div></div>").appendTo('html').load(basePath + "login/login_dialog.jsp",function(){
						openLoginDialog(url);
					});
				}else{
					openLoginDialog(url);
				}
			} else if (data == 'sessionIsNotNull') {
				// 跳转到订单页面
				location.href = url;
			}
		}
   	});
}
