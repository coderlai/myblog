const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const icon = require("serve-favicon");
const router = require('./route');
const session = require("express-session");

//设置静态资源路径
app.use(express.static(path.resolve(__dirname, 'build')));

//参数解析
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//网站图标
app.use(icon(path.resolve(__dirname, 'public', 'img', 'favicon.ico')));

//设置session
app.use(session({
    secret:"myblog-session",
    resave:true,
    saveUninitialized:true
}));

//配置路由
app.use(router);

app.use(function(req, res) {
    res.redirect("/")
});


//开启监听
app.listen(3000, () => {
    console.log("server running at http://localhost:3000");
});