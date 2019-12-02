<template>
<div :class="{'open':isSort || isScreen}" @click.self="hideVive">
    <!-- 导航 -->
  <div v-if="filterData" class="filter_wrap">
      <aside class="filter">
          <div class="filter-nav" v-for="(item,index) in filterData.navTab" 
            :key="index"
            :class="{'filter-bold':currentFilter == index}"
            @click="filterSort(index)">
              <span>{{item.name}}</span>
              <i v-if="item.icon" :class="'fa fa-'+item.icon"></i>
          </div>
      </aside>
  </div>
  <!-- 排序 -->
  <div class="filter-extend" v-if="isSort">
      <ul>
          <li v-for="(item,index) in filterData.sortBy" :key="index" @click="selectSort(item,index)">
              <span :class="{'selectName':currentSort == index}">{{item.name}}</span>
              <i v-show="currentSort == index" class="fa fa-check"></i>
          </li>
      </ul>
  </div>
  <!-- 筛选 -->
    <section class="filter-extend" v-if="isScreen">
        <div class="filter-sort">
            <div v-for="(screen,index) in filterData.screenBy" 
             :key="index"
             class="morefilter">
                <p class="itile">{{screen.title}}</p>   
                <ul>
                    <li v-for="(item,i) in screen.data"
                    :key="i"
                    :class="{'selected':item.select}" 
                    @click="selectScreen(item,screen)">
                        <img v-if="item.icon" :src="item.icon" alt="">
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="morefilter-btn">
            <span class="morefilter-clear" :class="{'edit':edit}" @click="delectS">清空</span>
            <span class="morefilter-ok" @click="filterOk">确定</span>
        </div>
    </section>
</div>

</template>

<script>
export default {
    name:'FilterView',
    data () {
        return {
            currentFilter: 0,
            isSort: false,
            currentSort: 0,
            isScreen: false
        }
    },
    props: {
        filterData: Object
    },
    methods: {
        filterSort (index) {
            this.currentFilter = index
            switch(index) {
                case 0:
                    this.isSort = true
                    this.$emit("searchFixed",true)
                break;
                case 1: 
                console.log(this.filterData)
                    this.$emit("update",{
                        condition: this.filterData.navTab[1].condition
                    })
                    this.hideVive ()
                break;
                case 2: 
                    this.$emit("update",{
                        condition: this.filterData.navTab[2].condition
                    })
                    this.hideVive ()
                break;
                case 3: 
                    this.isSort = false,
                    this.isScreen = true,
                    this.$emit("searchFixed",true)

                break;
                default:
                    this.hideVive()
                break;
            }
        },
        hideVive () {
            this.isSort = false;
            this.isScreen = false
            this.$emit("searchFixed",false)
        },
        selectSort (item,index) {
            this.currentSort = index,
            this.filterData.navTab[0].name = this.filterData.sortBy[index].name,
            this.hideVive()
            // 更新数据
            this.$emit("update",{condition: item.code})
        },
        selectScreen (item,screen) {
            if (screen.id !== "MPI") {
                // 单选
                screen.data.forEach(val => {
                    val.select = false;
                });
            }
            item.select = !item.select
        },
        delectS() {
            this.filterData.screenBy.forEach(val => {
                val.data.forEach(box => {
                    box.select = false
                })
            })
        },
        filterOk () {
            let screenData = {
                MPI: "",
                offer: "",
                per: ""
            }
            let mpiStr = ""
            this.filterData.screenBy.forEach(screen => {
                screen.data.forEach((item,index) => {
                    if(item.select){
                        //两种情况 1是多选 2是单选
                        if (screen.id !== "MPI") {
                            // 单选
                            screenData[screen.id] = item.code
                        } else {
                            // 多选
                            mpiStr += item.code + ",";
                            screenData[screen.id] = mpiStr
                        }
                    }
                })
            })
            this.$emit("update",{condition: screenData})
            this.hideVive()
        }
    },
    computed: {
        edit() {
            console.log(111)
            let edit = false
            this.filterData.screenBy.forEach(val => {
                val.data.forEach(box => {
                    if (box.select == true) {
                        edit = true
                    }
                })
            })
            return edit
        }
    }
}
</script>

<style>
.filter_wrap {
    height: 30px;
    width: 100%;
    background: #fff;
    border-bottom:  1px solid #f1f1f1;
}
.filter {
    padding: 0 10px;
    display: flex;
    justify-content:space-around;
    height: 100%;
}
.filter-nav {
    font-size: 12px;
    color: #666;
    display: flex;
    align-items: center;
}
.filter-bold {
    font-weight:600;
    color: #333;
}
.open {
    position: fixed;
    top: 50px;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    transition: all 0.3 ease-in-out;
    z-index:3;
}
.filter-extend {
    background: #fff;
    height: 100%;
    padding: 10px;
    font-size: 14px;
}
.filter-extend li {
    height: 45px;
    display: flex;
    justify-content: space-between;
    line-height: 45px;
}
.filter-extend li i {
    color: #009eef;;
}
.selectName {
    color: #009eef;;
}
.morefilter {
    margin-top: 10px;
}
.morefilter p {
    font-size: 12px;
    color: #666;
    font-weight: 600;
    margin-bottom: 10px;
}
.morefilter ul {
    display: flex;
    flex-wrap:wrap;
}
.morefilter ul li {
    flex: 0 0 29%;  
    display:inline-block;
    vertical-align:middle;
    background: #f1f1f1;
    margin-left: 6px;
    margin-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    padding: 0 3px;
    font-size: 12px;
}
.morefilter ul li img {
    width: 13px;
    margin-right: 3px;
}
.morefilter-clear {
    color: #ddd;
    background: #fff;
}
.filter-sort {
    padding: 0 10px;
}
.morefilter-ok {
    color: #fff;
    background: #00d762;
    border: 0.1333333vw solid #00d762;
}
.morefilter-btn span {
    font-size: 0.826667rem;
    text-align: center;
    flex: 1px;
    text-decoration: none;
}
.morefilter-btn {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
    align-items: center;
    background-color:#fafafa;
    box-shadow: 0 -0.26666vw 0.5333333vw 0 #ededed;
    box-sizing: border-box;
    line-height: 11.46666667vw;
}
.selected {
    color: #009eef;
}
.edit {
    color: #333 ;
}
</style>