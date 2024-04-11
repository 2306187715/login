<template>
  <div class="bigBox">
    <el-container id="Box">
      <el-header id="title">login</el-header>
       <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
      <!-- 最外层 -->
      <el-main id="centered-content"
        ><el-form
          :model="Form"
          :rules="loginRules"
          ref="Form"
          layout-center
          label-width="100px"
          label-position="left"
        >
          <!-- 账号 -->
          <el-form-item label="账号" prop="username" class="name">
            <el-input
              v-model="Form.username"
              placeholder="Username"
              type="text"
              tabindex="1"
              auto-complete="on"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="password" class="pwd">
            <el-input
              v-model="Form.password"
              placeholder="Password"
              type="password"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup="LoginFunc('Form')"
            ></el-input>
          </el-form-item>
          <!-- 登录按钮 -->
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              @click="LoginFunc('Form')"
              id="log"
              >登录</el-button
            >
            <!-- 注册按钮 -->
            <el-button url="" @click="ToRegister()" class="reg" id="reg">注册</el-button>
          </el-form-item>
        </el-form></el-main
      >
    </el-container>
  </div>
</template>


<script>
import { Login } from "@/api/api";
import { setToken } from '@/utils/auth';

export default {
  data() {
    return {
      //表单
      Form: {
        username: "",
        password: "",
      },
      loading: false,
      //校验规则
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
          { min: 3, max: 16, message: "用户名为:3-16位", trigger: "blur" },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码" },
          { min: 3, max: 16, message: "密码为:3-16位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 登录
    LoginFunc(From) {
      this.$refs[From].validate((valid) => {
        if (valid) {
          this.loading = true;

          //调用后端接口
          Login(this.Form).then((result) => {
            console.log(result);
            if (result.data.code == 1) {
              setToken(result.data.data)
              this.$message.success("登陆成功");
              this.$router.push("/dashboard");
            } else {
              this.loading = false;
              this.Form.password = "";
              this.$message({
                type: "error",
                message: "账号或密码错误",
              });
            }
          });
        } else {
          this.$message({
            type: "error",
            message: "请输入密码",
          });

          return false;
        }
      });
    },
    ToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>



<style>
/* * {
  background: rgb(24, 26, 27);
} */
#centered-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

/* #log {
  background: transparent;
  border-color: rgb(104, 102, 99);

}
#reg {
  background: transparent;
  border-color: rgb(152, 60, 125);

}
.name .el-form-item__label{
  color:white;
}

#input-border-style{
  background: rgb(24, 26, 27);
  border-color: rgb(104, 102, 99);
}

.pwd .el-form-item__label{
  color:white;
}
#title{
  color: white;
} */
</style>