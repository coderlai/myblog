<template>
<div>
    <div class="post-list-container">
        <div class="row">
            <div class="col-sm-12 list-container">
                <h3 class="page-header text-center">{{title}}</h3>
                <!--文章详情-->
                <div class="article-info">
                    <ul class="text-muted clearfix">
                        <li class="pull-left">发布时间：{{time | formatDate("M")}}</li>
                        <li class="pull-left">作者：{{user}}</li>
                        <li class="pull-left">浏览次数：{{visitors}}</li>
                    </ul>
                </div>
                <!--文章内容-->
                <div class="article-content lead" v-html="content" style="font-size:15px;"></div>
            </div>
        </div>
    </div>
    <div class="row" style="margin: 0px;">
        <div class="pull-left" v-show="url"><span><strong>原文URL：</strong>&nbsp;&nbsp;&nbsp;<a :href="url">{{url}}</a></span></div>
        <div class="pull-left" v-show="!url"><strong>原创文章</strong></div>
        <div class="pull-right"><span class="num-zan">{{like}}</span><i @click="addLike" class="fa fa-thumbs-up fa-2x zan animated" :class="{bounceIn:isAdd}"></i></div>
    </div>
</div>

</template>
<script>
    export default{
        data(){
            return {
                title:"",
                content:"",
                time:0,
                url:"",
                user:"",
                like:0,
                visitors:0,
                articleId:'',
                isAdd:false
            }
        },
        methods:{
            addLike:function () {
                this.$http.get("/api/addLike?articleId="+this.articleId+"&random="+Math.random()).then((res)=>{
                    if(res.body.code===0){
                        this.like++
                        this.isAdd = true
                    }
                    this.$store.commit("toggleModal",{show:true,msg:res.body.msg})
                })
            }
        },
        created:function () {
            const params = this.$route.params;
            //console.log(params);
            this.$http.get('/api/detail?id='+params.id).then((response)=>{
                const result = response.body[0];
                //console.log("返回数据",result);
                for(const item in result){
                    this[item] = result[item]
                }
            })
        }
    }
</script>
<style>
/*文章详情页*/
.article-info{
    margin:25px 0;
}
.article-info>ul{
    padding:0;
}
.article-info>ul>li{
    margin:0 15px;
}

/*点赞图标样式*/
.zan{
    color:#34495e;
    cursor:pointer;
}
.num-zan{
    height:28px;
    line-height:28px;
    font-size:20px;
    padding-right:10px;
}
img{
    max-width: 100%;
}
</style>