<template>
  <div class="app-container">
    <el-form ref="ruleForm" v-loading="loading" :model="ruleForm" :rules="rules" label-width="100px">

      <el-form-item label="学生" prop="proprietor">
        <el-select v-model="ruleForm.proprietor" placeholder="请选择学生" @change="selectGet">
          <el-option
            v-for="item in accountList"
            :key="item.accountId"
            :label="item.userName"
            :value="item.accountId"
          >
            <span style="float: left">{{ item.userName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.accountId }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程名称" prop="courseName">
        <el-input v-model="ruleForm.courseName"></el-input>
      </el-form-item>
      <el-form-item label="课程学分" prop="totalArea">
        <el-input-number v-model="ruleForm.totalArea" :precision="2" :step="0.1" :min="0" />
      </el-form-item>
      <el-form-item label="课程成绩" prop="livingSpace">
        <el-input-number v-model="ruleForm.livingSpace" :precision="2" :step="0.1" :min="0" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登入系统!</el-button>
        <el-button @click="resetForm('ruleForm')">重置!</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { queryAccountList } from '@/api/account'
import { createRealEstate } from '@/api/realEstate'

export default {
  name: 'AddRealeState',
  data() {
    var checkArea = (rule, value, callback) => {
      if (value <= 0) {
        callback(new Error('必须大于0'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        proprietor: '',
        totalArea: 0,
        livingSpace: 0,
        courseName: ''
      },
      accountList: [],
      rules: {
        proprietor: [
          { required: true, message: '请选择学生!', trigger: 'change' }
        ],
        totalArea: [
          { validator: checkArea, trigger: 'blur' }
        ],
        livingSpace: [
          { validator: checkArea, trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'accountId'
    ])
  },
  created() {
    queryAccountList().then(response => {
      if (response !== null) {
        // 过滤掉管理员
        this.accountList = response.filter(item =>
          item.userName !== '管理员'
        )
      }
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否立即登入系统?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            this.loading = true
            createRealEstate({
              accountId: this.accountId,
              proprietor: this.ruleForm.proprietor,
              totalArea: this.ruleForm.totalArea,
              livingSpace: this.ruleForm.livingSpace,
              courseName: this.ruleForm.courseName
            }).then(response => {
              this.loading = false
              if (response !== null) {
                this.$message({
                  type: 'success',
                  message: '登入系统成功!'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '登入系统失败!'
                })
              }
            }).catch(_ => {
              this.loading = false
            })
          }).catch(() => {
            this.loading = false
            this.$message({
              type: 'info',
              message: '已取消登入系统'
            })
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    selectGet(accountId) {
      this.ruleForm.proprietor = accountId
    }
  }
}
</script>

<style scoped>
</style>
