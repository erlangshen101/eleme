<template>
  <div class="seach">
        <Header title="搜索" />
        <div class="seach_merchant">
            <div class="merchant_input">
                <i class="fa fa-search"></i>
                <input type="text" 
                    placeholder="输入商家,商品信息"
                    v-model="Resultc">
            </div>
            <button @click="seachA">搜索</button>
        </div>
        <div class="merchan_list" v-if="Resulta !== null">
            <Mercha :Resulto="Resulta.restaurants" />
            <Mercha :Resulto="Resulta.words" />
        </div>
        <div v-if="screnn_lists" class="aaa">
            <div class="screnn_lists" >
                <ScreenList :filterData="filterData"/>
            </div>
            <div class="shanglist"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading">
                <IndexShop :shops="shops"/>
            </div>
        </div>

  </div>
</template>

<script>
import { InfiniteScroll } from 'mint-ui';
import IndexShop from '../components/IndexShop'
import ScreenList from '../components/ScreenList'
import Header from '../components/Header'
import Mercha from '../components/Mercha'
export default {
    data () {
        return {
            Resultc:"",
            Resulta:null,
            filterData:null,
            screnn_lists:false,
            page:1,
            size:7,
            shops:[],
            loading:false
        }
    },
    watch: {
        Resultc() {
            this.Results ()
        }
    },
    created() {
        this.filterDatas()
    },
    methods: {
        Results () {
            this.screnn_lists = false
            if (this.Resultc !== "") {
                this.$axios(`/api/profile/typeahead/${this.Resultc}`).then(res => {
                    this.Resulta = res.data
                })
                .catch(err => {
                    this.Resulta = null
                })
            } else {
                this.Resulta = null
            }

        },
        seachA () {
            this.shops = []
            this.page = 0;
            this.screnn_lists = true,
            this.Resulta = null
            this.loading = false
            console.log(2222)
        },
        filterDatas () {
            // 请求筛选列表
            this.$axios('/api/profile/filter').then(res => {
                this.filterData = res.data
            })
        },
        loadMore () {
            console.log(1111)
            this.loading = true
            this.page ++
            this.$axios.post(`/api/profile/restaurants/${this.page}/${this.size}`,this.data)
            .then(res => {
                if (res.data.length < 7)  {
                    res.data.forEach(val => {
                        this.shops.push(val)
                    })
                    this.loading = true
                } else {
                    res.data.forEach(val => {
                        this.shops.push(val)
                    })
                    this.loading = false
                }

            })
            console.log(333)
        }
    },
    components: {
        Header,
        Mercha,
        ScreenList,
        IndexShop
    }
}
</script>

<style scoped>
.seach_merchant {
    height: 30px;
    background: #fff;
    padding: 10px;
    display: flex;
    align-items: center;
}
.merchant_input {
    background: #f1f1f1;
    flex: 7;
    margin-right: 10px;
    padding: 5px 10px;
    align-items: center;
    display: flex;
}
.merchant_input input {
    border: none;
    outline: none;
    background: #f1f1f1;
    margin-left: 10px;
}
.seach_merchant button {
    border: none;
    outline: none;
    background: #fff;
    width: 60px;
    height: 20px;
    flex: 1;
}
.merchan_list {
    padding: 10px 15px 0 15px;
    background: #fff;
}
.aaa {
    height: 650px;
    overflow-y: scroll;
}
</style>