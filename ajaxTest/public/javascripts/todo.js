// ページが表示されたときToDoリストを表示する
$(function() {
    getList();
});
// フォームを送信ボタンを押すと、ToDoを追加して再表示する。
$('#form').submit(function() {
    postList();
    return false;
});
// ToDo一覧を取得して表示する
function getList() {
        var smp;
        var num;
        num = 0;
        // すでに表示されている一覧を非表示にして削除する
        var $list = $('.list');
        $list.fadeOut(function() {
            $list.children().remove();
            // /todoにGETアクセスする
            $.get('todo', function(todos) {
                // 取得したToDoを追加していく
                $.each(todos, function(index, todo) {
                    //タイトルにすTodoを表示
                    if (todo.isTitles == true) {
                        var create = new Date(todo.createdDate);
                        var credate = create.getDate();
                        var cremonth = create.getMonth() +
                            1;
                        var creyear = create.getFullYear();
                        var limit = new Date(todo.limitDate);
                        var mydate = limit.getDate();
                        var mymonth = limit.getMonth() +
                            1;
                        var myyear = limit.getFullYear();
                        if (todo.taskcount != 0) {
                            var parsent = todo.finished /
                                todo.taskcount * 100;
                            var parsent2 = Math.round(
                                parsent);
                            var setgroup;
                            setgroup = 'aa';
                            $list.append(
                                '<div class="deleat"><input id="deleatButton' +
                                num +
                                '" type="button" value="×"></div>' +
                                '<div class="todotodo"><div class="linktodo' +
                                num +
                                '"><a href="/task" style="text-decoration:none;"><div class="title">' +
                                todo.group +
                                '</div>' +
                                '<div class="todo"><div><div class="par">達成率' +
                                parsent2 +
                                '％</div><div class=parbar><img src="images/lightgreen.jpg" width="' +
                                parsent2 +
                                '%" height="30"></div></div>' +
                                '<div>' + todo.taskcount +
                                '個中' + todo.finished +
                                '個チェック済み' +
                                //	'<input type="checkbox" id="check'+num+'" ' + (todo.isCheck ? 'checked' : '') + '>'+
                                ' 作成日：' + creyear +
                                '/' + cremonth +
                                '/' + credate +
                                '  期限：' + myyear +
                                '/' + mymonth + '/' +
                                mydate + '</div>' +
                                //$list.append('<script>$("#check").click(function(){checkbox1();});function checkbox1(){ $.get("/todo", function(todos){ $.each(todos, function(index, todo){todo.isCheck="true";});});}<script>');
                                //'<div><a href="/task"><input id="linkButton'+num+'" type="button" value="詳細"></a></div>'+
                                '</div></div></div>'
                            );
                            $list.append(
                                '<script>$(".linktodo' +
                                num +
                                '").click(function() { editbutton' +
                                num + '(); });' +
                                'function editbutton' +
                                num +
                                '() { sessionStorage.setItem("tasknum","' +
                                todo.group +
                                '");}</script>');
                            $list.append(
                                '<script>$("#deleatButton' +
                                num +
                                '").click(function() { deleatbutton' +
                                num + '();});' +
                                'function deleatbutton' +
                                num + '() {  ' +
                                'var deleatss = "' +
                                todo.group + '";' +
                                // 'alert("asdd");'+
                                '$.post("/todo", {groupname2: deleatss}, function(res){console.log(res);' +
                                'getList();' +
                                '});' +
                                '}</script>');
                        } else {
                            parsent = 0;
                            parsent2 = 0;
                            $list.append(
                                '<div class="deleat"><input id="deleatButton' +
                                num +
                                '" type="button" value="×"></div>' +
                                '<div class="todotodo"><div class="linktodo' +
                                num +
                                '"><a href="/task" style="text-decoration:none;"><div class="title">' +
                                todo.group +
                                '</div>' +
                                '<div class="todo"><div><div class="par">達成率' +
                                parsent2 +
                                '％</div><div class=parbar><img src="images/lightgreen.jpg" width="' +
                                parsent2 +
                                '%" height="30"></div></div>' +
                                '<div>ToDoが作成されていません' +
                                ' 作成日：' + creyear +
                                '/' + cremonth +
                                '/' + credate +
                                '</div>' +
                                '</div></div></div>'
                            );
                            $list.append(
                                '<script>$(".linktodo' +
                                num +
                                '").click(function() { editbutton' +
                                num + '(); });' +
                                'function editbutton' +
                                num +
                                '() { sessionStorage.setItem("tasknum","' +
                                todo.group +
                                '");}</script>');
                            $list.append(
                                '<script>$("#deleatButton' +
                                num +
                                '").click(function() { deleatbutton' +
                                num + '();});' +
                                'function deleatbutton' +
                                num + '() {  ' +
                                'var deleatss = "' +
                                todo.group + '";' +
                                '$.post("/todo", {groupname2: deleatss}, function(res){console.log(res);' +
                                'getList();' +
                                '});' +
                                '}</script>');
                        }
                        num += 1;
                    }
                });
                // 一覧を表示する
                $list.fadeIn();
            });
        });
    }
    // フォームに入力されたToDoを追加する

function postList() {
    // フォームに入力された値を取得
    var groupname = $('#text').val();
    var grouping;
	
	
	
	var notword;
		notword=">";
		
		var notword2;
		notword2="<";
		
		var notword3;
		notword3="&"
	
	    $('#text').val('');

	
	if(groupname.indexOf(notword) !=　-1){
		 //alert("1文字以上入力してください");
		 document.getElementById("todocom").innerHTML ="<div class='errtext'><>&の使用は控えてください" + '<br></div>';
		 return;
		}else if(groupname.indexOf(notword2) !=　-1){
		 document.getElementById("todocom").innerHTML ="<div class='errtext'><>&の使用は控えてください" + '<br></div>';
		 return;
		}else if(groupname.indexOf(notword3) !=　-1) {
		 document.getElementById("todocom").innerHTML ="<div class='errtext'><>&の使用は控えてください" + '<br></div>';
		 return;
}else if(groupname==""){
		 document.getElementById("todocom").innerHTML ="<div class='errtext'>テキストフォームに何も書かれていません" + '<br></div>';
		 return;


}
	
	
	
	
	
    //入力項目を空にする
    // /todoにPOSTアクセスする
    $.post('/todo', {
        group: groupname,
        grouping: grouping
    }, function(res) {
        console.log(res);
        //再度表示する
        document.getElementById("todocom").innerHTML =
            "新しいリストが追加されました" + '<br>';
        getList();
    });
}