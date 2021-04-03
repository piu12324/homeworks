<template>
    <div class="judgement-item">


        <div class="choice-head">  <span>{{start+index+1+'.   '}}{{judgement.title}}</span> <el-button type="text" icon="el-icon-delete" @click="del" class="del"></el-button> <el-button type="text" icon="el-icon-edit" class="edit"></el-button> </div>
      <div style="margin-top: 30px"><span class="el-icon-check right" :style="judgeanswer" style="margin-left: 10px" ></span><span class="el-icon-close wrong" :style="judgeanswer2"></span></div>
        <div class="score">分值:{{judgement.score}}</div>
    </div>
</template>

<script>
    import {request} from "../network/request";

    export default {
        name: "judgement",
        props:{
            judgement: {},index: Number,start: Number
        },
        methods: {
            del() {

                this.$confirm("确认删除该题目吗?", '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    if(this.judgement.jid === 0) {
                        this.$emit("delJud1",this.index)
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }
                    else {   request({
                        url: 'deltopic',
                        params: {
                            type: "jud",
                            id: this.judgement.jid
                        }
                    }).then((res)=>{

                        this.$emit("delJud",this.judgement.jid)
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });

                    })}

                })



            }
        },

        computed: {
            judgeanswer() {
                //#5cc0ff
             if(this.judgement.answer === 1){
                 return 'background-color: #5cc0ff'
             }
            },
            judgeanswer2(){
                if(this.judgement.answer === 0){
                    return 'background-color: #5cc0ff'
                }
            }
        }
    }
</script>

<style scoped>
.judgement-item{
    border: #f5f5f5 solid 2px;
    font-size: 20px;
    margin-bottom:20px;
    position: relative;

}
    .right{
        display: inline-block;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        line-height: 30px;
        text-align: center;
    }
    .wrong{
        display: inline-block;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        text-align: center;
        line-height: 30px;
    }
    .score{
        position: absolute;
        right: 10px;
        bottom: 0px;
        font-size: 15px;
    }
.choice-head{
    position: relative;
    height: 20px;
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
</style>