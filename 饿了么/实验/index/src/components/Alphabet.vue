<template>
  <div class="Alphabet" ref="area_scroll">
      <div>
            <!-- 热门城市 -->
            <div class="hot_cities cityList">
            <h2>热门城市</h2>
                <ul>
                    <li @click="$emit('addressOk',val.name)" 
                    v-for="(val,index) in Popular" 
                    :key="index">{{val.name}}</li>
                </ul>
            </div>

            <!-- 所有城市 -->
            <div class="city-box">
                <ul class="cityList" v-for="(val,index) in Letter" :key="index">
                    <li>{{val}}</li>
                    <ul class="All_city">
                        <li @click="$emit('addressOk',item.name)"
                            v-for="(item,value) in cityInfo[val]" 
                            :key="value" 
                            >{{item.name}}</li>
                    </ul>
                </ul>
            </div>
      </div>
      <!-- 字母 -->
    <div class="Letter">
        <ul>
            <li @click="selectKey(0)">#</li>
            <li @click="selectKey(index + 1)" v-for="(val,index) in Letter" :key="index">{{val}}</li>
        </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    props: {
        Popular   :Array,
        Letter    :Array,
        cityInfo  :Object,
    },
    data () {
        return {
            scroll: null
        }
    },
    methods: {
        initScroll () {
            setTimeout(() => {
                this.scroll = new BScroll(this.$refs.area_scroll,{
                    click:true,
                    mouseWheel: true,//开启鼠标滚轮
                    // disableMouse: false,//启用鼠标拖动
                    // disableTouch: false//启用手指触摸
                })
                // console.log(this.scroll,888)
            })
        },
        selectKey (index) {
            const cityList = this.$refs.area_scroll.getElementsByClassName("cityList")
            let el = cityList[index]
            this.scroll.scrollToElement(el,250)
        }
    }
}
</script>

<style>
.Alphabet {
    width: 280px;
    height: 100%;
    overflow: hidden;
}
h2 {
    display: inline-block;
    margin-top: 20px;
}
.hot_cities ul {
    width: 200px;
    display: flex;
    flex-wrap:wrap;
    margin-top: 10px;
}
h2 {
    color: #666;
}
.hot_cities li {
    width: 80px;
    height: 30px;
    line-height: 30px;
    background: #eee;
    margin-left: 10px;
    margin-bottom: 5px;
    text-align: center;
}
.Letter {
    position: fixed;
    right: 10px;
    top: 145px;
}
.Letter li {
    margin-bottom: 4px;
    font-size: 12px;
    color: #666;
}
.All_city li {
    height: 30px;
    width: 100%;
    border-bottom: 1px solid #eee;
    line-height: 30px;
}
</style>