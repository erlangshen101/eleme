<template>
<transition name="mei">
  <div class="food" v-if="show_svc">
      <div class="food-x" @click="$emit('cli')">
          <img src="https://fuss10.elemecdn.com/8/ba/bcfa8cc62b20e044bd2ea1c1c7f3dpng.png?imageMogr/format/webp/" alt="">
      </div>
      <div class="food-box">
        <img :src="svc.image_path" alt="">
        <div class="food-list">
            <h2>{{svc.name}}</h2>
            <div class="yue">
                <span>月售{{svc.month_sales}}</span>
                <span>好评率{{svc.satisfy_rate}}%</span>
            </div>
            <div class="qn">
                <span v-for="(val,index) in svc.specfoods" :key="index">￥{{val.price}}</span>
                <Calculation :content="svc"/>
            </div>
            <p class="tit">{{svc.description}}</p>
        </div>
      </div>
  </div>
</transition>
</template>

<script>
import Calculation from '../../components/Shops/Calculation'
export default {
    props: {
        svc:Object,
        show_svc: Boolean,
    },
    created() {
        console.log(this.svc)
    },
    components: {
        Calculation
    }
}
</script>

<style scoped>
.food {
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: calc(100% - 48px);
}
.food-x{
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 50px;
    width: 22px;
    height: 22px;
    padding: 3px;
    position: absolute;
    top: 15px;
    right: 15px;
}
.food-x img {
    width: 100%;
    height: 100%;
}
.food-box img {
    width: 100%;
    height: 375px;
}
.food-list {
    padding: 15px 15px 0 15px;
    width: 100%;
    height: 110px;
    box-sizing: border-box;
}
.food-list h2 {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 8px;
}
.yue {
    color: #666;
    margin-bottom: 8px;
}
.qn {
    color: #ff5339;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.tit {
    color: #666;
}
.mei-enter-active, .mei-leave-active {
   transition: all 0.3s;
}
.mei-enter, .mei-leave-to  {
   transition: all 0.3s;
  transform: translateY(630px);
}
</style>