<template>
    <div>

        <el-row class="paper-item"><el-col :span="4" :offset="2" class="paper-title"> <span class="before-title">{{paper.title}}</span></el-col><el-col :span="4" :offset="4">{{paper.date}}</el-col><el-col :span="4" :offset="4"><el-button type="text">编辑</el-button>
            <el-button type="text">发布</el-button><el-button type="text">删除</el-button></el-col></el-row>
    </div>

</template>

<script>
    export default {
        name: "PaperItem",
        props: {
            paper: {
                type: Object,
                default: {}
            }
        }
    }
</script>

<style scoped>
.paper-item{
    border-bottom: solid 1px #f5f5f5;
    margin-top: 8px;
   line-height: 30px;
}
.paper-title{
    position: relative;
}
    .before-title::before{
        position: absolute;
        left: -23px;
        top: 5px;
        content: '';
        width: 20px;
        height: 20px;
        background: url("../assets/img/paper.svg")0 0/22px 22px;
    }
</style>