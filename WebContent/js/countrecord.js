var uccontrol = (function(){
		//åˆå§‹åŒ–æ•°æ®
		var userName = '';//ç”¨æˆ·åç§°
		var superCookieName = 'wandafilm';//cookieåç§°
		var jingxuancontent = 'wanda/news.do?m=getNewByNewId&newsId=';//è°ˆèµ„url
		var picType = '';//å›¾ç‰‡ç±»åž‹
		var getuvFlag = function(){
			return userName != ''?true:false;
		};
		var filmtypearray = {};
			filmtypearray['film_info_init_hot'] = 1;//å½±ç‰‡è¯¦æƒ…
			filmtypearray['focus'] = 2; //å½±ç‰‡çœ‹ç‚¹çœ‹çˆ†æ–™
			filmtypearray['stage'] = 3;//å½±ç‰‡å‰§ç…§
			filmtypearray['titbit'] = 4;//èŠ±çµ®
			filmtypearray['playbill'] = 5;//æµ·æŠ¥
			filmtypearray['comingsoon'] = 6;//é¢„æŠ¥ç‰‡ç‚¹å‡»
			filmtypearray['movie_times.jsp?filmId'] = 7;//æŽ’æœŸ
			filmtypearray['trade/step2.do'] = 8;//é€‰åº§
			filmtypearray['trade/step3.do'] = 9;//è®¢å•æ”¯ä»˜
			/**é¦–é¡µå¯¼èˆªèœå•*/
			filmtypearray['homeHd'] = 10;//ç”µå½±é¦–é¡µ
			filmtypearray['timeHd'] = 11;//ç”µå½±æŽ’æœŸ
			filmtypearray['appHd'] = 12;//ç§»åŠ¨è´­ç¥¨
			filmtypearray['jingxuan'] = 13;//ç”µå½±è°ˆèµ„
			filmtypearray['groupHd'] = 14;//ä»Šæ—¥å›¢è´­
			filmtypearray['actUrl'] = 15;//ä¿ƒé”€æ´»åŠ¨
			
			filmtypearray['wanda/news.do'] = 16;//è°ˆèµ„æ–°é—»
			filmtypearray['active'] = 17;//æ´»åŠ¨
			
		var filmtypestr = {};
			filmtypestr[0] = 'film_info_init_hot';
			filmtypestr[1] = 'movie_times.jsp?filmId';
			filmtypestr[2] = 'trade/step2.do';
			filmtypestr[3] = 'trade/step3.do';
			filmtypestr[4] = 'wanda/news.do';
		//æ´»åŠ¨Id
		var activeId = $('#countrecorduser').attr('active');
		//undefined
		var undefinedstr;
		/*è®°å½•ä¸šåŠ¡æ‰§è¡Œ*/
		var record = function(filmtype,url){
			getArgs();
			if(null == url || '' == url || null == filmtype || filmtype == '')
				return;
			url = url.replace(basePath,'').replace('http://www.wandafilm.com/','');
			if(filmtype == 8 || filmtype == 9)
				url = url.substring(0,url.lastIndexOf('&sid'));
			var relationId = filmtype;
			if(filmtype == 16){
				 url = url.substring(url.length-20);
				 relationId = url;
			}
			if(filmtype == 17){
				relationId = url;
			}
			var date = formatDate(new Date(),'yyyy-MM-dd');
			var name = encodeURIComponent(url+userName);
			var cookies = getCookie(superCookieName+date);
			var uvFlag = getuvFlag();//trueæ‰§è¡Œuv
			if(null == cookies || ""==cookies){
				pvuvrecord(cookies,name,uvFlag,date,filmtype,relationId);
			}else{
				var cookieValues = cookies.split('/');
				var executeFlag = true;
				for(var i = 0 ; i< cookieValues.length; i++){
					if(name == cookieValues[i]){
						executeFlag = false;
						continue;
					}
				}
				if(executeFlag){
					pvuvrecord(cookies,name,uvFlag,date,filmtype,relationId);
				}
			}
		};
	    //è®°å½•cookieæ“ä½œ
		var pvuvrecord = function(cookies,name,uvFlag,date,filmtype,relationId){
			if(null == cookies)
				cookies = '';
			clearCookie(superCookieName+date);
			addCookie(superCookieName+date,cookies+'/'+name);
			recordCount(uvFlag,filmtype,date,relationId);//æ‰§è¡Œuv pv
		};
		//è®°å½•æ·»åŠ æ‰§è¡Œ
		var recordCount = function(uvFlag,countType,date,relation){
			var url = basePath + 'baseInfo/websitestatistic.do?m=uvpvRecord';
			$.ajax({
    			type:"post",
    			url:url, 
    			data:{"uvFlag": uvFlag,"countType":countType,"date":date,"relation":relation},
    			success:function (data) {
    			}
    		});
		};
		var initFilmUrl = function(url){
			url = url.toLowerCase();
			var str = url.substring(url.lastIndexOf('videos'),url.lastIndexOf('.flv'));
			return str;
		};
		var getImgUrl = function(url){
			url = url.toLowerCase();
			var str = url.substring(url.lastIndexOf('images'),url.lastIndexOf('.'));
			return str;
		};
		var getMore = function(url){
			url = url.toLowerCase();
			var str = url.substring(url.lastIndexOf('topics'),url.lastIndexOf('.'));
			return str;
		}
		//ç¬¬äºŒå¤©8ç‚¹æœ‰æ•ˆæœŸ
		var addCookie = function(name,value){
			var Days = 1;
			var exp = new Date();
			var milseconds = exp.getHours()*60*60*1000+exp.getMinutes()*60*1000+exp.getSeconds()*1000;
			exp.setTime(exp.getTime() + Days*24*60*60*1000 - milseconds);
			var str = exp.toString();
			document.cookie = name + "="+ value + ";expires=" + str;
		};
	
		var getCookie = function(name){
			var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			if(arr=document.cookie.match(reg))
				return (arr[2]);
			else
				return null;
		};
		var clearCookie = function(name){
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval=getCookie(name);
			if(cval!=null)
				document.cookie= name + "="+cval+";expires="+exp.toGMTString();
		};
		var clearAll = function(){
			var keys=document.cookie.split(';');
			if(keys){
				for(var i = keys.length; i--;){
					var coname = keys[i].split('=')[0];
					if(coname.indexOf(superCookieName)>0)
						clearCookie(coname);
				}
			}
		};
		
		var initdata = function(){
			//é¢„å‘Šç‰‡
			$('div[class="playBtn"],div[id="player_box"]').mousedown(function(){
				var url = $('#flash_box').find('param[name="FlashVars"]').attr('value');
				url = initFilmUrl(url);
				record(filmtypearray['comingsoon'],url);
			});
			//é¢„å‘Šç‰‡
			$('div[id="player_nav"]').find('a').click(function(){
				var url = $(this).attr('href');
				url = initFilmUrl(url);
				record(filmtypearray['comingsoon'],url);
			});
			//å‰§ç…§
			$('li[id="pic_box1"]').click(function(){
				var url = $(this).find('div[class="preview_pic more_pic1 load"]').find('img').attr('src');
				url = getImgUrl(url);
				picType = filmtypearray['stage'];
				record(picType,url);
			});
			//å‰§ç…§
			$('.story').find('div[class="movie_imges clearfix"]').find('a').find('img').click(function(){
				var url = $(this).attr('src');
				url = getImgUrl(url);
				picType = filmtypearray['stage'];
				record(picType,url);
			});
			//èŠ±çµ®
			$('li[id="pic_box2"]').click(function(){
				var url = $(this).find('div[class="preview_pic more_pic2 load"]').find('img').attr('src');
				url = getImgUrl(url);
				picType = filmtypearray['titbit'];
				record(picType,url);
			});
			//æµ·æŠ¥
			$('li[id="pic_box3"]').click(function(){
				var url = $(this).find('div[class="preview_pic more_pic3 haibao_small_pic load"]').find('img').attr('src');
				url = getImgUrl(url);
				picType = filmtypearray['playbill'];
				record(picType,url);
			});
			//çœ‹ç‚¹çˆ†æ–™
			$('.show_more2').click(function(){
				var url = $(this).attr('href');
				url = getMore(url);
				picType = filmtypearray['focus'];
				record(picType,url);
			});
			//é¦–é¡µå¯¼èˆªèœå•
			$('#menu ul li a').click(function(){
				var id = $(this).attr('id');
				picType = filmtypearray[id];
				record(picType,superCookieName+id);
			});
			//å¼‚æ­¥åŠ è½½å…¶ä»–
			$.each(filmtypestr,function(i,v){
				var url = window.location.href;
				var url1 = url.substring(0,url.lastIndexOf('?url='));
				if(url1 != '')
					url = url1;
				if(url.indexOf(v) > 0){
					record(filmtypearray[v],url);
					return;
				}
			});
			//æ´»åŠ¨
			if(null == activeId || '' == activeId){
				activeId = $('#countrecorduser').attr('active');
			}
			if(null != activeId && ''!=activeId && undefinedstr != activeId){
				record(filmtypearray['active'],activeId);
			};
			
		};
	    var formatDate = function(date,format){
	        var paddNum = function(num){
	          num += "";
	          return num.replace(/^(\d)$/,"0$1");
	        };
	        var cfg = {
	           yyyy : date.getFullYear()
	          ,yy : date.getFullYear().toString().substring(2)
	          ,M  : date.getMonth() + 1
	          ,MM : paddNum(date.getMonth() + 1)
	          ,d  : date.getDate()
	          ,dd : paddNum(date.getDate())
	          ,hh : date.getHours()
	          ,mm : date.getMinutes()
	          ,ss : date.getSeconds()
	        };
	        format || (format = "yyyy-MM-dd hh:mm:ss");
	        return format.replace(/([a-z])(\1)*/ig,function(m){return cfg[m];});
	    };
	    var getArgs = function(){ 
	    	userName = $('#countrecorduser').attr('src').split('?')[1].split('=')[1];
	    };
	    var picPrev = function(dom){
	    	var url = $(dom).parent().parent().find('img[id="lightbox-image"]').attr('src');
	    	url = getImgUrl(url);
	    	record(picType,url);
	    };
	    var picNext = function(dom){
	    	var url = $(dom).parent().parent().find('img[id="lightbox-image"]').attr('src');
	    	url = getImgUrl(url);
	    	record(picType,url);
	    };
		return {initdata:initdata,picPrev:picPrev,picNext:picNext};
	})();
$(document).ready(function(){
	uccontrol.initdata();
});