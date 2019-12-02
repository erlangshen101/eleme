<template>
  <div class="Indexshop">
      <ul>
          <li v-for="(item,index) in shops" :key="index" class="Indexshop-box">
              <!-- 👈 图 -->
              <div class="Indexshop-img">
                <img :src="item.restaurant.image_path" alt="">
              </div>
              <!-- 👉 详情 --> 
              <div class="Indexshop-details">
                  <!-- 品牌 标题 -->
                  <div class="Indexshop-titile">
                    <span v-if="item.restaurant.is_premium" class="Indexshop-pin">品牌</span>
                    <span>{{item.restaurant.name}}</span>
                  </div>
                    <!-- 星级 月售单 -->
                  <div class="Indexshop-star">
                    <Rationg :Rationgs="item.restaurant.rating"/>
                    <div class="niao">
                        <span>月售{{item.restaurant.recent_order_num}}单</span>
                        <span class="Indexshop-niao" v-if="item.restaurant.delivery_mode">
                            {{item.restaurant.delivery_mode.text}}
                        </span>
                    </div>
                  </div>
                    <!-- 起送 配送 千米 -->
                  <div class="Indexshop-Kilometer">
                      <div>
                          <span>￥{{item.restaurant.float_minimum_order_amount}}起送 |</span>
                          <span> 配送费￥{{item.restaurant.float_delivery_fee}}</span>
                      </div>
                      <div>
                          <span>{{(item.restaurant.distance / 1000).toFixed(2)}} km |</span>
                          <span> {{item.restaurant.order_lead_time}}分钟</span>
                      </div>
                  </div>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
import Rationg from './Rating'
export default {
    props: {
        shops:Array
    },
    components: {
        Rationg
    }
}
</script>

<style scoped>
.Indexshop img{
    width: 70px;
    height: 100%;
}
.Indexshop-img {
    border: 1px solid #ddd;
    padding: 1px;
}
.Indexshop {
    padding: 5px 10px;
    background: #fff;
}
.Indexshop-box {
    height: 85px;
    padding: 5px 0px;
    display: flex;
    flex-direction: row;
}
.Indexshop-details {
    padding: 5px 0;
    margin-left: 5px;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
}
.Indexshop-pin {
    background: yellow;
}
.Indexshop-Kilometer {
    display: flex;
    justify-content: space-between;
    color: #999;
}
.Indexshop-star div{
    display: flex;
}
.Indexshop-niao {
    background: blue;
    color: #fff;
    padding: 2px;
}
.niao {
    display: flex;
    justify-content: space-between;
}
</style>