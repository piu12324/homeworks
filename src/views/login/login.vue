<template>
    <div>
        <router-link to="/login/hello">你好啊</router-link>
        <router-view></router-view>
    <div class='container' id='container' :class="{rightPanelActive: status}">

        <div class="form-container sign-up-container">
            <!-- 注册 -->
            <form action="#" onsubmit="return false">
                <h1>用户注册</h1>


                <input type="text" placeholder="用户名">
                <input type="password" placeholder="密码">

                <button>注册</button>
            </form>
        </div>
        <div class="form-container sign-in-container">
            <!-- 登陆 -->
            <form action="#" onsubmit="return false">
                <h1>用户登陆</h1>
                <h4 class="errMeg"  :style="{display: isshow}" v-text="errMsg"></h4>
                <input type="text" placeholder="用户名" v-model.lazy="count">
          <input type="password" placeholder="密码" v-model.lazy="pwd">
                <a href="#">忘记密码？</a>
                <button class="loginButton" @click="loginButton">登陆</button>
            </form>
        </div>
        <!-- 侧边栏内容 -->
        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-left">
                    <h1>已有帐号？</h1>
                    <p>快快点我去进行登陆吧。</p>
                    <button class='ghost' id="signIn"  @click="signInButton">登陆</button>
                </div>
                <div class="overlay-panel overlay-right">
                    <h1>没有帐号？</h1>
                    <p>点击注册去注册一个属于你的账号吧。</p>
                    <button class='ghost' id="signUp" @click="signUnButton">注册</button>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import {login} from "../../network/login";

export default {
        name: "ll",

        data() {
           return {
               status: false,
               count: '',
               pwd: '',
               isshow: 'none',
               errMsg: ''
           }
        },
        methods: {
            signInButton() {

              console.log("111")

                this.status = false
            },
            signUnButton() {
                this.status = true
            },
            loginButton() {
              // if(this.count.length < 6){
              //     this.errMsg = "您输入的账号不足6位，请重新确认"
              //     this.isshow = 'block'
              //     setTimeout(()=>{
              //         this.isshow = 'none'
              //     },3000)
              //
              // }
              // else if(this.pwd.length <= 6){
              //     this.errMsg = "您输入的密码不足6位，请重新确认"
              //     this.isshow = 'block'
              //     setTimeout(()=>{
              //         this.isshow = 'none'
              //     },3000)
              // }
              // else{
              //     login(this.count,this.pwd).then(res => {
              //         this.$store.state.username = res
              //         if( this.$store.state.username.data !== ''){
              //             this.$router.push('/hello/'+this.$store.state.username.data)
              //         }
              //         else {
              //             this.errMsg = "你输入的帐号或密码不正确，请重新输入。"
              //             this.isshow = 'block'
              //             setTimeout(()=>{
              //                 this.isshow = 'none'
              //             },3000)
              //
              //
              //         }
              //     })
              // }
                login(this.count,this.pwd).then(res => {
                    this.$usernam =
                    this.$store.state.username = res.data
                    console.log( this.$store.state.username)
                    if( this.$store.state.username !== ''){


                        this.$router.push('/TeacherView/'+this.$store.state.username)
                    }
                    else {
                        this.errMsg = "你输入的帐号或密码不正确，请重新输入。"
                        this.isshow = 'block'
                        setTimeout(()=>{
                            this.isshow = 'none'
                        },3000)


                    }
                })
            }
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body, html {
        font-family: Arial, Helvetica, sans-serif;
        background: #f8f8f8;
        background-attachment: fixed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin: 0 auto;
    }
    .errMeg{
        color: red;
        display: none;
        font-weight: normal;
    }
    h1 {
        margin: 0.2rem;
        font-size: 1.2rem;
    }
    p {
        font-size: 1rem;
        line-height: 1.5rem;
        font-weight: 100;
        margin: 1.2rem 0;
        letter-spacing: 0.1rem;
    }
    span {
        font-size: 0.8rem;
        margin: 1.2rem 0;
    }
    a {
        color: #333;
        font-size: 1rem;
        text-decoration: none;
    }
    .container {
        margin: 100px auto;
        position: relative;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
        padding: 0.6rem;
        width: 50rem;
        height: 35rem;
        overflow: hidden;
        max-width: 100vw;
        min-height: 70vh;
    }
    .form-container form {
        background: #fff;
        display: flex;
        flex-direction: column;
        padding: 0 1.8rem;
        height: 100%;
        justify-content: center;
        align-items: center;
    }
    .social-container {
        margin: 0.6rem 0;
    }
    .social-container a {
        border: 1px solid #eee;
        border-radius: 50%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin: 0 5px;
        height: 1.8rem;
        width: 1.8rem;
    }
    .social-container a:hover {
        opacity: .8;
    }
    .form-container input {
        width: 100%;
        height: 2.2rem;
        text-indent: 1rem;
        border: 1px solid #ccc;
        border-left: none;
        border-right: none;
        border-top: none;
        outline: none;
        margin: 0.6rem 0;
    }
    .form-container button:active {
        transform: scale(0.95,0.95);
    }
    .form-container button {
        padding: 0.4rem 1rem;
        background: #417dff;
        color: white;
        border: 1px solid #fff;
        outline: none;
        cursor: pointer;
        width: 5rem;
        border-radius: 8px;
        transition: all 100ms ease-in;
        margin: 0.6rem 0;
        font-size: 0.6rem;
        padding: 0.5rem 0;
    }
    button.ghost {
        background: transparent;
        border-color: #fff;
        border: 1px solid #fff;
        outline: none;
        cursor: pointer;
        width: 5rem;
        border-radius: 8px;
        transition: all 100ms ease-in;
        margin: 0.6rem 0;
        padding: 0.5rem 0;
        color: white;
        font-size: 0.6rem;
    }
    button#send_code {
        width: 100%;
    }
    button.ghost:active {
        transform: scale(0.95,0.95);
    }
    .form-container {
        position: absolute;
        top: 0;
        height: 100%;
        transition: all 0.5s ease-in;
    }
    .sign-in-container {
        left: 0;
        width: 50%;
        z-index: 2;
    }
    .sign-up-container {
        left: 0;
        width: 50%;
        opacity: 0;
        z-index: 1;
    }
    .overlay {
        background: #417dff;
        width: 200%;
        height: 100%;
        position: relative;
        left: -100%;
        transition: all 0.6s ease-in-out;
        color: white;
    }
    .overlay-container {
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        height: 100%;
        overflow: hidden;
        transition: all 0.6s ease-in-out;
        z-index: 99;
    }
    .overlay-panel {
        position: absolute;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 100%;
        padding: 0 2.2rem;
    }
    .overlay-right {
        right: 0;
    }
    .container.rightPanelActive .overlay-container {
        transform: translateX(-100%);
    }
    .container.rightPanelActive .sign-in-container {
        transform: translateX(100%);
    }
    .container.rightPanelActive .sign-up-container {
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
        transition: all 0.6s ease-in-out;
    }
    .container.rightPanelActive .overlay {
        transform: translateX(50%);
    }
    .container.rightPanelActive .overlay-left {
        transform: translateX(0);
        transition: all 0.6s ease-in-out;
    }
    .container.rightPanelActive .overlay-right {
        transform: translateX(20%);
        transition: all 0.6s ease-in-out;
    }

</style>