<template>
    <div class="view">
        <el-dialog
                :visible.sync="dialogVisible"
                width="30%">
            <span style="font-weight: bold;font-size: 17px">班级名称:</span>&nbsp;&nbsp;<span style="color: orange">必填:</span>
            <el-input type="text"  v-model.lazy="className" :minlength="3" :maxlength="20" show-word-limit @input="limit"/>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="newClass()"  :disabled="disable"	>确 定</el-button>
  </span>
        </el-dialog>
        <div class="changehead" :style="{display: isshow}" @mouseenter="btnclick"  @mouseleave="btnleave" >
            <el-upload :on-success="success"

                    :action="'http://192.168.3.13:8083/teacher/fileUpload?username='+count" name="file"
                    :limit="1" accept=".jpg,.jpeg,.png,.JPG,.JPEG" style="display: none" >

             <input type="button" ref="btnfile"/>
            </el-upload>
            <img  :src="'http://192.168.3.13:8083/image/'+teacher.path" alt=""  @click="changehead"  />
            点击更换头像
        </div>
 <el-container class="container">

     <el-aside width="80px" class="aside" >
         <el-row class="head">
             <el-col :span="12" :offset="6"><img @mouseenter="enter"  @mouseleave="leave" :src="'http://192.168.3.13:8083/image/'+teacher.path" alt=""></el-col>
         </el-row>
         <el-row  class="name">  <el-col :span="24" ><div>{{teacher.tname}}</div></el-col></el-row>
         <el-row style="background-color: #cccccc;margin-top: 5px;text-align: center">  <el-col :span="12" :offset="6"><div>{{teacher.job}}</div></el-col></el-row>
         <el-row><el-col :span="24" ><el-button type="text" class="topaper" icon="el-icon-document-copy" @click="$router.push({path: '/paper',query: {path: teacher.path,name: teacher.tname,job: teacher.job,id: teacher.tid}})">试卷库</el-button></el-col></el-row>
     </el-aside>
     <div>
     <el-container class="main">

         <el-header class="header" height="60px" style="border-bottom: 3px #b8b9b8 solid;width:1450px">
             <el-row>
                <el-col :span="2" ><div style="border-bottom: #417dff solid 3px;color: #417dff;width: 75px">我教的课</div></el-col>
                 <el-col :span="4" :offset="18"><div ><el-button  class="newclass" type="text" icon="el-icon-plus"@click="dialogVisible = true">创建课程</el-button></div></el-col>
             </el-row>
         </el-header>
     <div>
         <div class="class-item clearfix">
         <class-item v-for="(item,index) in classList" :key="index" :clas="item" @reload="reload"></class-item>
         </div>
     </div>
     </el-container>
     </div>
 </el-container>
    </div>
</template>

<script>
    import classItem from "../../components/ClassItem"
    import {request} from "../../network/request";

    let a = ''
    export default {
        name: "hello",
        data() {
            return {
                count: this.$store.state.username,
                formdata: '',
                checkList: [],
                teacher: {},
                classList: [],
                isshow: 'none',
               a: false,
                dialogVisible: false,
                className: '',
                disable: true,



            }
        },
        components: {
            classItem
        },
        methods: {
            limit() {
                if(this.className.length < 3) {
                    this.disable = true
                }
                else {
                    this.disable = false
                }
            },
            newClass() {
                this.dialogVisible = false
                request({
                    url: '/newClass',
                    params: {
                        className: this.className,
                        id: this.teacher.tid

                    }
                }).then(res => {
                    if(res.data === 1) {
                        this.$message({
                            message: "创建课程成功",
                            type: 'success'
                        })
                        this.reload()
                    }
                })

            },
            success(res) {
                this.teacher.path = res
                this.$message({
                    message: '更换头像成功',
                    type: 'success'
                });
            },
            enter() {
                console.log("111")
                this.isshow = 'block'

            },
            leave() {
                a = setTimeout(() =>{
                    this.isshow = 'none'
                },1500)


            },
            btnleave() {

                a =  setTimeout(() =>{
                    this.isshow = 'none'
                },1500)

            },
            btnclick() {
                clearTimeout(a)
            },
            changehead() {
                this.$refs.btnfile.click()

            },

            reload() {
                request({
                    url: '/selectClass',
                    params: {
                        id:  this.count
                    }

                }).then(res => {
                    this.classList = res.data
                    console.log(this.classList)
                })
            }


        },
        created() {
            request({
                url: '/selectTeacher',
                params: {
                   count:  this.count
                }
            }).then(res => {
                // console.log(res.data)
                console.log(res.data)
           this.teacher = res.data
                console.log(this.teacher)
                console.log(this.teacher.path)
                console.log(this.teacher['id'])
            })
//             console.log(this.teacher)
// console.log(this.teacher.id)
            request({
                url: '/selectClass',
                params: {
                    id:  this.count
                }

            }).then(res => {
                this.classList = res.data
                console.log(this.classList)
            })

        }


    }
</script>

<style scoped>


    .view{
        width: 100%;
        height: 100%;
    }
    .view > .changehead{
        border-radius: 5px;
        height: 80px;
        width: 100px;
        background-color: #31364d;
        position: absolute;
        left: 70px;
        top: 10px;
        font-size: 11px;
        text-align: center;
        z-index: 9;
        color: white;


    }
    .view > div img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #ff8198;
        margin: 10px 25px;
        display: block;
    }

    .container{
        width: 100%;
        height: 100%;
    }
    .aside{
        background-color: #31364d;


    }
    .head{
        margin-top: 15px;
    }
    .head img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #ff8198;
    }
    .name{
        background-color: white;
        text-align: center;
        height: 30px;
        line-height: 30px;
        border: #31364d solid 1px;
    }

    .main{
        height: 100%;
        width: 100%;
    }

    .header div{
       height: 40px;
        line-height: 49px;
    }
    .newclass{
        color: #b8b9b8;
    }
    .newclass:hover{
        color: #417dff;
    }
    .head img:hover{

    }.class-item{


         }

     .class-item > div{
         float: left;
         margin: 15px 15px;

     }
     .topaper{
         display: block;
         width: 100%;
         background-color: white;
         margin-top: 16px;
     }
    .clearfix:before,
    .clearfix:after {
        content: "";
        display: table;
    }
    .clearfix:after {
        clear: both;
    }
    /* ie6 7 专门清除浮动的样式*/
    .clearfix {
        *zoom:1;
    }

    /*.profile{*/
    /*    height: 100%;*/
    /*    width: 80px;*/
    /*    background-color: #31364d;*/
    /*    position: relative;*/
    /*    display: flex;*/
    /*    flex-direction: column;*/
    /*    flex-wrap: wrap;*/
    /*    text-align: center;*/
    /*}*/
    /*.head{*/
    /*  width: 40px;*/
    /*   height: 40px;*/
    /*    background-color: #417dff;*/
    /*    left: 0;*/
    /*    top: 10px;*/

    /*    border-radius: 50%;*/
    /*    position: absolute;*/
    /*    left: 50%;*/
    /*    margin-left: -20px;*/
    /*}*/
    /*.name{*/
    /*    height: 20px;*/
    /*    line-height: 20px;*/
    /*    width: 100%;*/
    /*    background-color: white;*/
    /*    position: absolute;*/
    /*    left: 0;*/
    /*    top: 70px;*/
    /*}*/
    /*.asd{*/
    /*    margin: 100px auto;*/
    /*     }*/

</style>