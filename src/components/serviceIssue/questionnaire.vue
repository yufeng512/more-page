<template>
    <div class="issue-box">
        <p>感谢您近期光临欧舒丹，根据您此次的购物体验，您是否愿意推举欧舒丹给您的家人或朋友？</p>
        <div>
            <el-radio-group v-model="info.selectRadio" @change="onChange" >
              <el-radio :label="1">0-6购物体验差，我完全不会推荐给好友</el-radio>
              <el-radio :label="2">7-8购物体验适中，我可能会推荐给好友</el-radio>
              <el-radio :label="3">9-10购物体验感很好，我肯定会推荐给朋友</el-radio>
            </el-radio-group>
        </div>
        <div v-if="isShow">
          <p v-if="isShowList1">您认为我们在哪些方面可以做出改善（请填写至多3项</p>
          <p v-if="isShowList2">请与我们分享，最令您满意的3点</p>
          <el-checkbox-group v-model="info.value1" :max="3">
            <el-checkbox v-for="item in list" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
          <p v-if="isShowList1">很遗憾未能为您带来满意的购物体验，请给予我们改进的机会，可以留下您宝贵的意见或建议吗？</p>
          <p v-if="isShowList2">很高兴能为您带来满意的购物体验，您能告诉我们哪方面最令您满意吗？</p>
          <div class="input-box">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="info.textarea1"> </el-input>
          </div>
          <h4>其他，请补充：</h4>
          <div class="input-box">
            <el-input type="textarea" :rows="2" placeholder="请输入补充内容" v-model="info.textarea2"> </el-input>
          </div>
          <p>请在下方空格中对美容顾问的服务满意度打分。如对美容顾问有任何意见或建议，也请一并告知哦 分值：（完全不满意）0-10（非常满意）</p>
          <div class="input-box">
            <el-input type="text" :rows="2" placeholder="请输入分值" v-model="info.num"> </el-input>
          </div>
          <div class="btn-box">
            <el-button type="primary" @click="submit">提交</el-button>
          </div>
        </div>
    </div>
</template>
<script>
import { getMemberScoreQuery } from '@/api/memberCenter/index'
export default {
    data () {
        return {
          info: {
            selectRadio : '',
            value1: [],
            textarea1: '',
            textarea2: '',
            num: '',
          },
          isShow: false,
          isShowList1: false,
          isShowList2: false,
          list1: ['产品种类不够齐全，库存不足', '美容顾问服务的专业性待提高','会员制度缺乏吸引力','结账流程繁琐缺乏效率','店铺的位置和环境一般','提供的小样不符合肌肤需求（如果有）','商品陈列与展示不够突出'],
          list2: ['产品种类与存货', '美容顾问专业度','具有吸引力的会员制度','结账流程顺畅有效率','门店位置与环境','提供符合肌肤需求的小样（如果有）','商品陈列与展示']
        }
    },
    methods:{
        onChange (key) {
          console.log(key)
          this.isShow = true
          this.info.value1 = []
          if(key == 1 || key == 2) {
            this.isShowList1 = true
            this.isShowList2 = false
            this.list = this.list1
          }else{
            this.isShowList1 = false
            this.isShowList2 = true
            this.list = this.list2
          }
        },
        submit () {
          console.log(this.info)
        }
    },
    mounted () {
    }
}
</script>
<style lang="sass" scoped>
.el-radio,
.el-checkbox
  margin: 15px 0
  display: block
.issue-box
  padding: 10px 15px
  p
    font-size: 14px
    color: #333333
    line-height: 22px
  h4
    font-size: 14px
    color: #333333
    line-height: 22px
    margin: 10px 0
  .input-box
    margin: 10px 0
  .btn-box 
    margin-top: 10px
    button
      width: 100%
</style>