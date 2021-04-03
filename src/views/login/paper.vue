<template>

   <div class="paper-view">
       <el-dialog
               :visible.sync="dialogVisible"
               width="30%">
           <span style="font-weight: bold;font-size: 17px">试卷名称:</span>&nbsp;&nbsp;<span style="color: orange">必填:</span>
           <el-input type="text"  v-model.lazy="paperName" :minlength="3" :maxlength="20" show-word-limit @input="limit"/>
           <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addpaper"  :disabled="disable"	>确 定</el-button>
  </span>

       </el-dialog>
       <el-container class="container">
           <el-aside style="width: 80px" class="aside">
<div class="head"> <img  :src="'http://192.168.3.13:8083/image/'+$route.query.path" alt=""    /></div>
               <div class="name">{{$route.query.name}}</div>
               <div class="job">{{$route.query.job}} </div>
               <el-button type="text"  class="toback" icon="el-icon-school" @click="$router.push('/TeacherView/'+$store.state.username)">课程班级</el-button>
           </el-aside>
           <el-main><div class="header"><span>试卷库</span><el-button type="text"  style="margin-left: 30px" icon="el-icon-plus" @click="dialogVisible = true">新建试卷</el-button></div>
               <div class="main">

                   <div class="describe">
             <el-table :data="paperlist"   border style="width: 100%">
                 <el-table-column prop="pid"  label="试卷id" width="180" v-if="false"></el-table-column>
                 <el-table-column prop="title"  width="430" label="试卷名"  class="paper-name"></el-table-column>
                 <el-table-column prop="date"  width="430" label="修改时间"></el-table-column>
                 <el-table-column width="490" label="操作"> <template slot-scope="scope">
                     <el-button type="text" @click="editpaper(scope.row.pid,scope.row.title)">编辑</el-button>
                     <el-button type="text" @click="publish(scope.row.pid)" >发布</el-button><el-button type="text"  @click="delpaper(scope.row.pid)">删除</el-button></template></el-table-column>
             </el-table>
                   </div>

               </div></el-main>

       </el-container>
     <el-dialog
     :visible.sync="visible"
     width="50%"
     :before-close="beforeclose"

     >
         <div style="margin-left: 260px;margin-bottom: 50px">
             <el-date-picker
                     v-model="time"
                     type="datetime"
                     placeholder="选择日期时间"
                     value-format="yyyy-MM-dd HH:mm:ss"
                     :default-value="new Date()"
             >
             </el-date-picker>
         </div>
         <el-transfer

                 v-model="chosen"
                 style="margin-left: 50px"
                 :data="classList"
         >
         </el-transfer>

         <el-button type="primary" @click="publish1" style="margin: 20px 45%">发布</el-button>
     </el-dialog>

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


               time: '',
               chosen: [],
               count: this.$store.state.username,
               visible: false,
               paperlist: [],
               dialogVisible: false,
               paperName: '',
               disable: true,
               data: [],
            classList: [],
               currentpid: ''

           }
        },
        methods: {
            publish1() {


              if(this.chosen.length === 0){
                  this.$message.error('请选择一个班级');

              }
              else if(this.time === ''){
                  this.$message.error('请选择截止时间');
              }

              else{

                  request({
                      url: "publishpaper",
                      data: {
                          pid: this.currentpid,
                          classid: this.chosen,
                          tid: Number(this.$store.state.id),
                          deadline: this.time
                      }
                  }).then(()=>{
                      this.chosen = []
                      this.visible = false
                      this.classList = []
                      this.time = ''
                  }).catch(()=>{
                      this.chosen = []
                      this.visible = false
                      this.classList = []
                      this.time = ''
                  })
              }



            },
            beforeclose() {
                this.classList = []
                this.chosen = []
                this.visible =  false
            },
            publish(a){
                this.currentpid = a
                request({
                    url: '/selectClass',
                    params: {
                        id:  this.count
                    }

                }).then(res => {
                    this.data = res.data

                    console.log(res.data)
                    console.log(this.data)
                    for(let item of this.data){
                        this.classList.push({
                            key: item.cid,
                            label: item.classname

                        })
                        this.visible = true


                    }

                })


            },
            limit() {
                if(this.paperName.length < 3) {
                    this.disable = true
                }
                else {
                    this.disable = false
                }},
            addpaper() {
                this.dialogVisible = false

                request({
                    url: "addpaper",
                    data: {
                        teacherid: this.$store.state.id,
                        title: this.paperName

                    }
                }).then(()=>{
                    request({
                        url: '/selectpaper',
                        params: {id: this.$store.state.id}
                    }).then(res => {
                        this.paperName = ''
                        this.paperlist = res.data

                    })
                })

            },

            delpaper(a) {
                this.$confirm("确认删除该题目吗?", '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    request({
                      url:  "delpaper",
                        params: {
                            id: a
                        }
                    }).then(()=>{
                        let i = 0
                        for(let item of this.paperlist){
                            if(a === item.pid){
                                break;
                            }
                            i++
                        }
                        this.paperlist.splice(i,1)

                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    })
                })
            },
            editpaper(a,b) {
                this.$router.push('/editpage/'+a+'/'+b)
                this.iseditpaper = true
                console.log(a)
            }
        },

        created() {
            request({
                url: '/selectpaper',
                params: {id: this.$store.state.id}
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