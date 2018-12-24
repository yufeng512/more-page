<template>
  <div>
    <div></div>
    <div class="input-item">
      <span>姓名*</span>
      <div class="input-box">
        <input type="number" placeholder="请输入您的姓名">
      </div>
    </div>
    <div class="input-item">
      <span>手机号码*</span>
      <div class="input-box">
        <input type="number" placeholder="请输入您的手机号码">
      </div>
    </div>
    <div class="input-item">
      <span>生日*</span>
      <div class="input-box">
        <input type="number" placeholder="请输入您的生日">
      </div>
    </div>
    <div class="input-item">
      <span>性别*</span>
      <div class="input-box">
        <el-select v-model="sex" placeholder="请选择性别" size="small">
          <el-option
            v-for="item in sexList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="input-item">
      <span>省市区</span>
      <div class="input-box">
        <el-select v-model="sex" placeholder="请选择" size="small">
          <el-option
            v-for="item in sexList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="sex" placeholder="请选择" size="small">
          <el-option
            v-for="item in sexList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="sex" placeholder="请选择" size="small">
          <el-option
            v-for="item in sexList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="input-item">
      <span>详细地址*</span>
      <div class="input-box">
        <input type="number" placeholder="请输入您的地址">
      </div>
    </div>
    <div class="btn-item flex-box">
      <button>提交信息</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sex: "",
      sexList: [{ label: "男", value: 1 }, { label: "女", value: 0 }]
    };
  }
};
</script>
<style lang="sass" scoped>
.btn-item
  margin-top: 20px
  padding: 0 20px
  button
    outline: none
    border: #999999
    padding: 0 20px
    border-radius: 4px
    background: #999999
    color: #ffffff
    height: 32px
    flex: 1
.input-item
  margin-top: 20px
  padding: 0 20px
  span
    font-size: 14px
    color: #666666
    display: block
    margin-bottom: 8px
  .input-box
    display: flex
    .el-select
      width: 100%
      &:nth-child(2)
        margin: 0 10px
    input
      border: 1px solid #dcdfe6
      height: 30px
      line-height: 30px
      border-radius: 4px
      flex: 1 0 auto
      outline: none
      text-indent: 6px
      display: block
      font-size: 12px
    button
      outline: none
      border: #999999
      padding: 0 20px
      border-radius: 4px
      background: #999999
      color: #ffffff
      height: 32px
      margin-left: 10px
</style>

