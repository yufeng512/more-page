webpackJsonp([1],{"+BTi":function(e,t){},"66N6":function(e,t){},"8jhb":function(e,t){},BNJR:function(e,t){},GXEp:function(e,t){},ITPn:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});i("GXEp"),i("+BTi");var n=i("mtrD"),o=i.n(n),s=(i("X+ky"),i("HJMx")),a=i.n(s),r=(i("TFIm"),i("s3ue")),l=i.n(r),c=(i("dmRH"),i("EKTV")),u=i.n(c),m=(i("BNJR"),i("fDPO")),d=i.n(m),p=(i("8jhb"),i("RDoK")),v=i.n(p),h=i("TXMN"),b=i("/ocq"),f={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var g=i("VU/8")({name:"serviceIssue"},f,!1,function(e){i("dj9I")},null,null).exports,_=(i("JfbQ"),i("7t+N")),x=i.n(_),y="http://wmtuat.eloccitane.com/api/member/";console.log("请求接口地址",y);var w={MemberInsert:y+"mobile/member/insert",MemberUpdate:y+"mobile/member/update",QueryByMobile:y+"mobile/member/queryByMobile/",QueryByOpenId:y+"mobile/member/queryByOpenId/",CurrentCity:y+"mobile/region/currentCity",Provinces:y+"mobile/region/provinces",Cities:y+"mobile/region/cities",Districts:y+"mobile/region/districts",FindByCode:y+"mobile/ba/findByCode/",Query:y+"mobile/campaignDetail/query",Verify:y+"mobile/campaignDetail/verify/",AddMobile:y+"mobile/campaignDetail/addMobile",ListAvailable:y+"mobile/campaign/listAvailable",CounterList:y+"mobile/counter/counterList",Send:y+"mobile/code/send",CodeVerify:y+"mobile/code/verify",Login:y+"mobile/auth/login",MemberInfo:y+"mobile/member/queryByMobile/",Querypoint:y+"mobile/scoreQuery",MemberCoupon:y+"mobile/member/couponQueryByCode",MemberNoCoupon:y+"mobile/member/couponQuery",MemberScoreQuery:y+"mobile/member/scoreQuery",MemberOrderQuery:y+"mobile/member/orderQuery",GetCardSign:y+"mobile/wx/getCardSign",DecryptCode:y+"mobile/wx/decryptCode",addQuestion:y+"mobile/member/addQuestion",hasPartQues:y+"mobile/member/hasPartQues/"},C=i("//Fk"),I=i.n(C),S=i("mtWM"),k=i.n(S);function $(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new I.a(function(i,n){k.a.get(e,{params:t}).then(function(e){i(e.data)}).catch(function(e){n(e)})})}function V(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new I.a(function(i,n){k.a.post(e,t).then(function(e){console.log(e),i(e.data)},function(e){n(e)})})}k.a.defaults.timeout=5e3,k.a.defaults.baseURL="",k.a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded";var L={data:function(){return{}},methods:{submit:function(){var e,t=this,i=t.UrlSearch(),n={openId:localStorage.getItem("openId"),campaignId:i.campaignId};localStorage.setItem("campaignId",i.campaignId||""),(e=n,$(w.hasPartQues+e.openId+"/"+e.campaignId)).then(function(e){e?t.$toast("您已参与过该活动评价"):t.$router.push("questionnaire")})},isLogin:function(){var e=this,t={code:e.UrlSearch().code};x.a.ajax({url:"http://wmtuat.eloccitane.com/api/member/mobile/auth/login",type:"post",data:t,success:function(t){0==t.code&&t.data.member?localStorage.setItem("openId",t.data.openId):e.$toast("登陆失败")},error:function(t){e.$toast(t)}})},UrlSearch:function(){for(var e={},t=location.href,i=t.indexOf("?"),n=(t=t.substr(i+1)).split("&"),o=0;o<n.length;o++)"code"==(i=n[o].split("="))[0]&&(e.code=i[1]),"campaignId"==i[0]&&(e.campaignId=i[1]);return e}},mounted:function(){this.isLogin()}},R={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"issue-box"},[this._m(0),this._v(" "),t("div",{staticClass:"container"},[t("img",{staticClass:"logo-box",attrs:{src:i("ZH0A"),alt:""}}),this._v(" "),t("p",[this._v("欧舒丹会员调查评价")]),this._v(" "),t("div",{staticClass:"btn-box"},[t("el-button",{attrs:{type:"primary"},on:{click:this.submit}},[this._v("点击进入")])],1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"bg"},[t("img",{attrs:{src:i("sVkL"),alt:""}})])}]};var Q={data:function(){return{info:{buyFeel:"",experienceRemark:"",otherRemark:"",points:""},isShowText:!0,selectValue:[],list:[],isShow:!1,isShowList1:!1,isShowList2:!1,list1:[{text:"产品种类不够齐全，库存不足",value:1},{text:"美容顾问服务的专业性待提高",value:2},{text:"会员制度缺乏吸引力",value:3},{text:"结账流程繁琐缺乏效率",value:4},{text:"店铺的位置和环境一般",value:5},{text:"提供的小样不符合肌肤需求（如果有）",value:6},{text:"商品陈列与展示不够突出",value:7}],list2:[{text:"产品种类与存货",value:1},{text:"美容顾问专业度",value:2},{text:"具有吸引力的会员制度",value:3},{text:"结账流程顺畅有效率",value:4},{text:"门店位置与环境",value:5},{text:"提供符合肌肤需求的小样（如果有）",value:6},{text:"商品陈列与展示",value:7}]}},methods:{onChange:function(e){console.log(e),this.isShow=!0,this.selectValue=[],1==e||2==e?(this.isShowList1=!0,this.isShowList2=!1,this.list=this.list1):(this.isShowList1=!1,this.isShowList2=!0,this.list=this.list2)},submit:function(){var e,t=this;return 0==this.selectValue.length?(this.$toast("请至少选中一条"),!1):""==this.info.points?(this.$toast("请输入分值"),!1):/(^[1-9]\d*$)/.test(this.info.points)?this.info.points>10?(this.$toast("输入的最大分值为10"),!1):(1==this.info.buyFeel||2==this.info.buyFeel?(this.info.perfectView=this.selectValue.join(","),this.info.satisfyOptions=""):(this.info.perfectView="",this.info.satisfyOptions=this.selectValue.join(",")),this.info.openId=localStorage.getItem("openId"),this.info.campaignid=localStorage.getItem("campaignId"),void(e=this.info,V(w.addQuestion,e)).then(function(e){0==e.code?(t.$toast("评价完成"),t.isShowText=!1):t.$toast("评价失败")})):(this.$toast("输入的不是正整数"),!1)}},mounted:function(){}},F={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"issue-box"},[e._m(0),e._v(" "),e.isShowText?i("div",{staticClass:"container"},[i("p",[e._v("感谢您近期光临欧舒丹，根据您此次的购物体验，您是否愿意推举欧舒丹给您的家人或朋友？")]),e._v(" "),i("div",[i("el-radio-group",{on:{change:e.onChange},model:{value:e.info.buyFeel,callback:function(t){e.$set(e.info,"buyFeel",t)},expression:"info.buyFeel"}},[i("el-radio",{attrs:{label:"1"}},[e._v("0-6购物体验差，我完全不会推荐给好友")]),e._v(" "),i("el-radio",{attrs:{label:"2"}},[e._v("7-8购物体验适中，我可能会推荐给好友")]),e._v(" "),i("el-radio",{attrs:{label:"3"}},[e._v("9-10购物体验感很好，我肯定会推荐给朋友")])],1)],1),e._v(" "),e.isShow?i("div",[e.isShowList1?i("p",[e._v("您认为我们在哪些方面可以做出改善（请填写至多3项")]):e._e(),e._v(" "),e.isShowList2?i("p",[e._v("请与我们分享，最令您满意的3点")]):e._e(),e._v(" "),i("el-checkbox-group",{attrs:{max:3},model:{value:e.selectValue,callback:function(t){e.selectValue=t},expression:"selectValue"}},e._l(e.list,function(t){return i("el-checkbox",{key:t.value,attrs:{label:t.value}},[e._v(e._s(t.text))])})),e._v(" "),e.isShowList1?i("p",[e._v("很遗憾未能为您带来满意的购物体验，请给予我们改进的机会，可以留下您宝贵的意见或建议吗？")]):e._e(),e._v(" "),e.isShowList2?i("p",[e._v("很高兴能为您带来满意的购物体验，您能告诉我们哪方面最令您满意吗？")]):e._e(),e._v(" "),i("div",{staticClass:"input-box"},[i("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入内容"},model:{value:e.info.experienceRemark,callback:function(t){e.$set(e.info,"experienceRemark",t)},expression:"info.experienceRemark"}})],1),e._v(" "),i("h4",[e._v("其他，请补充：")]),e._v(" "),i("div",{staticClass:"input-box"},[i("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入补充内容"},model:{value:e.info.otherRemark,callback:function(t){e.$set(e.info,"otherRemark",t)},expression:"info.otherRemark"}})],1),e._v(" "),i("p",[e._v("请在下方空格中对美容顾问的服务满意度打分。如对美容顾问有任何意见或建议，也请一并告知哦 分值：（完全不满意）0-10（非常满意）")]),e._v(" "),i("div",{staticClass:"input-box"},[i("el-input",{attrs:{type:"number",rows:2,placeholder:"请输入分值"},model:{value:e.info.points,callback:function(t){e.$set(e.info,"points",t)},expression:"info.points"}})],1),e._v(" "),i("div",{staticClass:"btn-box"},[i("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("提交")])],1)],1):e._e()]):i("div",{staticClass:"text-box"},[e._v("\n      感谢您参与此次活动评价，我们会再努力的！\n    ")])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"bg"},[t("img",{attrs:{src:i("sVkL"),alt:""}})])}]};var M=[{path:"/",component:i("VU/8")(L,R,!1,function(e){i("VvFN")},"data-v-d4ab1038",null).exports},{path:"/questionnaire",component:i("VU/8")(Q,F,!1,function(e){i("R5TP")},"data-v-134bb0b7",null).exports}],T={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{directives:[{name:"show",rawName:"v-show",value:this.visible,expression:"visible"}],staticClass:"dialog-tips dialog-center"},[t("div",[this._v(this._s(this.message))])])},staticRenderFns:[]};var B=i("VU/8")({data:function(){return{visible:!1,message:""}}},T,!1,function(e){i("66N6")},null,null).exports,E={install:function(e){var t=new(e.extend(B));t.$mount(document.createElement("div")),document.body.appendChild(t.$el),e.prototype.$toast=function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3;t.message=e,t.visible=!0,setTimeout(function(){t.visible=!1},i)}}},N=E;h.a.use(N),h.a.use(v.a),h.a.use(d.a),h.a.use(u.a),h.a.use(l.a),h.a.use(a.a),h.a.use(o.a),h.a.use(b.a);var P=new b.a({routes:M});new h.a({el:"#app",router:P,render:function(e){return e(g)}})},JfbQ:function(e,t){},R5TP:function(e,t){},TFIm:function(e,t){},VvFN:function(e,t){},"X+ky":function(e,t){},ZH0A:function(e,t,i){e.exports=i.p+"static/app_img/common/logo_wx.e95b3ed.png"},dj9I:function(e,t){},dmRH:function(e,t){},sVkL:function(e,t,i){e.exports=i.p+"static/app_img/common/quest_bg.2cad94b.png"}},["ITPn"]);
//# sourceMappingURL=serviceIssue.js.map