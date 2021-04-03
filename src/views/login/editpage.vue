<template>
    <div class="view">

        <div class="save"><el-button type="primary" @click="test" size="small">保存</el-button>
<!--            <el-button type="primary" size="small" >test</el-button>-->
<!--            <el-button type="primary" size="small" @click="test1">test1</el-button>-->
        </div>
        <div class="edit-page">
            <div class="head"> <span><h2>试卷信息:{{$route.params.name}}&nbsp;满分:{{getFullScore}}</h2></span><el-button type="primary" style="margin-left: 300px" @click="isaddtopic = true">添加习题</el-button></div>
            <div v-if="choicelist.length>0" class="choice">
                <h3><Strong>单选题</Strong></h3>
            <choice v-for="(item,index) in  choicelist"  @delChoice1="delChoice1" :key="index" :choice="item" :index="index" @delChoice="delChoice"></choice>
            </div>

            <div v-if="mulchoicelist.length > 0" class="mulchoice">
                <h3><Strong>多选题</Strong></h3>
                <MulChoice :index="index" v-for="(item,index) in mulchoicelist" :start="choicelist.length" :mulchoice="item" @delMul1="delMul1" :key="index" @delMul="delMul"></MulChoice>


            </div>

        <div v-if="judgementlist.length > 0" class="judgement">
 <h3><Strong>判断题</Strong></h3>
            <judgement :judgement="juditem" v-for="(juditem,index) in judgementlist" @delJud="delJud"  @delJud1="delJud1" :key="index" :index="index" :start="choicelist.length+mulchoicelist.length"></judgement>

        </div>
            <div v-if="subjectlist.length > 0 " class="judgement">
            <h3><Strong>简答题</Strong></h3>
                <subject-item  :subject-item="item"  v-for="(item,index) in subjectlist" @delSub1="delSub1" :key="index" :index="index" @delSub="delSub"   :start="choicelist.length+mulchoicelist.length+judgementlist.length"></subject-item>

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

                <el-form ref="form"  :model="single"  :rules="rules"  label-position="left" label-width="100px" style="width: 100%">
                    <el-row style="margin-top: 30px">   <el-col :span="2"><el-form-item label="分值"  style="padding: 0 0 0 100px;text-align: center"></el-form-item></el-col><el-col :span="2" :offset="4"><el-form-item prop="score"> <el-input-number v-model="single.score" :step="0.5" :min="1"></el-input-number></el-form-item></el-col></el-row>
                    <el-radio-group v-model="single.answer" >
                    <el-row >
                        <el-col :span="8"><el-form-item label="题干"  style="padding: 0 0 0 100px" key="title.text"> </el-form-item></el-col>
                        <el-col :span="16">  <el-form-item prop="title" key="single.title">  <el-input v-model.lazy="single.title" type="textarea"></el-input></el-form-item></el-col>
                    </el-row>
                        <el-row>
                          <el-col :span="8">      <el-form-item prop="answer" key="radio.answera"> <el-radio :label="0">选项A</el-radio></el-form-item></el-col>
                          <el-col :span="16">     <el-form-item  prop="op_a" key="single.a" >
                              <el-input type="textarea"  v-model.lazy="single.op_a" ></el-input></el-form-item>
                             </el-col>
                      </el-row>
<el-row>
    <el-col :span="8">      <el-form-item prop="answer" key="single.answerb">   <el-radio :label="1" >选项B</el-radio></el-form-item></el-col>
    <el-col :span="16">            <el-form-item prop="op_b"  key="single.b">

                            <el-input type="textarea" v-model.lazy="single.op_b" ></el-input>
    </el-form-item></el-col>
</el-row>
                        <el-row>
                            <el-col :span="8">     <el-form-item prop="answer"  key="radio.answerc" > <el-radio :label="2" >选项C</el-radio></el-form-item></el-col>
                            <el-col :span="16">    <el-form-item  prop="op_c"  key="single.c">

                             <el-input type="textarea" v-model.lazy="single.op_c" ></el-input>
                        </el-form-item></el-col>
                        </el-row>
                        <el-row>
                    <el-col :span="8"> <el-form-item prop="answer" key="radio.answerd"> <el-radio :label="3" >选项D</el-radio></el-form-item></el-col>
                     <el-col :span="16">     <el-form-item  prop="op_d"  key="single.d">

                            <el-input type="textarea" v-model.lazy="single.op_d" ></el-input>
                        </el-form-item></el-col>
                        </el-row>

                    </el-radio-group>
               <el-form-item key="addtopic">  <el-button type="primary" @click="addtopic('form')">添加</el-button></el-form-item>
                </el-form>
            </div>

<!--            //添加多选题-->
            <div v-if="1 === value">
                <div style="height: 25px"></div>
                <el-form :model="mulchoice"  ref="mulchoice">
<!--                    <el-form-item prop="title"   :rules="{required: true, message: '请输入题干', trigger: 'blur'}"  ><el-input type="textarea"  v-model="mulchoice.title"></el-input></el-form-item>-->

                    <el-form-item   :label="'题干'+'\xa0\xa0'" :rules="  { required: true, message: '请输入内容', trigger: 'blur'}"    key="multitle"     prop="title" ><el-row><el-col :span="18" ><el-input v-model="mulchoice.title" type="textarea"></el-input></el-col></el-row></el-form-item>
                    <el-checkbox-group v-model="mulchoice.answer">
                        <el-form-item v-for="(item,index) in mulchoice.option" :label="'选项'+option[index]" :key="item.key" :prop="'option.'+index+'.value'" :rules="  { required: true, message: '请输入内容', trigger: 'blur' }">

   <el-row><el-col :span="1"><el-form-item prop="answer" key="mulanswer"><el-checkbox :label="index" :key="'checkbox.'+index">{{''}}</el-checkbox></el-form-item></el-col>
       <el-col :span="16"><el-input v-model="mulchoice.option[index].value"></el-input></el-col><el-col :span="2" :offset="1"><el-button icon="el-icon-remove" type="text" style="color: red" @click.prevent="deloption"></el-button></el-col></el-row>
</el-form-item>
                    </el-checkbox-group>
                    <el-form-item prop="score" key="mul.score">分值: <el-input-number style="margin-left: 26px" v-model="mulchoice.score" :step="0.5" :min="1"></el-input-number></el-form-item>
                    <el-button type="primary" @click.prevent="newoption">新增选项</el-button>
                    <el-button type="primary" @click="addmul('mulchoice')">添加</el-button>

                </el-form>


            </div>

            <!--            添加判断题-->
            <div v-if="3 === value">
                <el-form :model="judgement" ref="judgeform" >
                    <el-row>
<!--                        <el-col>-->
<!--                            <el-form-item  key=""></el-form-item>-->
<!--                        </el-col>-->
                        <el-col>
                            <el-form-item key="judgement.input"  label="题干" prop="title" :rules="  { required: true, message: '请输入内容', trigger: 'blur'}"><el-input v-model.lazy="judgement.title" type="textarea"  ></el-input></el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="10">     <el-form-item prop="answer" key="answer">   <el-radio v-model="judgement.answer" :label="1">正确</el-radio>
                        <el-radio v-model="judgement.answer" :label="0">错误</el-radio></el-form-item></el-col>
                     <el-col :span="12"> <el-form-item prop="score"> 分值： <el-input-number v-model="judgement.score" :step="0.5" :min="1"></el-input-number></el-form-item></el-col>
                    </el-row>

                    <el-form-item><el-button type="primary" @click="addjudgement('judgeform')">添加</el-button></el-form-item>
                </el-form>

            </div>

<!--            //添加简答题-->
            <div v-if="value === 4">
                <el-form :model="subject"  ref="sub">
<!--                    <el-form-item  key="subject.title" prop="title" :rules="  { required: true, message: '请输入内容', trigger: 'blur'}">-->
<!--                        <el-input v-model="subject.title"  ></el-input>-->
<!--                    </el-form-item>-->
                    <el-row>
                    <el-col>
                        <el-form-item key="subject.title"  label="题干" prop="title" :rules="  { required: true, message: '请输入内容', trigger: 'blur'}"><el-input v-model.lazy="subject.title" type="textarea"  ></el-input></el-form-item>
                    </el-col>
                    </el-row>
                    <el-row>
                       <el-radio v-model="radio" :label="1">精准匹配</el-radio>   <el-radio v-model="radio" :label="0">模糊匹配</el-radio>
                    </el-row>
                    <el-row v-if="radio === 1">
                        <el-col>
                            <el-form-item key="subject.answer"  label="答案" ><el-input v-model.lazy="subject.answer" type="textarea"  key="subject.answer" ></el-input></el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-if="radio === 0">

                        <el-form-item  key="subject.keyword"><el-input type="text" key="subject.keyword" v-model="subject.keyword"></el-input></el-form-item>

                        <el-row>
                            <el-form-item> <el-button type="primary" @click="addkeyword">添加关键词</el-button></el-form-item>
                            <el-form-item>    <el-tag v-for="(item,index) in tag" :key="item"   @close="handleClose(index)" closable>{{item}}</el-tag></el-form-item>
                        </el-row>
                    </el-row>


                    <el-form-item prop="score" key="subject.score" >

                        分值:<el-input-number v-model="subject.score" :step="0.5" :min="1"></el-input-number>
                    </el-form-item>
                    <el-form-item><el-button type="primary" @click="addsub('sub')">添加</el-button></el-form-item>
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
    import MulChoice from "../../components/MulChoice";
    import SubjectItem from "../../components/SubjectItem";

export default  {
        name: "editpage",
        components: {choice,judgement,MulChoice,SubjectItem},
    computed: {
            getFullScore() {
                let score = 0
                for(let item of this.choicelist){
                    score = score + item.score;
                }
                for(let item of this.subjectlist){
                    score = score + item.score;
                }
                for(let item of this.judgementlist){
                    score = score + item.score;
                }
                for(let item of this.mulchoicelist){
                    score = score + item.score;
                }
                return score
            }
    },
        methods: {
            addkeyword(){
                if(this.subject.keyword ==""){return false}
                this.tag.push(this.subject.keyword)
                this.subject.keyword = ""

            },
            handleClose(index) {
                this.tag.splice(index, 1);
            },
            delChoice(a) {
                let i=0
               for(let item of this.choicelist){
                   if(item.choiceid === a.choiceid){
                       break
                   }

                   i++
               }
               this.choicelist.splice(i,1)

            },
            delSub1(a) {
                this.subjectlist.splice(a,1)
            },
            delSub(a) {

                  let i=0
                  for(let item of this.subjectlist){
                      if(item.id === arguments[0]){
                          break
                      }
                      i++
                  }
                  this.subjectlist.splice(i,1)

            },
            delChoice1(a){
                this.choicelist.splice(a,1)
            },
            delJud1(a) {
                this.judgementlist.splice(a,1)
            },
            delJud(a) {
                let i=0
                for(let item of this.judgementlist){
                    if(item.jid === a){
                        break
                    }
                    i++
                }
                this.judgementlist.splice(i,1)
            },
            delMul1(a){
                this.mulchoicelist.splice(a,1)
            },
            delMul(a) {
                let i=0
                for(let item of this.mulchoicelist){
                    if(item.id === a){
                        break
                    }
                    i++
                }
                this.mulchoicelist.splice(i,1)
            },

            test1() {
                request({
                    url: '/totest',
                })

            },

            test() {
                let mul = []
                let jud = []
                let choice = []
                let sub = []
                for(let item of this.mulchoicelist){
                    if(item.id === 0 ){
                        mul.push(item)
                    }
                }
                for(let item of this.judgementlist){
                    if(item.jid === 0 ){
                        jud.push(item)
                    }
                }
                for(let item of this.choicelist){
                    if(item.choiceid === 0 ){
                        choice.push(item)
                    }
                }
                for(let item of this.subjectlist){
                    if(item.id === 0 ){
                        sub.push(item)
                    }
                }



                const optionList ={mulchoiceList:mul,choicesList:choice,judgementList:jud,subjectList:sub}
                console.log(optionList)
                console.log(JSON.stringify(optionList))

            request({
                url: 'inserttopic',
                dataType: 'JSON',
                data:{
                    optionList
                },

            }).then(res => {
                request({
                    url: 'edittime',
                    params: {
                        id: this.$route.params.pid
                    }
                })


                this.$router.go(-1)
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });

            })


                console.log(JSON.stringify(this.optionList))


            },
            addsub(a){

                this.subject.keyword = this.tag
                if(this.subject.answer.length===0&&this.subject.keyword.length===0)
                {
                    this.$message('请填写关键词或答案');
                }

              else {

                    this.$refs[a].validate(async valid => {
                        if (!valid) return

                        else{

                            this.subjectlist.push({

                                id: 0,
                                pid: this.$route.params.pid,
                                score: this.subject.score,
                                title: this.subject.title,
                                keyword: this.radio === 1?null:(this.subject.keyword).toString(),
                                answer: this.radio === 0?null:this.subject.answer,
                                type: this.radio
                            })
                            this.$refs[a].resetFields()
                            this.subject.keyword = ''
                                this.tag = []
                            this.isaddtopic = false
                        }

                    })
                }
            },
            addmul(a) {
                this.$refs[a].validate(async valid => {
                    if(!valid) return
                        else if(this.mulchoice.answer.length<2){
                        this.$message('请至少选择两个选项');
                        return
                    }
                    else{

                        const length = this.mulchoice.option.length
                        this.mulchoicelist.push({
                            id: 0,
                            pid: this.$route.params.pid,
                            score: this.mulchoice.score,
                            title: this.mulchoice.title,
                            mop_a: this.mulchoice.option[0].value,
                            mop_b: this.mulchoice.option[1].value,
                            mop_c: this.mulchoice.option[2].value,
                            mop_d: this.mulchoice.option[3].value,
                            mop_e: length>=5?this.mulchoice.option[4].value:null,
                            mop_f: length>=6?this.mulchoice.option[5].value:null,
                            mop_g: length>=7?this.mulchoice.option[6].value:null,
                            answer: this.mulchoice.answer.toString()

                        })
                        this.$refs[a].resetFields()
                        this.isaddtopic = false
                    }
                })


            },
            deloption() {
                if(this.mulchoice.option.length > 4) {
                    this.mulchoice.option.pop()
                }
            },
            newoption() {
                if(this.mulchoice.option.length<7){
                    this.mulchoice.option.push({key: Date.now(),value: ''})
                }
            },

            addjudgement(a) {
                this.$refs[a].validate(async valid => {
                    if(!valid) return
                    else{
                        this.judgementlist.push({
                            jid: 0,
                            pid: this.$route.params.pid,
                            title: this.judgement.title,
                            answer: this.judgement.answer,
                            score: this.judgement.score

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
                            choiceid: 0,
                            paperid: this.$route.params.pid,
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
                temp: '',
                tag: [],
                radio: 1,
                rule: {title: [{required: true, message: '请输入题干', trigger: 'blur'}]},
                judgement: {title: '',
                    answer: 1,score: 1},

                choicelist: [],judgementlist: [],
                isaddtopic: false,
                mulchoicelist: [],
                subjectlist: [],
                options: [{
                    value: 0,
                    label: '单选题'}, {value: 1, label: '多选题'}, {value: 2, label: '填空题'}, {value: 3, label: '判断题'
                }, {value: 4, label: '简答题'}],
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
                optionList:{
                    mulchoiceList: [],
                    judgementList: [],
                    choicesList: [],
                    subjectList: []
                },
                subject: {
                    title: '',
                    score: 1,
                    keyword: '',
                    answer: ''
                },

                option: ['A','B','C','D','E','F','G'],
                mulchoice: {

                    option: [{
                        value: '',
                        key: Date.now()+1
                    },{
                        value: '',
                        key: Date.now()+2
                    },{
                        value: '',
                        key: Date.now()+3
                    },{
                        value: '',
                        key: Date.now()+4
                    }],
                    answer: [],
                    title: '' ,
                    score: 1,

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


            }
        },
        created() {
            request({
                url: '/retrieveoptionlist',
                params: {
                    id: this.$route.params.pid
                }

            }).then(res => {
                this.choicelist = res.data.choicesList
                this.judgementlist = res.data.judgementList
                this.mulchoicelist = res.data.mulchoiceList
                this.subjectlist = res.data.subjectList
            })
            //
            // let me = this
            // axios.all([axios({
            //     url: 'http://192.168.3.13:8083/teacher/retrieveselect',
            //     method: 'POST',
            //     params: {
            //         id: me.$route.params.pid
            //     }
            //
            // }),axios({
            //     url: 'http://192.168.3.13:8083/teacher/retrievejud',
            //     method: 'POST',
            //     params: {
            //         id: me.$route.params.pid
            //     }
            // }),
            //     axios({
            //         url: 'http://192.168.3.13:8083/teacher/retrievemulchoice',
            //         method: 'POST',
            //         params: {
            //             id: me.$route.params.pid
            //         }
            //     })
            // ]).then(axios.spread((choice,judgement,mulchoice) =>{
            //     me.choicelist = choice.data
            //         me.judgementlist = judgement.data
            //     me.mulchoicelist = mulchoice.data
            // })
            // )
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
    .mulchoice{
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