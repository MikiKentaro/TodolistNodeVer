// ページが表示されたときToDoリストを表示する
$(function() {
    getList();
});
// フォームを送信ボタンを押すと、ToDoを追加して再表示する。
$('#form').submit(function() {
    postList();
    //return false;
});
$('#serchbt').click(function() {
    serchList();
    //return false;
});
$('#serchdate').click(function() {
    serchListdate();
    //return false;
});
// ToDo一覧を取得して表示する
function getList() {
        // var $list = $('.list');
        //    $list.append('検索ワードを記入してください');
        //  $list.fadeIn();
    }
    //キーワード検索のボタンを押したとき

function serchList() {
        var name = $('#text').val();
        var start = $('#startdate').val();
        var end = $('#enddate').val();
        var beWord;
        beWord = 'false';
        //入力項目を空にする
        $('#text').val('');
        $('#startdate').val('');
        $('#enddate').val('');
        if (name == "") {
            alert("検索ワードを入力してください")
            return
        };
        var num;
        num = 0;
        // すでに表示されている一覧を非表示にして削除する
        var $list = $('.list');
        $list.fadeOut(function() {
            $list.children().remove();
            // /todoにGETアクセスする
            $.get('todo', function(todos) {
                //alert(todo.count());
                // 取得したToDoを追加していく
                $.each(todos, function(serch, todo) {
                    //入力した文字があるかどうか
                    if (todo.text.indexOf(name) != -1 &&
                        todo.isTitles == false) {
                        beWord = 'true';
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
                        var checkclor;
                        if (todo.wanthave == false) {
                            checkcolor = "#ddddff";
                        } else {
                            if (todo.isCheck == true) {
                                checkcolor = "#ddffdd";
                            } else {
                                checkcolor = "#ffdddd";
                            }
                        }
                        $list.append(
                            '<div class="serchtodo" style="background-color:' +
                            checkcolor +
                            '"><div class="linkButton' +
                            num +
                            '"><a href="/task" style="text-decoration:none;">' +
                            '<div class=tasktitle>' +
                            todo.text + ' </div>' +
                            '<div>リスト　' + todo.group +
                            '</div>' + '<div> 作成日' +
                            creyear + '/' +
                            cremonth + '/' +
                            credate + '   期限' +
                            myyear + '/' + mymonth +
                            '/' + mydate +
                            '</div></a></div>' +
                            '<div class="taskdeleat"><input id="deleatButton' +
                            num +
                            '" type="button" value="×"></div></div><br>'
                        );
                        //リンクボタンのスクリプト
                        $list.append(
                            '<script>$(".linkButton' +
                            num +
                            '").click(function() { editbutton' +
                            num + '(); });' +
                            'function editbutton' +
                            num +
                            '() { sessionStorage.setItem("tasknum","' +
                            todo.group +
                            '");}</script>');
                        //デリートボタンのスクリプト
                        $list.append(
                            '<script>$("#deleatButton' +
                            num +
                            '").click(function() { deleatbutton' +
                            num + '();});' +
                            'function deleatbutton' +
                            num + '() {  ' +
                            'var deleattask = "' +
                            todo.text + '";' +
                            '$.post("/todo", {taskname2: deleattask}, function(res){console.log(res);' +
                            'getList();' + '});' +
                            'alert("asdd");' +
                            '}</script>');
                        //チェックボタンのスクリプト
                        $list.append(
                            '<script>$("#check' +
                            num +
                            '").click(function() { checkbox' +
                            num + '();countcheck' +
                            num + '();});' +
                            'function checkbox' +
                            num + '() {  ' +
                            'var checknum = "' +
                            todo.text + '";' +
                            'var checkonoff="' +
                            todo.isCheck + '";' +
                            'var checkgroup="' +
                            todo.group + '";' +
                            // 'alert("asdd");'+
                            '$.post("/todo", {checktask: checknum,taskbool:checkonoff,taskgroup:checkgroup}, function(res){console.log(res);' +
                            'getList();' + '});' +
                            '}' +
                            'function countcheck' +
                            num + '() {  ' +
                            'var checkgroup="' +
                            todo.group + '";' +
                            '$.post("/todo", {taskgroup2:checkgroup}, function(res){console.log(res);' +
                            '});' + '}</script>');
                        num += 1;
                    }
                });
                // 一覧を表示する
                document.getElementById("serchword").innerHTML =name+"で検索した結果";

                if (beWord == 'false') {
                    document.getElementById("notfound").innerHTML =
                        "<div class='errtext'>検索されたワードはありません" +
                        '</div><br>';
                } else {
                    document.getElementById("notfound").innerHTML =
                        num + "件見つかりました。" + '<br>';
                }
                $list.fadeIn();
            });
        });
    }
    //日付選択ボタンを押したとき

function serchListdate() {
        var name = $('#text').val();
        var start = $('#startdate').val();
        var end = $('#enddate').val();
        var beWord;
        beWord = 'false';
        //入力項目を空にする
        $('#text').val('');
        $('#startdate').val('');
        $('#enddate').val('');
        //入力してなかった時
        if (start == "" || end == "") {
            alert("開始と終了を入力してください")
            return
        };
        var num;
        num = 0;
		
		var limitsort;
		limitsort="limit";
		$.post('/todo', {limitsort: limitsort}, function(res) {
});
        // すでに表示されている一覧を非表示にして削除する
        var $list = $('.list');
        $list.fadeOut(function() {
            $list.children().remove();
            // /todoにGETアクセスする
            $.get('todo2', function(todos) {
                //alert(todo.count());
                // 取得したToDoを追加していく
                $.each(todos, function(serch, todo) {
                    //一つ目の日付と２つ目の日付の間
                    if (start <= todo.limitDate && todo
                        .limitDate <= end && todo.isTitles ==
                        false) {
                        beWord = 'true';
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
                        var checkclor;
                        if (todo.wanthave == false) {
                            checkcolor = "#ddddff";
                        } else {
                            if (todo.isCheck == true) {
                                checkcolor = "#ddffdd";
                            } else {
                                checkcolor = "#ffdddd";
                            }
                        }
                        $list.append(
                            '<div class="serchtodo" style="background-color:' +
                            checkcolor +
                            '"><div class="linkButton' +
                            num +
                            '"><a href="/task" style="text-decoration:none;">' +
                            '<div class=tasktitle>' +
                            todo.text + ' </div>' +
                            '<div>リスト　' + todo.group +
                            '</div>' + '<div> 作成日' +
                            creyear + '/' +
                            cremonth + '/' +
                            credate + '   期限' +
                            myyear + '/' + mymonth +
                            '/' + mydate +
                            '</div></a></div>' +
                            '<div class="taskdeleat"><input id="deleatButton' +
                            num +
                            '" type="button" value="×"></div></div><br>'
                        );
                        $list.append(
                            '<script>$(".linkButton' +
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
                            'var deleattask = "' +
                            todo.text + '";' +
                            '$.post("/todo", {taskname2: deleattask}, function(res){console.log(res);' +
                            'getList();' + '});' +
                            'alert("asdd");' +
                            '}</script>');
                        $list.append(
                            '<script>$("#check' +
                            num +
                            '").click(function() { checkbox' +
                            num + '();countcheck' +
                            num + '();});' +
                            'function checkbox' +
                            num + '() {  ' +
                            'var checknum = "' +
                            todo.text + '";' +
                            'var checkonoff="' +
                            todo.isCheck + '";' +
                            'var checkgroup="' +
                            todo.group + '";' +
                            '$.post("/todo", {checktask: checknum,taskbool:checkonoff,taskgroup:checkgroup}, function(res){console.log(res);' +
                            'getList();' + '});' +
                            '}' +
                            'function countcheck' +
                            num + '() {  ' +
                            'var checkgroup="' +
                            todo.group + '";' +
                            '$.post("/todo", {taskgroup2:checkgroup}, function(res){console.log(res);' +
                            '});' + '}</script>');
                        num += 1;
                    }
                });
                // 一覧を表示する
                 document.getElementById("serchword").innerHTML =start+"～"+end+"で検索した結果";

                if (beWord == 'false') {
                    document.getElementById("notfound").innerHTML ="検索されたワードはありません" + '<br>';
                } else {
                    document.getElementById("notfound").innerHTML =num + "件見つかりました。" + '<br>';
                }
                $list.fadeIn();
            });
        });
    }
    // フォームに入力されたToDoを追加する

function postList() {
        // フォームに入力された値を取得
        var name = $('#text').val();
        var limitDate = new Date($('#limit').val());
        //alert(name);
        //入力項目を空にする
        // $('#text').val('');
        // $('#limit').val('');
        // /todoにPOSTアクセスする
        $.post('/todo', {name: name,limit: limitDate}, function(res) {
            console.log(res);
            //再度表示する
            getList();
        });
    }
    //if(db.todo.count()>=3){
    //	alert(aa)
    //	}