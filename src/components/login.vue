<template>
    <div class="col-sm-12 login-form">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h2 class="panel-title">用户登录</h2>
            </div>
            <div class="panel-body">
                <form action="/api/login" method="post" class="form-horizontal">
                    <div class="form-group">
                        <label class="control-label col-sm-2">用户名</label>
                        <div class="col-sm-10">
                            <input type="text" v-model="username" name="username" class="form-control"
                                   placeholder="请输入用户名...">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2">密&nbsp;&nbsp;&nbsp;&nbsp;码</label>
                        <div class="col-sm-10">
                            <input type="password" v-model="password" name="password" class="form-control"
                                   placeholder="请输入密码...">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-10 col-sm-offset-2">
                            <div class="checkbox">
                                <label>
                                    <input name="isRemember" type="checkbox">记住密码
								</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-10 col-sm-offset-2">
                            <button id="submit" @click.prevent="login()" class="btn btn-success" type="submit">登录</button>
                            <button class="btn btn-danger">忘记密码？</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                username: "",
                password: ""
            }
        },
        methods: {
            login: function () {
                this.$http.post('/api/login',
                    {username: this.username, password: this.password},
                    {emulateJSON: true}).then(response => {
                    this.$store.commit("toggleModal",{show:true,msg:response.body.msg})
                    if (response.body.code === 0) {
                        const data = {isLogin:true,username:response.body.username};
                        this.$store.commit("changeLogin",data);
                        this.$router.push('/main');
                    }
                })
            }
        }
    }
</script>
	