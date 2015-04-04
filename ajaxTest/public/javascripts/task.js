﻿// ページが表示されたときToDoリストを表示する
$(function(){
  getList();
  wantload();
});

// フォームを送信ボタンを押すと、ToDoを追加して再表示する。
$('#form').submit(function(){
  postList();
  return false;
});

$('#wanton').click(function(){
  wantswich();
});
var wantbool;

function wantload(){
wantbool=false;
document.getElementById("wanttext").innerHTML = '<div>Have To Do</div>';

}
// ToDo一覧を取得して表示する
function getList(){
var count;
count=0;

var totalcount;
totalcount=0;




var gro;
gro = sessionStorage.getItem("tasknum");
//alert(gro);
var groupname;
groupname=gro;

var num;
num=0;

	  document.getElementById("todoname").innerHTML = groupname+'<br>';

  // すでに表示されている一覧を非表示にして削除する
  var $list = $('.list');
  $list.fadeOut(function(){
    $list.children().remove();
    // /todoにGETアクセスする
    $.get('todo', function(todos){
      // 取得したToDoを追加していく
	 
      $.each(todos, function(index, todo){
	  
	 
	  if(todo.group==groupname&&todo.isTitles==false){
	  
	  var create=new Date(todo.createdDate);
	 var credate=create.getDate();
	  var cremonth=create.getMonth()+1;
    var creyear=create.getFullYear();
	
	  
        var limit = new Date(todo.limitDate);
		var mydate=limit.getDate();
  var mymonth=limit.getMonth()+1;
    var myyear=limit.getFullYear();
	
	var checkclor;
	var isFinish;
	
	if(todo.wanthave==false){
	checkcolor="#ddddff";
	if(todo.isCheck==true){
	isFinish="完了";
	}else{
	isFinish="未完了";
	}
	}
	else{
	if(todo.isCheck==true){
	checkcolor="#ddffdd";
	isFinish="完了";
	}else{
	checkcolor="#ffdddd";
	isFinish="未完了";

	}
	}
	
	$list.append('<div class="tasktodo" style="background-color:'+checkcolor+'"><div class=check2'+num+'><div class="tasktitle">'+todo.text+'<input type="checkbox" id="check'+num+'" ' + (todo.isCheck ? 'checked' : '') + '>'+' </div>'+
        '<div> 作成日' +creyear+'/'+cremonth+'/'+credate + '   期限' +myyear+'/'+mymonth+'/'+mydate + '</div></div>'+
		
		'<div class="taskdeleat"><input id="deleatButton'+num+'" type="button" value="×"></div>'+
		'</div><div class="isfinish">'+isFinish+'</div>');
	
		
		
		$list.append('<script>$("#deleatButton'+num+'").click(function() { deleatbutton'+num+'();});'+
'function deleatbutton'+num+'() {  '+
 'var deleattask = "'+todo.text+'";'+
 'var deleatgru="'+todo.group+'";'+
'$.post("/todo", {taskname2: deleattask,delgru:deleatgru}, function(res){console.log(res);'+
'getList();'+
'});'+
//'alert("asdd");'+
'}</script>');

$list.append('<script>$(".check2'+num+'").click(function() { checkbox'+num+'();countcheck'+num+'();});'+
'function checkbox'+num+'() {  '+
 'var checknum = "'+todo.text+'";'+
 'var checkonoff="'+todo.isCheck+'";'+
 'var checkgroup="'+todo.group+'";'+
// 'alert("asdd");'+
'$.post("/todo", {checktask: checknum,taskbool:checkonoff,taskgroup:checkgroup}, function(res){console.log(res);'+

'getList();'+
'});'+

'}'+
'function countcheck'+num+'() {  '+
 'var checkgroup="'+todo.group+'";'+

'$.post("/todo", {taskgroup2:checkgroup}, function(res){console.log(res);'+
'});'+		
'}</script>');
		
		

	num+=1;	
		

		}
	
		/*
		totalcount+=1;
		
		if(todo.isCheck="true"){
		count+=1;
		}
		$list.append('<div>'+totalcount+'個中'+count+'個クリア</div>');
		*/
      });
      // 一覧を表示する
      $list.fadeIn();
    });
  });




}

// フォームに入力されたToDoを追加する
function postList(){

var groupname;
groupname = sessionStorage.getItem("tasknum");

alert(wantbool);
  // フォームに入力された値を取得
  var name = $('#text').val();
  var limitDate = new Date($('#limit').val());
  var istitle=false;
 
// if(name==""){
 //alert("axss");

 //}
 if(name!=""){
 //alert("nuuu");
 
  //入力項目を空にする
  $('#text').val('');
  $('#limit').val('');

  // /todoにPOSTアクセスする
  $.post('/todo', {name: name, limit: limitDate,isTitles:istitle, group: groupname,wanton:wantbool}, function(res){
    console.log(res);
    //再度表示する
    getList();
  });
  
  }
  
}

function wantswich(){

if(wantbool==false){
wantbool=true;
//alert("buu");
//document.getElementById("wanton").innerHTML = '<div><input type="checkbox" ' + (wantbool ? 'checked' : '') + '>want to do</div>';
document.getElementById("wanttext").innerHTML = '<div> Want To Do</div>';

}else{
wantbool=false;
document.getElementById("wanttext").innerHTML = '<div>Have To Do</div>';

}


}


/*

function escapeText(text) {
  return $("<div>").text(text).html();
}

// 入力チェックを行う
function checkText() {
  // 文字数が0または20以上は不可
  
  
  if(text.indexOf("&lt;")!=　-1||text.indexOf("&gt;")!=　-1){
   alert("<>の記号の使用は避けてください");
    return false;
  }

 
  // すでに入力された値があれば不可
  var length = localStorage.length;
  for (var i = 0; i < length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    // 内容が一致するものがあるか比較
    if (text === value) {
      alert("同じ内容は避けてください");
      return false;
    }
  }

  // すべてのチェックを通過できれば可
  return true;
}
*/
/*
if(checkText(val)) {

//var str=JSON.stringify(todo);
//  localStorage.setItem(savetime,str);
  //alert("tesb"+localst);
  
  // テキストボックスを空にする
  text.val("");
}
*/
