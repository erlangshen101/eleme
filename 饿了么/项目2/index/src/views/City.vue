<template>
    <div class="city">
        <header>
            <div class="aaa">
                <div class="CitySearch">
                    <div class="Search-box">
                        <i class="fa fa-search"></i>
                        <input type="text" v-model="searchCity" placeholder="输入城市名">
                    </div>
                    <button @click="addressOk(city)">取消</button>
                </div>
            </div>
            <Location :address="city"/>
        </header>
        <div class="city_content" v-if="screen_City.length == 0">
            <Alphabet ref="allcity" @addressOk="addressOk" :Popular="Popular" :Letter="Letter" :cityInfo="cityInfo"/>
        </div>
        <div class="screen_City" v-else>
            <ul>
                <li @click="addressOk(val)" v-for="(val,index) in screen_City" :key="index">{{val}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import Location from '../components/Location'
import Alphabet from '../components/Alphabet'
export default {
    data() {
        return {
            searchCity:'',
            city: '',
            cityInfo: null,
            Popular:[], //热门
            Letter:[],  //字母
            All:   [],   //所有
            All_City:[],  //所有城市
            screen_City:[] //筛选结果
        }
    },
    created() {
        this.getCityInfo();
    },
    computed: {
        address() {
            return this.$store.getters.location.formattedAddress
        }
    },
    watch:{
        searchCity(val,obj) {
            this.screenCity(val)
        }
    },
    methods: {
        getCityInfo() {
            this.$axios("/api/posts/cities")
                .then(res => {
                    this.cityInfo = res.data
                    //存储热门城市
                    this.Popular = res.data.hotCities
                    // 存储字母
                    this.Letter = Object.keys(res.data)
                    this.Letter.pop()
                    this.Letter.sort()
                    // 存储所有城市  用来搜索过滤
                    this.Letter.forEach(key => {
                       this.cityInfo[key].forEach(city => {
                           this.All.push(city)
                       })
                    })
                    this.$nextTick(() => {
                        this.$refs.allcity.initScroll()
                    })
                    // 遍历所有城市
                    this.All.forEach(val => {
                        this.All_City.push(val.name) 
                    })

                })
        },
        addressOk (city) {
            this.$router.push({name:'address',params:{city:city}})
        },
        screenCity (city) {
            if (!city) {
                this.screen_City = []
                this.$nextTick(() => {
                    this.$refs.allcity.initScroll()
                })
            } else {
                this.screen_City = this.All_City.filter(item => {
                    return item.indexOf (city) !=-1
                })
                if (this.screen_City.length == 0) {
                    this.$nextTick(() => {
                        this.$refs.allcity.initScroll()
                    })
                }

            }

        }
    },
    components: {
        Location,
        Alphabet
    },
    beforeRouteEnter(to,from,next) {
        next(vm => {
            vm.city = to.params.city
        })
    }
}
</script>

<style scoped>
.city {
    width: 100%;
}
header {
    padding: 0 10px;
    background: #fff;
    height: 120px;
}
.aaa {
    height: 30px;
}
.CitySearch {
    position: fixed;
    top: 0;
    left: 10px;
    width: 300px;
    height: 50px;
    display: flex;
    align-items: center;
}
.Search-box {
    width: 200px;
    height: 35px;
    background: #f1f1f1;
    border-radius: 4px;
    display: inline-block;
    align-items: center;
    display: flex;
    padding: 0 10px;
}
.Search-box input {
    border: none;
    outline: none;
    background: #f1f1f1;
    font-size: 12px;
    font-weight: bold;
    margin-left: 5px;
}
.CitySearch button {
    background: #fff;
    border: none;
    outline: none;
    color: #009eef;
    font-size: 12px;
    font-weight: bold;
    margin-left: 10px;
}
.city_content {
    background: #fff;
    margin-top: 20px;
    padding: 0 10px;
    height: 380px;
}
.location-box {
    margin-top: 30px;
}
.screen_City ul {
  background: #fff;
  padding: 5px 16px;
}
.screen_City ul li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>