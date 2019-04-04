<template>
    <div class="issue-box">
        <div class="bg">
          <img src="@/assets/quest_bg.png" alt="">
        </div>
        <div class="container" v-if="isShowText">
          <p>感谢您近期光临欧舒丹，根据您此次的购物体验，您是否愿意推举欧舒丹给您的家人或朋友？</p>
          <div>
              <el-radio-group v-model="info.buyFeel" @change="onChange" >
                <el-radio label="1">购物体验差，我完全不会推荐给好友</el-radio>
                <el-radio label="2">购物体验适中，我可能会推荐给好友</el-radio>
                <el-radio label="3">购物体验感很好，我肯定会推荐给朋友</el-radio>
              </el-radio-group>
          </div>
          <div v-if="isShow">
            <p v-if="isShowList1">很遗憾未能为您带来满意的购物体验，请给予我们改进的机会，可以留下您宝贵的意见或建议吗？</p>
            <p v-if="isShowList2">很高兴能为您带来满意的购物体验，您能告诉我们哪方面最令您满意吗？</p>
            <div class="input-box">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="info.experienceRemark"> </el-input>
            </div>
            <p v-if="isShowList1">您认为我们在哪些方面可以做出改善（请填写至多3项</p>
            <p v-if="isShowList2">请与我们分享，最令您满意的3点</p>
            <el-checkbox-group v-model="selectValue" :max="3">
              <el-checkbox v-for="item in list" :label="item.value" :key="item.value">{{item.text}}</el-checkbox>
            </el-checkbox-group>
            <h4>其他，请补充：</h4>
            <div class="input-box">
              <el-input type="textarea" :rows="2" placeholder="请输入补充内容" v-model="info.otherRemark"> </el-input>
            </div>
            <p>根据您此次的购物体验，请对美容顾问的服务满意度打分 分值：<br>(完全不满意) 0-10 (非常满意)</p>
            <div>
                <el-radio-group v-model="info.points">
                  <el-radio label="1">0-6</el-radio>
                  <el-radio label="2">7-8</el-radio>
                  <el-radio label="3">9-10</el-radio>
                </el-radio-group>
            </div>
            <p>请在下方空格中对美容顾问的服务满意度打分。如对美容顾问有任何意见或建议，也请一并告知哦 分值：<br>(完全不满意) 0-10 (非常满意)</p>
            <div class="input-box">
              <el-input type="textarea" :rows="2" placeholder="请输入意见或建议" v-model="info.remark"> </el-input>
            </div>
            <div class="btn-box">
              <el-button type="primary" @click="submit">提交</el-button>
            </div>
          </div>
        </div>
        <div class="text-box" v-else>
          感谢您参与此次活动评价，我们会再努力的！
        </div>
    </div>
</template>
<script>
import { addQuestion } from '@/api/common.js'
export default {
    data () {
        return {
          info: {
            buyFeel: '',
            experienceRemark: '',
            otherRemark: '',
            points: '',
            remark: ''
          },
          isShowText: true,
          selectValue: [],
          list: [],
          isShow: false,
          isShowList1: false,
          isShowList2: false,
          list1: [
            {text:'产品种类不够齐全，库存不足',value: 1},
            {text:'美容顾问服务的专业性待提高',value: 2},
            {text:'会员制度缺乏吸引力',value: 3},
            {text:'结账流程繁琐缺乏效率',value: 4},
            {text:'店铺的位置和环境一般',value: 5},
            {text:'提供的小样不符合肌肤需求（如果有）',value: 6},
            {text:'商品陈列与展示不够突出',value: 7},
          ],
          list2: [
            {text:'产品种类与存货', value: 1},
            {text:'美容顾问专业度',value: 2},
            {text:'具有吸引力的会员制度',value: 3},
            {text:'结账流程顺畅有效率',value: 4},
            {text:'门店位置与环境',value: 5},
            {text:'提供符合肌肤需求的小样（如果有）',value: 6},
            {text:'商品陈列与展示',value: 7}
          ]
        }
    },
    methods:{
        onChange (key) {
          console.log(key)
          this.isShow = true
          this.info.points = ''
          this.selectValue = []
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
          if (this.selectValue.length==0){
            this.$toast('请至少选中一条');
            return false
          }
          if (this.info.points == '') {
            this.$toast('请输入分值');
            return false
          }
          if (!(/(^[1-9]\d*$)/.test(this.info.points))) { 
              this.$toast('输入的不是正整数');
    　　　　　　return false; 
    　　　　}
          if (this.info.points>10){
              this.$toast('输入的最大分值为10');
              return false; 
          }
          if (this.info.buyFeel == 1||this.info.buyFeel == 2){
            this.info.perfectView = this.selectValue.join(',')
            this.info.satisfyOptions = ''
          }else{
            this.info.perfectView = ''
            this.info.satisfyOptions = this.selectValue.join(',')
          }
          this.info.openId = localStorage.getItem("openId")
          this.info.campaignid = localStorage.getItem("campaignId")
          addQuestion(this.info).then(res=>{
            if(res.code == 0){
              this.$toast('评价完成');
              this.isShowText = false
            }else{
              this.$toast('评价失败');
            }
          })
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
  color: #000000

.issue-box
  position: relative
  width: 100%
  height: 100%
  .bg
    position: fixed
    top: 0
    z-index: 0
    img
      width: 100%
      height: 100%
  .text-box
    position: absolute
    height: 60px
    line-height: 60px
    width: 100%
    text-align: center
  .container
    position: absolute
    top: 0
    left: 5%
    width: 90%
    height: 100%
    z-index: 1
    padding: 20px 0
    p
      font-size: 14px
      color: #000000
      line-height: 22px
    h4
      font-size: 14px
      color: #000000
      line-height: 22px
      margin: 10px 0
    .input-box
      margin: 10px 0
    .btn-box 
      margin-top: 10px
      button
        width: 100%
        margin-bottom: 30px
</style>