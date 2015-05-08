var theCityCode = "8022251040";//设置默认值
var basePath = "http://localhost:8080/wdfportal/"; //url地址
function getBathPath(path){
	basePath =  path;
}

$(document).ready(function(){
	var cityCode = $('.city_on').attr("id");
	 //设置所在城市
	$("#a_city").text(getCityNameByCode(cityCode));
	$("#a_city").attr("title","万达院线"+getCityNameByCode(cityCode)+"站")
	$("a.city").click(function(){
		$(".city_map").slideDown("slow");
	});
	$("a.city_close").click(function(){
		$(".city_map").hide();
	});
});

/**
 * @打印城市层
 * @xuan
 * @param {Object} sessionCode
 * @return {TypeName} 
 */
function printCity(sessionCode){
	var cityCode = getCookie("cityCodeCookies");
	if(cityCode == ""){
		cityCode = getCityCode(sessionCode);
	}
	var cityMap_str = "";
	for(var i = 0;i<prvArray.length;i++){
		
		cityMap_str += "<dl class=\"clearfix\"> <dt>" + prvArray[i][1] + "：</dt><dd>";//输出省名
		var arrCity = getCity(prvArray[i][0]);//省份代码得到城市数组
		for(var j=0;j<arrCity.length;j++){
			if(cityCode.indexOf(arrCity[j][0])>=0){
				cityMap_str += "<a class='city_on' href='"+basePath+"setCity.do?code=" 
				+ arrCity[j][0] + "' id='" + arrCity[j][0] + "'>" + arrCity[j][1] + "</a>";	
			}else{
				cityMap_str += "<a href='"+basePath+"setCity.do?code="
				+ arrCity[j][0] + "' id='" + arrCity[j][0] + "'>" + arrCity[j][1] + "</a>";
			}
			
		}
		if(i==0) cityMap_str += "<a class=\"city_close\" href=\"#\" title=\"关闭\">[关闭]</a>";
		cityMap_str += "</dd></dl>";
	}
	$('.city_map').html(cityMap_str);
	theCityCode = $('.city_on').attr("id");	
}

/**
 * @打印城市层
 * @xuan
 * @param {Object} sessionCode
 * @return {TypeName} 
 */
function printCityByLetter(sessionCode){
	var reqUrl = window.location.href;	// 当前请求的地址
	
	var cityCode = getCookie("cityCodeCookies");
	if(cityCode == ""){
		cityCode = getCityCode(sessionCode);
	}
	/*if(city32Lin.indexOf(cityCode)==-1){//not in
		 window.location.href=url31+"/setCity.do?code="+currentCityCode;
	}*/
	var cityName = ""; // 显示的城市名字
	var cityMap_str = "";
	cityMap_str += '<div id="user_like_cinema">' +
				   '	<a href="javascript:;">北京CBD影城</a>' +
				   '</div>' +
				   '<dl id="hot_issue_city">' + 
				   '<dt>' +
				   '热门城市:' +
				   '</dt>' +
				   '<dd id="hot_city">' +
				   '	<a href="javascript:;">北京</a>' +
				   '	<a href="javascript:;">上海</a>' +
				   '	<a href="javascript:;">天津</a>' +
				   '	<a href="javascript:;">广州</a>' +
				   '</dd>' + 
				   '</dl>';
	$('#city_map').html(cityMap_str);
	var cityMap = "";	// 首页的cityMap
	for (var i = 0;i<prvArray.length;i++) {
		cityMap += '<dl class=\'other_city\'><dt>';
		var letter = prvArray[i][0].split(" ");
		// 打印A B C D等.. 
		for (var k=0; k<letter.length; k++) {
			cityMap += letter[k];
		}
		cityMap += "</dt><dd>";
		var arrCity = getCityByLetter(prvArray[i][0]);
		var groupArrCity = getGroupCityByLetter(prvArray[i][0]);
		for (var j=0; j<arrCity.length; j++) {
			cityMap += "<a ";
			
			// 是否选中该城市
			if (cityCode.indexOf(arrCity[j][0]) >= 0) {
				cityName = arrCity[j][1];
				cityMap += "class='selected_city'";
			}
			
			cityMap += " href='" + basePath + "setCity.do?code=" + arrCity[j][0] + "&reqUrl=" + reqUrl + "' " + 
				"' id='" + arrCity[j][0] + "'>" + arrCity[j][1];
			
			// 是否有团购
			var groupCity = false;
			if (groupArrCity.groupCityInArray(arrCity[j][0])) {
				groupCity = true;
				cityMap += "<b class=\'tuan_tag\'></b>";
			}
			
			cityMap += "</a>";
			
			// 选中热门城市
			$('#hot_city a').each(function() {
				if ($(this).text() == arrCity[j][1]) {
					$(this).attr({href: basePath + 'setCity.do?code=' + arrCity[j][0] + '&reqUrl=' + reqUrl, id: arrCity[j][0]})
					if (groupCity) {
						$(this).append('<b class=\'tuan_tag\'></b>');
					}
				}
				if ((cityCode.indexOf(arrCity[j][0]) >= 0) && ($(this).text() == arrCity[j][1])) {
					$(this).addClass("selected_city");
				}
			});
		}
		cityMap += "</dd></dl>";
	}
	cityMap_str = $("#city_map").html();
	cityMap = cityMap_str + cityMap;
	cityMap += '</div>';
	$('#city_map').html(cityMap);	// 城市列表
	$('#city_map').append("<div class=\'tuan_info\'><b class=\'tuan_tag\'></b>表示当前城市有团购</div>");//添加团购提示到城市列表下
	$('#city').html(cityName + $('#city').html());	// 页面中显示的城市
	$('#ImgPic').css("left",(275-(cityName.length*15)/2)+"px");
	
	theCityCode = $('.selected_city').attr('id');
}

// 查询该城市是否在团购列表中
Array.prototype.groupCityInArray = function(e) {  
	for (var i=0; i<this.length && this[i][0] != e; i++);  
	return !(i == this.length);  
}

/**
 * @打印团购城市层
 * @param {Object} sessionCode
 * @return {TypeName}
 * 
 * @author LH
 * @since 2013.4.19
 */
function printGroupCityByLetter(sessionCode) {
	var reqUrl = window.location.href;	// 当前请求的地址
	
	var cityCode = getCookie("cityCodeCookies");
	if(cityCode == ""){
		cityCode = getCityCode(sessionCode);
	}
	var cityName = ""; // 显示的城市名字
	var cityMap_str = '';
	$('#city_map').html(cityMap_str);
	var cityMap = "";	// 首页的cityMap
	for (var i = 0;i<prvArray.length;i++) {
		cityMap += '<dl class=\'other_city\'>';
		var cityLetter = '<dt>';
		var letter = prvArray[i][0].split(" ");
		// 打印A B C D等.. 
		for (var k=0; k<letter.length; k++) {
			cityLetter += letter[k];
		}
		cityLetter += "</dt><dd>";
		var arrCity = getGroupCityByLetter(prvArray[i][0]);
		var grouCity = '';
		for (var j=0; j<arrCity.length; j++) {
			if (cityCode.indexOf(arrCity[j][0]) >= 0) {	// 选中的城市
				cityName = arrCity[j][1];
				grouCity += "<a class='selected_city' href='" + basePath + "setCity.do?code=" + arrCity[j][0] + "&reqUrl=" + reqUrl + "' " +
						"' id='" + arrCity[j][0] + "'>" + arrCity[j][1] + "<b class=\'tuan_tag\'></b></a>";
			} else {	// 未选中的城市
				grouCity += "<a href='" + basePath + "setCity.do?code=" + arrCity[j][0] + "&reqUrl=" + reqUrl + "' " +
						"' id='" + arrCity[j][0] + "'>" + arrCity[j][1] + "<b class=\'tuan_tag\'></b></a>";
			}
		}
		if (grouCity != '') {
			cityMap += cityLetter + grouCity + "</dd>";
		}
		cityMap += "</dl>";
	}
	cityMap_str = $("#city_map").html();
	cityMap = cityMap_str + cityMap;
	cityMap += '</div>';
	$('#city_map').html(cityMap);	// 城市列表
	$('#city').html(cityName + $('#city').html());	// 页面中显示的城市
	$('#city_map').append("<div class=\'tuan_info\'><b class=\'tuan_tag\'></b>表示当前城市有团购</div>");//添加团购提示到城市列表下
	$('#ImgPic').css("left",(275-(cityName.length*15)/2)+"px");
	
	theCityCode = $('.selected_city').attr('id');
}

/**
 * @获得城市代码
 * @xuan
 * @param {Object} sessionCode
 * @return {cityCode} 
 */
function getCityCode(sessionCode){
	var cityCode;
	if(sessionCode != ""){
		cityCode = sessionCode;
	}else{
		cityCode = findCityCodeByIp();
	}
	return cityCode;
}
/**
 * @获取城市名字
 * @xuan
 * @param {Object} sessionCode
 * @return {cityCode} 
 */
function getCityNameByCode(code){
	var cityName;
	for(var ii=0;ii<cityArray.length;ii++){
		if(cityArray[ii][0]==code){
			cityName = cityArray[ii][1];
		}
	}
	return cityName;
}

/**
 * @获取区域名字
 * @lzq
 * @param {Object} sessionCode
 * @return {cityCode} 
 */
function getAreaByCode(code){
	var cityArea;
	for(var ii=0;ii<cityArray.length;ii++){
		if(cityArray[ii][0]==code){
			cityArea = cityArray[ii][2];
		}
	}
	return cityArea;
}
	
	
	
/**
 *IPData["222.247.54.20", "", "湖南省", "长沙市"]外部JS数组
 * @通过ip获得城市代码
 * @xuan
 * @return {cityCode} 
 */
function findCityCodeByIp(){
	var cityCode = theCityCode;//设置默认值
	if(IPData.length>0){
		var city = IPData[3];
		for(var ii=0;ii<cityArray.length;ii++){
			if(city.indexOf(cityArray[ii][1])>=0){
				cityCode = cityArray[ii][0];
				break;
			}			
		}
	}
	return cityCode;
}



/**
 *日期：2011-5-7号
 *
 *IPData["222.247.54.20", "", "湖南省", "长沙市"]外部JS数组
 * @通过ip获得城市，通过城市获取旧版网站跳转地址
 * @xiekanglin
 * @return {旧网站URL} 
 */
function printOldCinemaAddress()
{
   var city = null;
   
	for(var i=0;i<cityArray.length;i++)
	{
		if(cityArray[i][0]==theCityCode){
			city = cityArray[i][1];
			break;
		}
	}

	for(var i=0;i<cityUrlMap.length;i++)
	{
	   if(cityUrlMap[i][0]==city)
	   {
	   	  return cityUrlMap[i][1];
	   }
	}
	
    //返回默认老网站地址
  	return "http://www.wandafilm.com/";
}


/*去除左边的空格*/
String.prototype.Ltrim = function(){
	return this.replace(/(^\s*)/g, "");
}

/*去除右边的空格*/
String.prototype.Rtrim = function(){
	return this.replace(/(\s*$)/g, "");
}

/*去除前后空格*/
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

//取得cookie
function getCookie(name){
 var str=document.cookie.split(";")
 for(var i=0;i<str.length;i++){
 	var str2=str[i].split("=");
  	if(str2[0].trim()==name){
  		return decodeURI(str2[1]);
  	}
  	
 }
 return "";
}
//取得cookie 解密
function getCookieUn(name){
 var str=document.cookie.split(";")
 for(var i=0;i<str.length;i++){
 	var str2=str[i].split("=");
  	if(str2[0].trim()==name){
  		return unescape(str2[1]);
  	}
  	
 }
 return "";
}

//取得cookie
function setCookie(name,value,_expires,_path,_domain){
    var str=name+"="+escape(value.trim());
    var expires ="30";
    var path = "/";
    var domain = serverName;

	if(_expires!=undefined) expires = _expires;
	if(_path!=undefined) path = _path;	
	if(_domain!=undefined) domain = _domain;
	
	var date=new Date();
	date.setTime(date.getTime()+expires*24*3600*1000);//expires单位为天
	str+=";expires="+date.toGMTString();//指定cookie的有效期
	str+=";path="+path;//指定可访问cookie的路径
	str+=";domain="+domain;//指定可访问cookie的域

	document.cookie=str;

}

function delCookie(name){//为了删除指定名称的cookie
	var date = new Date();
	date.setTime(date.getTime() - 10000);
	document.cookie = name + "=a;expires=" + date.toGMTString();
}


function getCidByCookie(){
	return getCookieUn("cinemaIdCookie");
}


