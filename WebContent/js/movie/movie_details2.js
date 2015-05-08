/**
*@author liujiangyu
*@影片详情页
*/
	var showCharNum = 74;//鼠标移开时显示在评论区的字数
	var commentLiNumOfPage = 9;//每页显示的评论数
	var commentLiNumOfLine = 3;//每行显示的评论数
	var commentLineNumOfPage = 3;//每页显示的评论行数
	var totalPageNum;//评论总页数
	var maxCharNum = 140;//评论字数上限
	var minCharNum = 5;//评论字数下限
	var commentEffectOfTime = 660;//特效时间，以毫秒为单位
	var shareDialog = null;//分享弹出框
	var sinabind = '0';	// 账号是绑定标识，1：已绑定，0：未绑定
	var doubanbind = '0';
	var sinaSyn = '0';	// 是否选中分享标识，1：已选中同步分享，0：未选中同步分享
	var doubanSyn = '0';
	
	/**
	*页面加载完成后执行
	*/
	$(document).ready(function () {
		// 判断是否允许评价
		var evaluate = $('#evaluate').val();
		if (evaluate != '0') {
			$('#piaogen_type').hide();
			$("input[name='piaogen_type']").attr('disabled', true);
		}
		
		//点击播放按钮弹出视频
		$('#flash .playBtn').click(function(){
		$(this).hide();
		$('#player_box').show();$('#stop_btn').show();$("#player_nav").show();
		if(playerBoxContent != "" && playerBoxContent != null){
			$('#player_box').append(playerBoxContent);
		};
		})
		//播放按钮
		$('#flash .playBtn').hover(function(){
			$(this).children().attr('src',basePath+'imges/movie/btn_playhover.png');
			},function(){
			$(this).children().attr('src',basePath+'imges/movie/btn_play.png');	
		});
		
		//影片介绍内容[展开]
		$(".show_more").click(function() {
			$(".more_content").css('display','inline');
			$(this).hide();
			$(".hide_more").show();
		});
		
		$(".hide_more").click(function(){
			$(".more_content").css('display','none');
			$(this).hide();
			$(".show_more").show();
		});
		
		//切换预告片
		$(".player").click(function(){
			var flashVars="LogoText=www.wandafilm.com&amp;BufferTime=3;autoPlay=true&amp;autoRewind=false";
			var _url = $(this).attr("href");
			var objStr = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0' width='574' height='322' id='flash_box'>"	+
			"  <param name='movie' value='"+basePath+"flash/flvplayer.swf'>"	+
			"  <param name='quality' value='high'>"	+
			"  <param name=AUTOSTART value=1>"	+
			"  <param name='allowFullScreen' value='true'>"	+
			"  <param class='FlashVars' name='FlashVars' value='"+"vcastr_file="+_url+"&amp;"+flashVars+"'>"	+
	        "  <param name='scale' value='noscale' />"	+
	        "  <param name='salign' value='lt'>"	+
	        "  <param name='swfversion' value='8,0,0,0'>"	+
	        "  <!-- 此 param 标签提示使用 Flash Player 6.0 r65 和更高版本的用户下载最新版本的 Flash Player。如果您不想让用户看到该提示，请将其删除。 -->"	+
	        "  <param name='expressinstall' value='Scripts/expressInstall.swf'>"	+
	        "  <!-- 下一个对象标签用于非 IE 浏览器。所以使用 IECC 将其从 IE 隐藏。 -->"	+
	        "  <!--[if !IE]>-->"	+
	        "  <object type='application/x-shockwave-flash' data='"+basePath+"flash/flvplayer.swf' width='574' height='322' id='flash_box'>"	+
	        "    <!--<![endif]-->"	+
			"	<param name='quality' value='high'>"	+
			"	<param name=AUTOSTART value=1>"	+
	        "    <param name='wmode' value='opaque'>"	+
	        "    <param name='scale' value='noscale'>"	+
	        "    <param name='salign' value='lt'>"	+
	        "    <param name='allowFullScreen' value='true'/>"	+
			"	<param class='FlashVars' name='FlashVars' value='"+"vcastr_file="+_url+"&amp;"+flashVars+"'>"	+
	        "    <param name='swfversion' value='8,0,0,0'>"	+
	        "    <param name='expressinstall' value='Scripts/expressInstall.swf'>"	+
	        "    <!-- 浏览器将以下替代内容显示给使用 Flash Player 6.0 和更低版本的用户。 -->"	+
	        "    <div>"	+
	        "      <h4>此页面上的内容需要较新版本的 Adobe Flash Player。</h4>"	+
	        "      <p><a href='http://www.adobe.com/go/getflashplayer'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='获取 Adobe Flash Player' /></a></p>"	+
	        "    </div>"	+
	        "    <!--[if !IE]>-->"	+
	        "  </object>"	+
	        "  <!--<![endif]-->"	+
	        "</object>";
			$("#flash_box_notie").attr("data",_url);
			$("#player_box").empty().append(objStr);
			//加载视频
			//createFlashPlayer(_url, 'player_box',574,322);
			$('#flash .playBtn').hide();
			$('#player_box').show();$('#stop_btn').show();$("#player_nav").show();
			$(this).addClass("flash_sel").siblings("a").removeClass("flash_sel");
			return false;
		});
		
		//评价详情弹出框
		$("#details").click(function(){
			var setAttention = $("#appraise_details").dialog({
					width : 705,
					height : 524,
					position : 'center',
					modal : true,
					title : "评价详情",
					closeText : "X"
				});	
		});
		
		
		//重点详情页剧照，花絮，海报弹出框
		if(typeof $.fn.lightBox ==='function'){
			$('#pic_item1 a').lightBox();
			$('#pic_item2 a').lightBox();
			$('#pic_item3 a').lightBox();
		}
		
		//设置缩略图点击事件
		$('.preview_pic img').click(function(){
			$(this).parent().next('div').find('.pic_item').find('a').eq(0).click();
		});
		

		//缩略图等比例匹配容器大小
		$('.preview_pic').each(function(){
			var selfWidth = $(this).width()-6;
			var selfHeight = $(this).height()-6;
			var previewImg = $(this).find('img');
			if(previewImg.width() < previewImg.height()){
				previewImg.height(selfHeight);
				previewImg.css({'width':'auto'});
			}else{
				previewImg.width(selfWidth);
				previewImg.css({'height':'auto'});
			}
			previewImg.css({'margin-top':($(this).height() - previewImg.height())/2,'visibility':'visible'});
		});
		
		//票根操作
		$("#pg_like,#pg_hate").click(function(){
			$("#piaogen_pics").removeClass().addClass(""+$(this).attr("id"));
		});
		
		/** 评论输入域焦点效果 */
		$("#content").focus(function(){
		var tempStr = window.location.href.indexOf('?')!=-1 ? '&gobottom=yes':'?gobottom=yes';
			checkLogin(window.location+tempStr);	// 登录完成后重新刷新页面
			if( $("#content").val().replace(/[\r\n]/g,"").length==0){$(".content_tip").hide();}
		});
		$("#content").blur(function(){
			if( $("#content").val().replace(/[\r\n]/g,"").length==0){$(".content_tip").show();}
		});
		$(".content_tip").click(function(){
			if( $("#content").val().replace(/[\r\n]/g,"").length==0){$(".content_tip").hide();$("#content").focus();}		
		});
		//第三方账号图标变化
		$("#syn-sina, #syn-douban").click(function(){
			if(!$(this).hasClass($(this).attr("id")+"-checked")){
				if ($(this).attr("id") == 'syn-sina') {
					var sinabind = $('#sinabind').val();
					if (sinabind == '1') {
						$(this).addClass("syn-sina-checked");
					}
				}
				if ($(this).attr("id") == 'syn-douban') {
					var doubanbind = $('#doubanbind').val();
					if (doubanbind == '1') {
						$(this).addClass("syn-douban-checked");
					}
				}
			}else{
				$(this).removeClass($(this).attr("id")+"-checked");
			}
		});
		
	/*  分享弹出框  */
	
	//生成分享弹出框-分享给好友
	$("#button_minx2").click(function(){
		// 判断是否登录
		$.ajax({
			type: 'POST',
			url: basePath + "judgeUser.do?m=judgeSessionUser",
			success: function (data) {
				if (data == 'sessionIsNull') {
					//openLoginDialog(flag);
					openLoginDialog('reload');
				} else if (data == 'sessionIsNotNull') {
					// 查询是否有第三方绑定账号
					// 如果已绑定，则弹出分享框，如果未绑定，则提示绑定
//			 		if (sinabind == '1' || doubanbind == '1') {	// 有第三方绑定
			 			$('#shareType').val('film');	// 设置分享类型，分享影片
			 			$('.share_content').val('');
			 			//$(".share_content").text($(this).parents(".comment_main").find(".complete_content").text());//初始化要分享的评论信息
			 			$(".share_content").val($('#viewFocus').val());	// 初始化要分享的影片信息
			 			$(".share_pics").css("left","0px").find("img").removeClass();	// 初始化图片
			 			
			 			// 默认选中分享第一张图片
			 			var shareImg = $('.share_pics li:first img');
			 			var imgPath = shareImg.attr('src')
			 			$('#imgPath').val(imgPath);
		 				shareImg.addClass("img_checked").next(".share_bottom_icon").addClass("share_bottom_icon_checked");
		 				shareDialog = $("#share_dialog").dialog({	
			 				width : 655,
			 				height : "auto",
			 				position : 'center',
			 				modal : true,
			 				title : "分享给好友",	
			 				closeText : "X",
							open:function(event,ui){$('#share_dialog').find('.err_inline').text('');$('#share_dialog').find('.err_block').text('');}
			 			});
//				 	} else {
//				 		showAlert("请先到用户中心绑定第三方账号并设置允许发表评论和影片同步");
//				 		return false;
//				 	}
				}
			}
	   	});
	});
	
	
	//添加剧照到分享框中
	var shareBottomIcon="<b class='share_bottom_icon'></b>";
	$(".movie_imges a").each(function(){$(".share_pics").append("<li>"+$(this).html()+shareBottomIcon+"</li>");});//装载图片到分享弹出框
	$(".share_pics").width($(".share_pics li").length * ($(".share_pics li").width()));//计算图片区宽度
	
	//关闭分享框
	$(".share_cancel").click(function(){
		$('.share_content').val('');
		window.shareDialog.dialog("close");
	});

	//上一组图片	
	$(".prev_group").click(function(){
		$(".next_group").removeClass("end");
		var displayWidth = parseInt($(".share_pics li").width() * 4,10);
		var leftValue = parseInt($(".share_pics").css('left').replace('px',''),10) + displayWidth;
		if(leftValue == 0){$(this).addClass("end");}
		if(leftValue > 0){return ;}
		$(".share_pics:not(:animated)").animate({left:leftValue},"fast");//图片滚动效果，解决了快速连点下的错位情况
	});
	
	//下一组图片
	$(".next_group").click(function(){
		$(".prev_group").removeClass("end");
		var picsWidth = $(".share_pics").width();
		var displayWidth = parseInt($(".share_pics li").width() * 4,10);
		var leftValue = parseInt($(".share_pics").css('left').replace('px',''),10) - displayWidth;
		if((picsWidth + (leftValue - displayWidth)) < 0){$(this).addClass("end");}
		if((picsWidth + leftValue) < 0){return;}
		$(".share_pics:not(:animated)").animate({left:leftValue},"fast");//图片滚动效果，解决了快速连点下的错位情况
	});
		
	//第三方账号图标变化
	$("#dialog_share_sina, #dialog_share_douban").click(function(){
		var prefixName ="";
		if($(this).attr("id").indexOf("sina") != -1){
			prefixName = "syn-sina";
		}else if($(this).attr("id").indexOf("douban") != -1){
			prefixName = "syn-douban";
		}
		if(!$(this).hasClass(prefixName+"-checked")){
			if (prefixName == 'syn-sina') {
				var sinabind = $('#sinabind').val();
				if (sinabind == '1') {
					$(this).addClass("syn-sina-checked");
				}
			}
			if (prefixName == 'syn-douban') {
				var doubanbind = $('#doubanbind').val();
				if (doubanbind == '1') {
					$(this).addClass("syn-douban-checked");
				}
			}
		}else{
			$(this).removeClass(prefixName+"-checked");
		}
	});
	
	//选中要分享的图片		
	$(".share_pics li img").click(function(){
		$('#imgPath').val($(this).attr('src'));	// 记录要分享的图片链接
		
		$(".share_pics li img").removeClass("img_checked").next(".share_bottom_icon").removeClass("share_bottom_icon_checked");
		if(!$(this).hasClass("img_checked")){
			$(this).addClass("img_checked").next(".share_bottom_icon").addClass("share_bottom_icon_checked");;
		}else{
			$(this).removeClass("img_checked").next(".share_bottom_icon").removeClass("share_bottom_icon_checked");
		}
	});
		
	/* 设置鼠标移动到票根上时显示的文本信息 */
	$(".pg_like, .pg_hate").each(function(){
		if($(this).hasClass("pg_like")){
			$(this).attr("title","喜欢");
		}else if($(this).hasClass("pg_hate")){
			$(this).attr("title","不喜欢");
		}
	});	
	
	$("#player_box,#stop_btn").mouseover(function(){
		$("#stop_btn").show();
	});
	
	$("#player_box").mouseleave(function(){
		$("#stop_btn").hide();
	});
	
	//关闭预告片按钮
	var playerBoxContent = "";
	$("#stop_btn").click(function(){
		playerBoxContent = $("#player_box").html();
		$("#player_box").empty().hide();$(this).hide();
		$(".playBtn").show();
	});
	
	$('#dialog_share_sina,#dialog_share_douban').click(function(){
		if(!$('#dialog_share_sina').hasClass('syn-sina-checked') &&
				!$('#dialog_share_douban').hasClass('syn-douban-checked')){
			$('.shareto').children('.err_inline').text("请绑定社交网站帐号后再进行分享");
		}else{
			$('.shareto').children('.err_inline').empty();
		}
	});
	//完美活动添加签到按钮
		var questionPK = $('#questionPK').val();
 		var userPK = $('#userPK').val();
 		if(questionPK.length>0&&userPK.length>0){
 			if(userPK.substring(userPK.length-1)%2==0){
 				$("#a_qdz_2").show();
 				$("#a_qdz_1").hide();
 			}else{
 				$("#a_qdz_2").hide();
 				$("#a_qdz_1").show();
 			}
 		}else{
 			$("#a_qdz_2").hide();
 			$("#a_qdz_1").hide();
 		}
 	
	initData();
	
	// 发表影评时调用
	$('#details').click(function() {
		$.ajax({
			type: 'POST',
			url: basePath + "judgeUser.do?m=judgeSessionUser",
			success: function (data) {
				if (data == 'sessionIsNull') {
					openLoginDialog('reload');
					return false;
				} else {
					// 判断是否允许评价
					var evaluate = $('#evaluate').val();
					if (evaluate == '1') {
						showAlert('您已经为万达观影指数添砖加瓦了，请勿重复操作！');
						return false;
					} else if (evaluate == '2') {
						showAlert('对不起，为保证观影指数的真实性，只有购票用户才能参与！');
						return false;
					}
				}
			}
	   	});
	});
});
	
	/**
	*加载页面时初始化操作
	*/
	function initData(){
		initPaginationAjax();	// 加载评论
		var startNum = 1;
		var endNum = commentLiNumOfPage;
		var showHtml = "";
		setPaging();
		
		$("#content").val('');
		restoreComments();
		
		// 初始化评价CSS
		createChart();
		
		sinabind = $("#sinabind").val();
		doubanbind = $("#doubanbind").val();
	//	$('.movie_information .date div h5').width(240+$("#numOfAttention").eq(0).text().length*8);//动态计算标题域的宽度
	}
	
	/**
	*为评论区中的元素绑定事件
	*/
	function bindEventForComment(liId){
		$("#movie_comments li .comment_main .comment_content .complete_content").hide();
		
		var removeId = "";
		var commentMainId = "";
		var shareIcon="";
		if(liId === undefined){
			removeId = "#movie_comments .remove_comment";
			commentMainId = "#movie_comments li .comment_main";
			shareIcon = ".share_comment";
		}else{
			removeId = "#movie_comments #"+liId+" .comment_main .comment_content .remove_comment";
			commentMainId = "#"+liId+" .comment_main";
			shareIcon = "#"+liId+" .share_comment";
		}		
		
		//鼠标移入移出效果
		$(commentMainId).bind("mouseover",function(){
			$(this).addClass("comment_hover").children(".comment_content").addClass("content_hover");
			$(this).children(".comment_content").children(".complete_content").show();
			$(this).children(".comment_content").children(".concise_content").hide();
		});
		
		$(commentMainId).bind("mouseleave",function(){
			$(this).removeClass("comment_hover").children(".comment_content").removeClass("content_hover");
			$(this).children(".comment_content").children(".complete_content").hide();
			$(this).children(".comment_content").children(".concise_content").show();
		});	
		
		//生成分享评论弹出框
		$(shareIcon).click(function(){
			$('#reviewId').val($(this).attr('id'));	// 设置要分享的reviewId
			$('.share_content').val('');
			$(".share_content").val($(this).parents(".comment_main").find(".complete_content").text());//初始化要分享的评论信息
			$(".share_pics").css("left","0px").find("img").removeClass();//初始化图片
			
			// 默认选中分享第一张图片
 			var shareImg = $('.share_pics li:first img');
 			var imgPath = shareImg.attr('src')
 			$('#imgPath').val(imgPath);
			shareImg.addClass("img_checked").next(".share_bottom_icon").addClass("share_bottom_icon_checked");;
			
			shareDialog = $("#share_dialog").dialog({
				width : 655,
				height : "auto",
				position : 'center',
				modal : true,
				title : "分享给好友",	
				closeText : "X",
				open:function(event,ui){$('#share_dialog').find('.err_inline').text('');$('#share_dialog').find('.err_block').text('');}
			});
		});
		
		$(commentMainId).each(function(){
			var comment = $(this).find(".complete_content").text();
			$(this).find(".concise_content").text(((comment.length > showCharNum)?(comment.substring(0,showCharNum)+"..."):comment));	
		});
	}
	
	/**验证评论信息*/
	function validateComment() {
		var comment = $("#content");
		var counter = $("#counter");
		if(comment.val()=="" || $("#content").val().length < minCharNum){//为空或小于minCharNum字数
			counter.addClass("content_err"); 
			counter.text(minCharNum-comment.val().length);
			$("#prompt_content").html("您还需要输入");
			return false;
		}
		return true;
	}
	
	function checkLogin(flag){
		$.ajax({
			type: 'POST',
			url: basePath + "judgeUser.do?m=judgeSessionUser",
			success: function (data) {
				if (data == 'sessionIsNull') {
					openLoginDialog(flag);
				} 
			}
	   	});
	}
	
	//实时更新评论文本字数
	function countChar(textareaName,spanName,event){
		var promptContent = "您可以输入";
		var evt = event || window.event;
		var areaContent = $("#" + textareaName).val().replace(/[\r\n]/g,"");//将回车符和换行符排除在限制字符外
		var count = areaContent.length;
		$("#" + spanName).text((maxCharNum-areaContent.length) < 0 ? 0 : (maxCharNum-areaContent.length));
		if( count >= maxCharNum) {
			$('#' + textareaName).val($('#' + textareaName).val().substring(0, 140));
			$("#"+spanName).addClass("content_err"); 
			//将回退键和del键排除在外
			if(evt.keyCode != 8 && evt.keyCode != 46) {
				event.returnValue = false;
			}
			return false;
		}else{
			if($("#" + spanName).hasClass("content_err")){
				$("#" + spanName).removeClass("content_err");
			}
		}
		$("#prompt_content").html(promptContent);
		addCommentsCookie();
		return true;
	}
	

	//设置翻页参数和按钮样式
	function setPaging(){
		var currentPageNo = parseInt($("#currentPageNo").val(),10);
		totalPageNum = Math.floor(($("#display_data li").length%commentLiNumOfPage==0)?($("#display_data li").length/commentLiNumOfPage):($("#display_data li").length/commentLiNumOfPage+1));
		$(".next").removeClass("current");$(".prev").removeClass("current");
		if(currentPageNo==1){
			$(".prev").addClass("current");
		}
		if(currentPageNo==totalPageNum){
			$(".next").addClass("current");
		}
	}
	
//--------------------------------flim.js
	
//影片评论
function comment_submit() {
	var flag = 'comment_submit()';
	$.ajax({
		type: 'POST',
		url: basePath + "judgeUser.do?m=judgeSessionUser",
		success: function (data) {
			if (data == 'sessionIsNull') {
				//return false;
//				openLoginDialog(flag);
				var tempStr = window.location.href.indexOf('?')!=-1 ? '&gobottom=yes':'?gobottom=yes';
				openLoginDialog(window.location+tempStr);	// 登录完成后重新刷新页面
			} else if (data == 'sessionIsNotNull') {
				if(!validateComment()) {
					return false;
				}
			  	var filmId = $("#filmId").val();
			  	var content = $("#content").val().replace(/[\r\n]/g, "");
			  	var code = $('#code').val();
			  	var cmType = $("input[name='piaogen_type']:checked").val();
			  	if (cmType != '1' && cmType != '2') {
			  		cmType = '0';
			  	}
			  	
			  	var dataMap = {"filmId": filmId, "commentContent": content, 'cmType': cmType, 'code':code};
			 	$.ajax({
			  		type: "post",
			  		url: basePath + "user/comment.do?m=addFilmComment",
			     	data: dataMap,
			  		beforeSend: function(XMLHttpRequest) {
			 			$('#button_green_fb').addClass("load");
			  		},
			  		success: function(data) {
			  			$("#spcode").click();
			  			$('#button_green_fb').removeClass("load");
			        	var json = eval('(' + data + ')');
			       		if (json.error == undefined) {
			       			//showAlert("您的评论已提交成功，审核通过后将会显示在影评内。");
			       			$('#piaogen_type').hide();
			       			showAlert("评论发表成功，谢谢您的参与！");
			          		$("#content").val("");
			          		$("#code").val("");
			          		getFlashResult(1);
			          		$("#counter").html("5-140");
			          		
			          		// 更新投票CSS
			          		if (cmType == '1') {
			          			var likeNum = parseInt($("input#likeNum").val(),10)
			          			$('input#likeNum').val(likeNum + 1);
			          		}
			          		if (cmType == '2') {
			          			var likeNum = parseInt($("input#hateNum").val(),10)
			          			$('input#hateNum').val(likeNum + 1);
			          		}
			          		createChart();//重新绘制图表
			          	
			          		// 同步评论到第三方
			          		var sinabind = $('#sinabind').val();
			          		var doubanbind = $('#doubanbind').val();
			          		if (sinabind == '1' || doubanbind == '1') {
			          			// 选择同步的第三方 
			          			if ($('#syn-sina').hasClass('syn-sina-checked')) {
			    			 		sinaSyn = '1';
			    			 	}
			    			 	if ($('#syn-douban').hasClass('syn-douban-checked')) {
			    			 		doubanSyn = '1';
			    			 	}
			    			 	if (sinaSyn == '1' || doubanSyn == '1') {
				          			var showType = $('#showType').val();
				          			var imgPath = $('#imgPath').val();
				          			sharecomment_submit(json.reviewId, sinaSyn, doubanSyn, filmId, showType, imgPath, content);
			    			 	}
			          		}
			          		if (json.userCommentCount >= 3) {
			       				$("#checkcode").css("display", "");
			    			}
			       		} else{
			       			if($.trim(json.error) == "验证码错误，请重新输入！"){
			       				showAlert("请输入正确的验证码！");	
			       			}else {showAlert(json.error);}
			       			$("input[name='piaogen_type']").attr('checked', false);
			       			if (json.userCommentCount >= 3) {
			       				$("#checkcode").css("display", "");
			    			}
			   			}
					}
				});
			}
		}
   	});
	clearCommentsCookie();
};

//影片评论分享
function sharecomment_submit(reviewId, sinaSyn, doubanSyn, filmId, showType, imgPath, shareContent) {
	var dataMap = {"filmId": filmId, "reviewId": reviewId, 'sinaSyn': sinaSyn, 'imgPath': imgPath,
			'doubanSyn': doubanSyn, 'showType': showType, 'shareContent': shareContent};
	$.ajax({
	  	type: "post",
	  	url: basePath + "share.do?m=shareComment",
	  	data: dataMap,
	  	success: function(data) {
			shareDialog.dialog("close");
			showAlert("影片评论分享成功");
			// 清空数据
			$('.share_content').val('');
			$('#shareType').val('');
			$('#reviewId').val('');
			$('#imgPath').val();
		}
	});
};

// 弹出框分享按钮
function share_submit() {
	if ($('#dialog_share_sina').hasClass('syn-sina-checked')) {
 		sinaSyn = '1';
 	}
 	if ($('#dialog_share_douban').hasClass('syn-douban-checked')) {
 		doubanSyn = '1';
 	}
	
	var sinabind = $('#sinabind').val();
	var doubanbind = $('#doubanbind').val();
	if (sinabind == '1' || doubanbind == '1') {
		if (sinaSyn != '1' && doubanSyn != '1') {
	 	//	showAlert("请选择要分享到的第三方账号");
			$('.shareto').children('.err_inline').text("请绑定社交网站帐号后再进行分享");
	 		return false;
	 	}
		
		var filmId = $('#filmId').val();
		var showType = $('#showType').val();
		var imgPath = $('#imgPath').val();
		var shareContent = $('.share_content').val();
		
		var shareType = $('#shareType').val();
		if (shareType == 'film') {	// 分享影片
			shareFilm(sinabind, doubanbind, filmId, showType, imgPath, shareContent);
		} else {	// 分享评论
			var reviewId = $('#reviewId').val();
			sharecomment_submit(reviewId, sinabind, doubanbind, filmId, showType, imgPath, shareContent);
		}
	} else {
	//	showAlert("请先绑定第三方账号并设置允许发表评论和影片同步");
		$('.shareto').children('.err_inline').text("请绑定社交网站帐号后再进行分享");
		return false;
	}
};

// 影片分享
function shareFilm(sinaSyn, doubanSyn, filmId, showType, imgPath, shareContent) {
	var dataMap = {'filmId': filmId, 'showType': showType, 'imgPath': imgPath, 'sinaSyn': sinaSyn, 
			'doubanSyn': doubanSyn, 'shareContent': shareContent};
	$.ajax({
	    type: "post",
	    url: basePath + "share.do?m=shareFilm",
	    data: dataMap,
	    success: function(data){
			shareDialog.dialog("close");
			showAlert("影片分享成功");
			// 清空数据
			$('.share_content').val('');
			$('#shareType').val('');
			$('#reviewId').val('');
			$('#imgPath').val();
	    }
	});
}

// jquery分页
function initPagination(countAll) {
	var num_entries = countAll;
	// 创建分页
	$(".paging").pagination(num_entries, {
		num_edge_entries: 1, //边缘页数
		num_display_entries: 4, //主体页数
		callback: pageselectCallback,
		items_per_page: 9,
		link_to: "",
		prev_text: " ",
		next_text: " "
	});
}

function pageselectCallback(page_index, jq) {
	getFlashResult(++ page_index);
	return false;
}
		
function getFlashResult(page_index) {
	$.ajax({
		type: "post",
		url: basePath + "baseInfo/film/filmIndex.do?m=getCommentJOSN&items_per_page=9&film_id="+$("#filmId").val()+"&showIndex="+page_index,
		success: function(data){
			var tempData=data.indexOf(";");
			var countAll=data.substring(0,tempData);
			$('#countAll').html(countAll);
			var realData=data.substring(tempData+1,data.length);
		  	$("#movie_comments").empty().append(realData);
		  	
		  	bindEventForComment();	// 绑定事件
		}
	});
};

//获取评论信息
function initPaginationAjax() {
 	var filmId = $('#filmId').val();
	$.ajax({
		type: "post",
		url: basePath + "baseInfo/film/filmIndex.do?m=getCommentCount&film_id=" + filmId,
		success: function(data){
			$('#countAll').html(data);
	 		if (data > 0) {
	 			initPagination(data);
	 		} else {
	 			$("#movie_comments").html("暂时还没有评论！");
	 		}
			if(window.location.href.indexOf("gobottom=yes") != -1){//移动到评论区
				setTimeout('$("html,body").animate({scrollTop: $("#button_green_fb").offset().top}, 50)',600); 
			}
		}
   	});
};

// 影片评论删除
function cancelcomment_submit(filmCommentId) {
	if (confirm("是否确认删除该电影评论？") == false) {
		return false;
	}
        
    $.ajax({
	    type: "post",
	    url: basePath + "user/comment.do?m=doDeleteComment&filmCommentId="+filmCommentId,
	    beforeSend: function(XMLHttpRequest){
	    },
	    success: function(data){
            Boxy.alert("影片评论删除成功")
            getFlashResult(1);
	    }
	});
      
	return false;     
};

	//完美活动签到成功
 function perfectWorld_submit() {   
	var questionPK = $('#questionPK').val();
 	var userPK = $('#userPK').val();
    $.ajax({
	    type: "post",
	    url: basePath + "perfectWorld.do?m=checkQuestionsIsError&questionPK="+questionPK+"&userPK="+userPK,
	    beforeSend: function(XMLHttpRequest){
	    },
	    success: function(data){
	    	if(data=="1"){
	    		Boxy.alert("恭喜您,签到成功,获得一次抽奖机会!");
	    		$("#a_qdz_2").hide();
 				$("#a_qdz_1").hide();
	    	}else{
	    		Boxy.alert("很遗憾,签到失败,请重新签到!");
	    	}
	    }
	});
      
	return false;     
}

//生成柱状图
function createChart(){
	var inputTotalNum = '<input type="text" id="totalNum" data-thickness=".35" data-readOnly=true data-width="140" data-height="140" data-max="50" data-min="0" data-style="margin-left:63px;"/>';
	$('.appraise_pie_chart .knob-wrap').remove();
	$('.appraise_pie_chart').prepend(inputTotalNum);
	var likeDisplayNum = 50;//‘影片详情页-评价图表’和‘首页-影片喜欢率’的阀值
	var likeNum = parseInt($("input#likeNum").val(),10);//喜欢人数
	var hateNum = parseInt($("input#hateNum").val(),10);//不喜欢人数
	$("input#totalNum").val(likeNum + hateNum);
	var totalNum = parseInt($("input#totalNum").val(),10);//总人数
	
	if(totalNum >= likeDisplayNum){//柱状图
		var barHeight = 140;//柱子总高度（px）
		var likePercent = (totalNum == 0)?0:Math.round((likeNum / totalNum) * 100)+"%";//喜欢人数占总人数百分比
		var likeBarHeight = (totalNum == 0)?barHeight:Math.round(barHeight-(barHeight*(likeNum/totalNum)));
		var hateBarHeight = (totalNum == 0)?barHeight:Math.round(barHeight-(barHeight*(hateNum/totalNum)));
		$("#chart_title span").text(totalNum);
		$("#chart_sub_title span").text(likePercent);
		$("#like_bar").css("background-position","0 "+likeBarHeight+"px");
		$("#hate_bar").css("background-position","-105px "+hateBarHeight+"px");
		$("#like_data span").text(likeNum);
		$("#hate_data span").text(hateNum);	
		$('.appraise_chart').show();$('.appraise_pie_chart').hide();
	}else{//生成圈形图
		$('.appraise_pie_chart').show();$('.appraise_chart').hide();
		try{
			$("input#totalNum").knob();
		}catch(err){
			console.log(err);
		}
		$('#totalNum').show();
		$('.knob-info').find('b').text((likeDisplayNum-totalNum));
	}
}

function addCommentsCookie() {
	var cookieName = "wandaFilmComments" + document.getElementById("filmId").value;
	var content = document.getElementById("content").value;
	if (content != null) {
		var date = new Date();  
		var ms = 600*1000;  
		date.setTime(date.getTime() + ms);  
		document.cookie = cookieName + "=" + escape(content) + "; expires=" + date.toGMTString();
	}
}

function restoreComments() {
	var cookieName = "wandaFilmComments" + document.getElementById("filmId").value;
	var content = "";
	var arrStr = document.cookie.split("; ");
	for(var i = 0;i < arrStr.length;i ++){
		var temp = arrStr[i].split("=");
		if(temp[0] == cookieName) {
			content = unescape(temp[1]);
		}
	}
	if (content != null && content != "") {
		document.getElementById("content").value = content;
		$(".content_tip").hide();
	}
}

function clearCommentsCookie() {
	var cookieName = "wandaFilmComments" + document.getElementById("filmId").value;
	var exp = new Date();  
	document.cookie = cookieName + "=; expires="+exp.toGMTString();
}