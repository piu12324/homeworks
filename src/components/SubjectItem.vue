<template>
    <div class="subject-item">
        <div class="choice-head">  <span>{{start+index+1+'.   '}}{{subjectItem.title}}</span> <el-button type="text" icon="el-icon-delete" @click="del" class="del"></el-button> <el-button type="text" icon="el-icon-edit" class="edit"></el-button>

            <div v-if="subjectItem.type === 1"  class="answer">
               答案: {{subjectItem.answer}}
            </div>
            <div v-else class="answer">
               关键字: {{subjectItem.keyword}}
            </div>

            <span class="score">分值:{{subjectItem.score}}</span>
        </div>



    </div>
</template>

<script>
    import {request} from "../network/request";

    export default {
        name: "SubjectItem",
        methods:{
        del() {

            this.$confirm("确认删除该题目吗?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                if(this.subjectItem.id === 0) {
                    this.$emit("delSub1",this.index)
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                }
                else{
                    request({
                        url: 'deltopic',
                        params: {
                            type: "subject",
                            id: this.subjectItem.id
                        }
                    }).then((res)=>{

                        this.$emit("delSub",this.subjectItem.id)
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });

                    })
                }
            })
        }
    },
        props:{
            index: Number,
            start: Number,
            subjectItem: Object

        }
    }
</script>

<style scoped>

    .subject-item{
        border: #f5f5f5 solid 3px;
        font-size: 20px;
        margin-bottom:20px;
        position: relative;
    }
    .choice-head{
        position: relative;
        height: 20px;
        padding-bottom: 50px;
    }
    .del{
        position: absolute;
        top: 0;
        right: 10px;
    }
    .edit{
        position: absolute;
        top: 0;
        right: 30px;
    }

    .score{
        position: absolute;
        right: 10px;
        bottom: 0px;
        font-size: 15px;
    }
    .answer{
        font-size: 17px;
        margin-top: 18px;
    }
</style>