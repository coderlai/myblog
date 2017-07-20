const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleWare = require("webpack-dev-middleware");
const webpackHotMiddleWare = require("webpack-hot-middleware");
const config = require("./webpack.dev.config");
const compiler = webpack(config);
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const icon = require("serve-favicon");
const router = require('./route');
const session = require("express-session");

//设置静态资源路径
app.use(express.static(path.resolve(__dirname, 'public')));

//参数解析
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//webpack-dev-server
app.use(webpackDevMiddleWare(compiler, {
    publicPath: config.output.publicPath,
    stats: { colors: true }
}));
app.use(webpackHotMiddleWare(compiler, {
    log: console.log
}));
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
app.listen(8080, () => {
    console.log("server running at http://localhost:8080");
});