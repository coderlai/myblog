<template>
    <div class="col-sm-12 register-form">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h2 class="panel-title">用户注册</h2>
            </div>
            <div class="panel-body">
                <form action="./api/register.php" method="post" class="form-horizontal">
                    <div class="form-group">
                        <label class="control-label col-sm-3">用户名</label>
                        <div class="col-sm-9">
                            <input type="text" v-model="username" class="form-control" placeholder="用户名4到32个字符">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3">昵&nbsp;&nbsp;&nbsp;&nbsp;称</label>
                        <div class="col-sm-9">
                            <input type="text" v-model="nickName" name="nickName" class="form-control" placeholder="昵称2到32个字符">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3">常用邮箱</label>
                        <div class="col-sm-9">
                            <input type="text" v-model="email" name="email" class="form-control" placeholder="输入常用邮箱，验证后才能登陆">
                        </div>
                        <div class="col-sm-10 col-sm-offset-2">
                            <p class="text-danger">【如果您未在收件箱收到验证邮件，请到垃圾箱查收。】</p>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3">密码</label>
                        <div class="col-sm-9">
                            <input type="password" v-model="pass" name="pass" class="form-control" placeholder="密码至少8位">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3">重复密码</label>
                        <div class="col-sm-9">
                            <input type="password" v-model="repass" name="repass" class="form-control" placeholder="重复密码，两次输入必须一致">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-3">验证码</label>
                        <div class="col-sm-3">
                            <input type="text" @focus="isShow = true" @blur="isShow=false" v-model="captcha"
                                   @input="checkCaptcha()" name="captcha"
                                   class="form-control" placeholder="验证码">
                        </div>
                        <div class="col-sm-1">
                            <!--输入验证码时的提示信息-->
                            <span v-show="isShow" :style="styleObj">{{info}}</span>
                        </div>
                        <div class="col-sm-2">
                            <img id="captcha" :src="src" alt="验证码">
                        </div>
                        <div class="col-sm-1">
                            <button id="reGet" @click.prevent="getCaptcha()" class="btn btn-primary">换一张</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-9 col-sm-offset-3">
                            <button @click.prevent="register()" class="btn btn-success" :disabled="!isRight">注册</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                isShow: false,
                src: "/api/captcha",
                captcha: '',
                isRight: false,
                timer: null,
                username:'',
                nickName:'',
                pass:'',
                repass:'',
                email:''
            }
        },
        methods: {
            getCaptcha: function () {
                this.src = "/api/captcha?random=" + Math.random();
            },
            checkCaptcha: function (captcha) {
                const _this = this;
                if (_this.timer) clearTimeout(_this.timer);
                _this.timer = setTimeout(function () {
                    _this.$http.get("/api/checkCaptcha?captcha=" + _this.captcha).then((response)=>{
                        _this.isRight = response.body.isRight;
                        _this.enable = response.body.isRight;
                    })
                }, 500)
            },
            register:function () {
                if(this.pass != this.repass){
                    this.enable = false;
                    alert("两次密码输入不一致");
                    return false;
                }
                const user = {username:this.username,nickName:this.nickName,email:this.email,password:this.pass}
                this.$http.post("/api/register",user,{emulateJSON:true}).then((response)=>{
                    alert(response.body.msg);
                    console.log(response.body);
                    if(response.body.code === 0){
                        this.$router.push('/login');
                    }
                })
            }
        },
        computed: {
            info: function () {
                return this.isRight ? '√' : '×';
            },
            styleObj: function () {
                return {'color': this.isRight ? 'green' : 'red', 'font-size': '20px'}
            }
        }
    }
</script>
