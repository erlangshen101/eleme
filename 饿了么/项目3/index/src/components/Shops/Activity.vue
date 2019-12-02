<template>
  <div class="rst-activity">
      <div class="activity-txt">
          <span class="man"
            :style="{background: '#' + acrivities[0].icon_color}" 
          >{{acrivities[0].icon_name}}</span>
          <span>{{acrivities[0].description}}</span>
      </div>
      <div class="activity-count" @click="fade = true">
          <span>{{acrivities.length}}个优惠</span>
          <i class="fa fa-caret-down"></i>
      </div>
      <!-- 优惠弹窗 -->
      <transition name="fade">
          <div class="beij" v-show="fade">
            <div class="act-model">
                <div class="activity-sheet">
                    <i class="fa fa-remove" @click="fade = false"></i>
                    <h2>优惠活动</h2>
                    <ul>
                        <li v-for="(item,index) in acrivities" :key="index">
                            <span class="asc" :style="{background: '#' + item.icon_color}"> 
                            {{item.icon_name}}</span>
                            <span>{{item.description}}</span>
                        </li>
                    </ul>
                </div>
            </div>
          </div>
      </transition>
  </div>
</template>

<script>
export default {
    props: {
        acrivities: Array
    },
    data () {
        return {
            fade: false,
        }
    }
}
</script>

<style scoped>
.rst-activity {
    width: 300px;
    margin: 15px auto;
    display: flex;
    justify-content: space-between;
}
.activity-txt .man {
    padding: 0 2px;
    color: #fff;
    margin-right: 5px;
}
.activity-txt span {
    color: #666;
}
.activity-count {
    color: #666;
}
.act-model {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    height: 250px;
    background: #fff;
    padding: 15px 20px;
    z-index: 999;
}
.activity-sheet {
    display: flex;
    flex-direction: column;
}
.fa-remove {
    text-align: right;
}
.activity-sheet ul li {
    margin: 15px 0;
}
.asc {
    padding:0 3px;
    color: #fff;
    margin-right: 10px;
}
.activity-sheet h2 {
    text-align: center;
    font-weight: bold;
    font-size: 14px;
}
.beij {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
    z-index: 888;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>