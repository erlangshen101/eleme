<template>
<div :class="{'fangda':fangdA}" v-if="filterData">
    <div class="screnn_list">
        <!-- 筛选列表 -->
        <ul>
            <li v-for="(item,index) in filterData.navTab" :key="index"
                :class="{'size-h': index == sizeh}"
                @click="sizeH(index,item)">
                <span>{{item.name}}</span>
                <i :class="'fa fa-' + item.icon" v-if="item.icon"></i>
            </li>
        </ul>
    </div>
    <!-- 综合排序 -->
    <div class="comprehensive" v-if="xian">
        <div class="comprehensive-box">
            <ul>
                <li  v-for="(item,index) in filterData.sortBy" 
                    :key="index"
                    @click="sizeA(index,item.name,item.code)">
                    <span :class="{'sizea':index == sizea}">{{item.name}}</span>
                    <i class="fa fa-check" v-if="sizea == index"></i>
                </li>
            </ul>
        </div>
    </div>
    <!-- 筛选信息 -->
    <div class="screen" v-if="screen">
        <Screeninfom 
            v-for="(item,index) in filterData.screenBy"
            :key="index"
            :screenBy="item"/>
        <div class="screen_button"> 
            <button class="btNo" 
                :class="{'btnos':edit}"
                @click="btna">清空</button>
            <button class="btOff" 
                @click="offA">确定</button>
        </div>
    </div>
</div>
  
</template>

<script>
import Screeninfom from "./Screeninfom";
export default {
    data () {
        return {
            sizeh:0,
            fangdA:false,
            sizea:0,
            xian:false,
            screen: false
        }
    },
    props: {
        filterData: Object
    },
    methods: {
        // 筛选列表 点击改变字体
        sizeH (index,item) {
            console.log(this.filterData)
            this.sizeh = index
            if (index == 0) {
                this.screen = false
                this.fangdA = true //筛选列表至顶部
                this.$emit("ding",true)
                this.xian = true
            } else if (index == 3) {
                this.xian = false
                this.fangdA = true //筛选列表至顶部
                this.$emit("ding",true)
                this.screen = true
            } else {
                this.$emit("codes",{condition: item.condition})
                this.fangdA = false
                this.$emit("ding",false)
                this.xian = false
                this.screen = false
            }
        },
        // 综合排序 点击改变颜色
        sizeA (index,item,code) {
            this.$emit("codes",{condition: code })
            this.filterData.navTab[0].name = item
            this.sizea = index
            this.fangdA = false
            this.$emit("ding",false)
            this.xian = false
        },
        // 清空
        btna () {
            this.filterData.screenBy.forEach(val => {
               val.data.forEach(item => {
                   item.select = false
               })
           })
        },
        // 确定 
        offA () {
            let box = []
            this.filterData.screenBy.forEach(val => {
               val.data.forEach(item => {
                   if (item.select) {
                       box.push(item.code)
                   }
               })
            })
            this.$emit("codes",{condition: box })
            this.fangdA = false
            this.$emit("ding",false)
            this.screen = false
        }
    },
    components: {
        Screeninfom
    },
    computed: {
        edit() {
            let edit = false
           this.filterData.screenBy.forEach(val => {
               val.data.forEach(item => {
                   if (item.select) {
                       edit = true
                   }
               })
           })
           return edit
        }
    }
}
</script>

<style scoped>
.screnn_list {
    height: 30px;
    border-bottom: 1px solid #f1f1f1;
}
.screnn_list ul{
    height: 100%;
    display:flex;
    justify-content: space-evenly;
    background: #fff;
}
.screnn_list ul li {
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    flex: 1;
    display: flex;
}
.size-h {
    font-weight:bold;
    color: #000;
}
.fangda {
    position: fixed;
    top: 45px;
    index:800;
    width: 100%;
    height: 100%;
    background: #fff;
}
.comprehensive-box {
    padding: 20px 15px;
    font-size: 14px;
}
.comprehensive-box li {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.sizea {
    color: #009eef;
}
.comprehensive-box li i {
    color: #009eef;
}
.screen_button {
    width: 100%;
    height: 40px;
    display:flex;
    margin-top: 15px;
}
.screen_button button {
    flex: 1;
    border: 1px solid #fff;
    outline: none;
}
.btNo {
    background: #fff;
    color: #ddd;
    box-shadow: 0 -0.26666vw 0.5333333vw 0 #ddd;
}
.btOff {
    color: #fff;
    background: #00d762;
    border: 0.1333333vw solid #00d762;
}
.screen {
    padding: 0 20px;
}
.btnos {
    color: #000;
}
</style>