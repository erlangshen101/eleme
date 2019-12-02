<template>
  <div class="address">
      <Header :title="title"/>
      <div class="address-content">
          <div class="add-city">
              <span @click="$router.push({name:'city',params:{city:city}})">{{city}} <i class="fa fa-angle-down"></i></span>
              <i class="fa fa-search"></i>
              <input type="text" v-model="SearchCity" placeholder="小区/写字楼/学校等">
          </div>
          <Location :address="address" @click="box"/>
      </div>
      <div class="result_city" v-if="resultCity.length !== 0">
          <div v-for="(item,index) in resultCity" :key="index" @click="box(item)">
              <p>{{item.name}}</p>
              <span>{{item.district}}{{item.address}}</span>
          </div>
      </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import Location from '../components/Location'
export default {
    data () {
        return {
            title:'选择收货地址',
            city:'',
            SearchCity:'',
            resultCity:[]
        }
    },
    methods: {
        cityResult () {
            let self = this
            AMap.plugin('AMap.Autocomplete', function(){
                // 实例化Autocomplete
                var autoOptions = {
                    //city 限定城市，默认全国
                    city: self.city
                }
                var autoComplete= new AMap.Autocomplete(autoOptions);
                autoComplete.search(self.SearchCity, function(status, result) {
                    console.log(result.tips)
                    // 搜索成功时，result即是对应的匹配数据
                    if (result.tips == undefined) {
                        self.resultCity = [];
                    }else {
                        self.resultCity = result.tips;
                    }
                })
            })
        },
        box (item) {
            if (item) {
                let itmes = item.district + item.name + item.address
                this.$store.dispatch('setAddress',itmes)
            }else {
                this.$store.dispatch('setAddress',this.address)
            }
            this.$router.push('/home')
        }
    },
    computed: {
        address () {
            return this.$store.getters.location.formattedAddress
        },
    },
    watch: {
        SearchCity(){
            this.cityResult()
        }
    },
    beforeRouteEnter(to,from,next) {
        next(vm => {
            vm.city = to.params.city
        })
    },
    components: {
        Header,
        Location
    },
}
</script>

<style scoped>
.address {
    width: 100%;
}
.address-content {
    width: 100%;
    background: #fff;
    padding: 10px 20px;
    box-sizing: border-box;
    font-size: 14px;
}
.add-city {
    height: 40px;
    border-radius: 4px;
    background: #eee;
    display: flex;
    align-items: center;
    padding-left: 8px;
    margin-bottom: 10px;
}
.add-city span {
    border-right: 1.5px solid #000;
    width: 80px;
}
.fa-search {
    margin-left: 10px;
}
.add-city input {
    border: none;
    outline: none;
    background: #eee;
    padding: 10px;
}
.locat-title {
    font-size: 12px;
}
.result_city {
    background: #fff;
    margin-top: 20px;
}
.result_city div {
    height: 50px;
    display: inline-block;
    border-bottom: 1px solid #aaa;
    width: 100%;
    margin-top: 5px;
    padding: 0 10px;
    padding-bottom: 10px;
    font-size: 14px;
    overflow: hidden;
    box-sizing: border-box;
}
.result_city div p{
    color: #000;
    font-weight:bold;
    margin-bottom: 5px;
}
.result_city div span {
    color: #aaa;
}
</style>