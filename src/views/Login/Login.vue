<template>
  <div style="height: 100vh; overflow:hidden; position: relative">

    <el-card class="cover" v-if="loginAdmin.id">
      <slide-verify :l="42"
                    :r="10"
                    :w="310"
                    :h="155"
                    :accuracy="5"
                    :imgs="['https://cdn.pixabay.com/photo/2022/11/09/12/23/lotus-7580478_960_720.jpg',
                    'https://cdn.pixabay.com/photo/2017/08/29/12/07/adult-2693054_960_720.jpg',
                    'https://cdn.pixabay.com/photo/2022/11/16/15/52/mushrooms-7596258_960_720.jpg']"
                    slider-text="向右滑动"
                    @success="onSuccess"
                    @fail="onFail"
                    @refresh="onRefresh"
      ></slide-verify>
    </el-card>


    <div style="width: 500px; height: 400px; background-color: lightyellow; border-radius: 10px; padding: 50px; margin: 150px auto">
      <div style="margin: 30px; text-align: center; font-size: 30px; font-weight: bold; color:dodgerblue">登 录</div>
      <el-form :model="admin" :rules="rules" ref="LoginForm">
        <el-form-item prop="username">
          <el-input placeholder="请输入账号" size="medium" prefix-icon="el-icon-user" v-model="admin.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" show-password size="medium" prefix-icon="el-icon-lock" v-model="admin.password"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button style="width: 100%" size="medium" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import request from "@/utils/request";
import Cookies from 'js-cookie'

export default{
  name:'LOGIN',
  data(){
    return{
      loginAdmin: {},
      admin: {},
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 10,message:'长度在2-10个字符',trigger: 'blur'}
        ],
        password:[
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 2, max: 10,message:'长度在2-10个字符',trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    login(){
      this.$refs['LoginForm'].validate((valid) => {  //校验
        if (valid) {
          request.post('/admin/login',this.admin).then(res =>{
            if(res.code === '200'){
              this.loginAdmin = res.data //出现滑块组件
            }else {
              this.$notify.error(res.msg)
            }
          }).catch((error)=>{
            console.log(error)
          })
        }
      })

    },
    onSuccess() {
      Cookies.set('admin',JSON.stringify(this.loginAdmin))
      this.$notify.success("登录成功")
      this.$router.push('/')
    },
    onFail() {
      console.log('onFail')
    },
    onRefresh() {
      console.log('refresh')
    }
  }
}
</script>

<style>
.cover{
  width: fit-content;
  background-color: white;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 1000;
}
</style>