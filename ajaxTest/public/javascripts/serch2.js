// ページが表示されたときToDoリストを表示する
 
$(function(){
  getList();
 alert('s');
});

// フォームを送信ボタンを押すと、ToDoを追加して再表示する。
$('#form').submit(function(){
  postList();
  	
  return false;
});

// ToDo一覧を取得して表示する
function getList(){
var count;
count=0;

var totalcount;
totalcount=0;
  // すでに表示されている一覧を非表示にして削除する
  var $list = $('.list');
  $list.fadeOut(function(){
  
    $list.children().remove();
    // /todoにGETアクセスする

    $.get('todo', function(todos){
      // 取得したToDoを追加していく
      $.each(todos, function(index, todo){
	  
	  
	//  if(todo.text=='オムライス'){
	//  alert('omu');
	  
	  var create=new Date(todo.createdDate);
	 var credate=create.getDate();
	  var cremonth=create.getMonth()+1;
    var creyear=create.getFullYear();
	
	  
        var limit = new Date(todo.limitDate);
		var mydate=limit.getDate();
  var mymonth=limit.getMonth()+1;
    var myyear=limit.getFullYear();
	$list.append('<div>項目'+todo.text+'<input type="checkbox" ' + (todo.isCheck ? 'checked' : '') + '>'+' </div>');
        $list.append( '<div> 作成日' +creyear+'/'+cremonth+'/'+credate + '</div><div> 期限' +myyear+'/'+mymonth+'/'+mydate + '</div><br>');
	//	}
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


  // フォームに入力された値を取得
  var name = $('#text').val();
  var limitDate = new Date($('#limit').val());

  //入力項目を空にする
  $('#text').val('');
  $('#limit').val('');

  // /todoにPOSTアクセスする
  $.post('/todo', {name: name, limit: limitDate}, function(res){
    console.log(res);
    //再度表示する
    getList();
  });
}

//if(db.todo.count()>=3){
//	alert(aa)
	
//	}