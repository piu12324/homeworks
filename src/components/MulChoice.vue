<template>
    <div class="mul-item">


        <div class="choice-head">  <span>{{start+index+1+'.'+' '}}{{mulchoice.title}}</span> <el-button type="text" icon="el-icon-delete" class="del" @click="del"></el-button> <el-button type="text" icon="el-icon-edit" class="edit"></el-button> </div>
        <div style="margin-top: 12px">
        <div  v-if="mulchoice.mop_a !== null" class="option"><span class="op_a op-text" :class="{op_a_active: mulchoice.answer.indexOf(0)>=0}">{{mulchoice.mop_a}}</span></div>
        <div  v-if="mulchoice.mop_b !== null" class="option"><span class="op_b op-text" :class="{op_a_active: mulchoice.answer.indexOf(1)>=0}">{{mulchoice.mop_b}}</span></div>
        <div  v-if="mulchoice.mop_c !== null" class="option"><span class="op_c op-text" :class="{op_a_active: mulchoice.answer.indexOf(2)>=0}">{{mulchoice.mop_c}}</span></div>
        <div  v-if="mulchoice.mop_d !== null" class="option"><span class="op_d op-text" :class="{op_a_active: mulchoice.answer.indexOf(3)>=0}">{{mulchoice.mop_d}}</span></div>
        <div  v-if="mulchoice.mop_e !== null" class="option"><span class="op_e op-text" :class="{op_a_active: mulchoice.answer.indexOf(4)>=0}">{{mulchoice.mop_e}}</span></div>
        <div  v-if="mulchoice.mop_f !== null" class="option"><span class="op_f op-text" :class="{op_a_active: mulchoice.answer.indexOf(5)>=0}">{{mulchoice.mop_f}}</span></div>
        <div  v-if="mulchoice.mop_g !== null" class="option"><span class="op_g op-text" :class="{op_a_active: mulchoice.answer.indexOf(6)>=0}">{{mulchoice.mop_g}}</span></div>
        </div>
        <div class="score">分值:{{mulchoice.score}}</div>
    </div>
</template>

<script>
    import {request} from "../network/request";

    export default {
        name: "MulChoice",
        props: {
            index:  Number,mulchoice: {},start: Number
        },
        methods: {
            del() {


                  this.$confirm("确认删除该题目吗?", '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                  }).then(()=>{
                      if(this.mulchoice.id === 0) {
                          this.$emit("delMul1",this.index)
                          this.$message({
                              message: '删除成功',
                              type: 'success'
                          });
                      }

                      else {   request({
                          url: 'deltopic',
                          params: {
                              type: "mul",
                              id: this.mulchoice.id
                          }
                      }).then((res)=>{

                          this.$emit("delMul",this.mulchoice.id)
                          this.$message({
                              message: '删除成功',
                              type: 'success'
                          });

                      })}

                  })

              }



        }
    }
</script>

<style scoped>
.mul-item{
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
.op_e::before{
    margin-left: 3px;
    color: #d8d8d8;
    margin-right: 10px;
    content: 'E';
    border: #d8d8d8 solid 1px;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: inline-block;
    line-height: 20px;
    text-align: center;
    background-color: var(--color-background);
}
.op_f::before{
    margin-left: 3px;
    color: #d8d8d8;
    margin-right: 10px;
    content: 'F';
    border: #d8d8d8 solid 1px;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: inline-block;
    line-height: 20px;
    text-align: center;
    background-color: var(--color-background);
}.op_g::before{
     margin-left: 3px;
     color: #d8d8d8;
     margin-right: 10px;
     content: 'G';
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
.op_e_active::before{
    margin-right: 10px;
    background-color:#5cc0ff;
    border: #5cc0ff;
    color: #ffffff;
}
.op_f_active::before{
    margin-right: 10px;
    background-color:#5cc0ff;
    border: #5cc0ff;
    color: #ffffff;
}
.op_g_active::before{
    margin-right: 10px;
    background-color:#5cc0ff;
    border: #5cc0ff;
    color: #ffffff;
}
    .op-text{
        font-size: 17px;
    }
.option{
    margin-top: 5px;
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