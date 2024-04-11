<template>
  <el-container>
    <!-- header -->
    <el-header>
      <div class="grid-content bg-purple">home</div>
    </el-header>
    <el-divider><i class="el-icon-mobile-phone"></i></el-divider>

    <!-- main -->
    <el-main id="centered-content">
      <el-row :gutter="100">
        <el-col :span="50"
          ><div class="grid-content bg-purple">
            <el-button type="success" @click="echo()">修改密码</el-button>
          </div></el-col
        >
        <!-- logout -->
        <el-col :span="50"
          ><div class="grid-content bg-purple">
            <el-button type="warning" @click="logout()">退出登录</el-button>
          </div></el-col
        >
        <el-col :span="50"
          ><div class="grid-content bg-purple">
            <el-button type="danger" @click="dialogVisible = true"
              >删除此用户</el-button
            >
          </div></el-col
        >
      </el-row>

      <!-- dialog -->
      <!-- 修改密码 dialog-form -->
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="username">
            <el-input
              type="text"
              v-model="ruleForm.username"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 删除此用户 -->
      <el-dialog
        title="是否删除此用户？"
        :visible.sync="dialogVisible"
        width="20%"
        :before-close="handleClose"
      >
        <span>是否删除此用户？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteUser()"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import { getToken, removeToken } from "@/utils/auth";
import { Update, deleteByUsername} from "@/api/api";

export default {
  data() {
    // 密码验证
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      dialogFormVisible: false,
      dialogVisible: false,
      ruleForm: {
        username: "",
        password: "",
        checkPass: "",
      },
      // 二次密码判断规则
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    echo() {
      //解析jwt获得username
      // var token = getToken();
      // var userPojo = JSON.parse(
      //   decodeURIComponent(window.atob(token.split(".")[1]))
      // );
      this.dialogFormVisible = true;
      // this.ruleForm.username = userPojo.username;
      this.ruleForm.username = JSON.parse(
        decodeURIComponent(window.atob(getToken().split(".")[1]))
      ).username;
    },
    reLogin() {
      this.$notify({
        title: "修改成功",
        message: "请重新登录",
        type: "success",
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          console.log(valid);
          this.$message.success("正在修改");
          Update(this.ruleForm).then((res) => {
            if (res.data.code == 1) {
              this.reLogin();
              this.$router.replace("/login");
            } else {
              this.$message.error("修改失败");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    logout() {
      removeToken();
      this.$message.error("退出成功");
      this.$router.push("/login");
    },
    deleteUser() {
      this.dialogVisible = true;
      this.ruleForm.username = JSON.parse(
        decodeURIComponent(window.atob(getToken().split(".")[1]))
      ).username;
      deleteByUsername(this.ruleForm.username).then((res)=>{
        if(res.data.code == 1){
          this.$message.success("删除成功");
          this.$router.replace('/login')
        }
      })
    },
  },

  mounted() {
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