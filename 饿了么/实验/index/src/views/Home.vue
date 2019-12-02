<template>
  <div class="home">
    <!-- 头部导航 -->
    <header>
      <div class="address_map" @click="$router.push({name:'address',params:{city:city}})">
        <i class="fa fa-map-marker"></i>
        <span >{{address}}</span>
        <i class="fa fa-sort-desc"></i>
      </div>
    </header>
    <!-- 搜索 -->
    <div class="chazhao" :class="{'ding':ding}" @click="$router.push('Seach')">
      <div class="chazhao-box"> 
        <i class="fa fa-search"></i>
        <span>搜索商家，商品名称</span>
      </div>
    </div>
    <!-- swipe 轮播 -->
    <div class="swipe-box">
      <!-- 首层轮播 -->
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in SwipeImg" :key="index">
          <img :src="item" alt="">
        </mt-swipe-item>
      </mt-swipe>
      <!-- 商品轮播 -->
      <mt-swipe :auto="0" class="swipe-con">
        <mt-swipe-item v-for="(item,index) in entries" :key="index" class="swipe-lit">
            <div class="foodentry" v-for="(val,i) in entries[index]" :key="i">
              <img :src="val.image" alt="">
              <span>{{val.name}}</span>
            </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 商家推荐标题 -->
    <div class="business-title">
      <h4>商家推荐</h4>
    </div>
    <!-- 筛选列表 -->
    <div class="screen-box">
      <ScreenList :filterData="filterData" @ding="dings" @codes="codea"/>
    </div>
    <!-- 商铺 -->
    <mt-loadmore 
      :top-method="loadTop"   
      :bottom-method="loadBottom" 
      :bottomAllLoaded="allLoaded" 
      :bottomPullText="bottomPullText"
      ref="loadmore">
        <IndexShop :shops="shops" />
    </mt-loadmore>
  </div>
</template>

<script>
import ScreenList from '../components/ScreenList'
import IndexShop from '../components/IndexShop'
import { Swipe, SwipeItem ,Loadmore } from 'mint-ui';
export default {
  data () {
    return {
      SwipeImg: [],      //首层轮播
      entries: [],       //商品轮播
      filterData: null,  //筛选全部内容
      ding:false,        //搜索置顶
      allLoaded:false,   //上拉加载 为true 没数据
      shops:[],          //商铺
      page:1,            //第一页
      size:5,            //5条
      data:null,         //筛选信息
      bottomPullText:    "上拉加载吃不完"
    }
  },
  created () {
    this.getData ()
    this.loadTop ()
  },
  methods: {
    getData () {
      // 请求轮播图
      this.$axios("/api/profile/shopping").then(res => {
        // 首层轮播
        this.SwipeImg = res.data.swipeImgs
        // 商品轮播
        this.entries = res.data.entries
      })
      // 请求筛选列表
      this.$axios('/api/profile/filter').then(res => {
        // console.log(res.data)
        this.filterData = res.data
      })
    },
    dings (ding) {
      // 搜索置顶
      this.ding = ding
    },
    codea(item) {
      this.data = item
      this.loadTop ()
    },
    // 下拉刷新
    loadTop () {
      this.page = 1
      this.allLoaded = false
      this.bottomPullText="上拉加载更多数据"
      this.$axios.post(`/api/profile/restaurants/${this.page}/${this.size}`,this.data)
      .then(res => {
        this.shops = res.data
        this.$refs.loadmore.onTopLoaded();
      })
    },
    // 上拉加载
    loadBottom () {
      this.page ++
      this.$axios.post(`/api/profile/restaurants/${this.page}/${this.size}`,this.data)
      .then(res => {
        if (res.data.length == 5) {
          res.data.forEach (item => {
            this.shops.push(item)
            this.$refs.loadmore.onBottomLoaded();
          })
        } else {
          res.data.forEach (item => {
            this.shops.push(item)
          })
          this.$refs.loadmore.onBottomLoaded();
          console.log(888)
          this.bottomPullText = "没有更多数据了"
          this.allLoaded = true
        }

      })
    }
  },
  computed: {
    address() {
      return this.$store.getters.address
    },
    city() {
      return this.$store.getters.location.addressComponent.province
    },
  },
  components: {
    ScreenList,
    IndexShop
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%
}
header {
  background: #009eef;
  width: 100%-20px;
  padding: 10px;
}
.address_map {
  color: #fff;
  font-weight: 600;
  font-size: 14px;
}
.fa-map-marker {
  margin-right: 5px;
}
.address_map span {
  display: inline-block;
  width: 250px;
  margin-right: 5px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.chazhao {
  width: 100%;
  background: #009eef;
  height: 45px;
  padding: 7px 10px;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index:666;
}
.chazhao-box {
  background: #fff;
  height: 30px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;  
}
.fa-search {
  margin-right: 5px;
}
.swipe-box {
  background: #fff;
}
.mint-swipe {
  height: 100px;
}
.mint-swipe-item img {
  width: 100%;
  height: 100%;
}
.foodentry {
  width: 50px;
  height: 60px;
  margin: 3px 5px;
  font-size: 12px;
  text-align: center;
}
.foodentry img {
  width: 50px;
  height: 40px;
}
.swipe-lit {
  display:inline-flex !important;
  flex-wrap: wrap;
  padding: 5px;
}
.swipe-con {
  height: 150px;
}
.business-title {
  height: 30px;
  text-align: center;
  font-size: 18px;
  line-height: 30px;
  background: #fff;
}
.business-title h4::after {
  display: inline-block;   
  content: "一";
  width: 40px;
}
.business-title h4::before {
  display: inline-block;   
  content: "一";
  width: 40px;
}
.ding {
  position: fixed;
  top: 0;
  z-index: 999;
}
.mint-loadmore {
  overflow: auto;
  height: 530px;
}
</style>