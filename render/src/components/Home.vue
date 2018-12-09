<template>
  <div class="main">
    <div class="title">
      NodeJs Generator for Vue.element-ui-form
    </div>
    <div class="subtitle">
      @author chendm
    </div>
    <div class="content">
      <div class="left">
        <el-button type="success"
                   @click.native="dialogTableVisible1 = true"
                   style="margin-bottom: 10px;">从实体类解析字段
        </el-button>
        <el-input
          type="textarea"
          :rows="20"
          placeholder="请输入data字段(JSON)"
          v-model="textarea">
        </el-input>
        <el-button type="success"
                   @click.native="jsonsubmit(1)"
                   style="margin-top: 12px;">提交生成表单
        </el-button>

        <el-button type="success"
                   @click.native="jsonsubmit(2)"
                   style="margin-top: 12px;">提交生成表格
        </el-button>
      </div>
      <div class="right">
        <div class="box" v-for="(item,index) in data" :key="index" v-if="currentGenerate === 1">
          <span>字段: {{submit[index].field}}</span>
          <el-form>
            <el-form-item label="选择组件类型">
              <el-select v-model="submit[index].componentsstype" placeholder="请选择">
                <el-option
                  v-for="item in componentss"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <!-- input框属性 start-->
            <el-form-item label="placeholder属性">
              <el-input v-model="submit[index].placeholder"
                        placeholder="请输入内容(不填则使用默认语句)"></el-input>
            </el-form-item>

            <el-form-item label="显示label值">
              <el-input v-model="submit[index].label" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item label="是否需要校验">
              <el-switch
                v-model="submit[index].valid"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>

            <el-form-item label="是否必填" v-show="submit[index].valid">
              <el-switch
                v-model="submit[index].required"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>

            <el-form-item label="控制字符数量(不填则不限制)" v-show="submit[index].valid"><br/>
              大于
              <el-input v-model.number="submit[index].min"
                        type="number" placeholder="请输入数字"></el-input>
              小于
              <el-input v-model.number="submit[index].max"
                        type="number" placeholder="请输入数字"></el-input>
            </el-form-item>
            <!-- input框属性 end-->

            <!-- select选择框属性 start -->
            <div class="selectedbox"
                 style="overflow: hidden"
                 v-show="submit[index].componentsstype === 2
                 || submit[index].componentsstype === 4
                 || submit[index].componentsstype === 5">
              <span>选择框选项</span>
              <div style="margin-left: 30px;">
                {{submit[index].selectvalue}}
              </div>
              <el-button type="success"
                         @click.native="dialogTableVisible = true;currentindex = index"
                         style="float: right; margin-top: 12px;">
                新增key:value
              </el-button>
            </div>
            <!-- select选择框属性 end -->

            <!-- textarea选择框属性 start -->
            <el-form-item label="初始行数" v-show="submit[index].componentsstype === 3">
              <el-input v-model.number="submit[index].rows"
                        type="number" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="是否可以拖动大小" v-show="submit[index].componentsstype === 3">
              <el-switch
                v-model="submit[index].drag"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <!-- textarea选择框属性 end -->
          </el-form>
        </div>
        <div class="box" v-for="(item,index) in data" :key="index" v-if="currentGenerate === 2">
          <span>字段: {{item.field}}</span>
          <el-form>
            <el-form-item label="输入显示值(通常为中文)">
              <el-input v-model="tablesubmit[index].label"
                        placeholder="请输入内容(不填则使用默认语句)"></el-input>
            </el-form-item>
            <el-form-item label="是否需要render函数（自定义时使用）">
              <el-switch
                v-model="tablesubmit[index].needrender"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-form>
        </div>
        <el-form v-if="currentGenerate === 2">
          <el-form-item label="是否需要'操作'按钮?">
            <el-switch
              v-model="dialogTableVisible2"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item label="操作函数">
            {{tableoperate}}
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item>
            <el-col :span="24">
              <el-button type="danger"
                         @click.native="generate"
                         style="width: 100%;margin-top: 20px;">
                Generate!
              </el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <div class="result">
        template部分：
        <el-input
          type="textarea"
          :rows="10"
          v-model="template">
        </el-input>

        script部分：
        <el-input
          type="textarea"
          :rows="10"
          v-model="es">
        </el-input>
      </div>
    </div>
    <el-dialog title="新增key:value" :visible.sync="dialogTableVisible">
      <el-form>
        <el-form-item label="key">
          <el-input v-model="key" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="value">
          <el-input v-model="value" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-col :span="24">
            <el-button type="danger"
                       @click.native="addkv()"
                       style="width: 100%;margin-top: 20px;">
              确定
            </el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="从实体类解析字段" :visible.sync="dialogTableVisible1">
      <el-upload
        class="upload-demo"
        drag
        action="/node/resolve"
        :on-change="onchange"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传java文件，且不超过500kb</div>
      </el-upload>
      <el-button type="danger"
                 @click.native="resolveEntity"
                 style="width: 100%;margin-top: 20px;">
        点击确定直接进行Generate(正在建设...)
      </el-button>
    </el-dialog>

    <el-dialog title="操作按钮部署" :visible.sync="dialogTableVisible2">
      <el-form>
        <el-form-item label="按钮文字">
          <el-input v-model="operateLabel" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="按钮触发的函数（会自动创建一个空函数）">
          <el-input v-model="operateFunc" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-col :span="24">
            <el-button type="danger"
                       @click.native="addOperate"
                       style="width: 100%;margin-top: 20px;">
              确定
            </el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: '',
      template: '',
      es: '',
      data: [], // 表单字段集合（用于生成表单)
      tabledata: [], // 表格字段集合(用于生成表格)
      key: '',
      value: '',
      dialogTableVisible: false,
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      entitycode: '',
      componentss: [
        { value: 1, label: '输入框组件' },
        { value: 2, label: '选择框组件' },
        { value: 3, label: 'textarea组件' },
        { value: 4, label: 'radio组件' },
        { value: 5, label: 'checkbox组件' },
        { value: 6, label: 'timePick组件' },
        { value: 7, label: 'upload上传组件' },
      ],
      selectvalue: [],
      submit: [], // 表单提交参数
      currentindex: 0,
      currentGenerate: 1, // 1生成表单 2生成表格
      tablesubmit: [], // 表格提交参数
      tableoperate: [], // 表格操作参数
      operateLabel: '', // 表格操作label
      operateFunc: '', // 表格操作的函数名
    };
  },
  methods: {
    jsonsubmit(code) {
      this.currentGenerate = code;
      this.postAndJson('/node/getjson', {
        content: this.textarea,
      }).then((res) => {
        this.data = res.data.content;
        this.data.forEach((v) => {
          if (this.currentGenerate === 1) {
            this.submit = [];
            this.submit.push({
              field: v.name,
              componentsstype: 1, // 当前选择的下标
              placeholder: '',
              label: '',
              required: false, // 是否必填
              valid: false, // 是否校验
              min: 0,
              max: 0,
              rows: 0,
              drag: false, // 是否可以拖动
              selectvalue: [], // 选择框选项
            });
          } else {
            this.tablesubmit = [];
            this.tablesubmit.push({
              field: v.name,
              label: '',
              needrender: false,
            });
          }
        });
      });
    },
    // 新增选择框key value
    addkv() {
      this.submit[this.currentindex].selectvalue.push({
        value: this.value,
        label: this.key,
      });
      this.key = '';
      this.value = '';
      this.dialogTableVisible = false;
    },
    addOperate() {
      this.tableoperate.push({
        label: this.operateLabel,
        func: this.operateFunc,
      });
      this.operateLabel = '';
      this.operateFunc = '';
      this.dialogTableVisible2 = false;
    },
    generate() {
      if (this.currentGenerate === 1) {
        this.postAndJson('/node/generate', this.submit).then((res) => {
          this.template = res.data.template;
          this.es = res.data.es;
        });
      } else {
        this.postAndJson('/node/generateTable', {
          table: this.tablesubmit,
          operate: this.tableoperate,
        }).then((res) => {
          this.template = res.data.template;
          this.es = res.data.es;
        });
      }
    },
    // 解析实体类代码
    resolveEntity() {
      this.$confirm('该功能在建设中...', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      });
    },
    onchange(file) {
      console.log(file);
    },
  },
};
</script>

<style>
  * {
    font-family: Consolas;
  }

  .main {
    margin: 0 30px
  }

  .title {
    font-size: 30px;
    text-align: center;
    font-weight: 600;
  }

  .subtitle {
    font-size: 20px;
    text-align: right;
    color: #ee8fac;
  }

  .content {
    display: flex;
  }

  .content .right {
    margin-left: 50px;
    width: 350px;
  }

  .content .left {
    width: 350px;
  }

  .box .title {
    font-size: 20px;
  }

  .box form {
    margin-left: 40px;
  }

  .result {
    margin-left: 60px;
    width: 50%;
  }

  .result textarea {
    width: 100%;
  }
</style>
