const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

//连接mongodb数据库
mongoose.connect("mongodb://localhost/myblog", function (err) {
    if (err) {
        console.log("连接失败");
        throw err;
    }
    console.log("连接成功");
});


const Schema = mongoose.Schema;

const users = new Schema({
    username: {type: String},
    nickName: {type: String},
    password: {type: String},
    email: {type: String}
},{versionKey:false});

const article = new Schema({
    user: {type: String},
    title: {type: String},
    content: {type: String},
    url: {type: String},
    visitors: {type: Number},
    like: {type: Number},
    time: {type: Number},
    articleId:{type:Number},
    img:{type:String},
    type:{type:String}
},{versionKey:false});

const userModel = mongoose.model('user', users,"users");

const articleModel = mongoose.model('article', article,"article");

module.exports = {
    userModel: userModel,
    articleModel: articleModel
};














