<template>
  <div class="home">
    <header>
      <div class="address_map" @click="$router.push({name:'address',params:{city:city}})">
        <i class="fa fa-map-marker"></i>
        <span>{{address}}</span>
        <i class="fa fa-sort-desc"></i>
      </div>
    </header>
    <div class="search_warp" :class="{'fixedview':iFixed}"
    @click="$router.push('/Seach')">
      <div class="chazhao">
        <i class="fa fa-search"></i>
        <span>搜索商家，商品名称</span>
      </div>
    </div>
    <div id="container">
      <!-- 轮播 -->
      <mt-swipe :auto="4000" class="swiper">
        <mt-swipe-item v-for="(img,index) in swipeImgs" :key="index">
          <img :src="img" alt="">
        </mt-swipe-item>
      </mt-swipe>
      <!-- 分类 -->
      <mt-swipe :auto="0" class="entries">
        <mt-swipe-item v-for="(val,i) in entries" :key="i">
          <div class="foodentry" v-for="(item,index) in entries[i]" :key="index">
            <div class="img_wrap">
              <img :src="item.image" alt="">
            </div>
            <span>{{item.name}}</span>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 推荐商家 -->
    <div class="shopList-title">推荐商家</div>
    <!-- 导航 -->
    <FilterView :filterData="filterData" @update="update" @searchFixed="searchFixed"/>
    <!-- 商家信息 -->
    <mt-loadmore 
      :top-method="loadData" 
      :bottom-method="loadMore" 
      :bottomAllLoaded="allLoaded"  
      :auto-fill="false"
      :bottomPullText="bottomPullText"
      ref="loadmore">
        <div class="shopList">
          <IndexShop v-for="(item,index) in restaurants" 
            :key="index"
            :restaurant="item.restaurant" />
        </div>
    </mt-loadmore>

  </div>
</template>

<script>
import FilterView from '../components/FilterView'
import IndexShop from '../components/IndexShop'
import { Swipe, SwipeItem, Loadmore } from 'mint-ui';
export default {
  data() {
    return {
      swipeImgs: [],
      entries: [],
      filterData: null,
      iFixed:false,
      page:1,
      size:5,
      restaurants:[], //存放所有商家容器
      allLoaded:false,   // 若为真 上拉刷新就不会执行
      bottomPullText:"上拉加载更多",
      data: null
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
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios('/api/profile/shopping').then(res => {
        this.swipeImgs = res.data.swipeImgs
        this.entries = res.data.entries
      });
      this.$axios('/api/profile/filter').then(res => {
        this.filterData = res.data
      })
      this.loadData()
    },
    //下拉刷新
    loadData () {
      console.log("下拉刷新")
      this.page = 1,
      this.topPullText = "下拉刷新"
      this.bottomPullText = "上拉加载更多"
      this.allLoaded = false
      this.$axios.post(`/api/profile/restaurants/${this.page}/${this.size}`,this.data)
      .then(res => {
        this.$refs.loadmore.onTopLoaded();
        this.restaurants = res.data
      })
    },
    // 上拉加载
    loadMore () {
      if(!this.allLoaded) {
        this.page ++
        this.$axios.post(`/api/profile/restaurants/${this.page}/${this.size}`,this.data)
          .then(res => {
            // 加载完之后重新渲染
            this.$refs.loadmore.onBottomLoaded();
            if (res.data.length > 0) {
              res.data.forEach(item => {
                this.restaurants.push(item)
              });
              if (res.data < this.size) {
                this.allLoaded = true;
                this.bottomPullText = "没有更多喽"
              }
            }else {
              // 数据为空
              this.allLoaded = true;
              this.bottomPullText = "没有更多喽"
            }
          })
        } 
    },
    update(condation) {
      this.data = condation;
      this.loadData ()
    },
    searchFixed (isixed) {
      this.iFixed = isixed
    }
  },
  components: {
    FilterView,
    IndexShop
  }
}
</script>

<style scoped>
html {
  font-size: 18px;
}
.home {
  width: 100%;
  height: 100%;
  overflow:visible;
}
header{
  background: #009eef;
  height: 20px;
  padding: 10px 10px 0 10px;
}
.search_warp {
  position: sticky;
  background: #009eef;
  padding:  10px;
  top: 0;
  z-index: 666
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
  text-overflow:ellipsis;
  white-space: nowrap;
}
.chazhao {
  width: 100%;
  background: #fff;
  border-radius: 4px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  color: #999
}
.fa-search {
  margin-right: 5px;
}
.swiper {
  height: 100px;
}
.swiper img {
  width: 100%;
  height: 100%;
}
.entries {
 height: 150px; 
 padding: 10px;
 background: #fff;
}
.img_wrap img{
  width: 40px;
  height: 40px;
}
.foodentry {
  width: 50px;
  height: 60px;
  margin-left: 10px;
  margin-top: 10px;
  float: left;
}
.foodentry span {
  font-size: 12px;
}
/* 推荐商家 */
.shopList {
  background: #fff;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.shopList-title {
    display: flex;
    align-items: flex;
    justify-content: center;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    color: #333;
    background: #fff;
}
.shopList-title:after,
.shopList-title:before {
  display: block;   
  content: "一";
  width: 5.333333vw;
  height: 0.266667vw;
  color: #999;
}
.shopList-title:before {
  margin-right: 3.46667vw;
}
.shopList-title:after {
  margin-left: 3.466667vw;
}
.fixedview {
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  top:0;
  z-index: 999;
}
.mint-loadmore {
  height: calc(466px - 95px);
  overflow: auto;
}
</style>