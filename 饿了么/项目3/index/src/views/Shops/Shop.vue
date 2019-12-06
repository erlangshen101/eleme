<template>
  <div class="shop" v-if="shopInfo">
    <!-- 头部 -->
    <nav class="Header">
      <div class="nav-bg">
        <img :src="shopInfo.rst.scheme" alt="">
      </div>
      <div class="nav-back">
        <i @click="$router.push('/home')" class="fa fa-chevron-left"></i>
      </div>
      <div class="shop_image">
        <img :src="shopInfo.rst.image_path" alt="">
      </div>
    </nav>
    <!-- 商家信息 -->
    <div class="index-rst">
      <div class="rst-name">
        <span @click="showInfoModel = true">{{shopInfo['rst'].name}}</span>
        <i class="fa fa-caret-right"></i>
      </div>
      <!-- 弹窗信息 -->
      <InfoModel @close="showInfoModel = false" :rst="shopInfo['rst']" :showInfoModel="showInfoModel"/>
      <!-- 评分月售 -->
      <div class="rst-order">
        <span>评分{{shopInfo.rst.rating}}</span>
        <span>月售{{shopInfo.rst.recent_order_num}}单</span>
        <span>蜂鸟专送{{shopInfo.rst.order_lead_time}}分钟</span>
      </div>
      <!-- 优惠信息 -->
      <Activity :acrivities="shopInfo.rst.activities"/>
      <!-- 公告 -->
      <p class="pst-promotion">公告:{{shopInfo.rst.promotion_info}}</p>
    </div>
    <!-- nav 导航 -->
    <Navdh />
    <router-view></router-view>
  </div>
</template>

<script>
import InfoModel from '../../components/Shops/InfoModel'
import Activity from '../../components/Shops/Activity'
import Navdh from '../../components/Shops/Navdh'
export default {
  data () {
    return {
      shopInfo: null,
      showInfoModel: false,
    }
  },
  created () {
    this.getData ()
  },
  methods: {
    getData () {
      this.$axios("/api/profile/batch_shop").then (res => {
        this.shopInfo = res.data
      })
    },
  },
  components: {
    InfoModel,
    Activity,
    Navdh
  }
}
</script>

<style scoped>
.Header {
  position: relative;
}
.shop {
  width: 100%;
  overflow: visible;
}
.nav-bg img {
  width: 100%;
}
.shop_image {
  position: absolute;
  left: 50%;
  margin-left: -40px;
  top: 100%;
  top: 70px;
}
.shop_image img {
  width: 80px;
}
.nav-back {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 18px;
  color: #fff;
}
.index-rst {
  background: #fff;
  padding-bottom: 10px;
}
.rst-name {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}
.rst-name span {
  display: inline-block;
  width: 270px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  margin-top: 60px;
}
.rst-order {
  width: 275px;
  margin:10px auto;
  display: flex;
  justify-content: space-evenly;
  color: #666;
}
.pst-promotion {
  margin-left: 55px;
  color: #666;
  font-size: 14px;
}
</style>