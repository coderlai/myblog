<template>      
    <form action="#" method="post">
        <div class="row">
            <div class="col-sm-10">
                <div class="input-group my-input-group">
                    <input type="text" name="wd" class="form-control" placeholder="搜索">
                    <span class="input-group-addon my-addon search"><i class="glyphicon glyphicon-search"></i>搜索</span>
                </div>
            </div>
            <div class="col-sm-2">
                <button class="btn btn-success">
                    <i class="glyphicon glyphicon-edit"></i>
                    <router-link to="/post">发布文章</router-link>
                </button>
            </div>
        </div>
    </form>
</template>
<script>
    export default {}
</script>

<style scoped>
    .my-addon{
        background-color:#fff;
        border-radius: 0;
    }
    .my-addon:hover{
        background-color:#eee;
        cursor: pointer;
    }
    .my-input-group>input{
        border-radius: 0!important;
    }
    .btn-success{
        border-radius: 0;
    }
    a{
        color:#fff;
    }
</style>