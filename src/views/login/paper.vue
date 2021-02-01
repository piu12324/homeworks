<template>
   <div class="paper-view">
       <el-container class="container">
           <el-aside style="width: 80px" class="aside">
<div class="head"> <img  :src="'http://192.168.3.13:8083/image/'+$route.query.path" alt=""    /></div>
               <div class="name">{{$route.query.name}}</div>
               <div class="job">{{$route.query.job}} </div>
               <el-button type="text"  class="toback" icon="el-icon-school" @click="$router.go(-1)">课程班级</el-button>
           </el-aside>
           <el-main><div class="header"><span>试卷库</span><el-button type="text"  style="margin-left: 30px" icon="el-icon-plus">新建试卷</el-button></div>
               <div class="main">

                   <div class="describe">
             <el-table :data="paperlist" height="250"  border style="width: 100%">
                 <el-table-column prop="pid"  label="试卷id" width="180" v-if="false"></el-table-column>
                 <el-table-column prop="title"  width="430" label="试卷名"  class="paper-name"></el-table-column>
                 <el-table-column prop="date"  width="430" label="修改时间"></el-table-column>
                 <el-table-column width="490" label="操作"> <template slot-scope="scope">
                     <el-button type="text" @click="editpaper(scope.row.pid)">编辑</el-button>
                     <el-button type="text" >发布</el-button><el-button type="text"  @click="delpaper(scope.row.pid)">删除</el-button></template></el-table-column>
             </el-table>
                   </div>

               </div></el-main>

       </el-container>


    </div>
</template>

<script>

    import {request} from "../../network/request";

    import PaperItem from "../../components/PaperItem";
    export default {
        name: "paper",
        components: {PaperItem},
        data() {
           return {
               paperlist: [],

           }
        },
        methods: {
            delpaper(a) {

            },
            editpaper(a) {
                this.$router.push('/editpage/'+a)
                this.iseditpaper = true
                console.log(a)
            }
        },

        created() {
            request({
                url: '/selectpaper',
                params: {id: this.$route.query.id}
            }).then(res => {
                this.paperlist = res.data
                console.log( this.paperlist)
            })
        }

    }
</script>

<style scoped>
.paper-view{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
}
.container{
    width: 100%;
    height: 100%;
}
    .aside{
        height: 100%;
        background-color: #31364d;
    }
.aside > .head{
    text-align: center;
    margin-top: 15px;
    width: 100%;
}

.aside img{
    border-radius: 50%;
    width: 40px;
    height: 40px;
}
    .name{

        text-align: center;
        line-height: 30px;
        border: #31364d solid 1px;
        background-color: white;
    }
    .job{
       background-color: #cccccc;margin-top: 5px;text-align: center;
    }
    .toback{
        display: block;
        width: 100%;
        background-color: white;
        margin-top: 16px;
    }
    .header{
        width: 100%;background-color: #ffffff;height: 40px;line-height: 35px;color: #417dff;font-size: 16px;
    }
    .header > span{
        border-bottom: 2px solid #417dff;display: inline-block;margin-left: 20px;

    }
    .main{
        margin: 20px 20px 0 20px;
        background-color: #ffffff;
        width: 1350px;
        height: 670px;
    }
    .describe{
        background-color: #f5f5f5;
        height: 20px;
        margin-top: 10px;
    }
.paper-name::before{
    position: absolute;
    left: -23px;
    top: 5px;
    content: '';
    width: 20px;
    height: 20px;
    background: url("../../assets/img/paper.svg")0 0/22px 22px;
}
</style>