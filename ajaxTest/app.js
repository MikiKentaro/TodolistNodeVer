var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var task = require('./routes/task');
var serch = require('./routes/serch');
var app = express();
// mongooseを用いてMongoDBに接続する
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ajax_test');
// ToDoスキーマを定義する
var Schema = mongoose.Schema;
var todoSchema = new Schema({
    isCheck: {type: Boolean,default: false},
    text: {type: String,
        default: 'no text'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    limitDate: {
        type: Date,
        default: Date.now
    },
    group: {
        type: String,
        default: 'no group'
    },
    isTitles: {
        type: Boolean,
        default: true
    },
    wanthave: {
        type: Boolean,
        default: true
    },
    mostNear: {
        type: Date,
        default: Date.now
    },
    finished: {
        type: String,
        default: 0
    },
    taskcount: {
        type: String,
        default: 0
    }
});
mongoose.model('Todo', todoSchema);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', users);
app.use('/task', task);
app.use('/serch', serch);
// /todoにGETアクセスしたとき、ToDo一覧を取得するAPI
app.get('/todo', function(req, res) {
    var Todo = mongoose.model('Todo');
    // すべてのToDoを取得して送る
    //Todoの順番を決める
    Todo.find(null, {}, {sort: {createdDate: -1},limit: 100}, function(err, todos) {
        res.send(todos);
    });
});
app.get('/todo2', function(req, res) {
    var Todo = mongoose.model('Todo');
    // すべてのToDoを取得して送る
    //Todoの順番を決める
    Todo.find(null, {}, {sort: {limitDate: 1},limit: 100}, function(err, todos) {
        res.send(todos);
    });
});
// /todoにPOSTアクセスしたとき、ToDoを追加するAPI
app.post('/todo', function(req, res) {
    var name = req.body.name;
    var limit = req.body.limit;
    var group = req.body.group;
    var istitles = req.body.isTitles;
    var wanton = req.body.wanton;
    var deleatgroup = req.body.groupname2;
    var checkcheck = req.body.checkcheck;
    var checkbool = req.body.checkbool;
    
	
	
	var limitsort=req.body.limitsort;
	
	//if(limitsort){
	       // var Todo = mongoose.model('Todo');

	//Todo.find(null, {}, {sort: {limitDate: -1},limit: 100}, function(err, todos) {
        //res.send(limitsort);
	
    //});
	
	
	//}
	//*/
	//トップページのリストをクリックしたとき
    //実際には未使用
    if (checkcheck && checkbool) {
        var Todo = mongoose.model('Todo');
        Todo.findOne({group: {$eq: checkcheck},isTitles: {$eq: true}}, function(err, todos) {
            console.log("check");
            console.log(todos);
            //チェックを切り替える
            if (checkbool == "false") {
                todos.isCheck = true;
            } else {
                todos.isCheck = false;
            }
            todos.save();
        });
    }
    var checktask = req.body.checktask;
    var taskbool = req.body.taskbool;
    var taskgroup = req.body.taskgroup;
    //詳細ページのToDoをクリックしたとき
    //完了か未完了か切り替える
    if (checktask && taskbool && taskgroup) {
        var taskcount;
        var finishedcount;
        var wanthave2;
        var Todo = mongoose.model('Todo');
        Todo.findOne({
            text: {
                $eq: checktask
            },
            group: {
                $eq: taskgroup
            }
        }, function(err, todos) {
            console.log("check");
            console.log(todos);
            //完了か未完了が切り替える
            if (taskbool == "false") {
                todos.isCheck = true;
            } else {
                todos.isCheck = false;
            }
            wanthave2 = todos.wanthave;
            todos.save();
            //リストのTodoの数を数える
            Todo.count({
                group: {
                    $eq: taskgroup
                },
                wanthave: {
                    $eq: true
                }
            }, function(err, todoss) {
                console.log(todoss);
                taskcount = todoss;
            });
            //終わったTodoを数える
            Todo.count({
                group: {
                    $eq: taskgroup
                },
                isCheck: {
                    $eq: true
                },
                wanthave: {
                    $eq: true
                }
            }, function(err, todocheck) {
                finishedcount = todocheck;
            });
            //トップに表示されているTodoを見つける
            Todo.findOne({group: {$eq: taskgroup},isTitles: {$eq: true}}, function(err, todosss) {
                if (wanthave2 == true) {
                    if (todos.isCheck == false) {
                        finishedcount -= 1;
                    } else {
                        finishedcount += 1;
                    }
                } else {};
                todosss.taskcount = taskcount - 1;
                todosss.finished = finishedcount;
                console.log(taskcount);
                todosss.save();
            });
        });
    }
    //トップページでデリートボタンを押したとき
    if (deleatgroup) {
        var Todo = mongoose.model('Todo');
        Todo.remove({
            group: {
                $eq: deleatgroup
            }
        }, function(err, todos) {
            console.log("dd")
        });
    }
    var deleattask = req.body.taskname2;
    var delgru = req.body.delgru;
    //詳細ページでデリートボタンを押したとき
    if (deleattask && delgru) {
        var Todo = mongoose.model('Todo');
        var taskcheck;
        var taskcount;
        var wantdeli;
        var finishedcount;
        //消すTodoを見つける
        Todo.findOne({
            text: {
                $eq: deleattask
            },
            group: {
                $eq: delgru
            }
        }, function(err, todost) {
            taskcheck = todost.isCheck;
            wantdeli = todost.wanthave;
        });
        //消すTodoと同じリストの数を数える
        Todo.count({
            group: {
                $eq: delgru
            },
            wanthave: {
                $eq: true
            }
        }, function(err, todoss) {
            console.log(todoss);
            taskcount = todoss;
        });
        //消すTodoと同じリストの終わったTodoを数える
        Todo.count({
            group: {
                $eq: delgru
            },
            isCheck: {
                $eq: true
            },
            wanthave: {
                $eq: true
            }
        }, function(err, todocheck) {
            finishedcount = todocheck;
        });
        //消すtodoのリストのトップをみつける
        Todo.findOne({group: {$eq: delgru},isTitles: {$eq: true}}, function(err, todosss) {
            if (wantdeli == true) {
                todosss.taskcount = taskcount - 2;
                if (taskcheck == true) {
                    todosss.finished = finishedcount - 1;
                }
            }
            todosss.save();
        });
        //Todoを消す
        Todo.remove({
            text: {$eq: deleattask},group: {$eq: delgru}}, function(err, todos) {
            //console.log(taskcheck);
        });
    }
    // ToDoの名前と期限のパラーメタがあればMongoDBに保存
    //詳細ページのTodoを追加した時
    if (name && limit) {
        var Todo = mongoose.model('Todo');
        var todo = new Todo();
        todo.text = name;
        todo.limitDate = limit;
        todo.isTitles = istitles;
        todo.group = group;
        if (wanton == "true") {
            todo.wanthave = false;
        } else {
            todo.wanthave = true;
        }
        console.log("bbb");
        console.log(todo.wanthave);
        todo.save();
        var taskcount;
        var finishedcount;
        //
        Todo.count({group: {$eq: group},wanthave: {$eq: true}}, function(err, todoss) {
            console.log(todoss);
            taskcount = todoss;
        });
        Todo.count({group: {$eq: group},isCheck: {$eq: true},wanthave: {$eq: true}}, function(err, todocheck) {
            finishedcount = todocheck;
        });
        Todo.findOne({group: {$eq: group},isTitles: {$eq: true}}, function(err, todosss) {
            if (todo.wanthave == true) {
                todosss.taskcount = taskcount;
            } else {
                todosss.taskcount = taskcount - 1;
            }
            todosss.finished = finishedcount;
            if (todosss.limitDate > todo.limitDate) {
                todosss.limitDate = limit;
            } else {}
            todosss.save();
        });
        res.send(true);
    }
    //トップページでリストを追加した時
    else if (group) {
        var Todo = mongoose.model('Todo');
        var todo = new Todo();
        //console.log(todo);
        todo.group = group;
        //	console.log(todo);
        todo.save();
        res.send(true);
    } else {
        res.send(false);
    }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;