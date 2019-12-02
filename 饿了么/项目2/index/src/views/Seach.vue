<template>
  <div class="seach">
      <Header :isLeft="true" title="搜索"/>
      <div class="search_header">
          <form class="search_warp">
              <i class="fa fa-search"></i>
              <input type="text" v-model="key_word" placeholder="输入商家,商品信息">
              <button @click.prevent="searchHandle">搜索</button>
          </form>
      </div>
      <div class="shop" v-if="result && !showShop">
          <div class="empty_wrap" v-if="empty">
              <img src="https://fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png" alt="">
              <div class="empty_txt">
                  <h4>附近没有搜索结果</h4>
                  <span>换个关键词试试吧</span>
              </div>
          </div>
          <div v-else>
            <SearchIndex @click="$router.push('shop')"  :data="result.restaurants"/>
            <SearchIndex @click="shopItemClick" :data="result.words"/>
          </div>
      </div>
      <div class="containre" v-if="showShop">
          <FilterView :filterData="filterData" @updata="updata"/>
          <div class="shoplist" 
           v-infinite-scroll="loadMore"
           :infinite-scroll-disabled="loading">
              <IndexShop v-for="(item,index) in restaurants"
              :key="index" :restaurant="item.restaurant"/>
          </div>
      </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import SearchIndex from '../components/SearchIndex'
import FilterView from '../components/FilterView'
import IndexShop from '../components/IndexShop'
import { InfiniteScroll } from 'mint-ui';
export default {
    data () {
        return {
            key_word: "",
            result: null,
            empty: false,
            showShop: false,
            filterData: null,
            restaurants: [],
            page: 0,
            size: 7,
            loading: false,
            data: null
        }
    },
    created () {
        this.$axios("/api/profile/filter").then(res => {
            this.filterData = res.data
        })
    },
    watch:{
        key_word () {
            this.empty = false
            this.showShop = false
            this.keyWordchange ()
        }
    },
    methods: {
        keyWordchange() {
            this.$axios(`/api/profile/typeahead/${this.key_word}`).then(res => {
                this.result = res.data;
            })
            .catch(err => {
                this.result = null
            })
        },
        searchHandle () {
            if (!this.key_word) return
            if (this.result && (this.result.restaurants.length > 0 || this.result.words.length)) {
                this.shopItemClick()
            } else {
                this.empty = true
            }
        },
        shopItemClick () {
            this.page = 0
            this.restaurants = []
            this.showShop = true
        },
        updata (condation) {
            this.data = condation;
            this.shopItemClick()
        },
        loadMore () {
            console.log(111)
            console.log(this.loading)
            this.page ++
            this.$axios.post(`/api/profile/restaurants/${this.page}/${this.size}`,this.data)
            .then(res => {
                if (res.data.length > 0) {
                    res.data.forEach (item => {
                        this.restaurants.push(item)
                    })
                }else {
                    this.loading = true
                }
            })
        }
        
    },
    components: {
        Header,
        SearchIndex,
        FilterView,
        IndexShop
    }
}
</script>

<style scoped>
.search_header {
    padding: 10px;
    background: #fff;
}
.search_warp {
    width: 280px;
    background: #f1f1f1;
    padding: 5px 10px;
    position: relative;
}
.search_warp input {
    outline: none;
    border: none;
    height: 20px;
    background: #f1f1f1;
    margin-left: 10px;
}
.search_warp button {
    position: absolute;
    top: 5px;
    right: -55px;
    border: none;
    background: #fff;
    outline: none;
}
.containre {
    height: 550px;
    overflow-y: scroll;
}
</style>