<template>

  <div class="sorder" v-if="shopInfo">
    <!-- 商品信息 -->
    <div class="sorder-box">
      <div class="sorder-hv" v-for="(item,index) in shopInfo.recommend" :key="index">
        <h1>{{item.name}}</h1>
        <div class="sorder-lb">
            <ul>
              <li v-for="(val,i) in item.items" :key="i" class="sorder-list">
                  <img :src="val.image_path" alt="">
                  <p class="sorder-title">{{val.name}}</p>
                  <div class="hp">
                    <span>月售{{val.month_sales}}</span>
                    <span>好评率{{val.satisfy_rate}}</span>
                  </div>
                  <p class="qian">￥{{val.activity.fixed_price}}</p>
                  <Calculation :content="val"/>
              </li>
            </ul>
        </div>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="sorder-menu" >
      <!-- 左侧 列表 -->
      <div class="menu-zuo" ref="menuz">
        <ul>
          <li :class="{'current':currentIndex === index}" v-for="(val,index) in shopInfo.menu" :key="index" @click="Toscroll(index)">
            <div>
            <img v-if="val.icon_url" :src="val.icon_url" alt="">
            <span>{{val.name}}</span>
            </div>
          </li>
        </ul>
      </div>
      <!-- 右侧 详情 -->
      <div class="menu-you" ref="menuy">
        <ul>
          <li v-for="(item,i) in shopInfo.menu" :key="i" class="food-list-hook">
            <div class="menu-title">
              <strong>{{item.name}}</strong>
              <span>{{item.description}}</span>
            </div>
            <div class="menu-list" @click="xiang(value)" v-for="(value,j) in item.foods" :key="j">
              <img :src="value.image_path" alt="">
              <div class="menu-list-x">
                <h2>{{value.name}}</h2>
                <p>{{value.description}}</p>
                <div class="yuhp">
                  <span>月售{{value.month_sales}}份 </span>
                  <span> 好评率{{value.satisfy_rate}}</span>
                </div>
                <h3 v-for="(val,index) in value.specfoods" :key="index">￥{{val.price}}</h3>
                <Calculation :content="value"/>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 购物车 -->
    <ShopCart :shopInfo="shopInfo" />
    <!-- 详情页 -->
    <Foode :svc="svc" :show_svc="show_svc" @cli="show_svc = false"/>
  </div>
</template>

<script>
import Foode from './Foode'
import Calculation from '../../components/Shops/Calculation'
import ShopCart from './ShopCart'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      shopInfo: null,
      zuoScroll: {}, //左侧滚动对象
      youScroll: {}, //右侧滚动对象
      scrollY: 0 , //右侧菜单当前滚动到的Y值
      listHeight: [], //12个区 列表高度
      svc: null,
      show_svc : false
    };
  },
  created () {
    this.getData ()
  },
  computed: {
    // 根据右侧滚动位置 确定对应下标的索引
    currentIndex() {
      for (let i = 0; i <this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        // 判断是否在两个高度之间
        if (this.scrollY >= height1 && this.scrollY < height2) {
          return i
        }
      }
      return 0
    }
  },
  methods: {
        
    getData () {
      this.$axios('/api/profile/batch_shop').then(res => {
        res.data.recommend.forEach ( item => {
          item.items.forEach (val => {
            val.content = 0
          })
        })

        res.data.menu.forEach (item => {
          item.foods.forEach (val => {
            val.content = 0
          })
        })

        this.shopInfo = res.data
        console.log(this.shopInfo)
        this.$nextTick ( () => {
          this.scroll ()
          //计算12个区域的高度
          this.calculateHeight();
        })
      })
    },
    scroll () {
      this.zuoScroll = new BScroll (".menu-zuo" , {
        click: true
      })
      this.youScroll = new BScroll (".menu-you" , {
        probeType: 3,
        click: true
      })
      this.youScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    Toscroll (index) {
      let el = this.$refs.menuy.getElementsByClassName("food-list-hook")[index]
      this.youScroll.scrollToElement(el,200)
    },
    calculateHeight() {
      let foodlist = this.$refs.menuy.getElementsByClassName("food-list-hook")
      // 每个区域的高度
      let height = 0;
      this.listHeight.push(height)
      for (let i = 0; i <foodlist.length - 1; i++) {
        let item = foodlist[i]
        //累加
        height += item.clientHeight;
        this.listHeight.push(height)
      }
    },
    xiang (value) {
      this.svc = value,
      this.show_svc = true
    }
  },
  components: {
    Calculation,
    ShopCart,
    Foode
  }
}
</script>

<style scoped>
  .sorder {
    height: calc(100% - 20px);
    background: #fff;
  }
  .sorder-hv {
    padding: 15px 0 15px 0px;
  }
  .sorder-hv h1 {
    color: #555;
    font-weight: bold;
    font-size: 16px;
    margin-left: 10px;
  }
  .sorder-lb {
    overflow-x: scroll;
    margin-top: 20px;
  }
  .sorder-lb ul {
    display: flex;
  }
  .sorder-list {
    flex: 0 0 120px;
    margin-left: 10px;
    padding-bottom: 2px;
    height: 180px;
  }
  .sorder-list img {
    width: 100%;
  }
  .sorder-title {
    overflow: hidden;    
    text-overflow:ellipsis;    
    white-space: nowrap;
    width: 120px;
    font-size: 14px;
    color: #333;
  }
  .hp {
    margin-top: 3px;
    color: #666;
    font-size: 12px;
  }
  .qian {
    color: #ff5339;
    margin-top: 10px;
    overflow: hidden;
    float: left;
  }
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  .sorder-menu {
    display: flex;
    height: 626px;
    overflow: hidden;
  }
  .menu-zuo {
    flex: 1;
    background: #f1f1f1;
    height: calc(100% - 48px);
    overflow-y: hidden;
  }
  .menu-you {
    flex: 3.5;
    height: calc(100% - 48px);
    overflow-y: hidden;
  }
  .menu-zuo img {
    width: 13px;
    height: 13px;
    margin-right: 2px;
  }
  .menu-zuo span {
    font-size: 12px;
    color: #666;
    line-height: 14px;
  }
  .menu-zuo{
    overflow-y: hidden;
  }
  .menu-zuo li {
    display: flex;
    align-items: center;
    padding: 17px 5px 17px 7.5px;
  }
  .menu-you li {
    padding: 0 10px;
  }
  .menu-title {
    padding: 7.5px 0;
  }
  .menu-title strong {
    font-weight: 700;
    margin-right: 3px;
    font-size: 14px;
    color: #666;
  }
  .menu-title span {
    font-size: 14px;
    color: #999;
    font-size: 12px;
  }
  .menu-list {
    display: flex;
    padding: 10px 0;
  }
  .menu-list img {
    width: 95px;
    height: 95px;
  }
  .menu-list-x h2 {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
  .menu-list-x p {
    margin: 5px 0;
    font-size: 12px;
    color: #999;
    width: 170px;
    overflow: hidden;    
    text-overflow:ellipsis;    
    white-space: nowrap;
  }
  .menu-list-x span {
    margin: 5px 0;
    font-size: 12px;
    color: #999;
  }
  .menu-list-x {
    width: 100%;
  }
  .menu-list-x h3 {
    color: #ff5339;
    font-size: 16px;
    font-weight: 500;
    display: inline-block;
    margin-top: 8px;
  }
  .yuhp {
    margin-bottom: 10px;
  }
  .menu-zuo .current {
    background: #fff;
    color: #333;
  }
</style>