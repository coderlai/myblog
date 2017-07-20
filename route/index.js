const router = require("express").Router()
const model = require("../model")
const user = model.userModel
const article = model.articleModel
const captchapng = require('captchapng')
const path = require("path")

//分页返回数据
router.get("/api/getpage", function (req, res) {
    const page = req.query.page;
    const type = req.query.type;
    const condition = type === 'all' ? {} :{type:type}
    const startIndex = (page - 1) * 6;
    article.count(condition,function (err, count) {
        const query = article.find(condition);
        query.limit(6).skip(startIndex).sort({'time':-1}).exec(function (err, result) {
            res.status(200).json({results: result, total: Math.ceil(count / 6)})
        })
    })
});
//登录
router.post("/api/login", function (req, res) {
    const body = req.body;
    user.find({username: body.username, password: body.password}, function (err, result) {
        if (result.length === 1) {
            req.session.username = result[0].username
            res.cookie('username', result[0].username, { maxAge: 60*60*1000*2, httpOnly: false })
            res.status(200).json({code: 0, msg: "登录成功", username: result[0].username});
        }
        else {
            res.status(200).json({code: 1, msg: "登录失败"})
        }
    })
})
//退出
router.get("/api/logout",function (req, res) {
    delete req.session.username
    res.clearCookie('username', { path: "/" });
    res.redirect('/')
})
//根据id返回文章详情
router.get('/api/detail', function (req, res) {
    const articleId = req.query.id;
    article.find({articleId: articleId}, function (err, result) {
        if (err) throw err
        article.update({articleId:articleId},{$inc:{visitors:1}},function (err) {
            if(err){
                throw err
            }
            res.status(200).json(result)
        })
    })
})
//返回验证码
router.get("/api/captcha", function (req, res) {
    const captcha = parseInt(Math.random() * 9000 + 1000)
    const p = new captchapng(80, 30, captcha) // width,height,numeric captcha
    p.color(0, 0, 0, 0)  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255) // Second color: paint (red, green, blue, alpha)

    const img = p.getBase64()
    const imgbase64 = new Buffer(img, 'base64')
    req.session.captcha = captcha
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64)
})
//检验用户输入验证码是否正确
router.get("/api/checkCaptcha", function (req, res) {
    const isRight = parseInt(req.query.captcha) === req.session.captcha
    res.status(200).json({isRight: isRight})
})
//用户注册
router.post("/api/register",function (req, res) {
    const userInfo = req.body
    user.create(userInfo,function (err, result) {
        if(err){
            res.status(200).json({code:1,msg:"注册失败"})
            throw err
        }
        if(result){
            res.status(200).json({code:0,msg:"注册成功",result:result})
        }
    })
})
//保存文章
router.post('/api/storeArticle',function (req, res) {
    if(!req.session.username){
        res.status(200).json({code:1,msg:'登陆后才能发布文章'})
    }else{
        const body = req.body
        body.user = req.session.username
        body.time = Date.now()
        body.like = 0
        body.visitors = 0
        body.articleId = Math.ceil(Math.random()*1000000)
        article.create(body,function (err, result) {
            if(err){
                // console.log("添加数据失败")
                res.status(200).json({code:1,msg:'文章发布成功'})
                throw err
            }
            // console.log("添加数据成功",result)
            res.status(200).json({code:0,msg:'文章发布成功'})
        })
    }
})
//点赞
router.get('/api/addLike',function (req, res) {
    if(req.session["id"+req.query.articleId]){
        res.status(200).json({code:1,msg:"您已赞过该文章"});
        return ;
    }
    article.update({articleId:req.query.articleId},{$inc:{like:1}},function (err) {
        if(err){
            throw err
        }
        req.session["id"+req.query.articleId] = true
        res.status(200).json({code:0,msg:"点赞成功"})
    })

})


module.exports = router;