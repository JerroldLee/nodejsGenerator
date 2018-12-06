<template>
  <el-form :model="ruleForm"
           :rules="rules"
           ref="ruleForm"
           label-width="100px"
           class="demo-ruleForm">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item label="民族" prop="region">
      <el-select v-model="ruleForm.region" placeholder="请选择民族">
        <el-option key="1" label="汉" value="1"></el-option>
        <el-option key="2" label="苗" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="生日" prop="date1">
      <el-date-picker
        v-model="ruleForm.date1"
        type="date"
        placeholder="请选择生日">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="种群" prop="date2">
      <el-input v-model="ruleForm.date2" placeholder="请输入种群"></el-input>
    </el-form-item>
    <el-button type="primary" @click.native="submit('ruleForm')">确定</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        region: [
          { required: true, message: '请输入民族', trigger: 'blur' },
        ],
        date1: [
          { required: true, message: '请输入生日', trigger: 'blur' },
        ],
        date2: [
          { required: true, message: '请输入种群', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
        ],
      },
    };
  },
};
</script>
