<template>
    <div class="post-list-container">
        <searchComponent></searchComponent>
        <div class="row">
            <!--文章列表容器-->
            <div class="col-sm-12 list-container" v-show="articleList.length ===0">
               <h2 class="text-center">暂无数据...</h2>
            </div>
            <div class="col-sm-12 list-container" v-show="articleList.length !==0">
                <div class="post-item-container" v-for="item in articleList">
                    <h4><router-link :to="'/main/detail/'+item.articleId">{{item.title}}</router-link> <img :src="'/img/'+item.type+'.png'" height="24" width="24" class="pull-right"></h4>
                    <p class="text-danger">
                        {{item.user}}&nbsp;&nbsp;&nbsp;&nbsp; {{item.time|formatDate("M")}}&nbsp;&nbsp;&nbsp;&nbsp;             
                        <i class="glyphicon glyphicon-eye-open"></i>&nbsp;{{item.visitors}}&nbsp;&nbsp;&nbsp;&nbsp;
                        <i class="glyphicon glyphicon-thumbs-up"></i>&nbsp;{{item.like}}         
                    </p>     
                </div>
            </div>
            <!--分页栏-->
            <ul class="pagination pagination-sm" v-show="articleList.length !== 0">
                <li class="pagination-first page-item"><a @click="getPage(currentPage=1)" href="javascript:">首页</a></li>
                <li class="pagination-prev page-item"><a  @click="getPage(--currentPage)" href="javascript:">上一页</a></li>
                <!--显示当前页码-->
                <li class="pagination-page page-item"><a  href="javascript:;" class="current-page">{{currentPage}}/{{totalPage}}</a></li>
                <li class="pagination-next page-item"><a  @click="getPage(++currentPage)" href="javascript:">下一页</a></li>
                <li class="pagination-last page-item"><a  @click="getPage(currentPage=totalPage)" href="javascript:">尾页</a></li>
            </ul>
        </div>
    </div>
</template>
<script>
    import searchComponent from "./search.vue";
    export default {
        data(){
           return {
               currentPage:1,
               totalPage:1,
               articleList:[],
               type:''
           }
        },
        methods:{
            getPage:function(pageNum){
                if(pageNum<1){
                    this.currentPage = 1;
                    this.$store.commit("toggleModal",{show:true,msg:"当前已是第一页"})
                    return
                }
                if(pageNum>this.totalPage){
                    this.currentPage = this.totalPage;
                    this.$store.commit("toggleModal",{show:true,msg:"当前已是最后一页"})
                    return
                }
                this.$http.get('/api/getpage?page='+pageNum+'&type='+this.type).then(response=>{
                    this.articleList = response.body.results;
                    this.totalPage = response.body.total;
                })
            },
            changeRoute:function () {
                this.type = this.$route.params.type
                this.currentPage = 1
                this.totalPage = 1
                this.articleList = []
                this.getPage(1)
            }
        },
        watch:{
            '$route':['changeRoute']
        },
        created:function(){
            this.type = this.$route.params.type
            this.getPage(1)
        },
        components:{searchComponent}
    }
</script>