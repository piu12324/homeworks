<template>
    <div>
<!--        <el-popover popper-class="popper-edit" :popper-options="{boundariesElement: 'viewport'}"-->

<!--                trigger="click" ref="edit">-->
<!--<hello/>-->
<!--        </el-popover>-->
        <el-dialog
                :visible.sync="dialogManage"
                width="40%"
                :before-close="beforeClose"

        >


            <el-table
                    :data="student"
                    height="400px"
                    border
                    style="width: 100%">
                <el-table-column v-if="false"
                        prop="id"
                        label="学号" width="0%"
                ></el-table-column>
                <el-table-column
                        prop="snum"
                        label="学号" width="180"
                >
                </el-table-column>
                <el-table-column
                        prop="sname"
                        label="姓名"
                        width="100">
                </el-table-column>

                <el-table-column
                        prop="age"
                        label="年龄"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="gender"
                        label="性别"
                        width="80" :formatter="formatter">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="134">
                    <template slot-scope="scope"><el-button type="danger" style="margin-left: 15px" @click="delstu(scope.row.id)">踢出</el-button></template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog
                :visible.sync="dialogVisible"
                width="30%"
               >
           <span style="font-weight: bold;font-size: 17px">班级名称:</span>&nbsp;&nbsp;<span style="color: orange">必填:</span>
            <el-input type="text" v-model.lazy="editName" :minlength="3" :maxlength="20" show-word-limit @input="limit"/>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editclick(clas.cid)"  :disabled="disable"	>确 定</el-button>
  </span>
        </el-dialog>

        <div :class="random()" class="move">
            <div class="class-id">{{classMsg}}</div>
            <div class="class-name">{{clas.classname}}</div>


            <el-popover
                    width="150px"
                    placement="right"
                    trigger="click" :visible-arrow="false"
            >
                <el-row><el-col :span="12" :offset="6"><el-button plain type="primary" @click="manageStudent(clas.cid)">管理</el-button></el-col></el-row>
        <el-row><el-col :span="12" :offset="6"><el-button plain type="primary" @click="dialogVisible = true">编辑</el-button></el-col></el-row>
                <el-row> <el-col :span="12" :offset="6"> <el-button plain type="primary" @click="del(clas.cid)" >删除</el-button></el-col>  </el-row>

                <el-button type="text" icon="el-icon-more-outline" class="ellipsis" slot="reference"></el-button></el-popover>
<!--    <img src="../assets/img/ellipsis.svg" alt="">-->
            <div  class="class-num">  <div class="people"><span>{{clas.num}}</span></div></div>

        </div>
    </div>
</template>

<script>
    import hello from "../views/login/hello";
    import {request} from "../network/request";

    export default {
        name: "ClassItem",
        props: {
            clas: {
                default: {},
                type: Object
            }

        },
        computed: {
            classMsg() {
                //return "课程号:"+this.clas.cid+'\xa0\xa0\xa0\xa0'+this.clas.classname
                return "课程号:"+this.clas.cid
            }
        },
        methods: {
            formatter(row,col) {

                if(row.gender === 1){
                    return '男'
                }
                else if(row.gender === 0){
                    return '女'
                }
                else return ''
            },
            beforeClose() {
                this.$emit("reload")
                this.dialogManage = false
            },
            delstu(a){
                request({
                    url: '/delcstudent',
                    params: {
                        cid: this.clas.cid,
                        sid: a
                    }
                }).then(res => {
                   this.student = res.data

                })

                console.log(a)
            },

            manageStudent(a) {
                request({
                    url: '/selectClassStu',
                    params: {
                        id: a
                    }
                }).then(res => {
                    this.student = res.data

                })
                this.dialogManage = true
            },
            limit() {
                console.log(this.editName.length)
                if(this.editName.length < 3){
                    this.disable = true
                }
                else {
                    this.disable = false
                }
            },
            editclick(a) {
                request({
                    url: '/updateClass',
                    params: {
                        className: this.editName,
                        id: a
                    }
                }).then(res => {
                    if(res.data === 1) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        })
                    }
                })
                this.dialogVisible = false
                this.$emit("reload")

            },
            random() {
                let a = ["class-item-one","class-item-two","class-item-three","class-item-four","class-item-one"]
               return a[Math.ceil(Math.random()*4)]
            },
            edit() {
            },

            del(a) {
                this.$confirm('该操作将清空该班级所有教学数据，确定删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    request({
                        url: '/delClass',
                        params: {
                            id: a
                        }
                    }).then(res => {
                        if(res.data === 1) {
                            this.$message({
                                message: '删除课程成功',
                                type: 'success'
                            });
                            this.$emit("reload")

                        }
                    })

                    });


            }

        },
        data() {
            return {
                dialogVisible: false,
                editName: '',
                disable: true,
                dialogManage: false,
                student: []

            }
        },
        created() {
            console.log("组件创建了")
        },
        components: {hello}
    }
</script>

<style scoped>
    .move:hover{
    transform: translate(0,-3px);
    }
    .class-item-one{
        height: 140px;
        width: 325px;
        background-image: linear-gradient(to bottom right,#4867f4,#5cc0ff);
        border-radius: 10px;
        position: relative;
        color: aliceblue;

    }
    .class-item-two{
        height: 140px;
        width: 325px;
        background-image: linear-gradient(to bottom right,#8561fb,#cb8dff);
        border-radius: 10px;
        position: relative;
        color: aliceblue;

    }
    .class-item-three{
        height: 140px;
        width: 325px;
        background-image: linear-gradient(to bottom right,#ff6297,#ffa86b);
        border-radius: 10px;
        position: relative;
        color: aliceblue;

    }
    .class-item-four{
        height: 140px;
        width: 325px;
        background-image: linear-gradient(to bottom right, #1fbdb7,#46e794);
        border-radius: 10px;
        position: relative;
        color: aliceblue;

    }
    .class-num{

    }

    /*.class-item > img{*/
    /*    position: absolute;*/
    /*    right: 5px;*/
    /*    top: 2px;*/
    /*    width: 27px;*/
    /*    height: 27px;*/
    /*}*/
    .ellipsis{
        width: 40px;
        height: 40px;
        position: absolute;
        right: 3px;
        top: 0px;
        color: white;
    }
    .class-id{
        font-size: 13px;
        position: absolute;
        top: 8px;
        left: 8px;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 331px;
    }
    .class-name{
        position: absolute;
        top: 33px;
        left: 8px;
    }
.class-num{
    position: absolute;
    bottom: 4px;
    left: 4px;
}
    .people{
        position: relative;
        font-size: 17px;

    }
    .people > span{
        display: inline-block;
        margin-left: 31px;
        margin-bottom: 10px;
    }
    .people::before{
        position: absolute;
        content: '';
        left: 5px;
        top: -1px;
        width: 22px;
        height: 22px;
        background: url("../assets/img/people.svg")0 0/22px 22px;
    }

</style>
