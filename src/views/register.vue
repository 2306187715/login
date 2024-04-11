<template>
  <el-container>
    <el-header>register</el-header>
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
        <el-form-item label="账号" prop="username">
          <el-input
            v-model="Form.username"
            placeholder="Username"
            type="text"
            tabindex="1"
            auto-complete="on"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
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
        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="Form.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <!-- 注册按钮 -->
          <el-button url="" @click="RegisterFunc('Form')">注册</el-button>
        </el-form-item>
      </el-form></el-main
    >
  </el-container>
</template>


<script>
import { Login, Register } from "@/api/api";

export default {
  data() {
    // 密码验证
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.Form.checkPass !== "") {
          this.$refs.Form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.Form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      //表单
      Form: {
        username: "",
        password: "",
        checkPass: "",
      },
      loading: false,
      //校验规则
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
          { min: 3, max: 16, message: "用户名为:3-16位", trigger: "blur" },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码呢" },
          { min: 3, max: 16, message: "密码为:3-16位", trigger: "blur" },
          { validator: validatePass, trigger: "blur" },
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],

      },
    };
  },
  methods: {
    //注册button
    RegisterFunc(From) {
      this.$refs[From].validate((valid) => {
        if (valid) {
          // this.$message.success("正在注册");
          this.loading = true;

          //调用后端接口
          Register(this.Form).then((result) => {
            console.log(result);
            if (result.data.code == 1) {
              this.$message.success("注册成功");
              this.$router.push("/login");
            } else {
              this.loading = false;
              this.Form.password = "";
              this.Form.checkPass = "";
              this.$message.error("用户名已存在");
            }
          });
        } else {
          this.$message({
            type: "error",
            message: "请设置密码",
          });

          return false;
        }
      });
    },
  },
};
</script>



<style>
#centered-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
</style>