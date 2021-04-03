<template>
    <el-container class="main">


        <el-header class="header" height="60px" style="border-bottom: 3px #b8b9b8 solid">
            <el-row>
                <el-col :span="2" ><div style="border-bottom: #417dff solid 3px;color: #417dff;width: 75px">我教的课</div></el-col>
                <el-col :span="4" :offset="18"><div ><el-button  class="newclass" type="text" icon="el-icon-plus"@click="dialogVisible = true">创建课程</el-button></div></el-col>

            </el-row>
        </el-header>
        <div>
            <div class="class-item">
                <class-item v-for="(item,index) in classList" :key="index" :clas="item" @reload="reload"></class-item>
            </div>
</template>

<script>
    export default {
        name: "ClassItem"
    }
</script>

<style scoped>

</style>