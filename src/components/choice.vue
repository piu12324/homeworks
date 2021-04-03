<template>
    <div>
        <div class="choice-item">

  <div class="choice-head"> <span>{{index+1+'.'+' '}}{{choice.title}}</span> <el-button type="text" icon="el-icon-delete" class="del" @click="del"></el-button> <el-button type="text" icon="el-icon-edit" class="edit"></el-button> </div>
           <div style="margin-top: 12px">
            <div class="option"><span class="op_a op-text" :class="{op_a_active: choice.answer === 0}">{{choice.op_a}}</span></div>
            <div class="option"><span class="op_b op-text" :class="{op_b_active: choice.answer === 1}">{{choice.op_b}}</span></div>
            <div class="option"><span class="op_c op-text" :class="{op_c_active: choice.answer === 2}">{{choice.op_c}}</span></div>
            <div class="option"><span class="op_d op-text" :class="{op_d_active: choice.answer === 3}">{{choice.op_d}}</span></div>
           </div>
            <div class="score">分值:{{choice.score}}</div>
        </div>
    </div>
    
</template>

<script>
    import {request} from "../network/request";


    export default {
        name: "choice",
        data() {
            return{
                width: []
            }
        },
        methods: {
            del() {
                const a =this.choice
                this.$confirm("确认删除该题目吗?", '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    if(this.choice.choiceid === 0) {
                        this.$emit("delChoice1",this.index)
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }
                    else{   request({
                        url: 'deltopic',
                        params: {
                            type: "choice",
                            id: this.choice.choiceid
                        }
                    }).then((res)=>{

                        this.$emit("delChoice",a)
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });

                    })}

                })



            }
        },
        props: {
            choice: {
                type: Object,
                default: {}
            },
            index: {
               type: Number,
            }
        }
    }
</script>

<style scoped>
.choice-item{

    border: #f5f5f5 solid 3px;
    font-size: 20px;
    margin-bottom:20px;
    position: relative;
}
    .op_a::before{
        margin-right: 10px;
        margin-left: 3px;
        content: 'A';
        border: #d8d8d8 solid 1px;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: inline-block;
        line-height: 20px;
        text-align: center;
        color: #d8d8d8;
        background-color: var(--color-background);
    }
.op_b::before{
    color: #d8d8d8;
    margin-right: 10px;
    content: 'B';
    margin-left: 3px;
    border: #d8d8d8 solid 1px;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: inline-block;
    line-height: 20px;
    text-align: center;
    background-color:var(--color-background);
}
.op_c::before{
    color: #d8d8d8;
    margin-right: 10px;
    content: 'C';
    margin-left: 3px;
    border: #d8d8d8 solid 1px;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: inline-block;
    line-height: 20px;
    text-align: center;
    background-color:var(--color-background);

}
.op_d::before{
    margin-left: 3px;
    color: #d8d8d8;
    margin-right: 10px;
    content: 'D';
    border: #d8d8d8 solid 1px;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: inline-block;
    line-height: 20px;
    text-align: center;
    background-color: var(--color-background);
}
.op_a_active::before{
    margin-right: 10px;
    background-color:#5cc0ff;
    border: #5cc0ff;
    color: #ffffff;
}
.op_b_active::before{
    margin-right: 10px;
    background-color:#5cc0ff;
    border: #5cc0ff;
    color: #ffffff;
}
.op_c_active::before{
    margin-right: 10px;
    background-color:#5cc0ff;
    border: #5cc0ff;
    color: #ffffff;
}
.op_d_active::before{
    margin-right: 10px;
    background-color:#5cc0ff;
    border: #5cc0ff;
    color: #ffffff;
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
    .option{
        margin-top: 5px;
    }
    .op-text{
font-size: 17px;
    }
</style>