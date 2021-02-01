<template>
    <div class="judgement-item">
        <h4 style="margin-top: 0;font-weight: normal">{{start+index+1+'.   '}}{{judgement.title}}</h4>
        <span class="el-icon-check right" :style="judgeanswer" ></span><span class="el-icon-close wrong" :style="judgeanswer2"></span>
    </div>
</template>

<script>
    export default {
        name: "judgement",
        props:{
            judgement: {},index: Number,start: Number
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

</style>