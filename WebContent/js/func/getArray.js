/**
 * @获得影院
 * @xuan
 * @param {Object} cityCode
 * @return {cinema_arr} 
 */
function getCinemaArray(cityCode){
  var cinema_arr = new Array();
  var j = 0;
  for(var i=0; i<cinemaArray.length; i++){
   if( cinemaArray[i][2] == cityCode ){
		cinema_arr[j] = new Array(cinemaArray[i][0],cinemaArray[i][1],cinemaArray[i][2]);
		j++	;
   }
  }
  return cinema_arr;
}

/**
 * @获得今天的影片
 * @xuan
 * @param {Object} cityCode
 * @return {TypeName} 
 */
function getToDayFilm(PhoCinemaId){
  var film_arr = new Array();
  var j = 0;
  for(var i=0; i<fTodayArray.length; i++){
   if( fTodayArray[i][2] == PhoCinemaId ){
   		if(fTodayArray[i][1] != 'nofilm'){
   			film_arr[j] = new Array(fTodayArray[i][0],fTodayArray[i][1],fTodayArray[i][2]);
			j++
   		}
   }
  }
  return film_arr;

}  
/**
 * @获得明天的影片
 * @xuan
 * @param {Object} cityCode
 * @return {TypeName} 
 */
function getTomorFilm(PhoCinemaId){
  var film_arr = new Array();
  var j = 0;
  for(var i=0; i<fTomorArray.length; i++){
   if( fTomorArray[i][2] == PhoCinemaId ){
   	if(fTomorArray[i][1] != 'nofilm'){
		film_arr[j] = new Array(fTomorArray[i][0],fTomorArray[i][1],fTomorArray[i][2]);
		j++	
	}
   }
  }
  return film_arr;
}
/**
 * @获得今天的场次
 * @xuan
 * @param {Object} filmCode
 * @return {TypeName} 
 */
function getShow(film_fk){
  var show_arr = new Array();
  var myDate = new Date(); 
  var daytime = myDate.toLocaleTimeString();
  var daytime_arr = daytime.split(':');
  var time_str = daytime_arr[0] + daytime_arr[1] ;
  var j = 0;
  for(var i=0; i<showArray.length; i++){
	if( getSTimeToInt(showArray[i][1]) > parseInt(time_str) ){
		if( showArray[i][2] == film_fk ){
			show_arr[j] = new Array(showArray[i][0],showArray[i][1],showArray[i][2],showArray[i][3]);
			j++	
		}
	}
  }
  return show_arr;
}
/**
 * @获得城市
 * @xuan
 * @param {Object} cityCode
 * @return {TypeName} 
 */
function getCity(prv){
  var city_arr = new Array();
  var j = 0;
  for(var i=0; i<cityArray.length; i++){
   if( cityArray[i][2] == prv ){
		city_arr[j] = new Array(cityArray[i][0],cityArray[i][1]);
		j++	
   }
  }
  return city_arr;

}

/**
 * @获得城市
 * @xuan
 * @param {Object} cityCode
 * @return {TypeName} 
 */
function getCityByLetter(prv){
	var city_arr = new Array();
	var j = 0;
	for(var i=0; i<cityArray.length; i++){
		if (cityArray[i][3] == prv) {
			city_arr[j] = new Array(cityArray[i][0],cityArray[i][1]);
			j++
		}
	}
	return city_arr;
}

/**
 * @获得团购城市
 * @param {Object} cityCode
 * @return {TypeName}
 * 
 *  @author LH
 *  @since 2013.4.19
 */
function getGroupCityByLetter(prv){
	var city_arr = new Array();
	var j = 0;
	for(var i=0; i<groupCityArray.length; i++){
		if (groupCityArray[i][3] == prv) {
			city_arr[j] = new Array(groupCityArray[i][0],groupCityArray[i][1]);
			j++
		}
	}
	return city_arr;
}

/**
 * @初始化影院三级联动，cinema_id,film_id均为默认值 0 表示没有
 * @xuan
 * @param {Object} cityCode
 * @return {TypeName} 
 */
function initSelect(cityCode,cinema_id,film_id,dateClass){
	var cinema_array = getCinemaArray(cityCode);
	var count = 0;
	var cn = document.getElementsByName('select_cinema')[0];
	var fn = document.getElementsByName('select_film')[0];
	with(cn){
	
		length = 0;
		options[0]=new Option("请选择影院",0);
		for(var i = 0; i<cinema_array.length; i++){
			options[++count] = new Option(cinema_array[i][1],cinema_array[i][0])
		}
		//options[3].selected = true;
		value = cinema_id;
		if($(".select_cinema").html() !== null){
			$(".select_cinema").ylDropDownList();
		}
	}
	//初始化影片
	if(typeof(fn) != "undefined"){
		selectCinema(cinema_id,film_id,dateClass);
	}
	//初始化场次
	/*if( document.getElementsByName('select_show')[0] ){
		selectFilm()
	}*/
	//初始化其他
	if(document.getElementsByName('select_other')[0]){
		with(document.getElementsByName('select_other')[0]){
			value = 0;	
		}
	}
	
}
/**
 * @初始化影院三级联动(全局快速购票)，cinema_id,film_id均为默认值 0 表示没有
 * @xuan
 * @param {Object} cityCode
 * @return {TypeName} 
 */
function initSelect1(cityCode,cinema_id,film_id,dateClass){
	var cinema_array = getCinemaArray(cityCode);
	var count = 0;
	var cn = document.getElementsByName('select_cinema1')[0];
	var fn = document.getElementsByName('select_film1')[0];
	with(cn){
	
		length = 0;
		options[0]=new Option("请选择影院",0);
		for(var i = 0; i<cinema_array.length; i++){
			options[++count] = new Option(cinema_array[i][1],cinema_array[i][0])
		}
		//options[3].selected = true;
		value = cinema_id;
		if($(".select_cinema1").html() !== null){
			$(".select_cinema1").ylDropDownList();
		}
	}
	//初始化影片
	if(typeof(fn) != "undefined"){
		selectCinema1(cinema_id,film_id,dateClass);
	}
	//初始化场次
	/*if( document.getElementsByName('select_show')[0] ){
		selectFilm1()
	}*/
	//初始化其他
	if(document.getElementsByName('select_other')[0]){
		with(document.getElementsByName('select_other')[0]){
			value = 0;	
		}
	}
	
}

/**
 * @初始化影院三级联动(全局快速购票)，cinema_id,film_id均为默认值 0 表示没有
 * 原方法：getArray.js-->>initSelect1
 * @xuan
 * @param {Object} cityCode
 * @return {TypeName} 
 */
function quickCinema(cityCode) {
	// 初始化影城
	var cinema_array = getCinemaArray(cityCode);
	var cinemaStr = "";
	$('#quick_cinema').html('');
	for(var i = 0; i<cinema_array.length; i++){
		cinemaStr = "<a href='javascript:void(0)' id='" + cinema_array[i][0] + "'>" + cinema_array[i][1] + "</a>";
		$('#quick_cinema').append(cinemaStr);
		quickBuyBind(cinema_array[i][0]);	// base.js，绑定事件
	}
	//$('#quick_cinema').html(cinemaStr);
}

/**
 * 选择影片（全局快速购票） cinema_id
 * 原方法：getArray.js-->>selectCinema1()
 * @xuan
 * @param {Object} cityCode
 * @return {TypeName} 
 */

function quickFilm(cinema_id) {
	if (cinema_id == '' || cinema_id === undefined) {
		cinema_id = $('#quick_cinema a:first').attr('id');
	}
	
	var film_arr = getToDayFilm(cinema_id);
	var filmStr = "";
	$('#quick_film').html('');
	for(var i = 0; i<film_arr.length; i++){
		filmStr = "<a href='javascript:void(0)' id='" + film_arr[i][0] + "'>" + film_arr[i][1] + "</a>";
		$('#quick_film').append(filmStr);
		quickBuyBind(film_arr[i][0]);
	}
	//$('#quick_film').html(filmStr);
}

/**
 *@cityCode当前城市
 *@cinema_id默认值
 *初始化影院 select
 *
*/
function initCinemaSelect1(cityCode,cinema_id)
{
	var cinema_array = getCinemaArray(cityCode);
	//alert(cinema_array);
	var cnArray = document.getElementsByName('select_cinema1');
	
	
	for(var k=0;k<cnArray.length;k++)
	{
	   var count = 0;
	   var cn = cnArray[k];
		with(cn){
		options[0]=new Option("请选择影院",0);
		for(var i = 0; i<cinema_array.length; i++){
		    
			options[++count] = new Option(cinema_array[i][1],cinema_array[i][0])
		}
		//options[3].selected = true;
		value = cinema_id;
	}
	}
	
}



/**
 *@cityCode当前城市
 *@cinema_id默认值
 @author 谢康林
 *初始化影院 修改影院select
 *
*/
function initCinemaSelect_Cinema(cityCode,cinema_id)
{
	var cinema_array = getCinemaArray(cityCode);
	//alert(cinema_array);
	var cn = document.getElementById('select_cinema1');
	
	
		cn.options[0]=new Option("请选择影院",0);
		
		for(var i = 0; i<cinema_array.length; i++){
		    
			cn.options[i+1]=new Option(cinema_array[i][1],cinema_array[i][0]);
		//options[3].selected = true;
		value = cinema_id;
	}
	
}



/**
 *@cityCode当前城市
 *@cinema_id默认值
 *初始化影院 select
 *
*/
function initCinemaSelect(cityCode,cinema_id)
{
	var cinema_array = getCinemaArray(cityCode);
	//alert(cinema_array);
	var cnArray = document.getElementsByName('select_cinema');
	
	for(var k=0;k<cnArray.length;k++)
	{
	   var count = 0;
	   var cn = cnArray[k];
		with(cn){
		options[0]=new Option("请选择影院",0);
		for(var i = 0; i<cinema_array.length; i++){
		    
			options[++count] = new Option(cinema_array[i][1],cinema_array[i][0])
		}
		//options[3].selected = true;
		value = cinema_id;
	}
	}
	
}

/**
 * @选择影城 cinema_id,film_id均为默认值 0 表示没有 dateClass获取今天和明天
 * @xuan
 * @param {Object} cityCode
 * @return {TypeName} 
 */

function selectCinema(cinema_id,film_id,dateClass){
	var day = 1;
	var count = 0;
	var PhoCinemaId = "";
	var cn = document.getElementsByName('select_cinema')[0];
	var fn = document.getElementsByName('select_film')[0];
	with(cn){
		PhoCinemaId = options[selectedIndex].value;	
	}
	if(cinema_id != 0){
		PhoCinemaId = cinema_id;
	}
	if(typeof(dateClass) != "undefined"){
		if($(dateClass).attr("id")){
			day = $(dateClass).attr("id");
		}
	}else{
		if($(".todaya").attr("id")){
			day = $(".todaya").attr("id");
		}
	}
	var film_arr = new Array();
	if(day == 2 ){
		film_arr = getTomorFilm(PhoCinemaId);
	}else{
		film_arr = getToDayFilm(PhoCinemaId);
	}
	with(fn){
	    length = 0;
		options[0] = new Option("请选择电影",0);
		for(var i = 0; i<film_arr.length; i++){
			options[++count] = new Option(film_arr[i][1],film_arr[i][0])
		}
		value = film_id;
		$(".select_film").ylDropDownList();
	}
	if(document.getElementsByName('select_show')[0]){
		
		with(document.getElementsByName('select_show')[0]){
			length = 0;
			options[0] = new Option("请选择场次",0);
			
		}
		$(".select_show").ylDropDownList();
	}
	
	if(document.getElementsByName('select_other')[0]){
		with(document.getElementsByName('select_other')[0]){
			value = 0;	
		}
		$(".select_other").ylDropDownList();
	}
	
}
/**
 * @选择影城（全局快速购票） cinema_id,film_id均为默认值 0 表示没有 dateClass获取今天和明天
 * @xuan
 * @param {Object} cityCode
 * @return {TypeName} 
 */

function selectCinema1(cinema_id,film_id,dateClass){
	var day = 1;
	var count = 0;
	var PhoCinemaId = "";
	var cn = document.getElementsByName('select_cinema1')[0];
	var fn = document.getElementsByName('select_film1')[0];
	with(cn){
		PhoCinemaId = options[selectedIndex].value;	
	}
	if(cinema_id != 0){
		PhoCinemaId = cinema_id;
	}
	if(typeof(dateClass) != "undefined"){
		if($(dateClass).attr("id")){
			day = $(dateClass).attr("id");
		}
	}else{
		if($(".todaya").attr("id")){
			day = $(".todaya").attr("id");
		}
	}
	var film_arr = new Array();
	if(day == 2 ){
		film_arr = getTomorFilm(PhoCinemaId);
	}else{
		film_arr = getToDayFilm(PhoCinemaId);
	}
	with(fn){
	    length = 0;
		options[0] = new Option("请选择电影",0);
		for(var i = 0; i<film_arr.length; i++){
			options[++count] = new Option(film_arr[i][1],film_arr[i][0])
		}
		value = film_id;
		$(".select_film1").ylDropDownList();
	}
	if(document.getElementsByName('select_show1')[0]){
		
		with(document.getElementsByName('select_show1')[0]){
			length = 0;
			options[0] = new Option("请选择场次",0);
			
		}
		$(".select_show1").ylDropDownList();
	}
	
	if(document.getElementsByName('select_other1')[0]){
		with(document.getElementsByName('select_other1')[0]){
			value = 0;	
		}
		$(".select_other1").ylDropDownList();
	}
	
}

/**
 * @选择影片
 * @xuan
 * @param {Object} cityCode
 * @return {TypeName} 
 */
function selectFilm(){

	if(document.getElementsByName('select_other')[0]){
		with(document.getElementsByName('select_other')[0]){
			value = 0;	
		}
	}
	var count = 0;
	var fn = document.getElementsByName('select_film')[0];
	if(!document.getElementsByName('select_show')[0]){
		return;
	}
	
	with(fn){
		var film_id = options[selectedIndex].value;	
	}
	
	var sn = document.getElementsByName('select_show')[0];
	if(film_id != 0){
		for (i = 0;i < fTodayArray.length;i++){
			if(film_id == 0){
				break;
			}
			if(fTodayArray[i][0] == film_id){
				break;
			}
		}
	}
	
	with(sn){
		length = 0;
		var show_arr = getShow(i);
		options[0] = new Option("请选择场次","0");
		if(film_id != 0){
			
			for(var i = 0; i<show_arr.length; i++){
			  
				options[++count] = new Option(show_arr[i][1] + "(" +show_arr[i][0] + "号厅)", show_arr[i][3])
			}
			
		}
		$(".select_show").ylDropDownList();
	}

	
	
}
/**
 * @选择影片（全局快速购票）
 * @xuan
 * @param {Object} cityCode
 * @return {TypeName} 
 */
function selectFilm1(){

	if(document.getElementsByName('select_other1')[0]){
		with(document.getElementsByName('select_other1')[0]){
			value = 0;	
		}
	}
	var count = 0;
	var fn = document.getElementsByName('select_film1')[0];
	if(!document.getElementsByName('select_show1')[0]){
		return;
	}
	
	with(fn){
		var film_id = options[selectedIndex].value;	
	}
	
	var sn = document.getElementsByName('select_show1')[0];
	if(film_id != 0){
		for (i = 0;i < fTodayArray.length;i++){
			if(film_id == 0){
				break;
			}
			if(fTodayArray[i][0] == film_id){
				break;
			}
		}
	}
	
	with(sn){
		length = 0;
		var show_arr = getShow(i);
		options[0] = new Option("请选择场次","0");
		if(film_id != 0){
			
			for(var i = 0; i<show_arr.length; i++){
			  
				options[++count] = new Option(show_arr[i][1] + "(" +show_arr[i][0] + "号厅)", show_arr[i][3])
			}
			
		}
		$(".select_show1").ylDropDownList();
	}	
	
}

/**
 * 此方法已被废
 * @通过filmcode获得火凤凰影片id
 * @xuan
 * @param {Object} filmCode,day
 * @return {phoFilmId} 
 */
function getPhoFilmIdByfc(filmCode,day){
  var phoFilmId = 0;
  var film_arr = new Array();
  if(day == 2){
  	film_arr = fTomorArray;
  }else{
  	film_arr = fTodayArray;
  }
  for(var i=0; i<film_arr.length; i++){
   if( film_arr[i][2] == filmCode ){
		phoFilmId = film_arr[i][0];
		break;
   }
  }
  //如果没有找到再次查找
  if(phoFilmId == 0){
  	if(day == 2){
	  	film_arr = fTodayArray;
	}else{
	  	film_arr = fTomorArray;
	}
  	for(var i=0; i<film_arr.length; i++){
	   if( film_arr[i][2] == filmCode ){
			phoFilmId = film_arr[i][0];
			break;
	   }
	 }
  }
  
  return phoFilmId;
}
/**
 *  此方法已废除
 * @通过火凤凰影片id获得filmcode
 * @xuan
 * @param {Object} filmCode,day
 * @return {phoFilmId} 
 */
function getFilmCodeByfid(phoFid,day){
  var fcode = 0;
  var film_arr = new Array();
  if(day == 2){
  	film_arr = fTomorArray;
  }else{
  	film_arr = fTodayArray;
  }
  for(var i=0; i<film_arr.length; i++){
   if( film_arr[i][0] == phoFid ){
		fcode = film_arr[i][2];
		break;
   }
  }
  
  //如果没有找到再次查找
  if(fcode == 0){
  	if(day == 2){
	  	film_arr = fTodayArray;
	}else{
	  	film_arr = fTomorArray;
	}
  	for(var i=0; i<film_arr.length; i++){
	   if( film_arr[i][0] == phoFid ){
			fcode = film_arr[i][2];
			break;
	   }
	 }
  }
  
  return fcode;
}
/**
 * @通过filmcode获得火凤凰影片id
 * @xuan
 * @param {Object} filmCode,day
 * @return {phoFilmId} 
 */
function getShowPk(){
	var spk = "0";
	var sn = document.getElementsByName('select_show')[0];
	with(sn){
		spk = options[selectedIndex].value;	
	}
  	return spk;
}
/**
 * @通过filmcode获得火凤凰影片id
 * @xuan
 * @param {Object} filmCode,day
 * @return {phoFilmId} 
 */
function getShowPk1(){
	var spk = "0";
	var sn = document.getElementsByName('select_show1')[0];
	with(sn){
		spk = options[selectedIndex].value;	
	}
  	return spk;
}

/**
 * @将showtime转换成int
 * @xuan
 * @param {Object} filmCode,day
 * @return {phoFilmId} 
 */
function getSTimeToInt(showTime){
	var showTime_arr = showTime.split(':');
  	var time_str = showTime_arr[0] + showTime_arr[1] ;
  	return parseInt(time_str);
}


/**
 * @纠错，该片是今天还是明天的
 * @xuan
 * @param {Object} filmCode,day
 * @return {phoFilmId} 
 */
function getTodayOrTomor(filmCode){
  var phofi = 0;
  var film_arr = new Array();
  var day = 1; 
  for(var i=0; i<fTodayArray.length; i++){
   if( fTodayArray[i][0] == filmCode ){
		phofi = fTodayArray[i][0];
		day = 1
		break;
   }
   
  }
    
  //如果没有找到再次查找
  if(phofi == 0){
	  for(var i=0; i<fTomorArray.length; i++){
	   if( fTomorArray[i][0] == filmCode ){
			phofi = fTomorArray[i][0];
			day = 2
			break;
	   }
	   
	  }
  }
  
  return day;
}

/**
 * @放映时刻表根据城市获取影厅
 * @lzq
 * @param cityCode
 */
function initCinemaList(cityCode, _cinemaId)
{
	var cinema_array = getCinemaArray(cityCode);
	var _html = "";
	if(cinema_array.length == 0 || cinema_array == null){
		_html = "该城市暂无万达院线！";
	}else{
		for(var _i = 0;_i<cinema_array.length;_i++)
		{
	   		if(_cinemaId == cinema_array[_i][0]){
	   			_html += '<a class="on" href="javascript:void(0);" tt="'+cinema_array[_i][0]+'" title="'+cinema_array[_i][1]+'">'+cinema_array[_i][1]+'</a>';
	   		}else{
	   			_html += '<a href="javascript:void(0);" tt="'+cinema_array[_i][0]+'" title="'+cinema_array[_i][1]+'">'+cinema_array[_i][1]+'</a>';
	   		}    
		}
	}
	
	$(".show_cinema").html(_html);

}

/**
 * 根据城市获取影厅，电影排期页面使用
 * @param cityCode	城市CODE
 * @param _cinemaId	影城ID
 * @param flag	0：常去影城，1：最后一次查询的影城
 * 
 * @author LH
 * @since 2012.08.27
 */
function initCinemaLists(cityCode, _cinemaId, flag) {
	var cinema_array = getCinemaArray(cityCode);
	var _html = "";
	if (cinema_array.length == 0 || cinema_array == null) {
		_html = "该城市暂无万达院线！";
	} else {
		for (var _i=0; _i<cinema_array.length; _i++) {
	   		if(_cinemaId == cinema_array[_i][0]){
	   			if (flag == '0') {
	   				_html += "<a class=\"gbcr\" href=\"javascript: void(0);\" id=\"" + cinema_array[_i][0] + "\" name=\"" + cinema_array[_i][1] + "\" cityCode=\""+cityCode+"\" >&nbsp;" + cinema_array[_i][1] + "<span class=\"bgis\" style=\"display: inline\"><img id=\"img_" + cinema_array[_i][0] + "\" class=\"bgi\" title=\"常用影城\" name=\"1\" src=\"../imges/movie/icon_loading_blue.png\"/></span></a>";
	   			} else {
	   				_html += "<a class=\"gbcr\" href=\"javascript: void(0);\" id=\"" + cinema_array[_i][0] + "\" name=\"" + cinema_array[_i][1] + "\" cityCode=\""+cityCode+"\" >&nbsp;" + cinema_array[_i][1] + "<span class=\"bgis\"><img id=\"img_" + cinema_array[_i][0] + "\" class=\"bgi\" title=\"设为常用影城\" name=\"0\" src=\"../imges/movie/icon_loading_gray.png\"/></span></a>";
	   			}
	   			//lilang start
				$("#pictureLilang").attr('style', 'display: none');
				//lilang start
	   		}else{
	   			_html += "<a href=\"javascript: void(0);\" id=\"" + cinema_array[_i][0] + "\" name=\"" + cinema_array[_i][1] + "\" cityCode=\""+cityCode+"\" >&nbsp;" + cinema_array[_i][1] + "<span class=\"bgis\"><img id=\"img_" + cinema_array[_i][0] + "\" class=\"bgi\" title=\"设为常用影城\" name=\"0\" src=\"../imges/movie/icon_loading_gray.png\"/></span></a>";
	   		}
		}
	}
	$('#cinemaDiv').html(_html);
	if (cinema_array.length > 4) {
		$('#cinemaDiv').addClass('sco');	// 加入滚动条样式
	}
}

/**
 * 根据城市获取影城，快速购票中使用
 * @param cityCode
 * 
 * @author LH
 * @since 2012.08.27
 */
function initCinemaListByQuick(cityCode, _cinemaId) {
	// 初始化影城
	var cinema_array = getCinemaArray(cityCode);
	var cinemaStr = "";
	for(var i = 0; i<cinema_array.length; i++){
		if (cinema_array[i][0] == _cinemaId) {
			cinemaStr += "<a class=\"selected_city\" href='javascript:void(0)' id='" + cinema_array[i][0] + "'>" + cinema_array[i][1] + "</a>";
		}
		cinemaStr += "<a href='javascript:void(0)' id='" + cinema_array[i][0] + "'>" + cinema_array[i][1] + "</a>";
	}
	$('#quick_cinema').html(cinemaStr);
}

/**
 * @初始化用户资料编辑页面  常去影院
 * @xuan
 * @param {Object} cityCode
 * @return {TypeName} 
 */
function initCenterEditCinema(cityCode,cinema_id,select_cinema_id,select_cinema_name){
	var cinema_array = getCinemaArray(cityCode);
	var count = 1;
	var cn = document.getElementsByName('select_cinema')[0];
	var fn = document.getElementsByName('select_film')[0];
	with(cn){
	
		length = 0;
		options[0]=new Option("请选择影院",0);
		
		
		if($.trim(select_cinema_name)!="")
		{
		   options[1]=new Option(select_cinema_name,select_cinema_id);
		}
		else
		{
		   count = 0;
		   cinema_id = "0";
		}
		
		for(var i = 0; i<cinema_array.length; i++){
			if(cinema_array[i][0] != select_cinema_id)
			{
			   options[++count] = new Option(cinema_array[i][1],cinema_array[i][0])
			}
		}
		//options[3].selected = true;
		value = cinema_id;
		if($(".select_cinema").html() !== null){
			$(".select_cinema").ylDropDownList();
		}
	}

	
}


