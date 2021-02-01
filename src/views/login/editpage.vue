<template>
    <div class="view">

        <div class="save"><el-button type="primary" size="small">保存</el-button><el-button type="primary" size="small" @click="test">test</el-button></div>
        <div class="edit-page">
           <div class="head"> <span>试卷信息:</span><el-button type="primary" style="margin-left: 300px" @click="isaddtopic = true">添加习题</el-button></div>
            <div v-if="choicelist.length>0" class="choice">
                <h3>单选题</h3>
            <choice v-for="(item,index) in  choicelist" :key="item.choiceid" :choice="item" :index="index" ></choice>

            </div>

        <div v-if="judgementlist.length > 0" class="judgement">
            <h3>判断题</h3>
            <judgement :judgement="juditem" v-for="(juditem,index) in judgementlist" :key="juditem.jid" :index="index" :start="choicelist.length"></judgement>

        </div>
        </div>
        <el-dialog :visible.sync="isaddtopic" >
            <el-select v-model="value" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <div v-if="0 === value">

                <el-form ref="form"  :model="single"  :rules="rules" label-position="left" label-width="100px" style="width: 100%">
                    <el-row style="margin-top: 30px">   <el-col :span="2"><el-form-item label="分值"  style="padding: 0 0 0 100px;text-align: center"></el-form-item></el-col><el-col :span="2" :offset="4"><el-form-item prop="score"> <el-input-number v-model="single.score" :step="0.5" :min="1"></el-input-number></el-form-item></el-col></el-row>
                    <el-radio-group v-model="single.answer" >
                    <el-row >
                        <el-col :span="8"><el-form-item label="题干"  style="padding: 0 0 0 100px"></el-form-item></el-col>
                        <el-col :span="16">  <el-form-item prop="title">  <el-input v-model.lazy="single.title" type="textarea"></el-input></el-form-item></el-col>
                    </el-row>
                        <el-row>
                          <el-col :span="8">      <el-form-item prop="answer"> <el-radio :label="0">选项A</el-radio></el-form-item></el-col>
                          <el-col :span="16">     <el-form-item  prop="op_a">
                              <el-input type="textarea"  v-model.lazy="single.op_a" ></el-input></el-form-item>
                             </el-col>
                      </el-row>
<el-row>
    <el-col :span="8">      <el-form-item prop="answer">   <el-radio :label="1" >选项B</el-radio></el-form-item></el-col>
    <el-col :span="16">            <el-form-item prop="op_b">

                            <el-input type="textarea" v-model.lazy="single.op_b" ></el-input>
    </el-form-item></el-col>
</el-row>
                        <el-row>
                            <el-col :span="8">     <el-form-item prop="answer"> <el-radio :label="2" >选项C</el-radio></el-form-item></el-col>
                            <el-col :span="16">    <el-form-item  prop="op_c">

                             <el-input type="textarea" v-model.lazy="single.op_c" ></el-input>
                        </el-form-item></el-col>
                        </el-row>
                        <el-row>
                    <el-col :span="8"> <el-form-item prop="answer"> <el-radio :label="3" >选项D</el-radio></el-form-item></el-col>
                     <el-col :span="16">     <el-form-item  prop="op_d">

                            <el-input type="textarea" v-model.lazy="single.op_d" ></el-input>
                        </el-form-item></el-col>
                        </el-row>

                    </el-radio-group>
               <el-form-item>  <el-button type="primary" @click="addtopic('form')">添加</el-button></el-form-item>
                </el-form>
            </div>
<!--            添加判断题-->
            <div v-if="3 === value">
                <el-form :model="judgement" ref="judgeform" :rules="rules">
                    <el-row>
                        <el-col>
                            <el-form-item label="题干"></el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item prop="title"><el-input v-model.lazy="judgement.title" type="textarea"></el-input></el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                    <el-form-item prop="answer">   <el-radio v-model="judgement.answer" :label="1">正确</el-radio>
                        <el-radio v-model="judgement.answer" :label="0">错误</el-radio></el-form-item>

                    </el-row>
                    <el-form-item><el-button type="primary" @click="addjudgement('judgeform')">添加</el-button></el-form-item>
                </el-form>

            </div>

        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios'
    import choice from "../../components/choice";
import judgement from "../../components/judgement";
    import {request} from "../../network/request";

export default  {
        name: "editpage",
        components: {choice,judgement},
        methods: {
            test() {
                let a = []
                for(let item of this.choicelist){
                  if( !item.hasOwnProperty('choiceid')){
                      a.push(item)
                  }
                }
                console.log(a)


            },
            addjudgement(a) {
                this.$refs[a].validate(async valid => {
                    if(!valid) {return}
                    else{
                        this.judgementlist.push({
                            title: this.judgement.title,
                            answer: this.judgement.answer

                        })
                        this.$refs[a].resetFields()
                        this.isaddtopic = false

                    }
                })
            },
            addtopic(a) {
                this.$refs[a].validate(async valid =>{
                    if(!valid)return
                    else{
                        this.choicelist.push({
                            title: this.single.title,
                            op_a: this.single.op_a,
                            op_b: this.single.op_b,
                            op_c: this.single.op_c,
                            op_d: this.single.op_d,
                            answer: this.single.answer,
                            score: this.single.score
                        })
                        this.$refs[a].resetFields();
                        this.isaddtopic = false

                    }
                })




            }
        },
        data() {
            return{

                choicelist: [],judgementlist: [],
                isaddtopic: false,
                options: [{
                    value: 0,
                    label: '单选题'}, {value: 1, label: '多选题'}, {value: 2, label: '填空题'}, {value: 3, label: '判断题'
                }, {value: 4, label: '主观题'}],
                value: 0,
                single: {
                    title: '',
                    op_a: '',
                    op_b: '',
                    op_c: '',
                    op_d: '',
                    answer: 0,
                    score: 1
                },
                rules: {
                    title: {
                        required: true,message: '请输入题干',trigger: 'blur'
                    }
                    ,

                    op_a:{required: true,message: '请输入内容',trigger: 'blur'},
                    op_b:{required: true,message: '请输入内容',trigger: 'blur'},
                    op_c:{required: true,message: '请输入内容',trigger: 'blur'},
                    op_d:{required: true,message: '请输入内容',trigger: 'blur'},
                },
                judgement: {title: null,
                    answer: 1},
            }
        },
        created() {
            // request({
            //     url: '/retrieveselect',
            //     params: {
            //         id: this.$route.params.pid
            //     }
            //
            // }).then(res => {
            //     this.choicelist = res.data
            // })

            let me = this
            axios.all([axios({
                url: 'http://192.168.3.13:8083/teacher/retrieveselect',
                method: 'POST',
                params: {
                    id: me.$route.params.pid
                }

            }),axios({
                url: 'http://192.168.3.13:8083/teacher/retrievejud',
                method: 'POST',
                params: {
                    id: me.$route.params.pid
                }
            })]).then(axios.spread((choice,judgement) =>{
                me.choicelist = choice.data
                    me.judgementlist = judgement.data
            })
            )
        }
    }


</script>

<style scoped>

    .view{
      width: 100%;
        height: 100%;
        background-color: #ffffff;
    }
    .edit-page{
        width: 70%;
        height: 800px;

        margin: 30px auto;
    }
    .choice{
        width: 90%;
        margin: 0 auto;
    }
    .judgement{
        width: 90%;
        margin: 0 auto;
    }
    .head{

        display: flex;
        justify-content: space-between;
      border-bottom: 3px solid #f5f5f5;
        height: 40px;
        line-height: 40px;
    }
</style>