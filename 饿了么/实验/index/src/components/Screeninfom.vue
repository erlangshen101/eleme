<template>
  <div class="screen_box">
      <div class="screen_text" >
          <p>{{screenBy.title}}</p>
          <ul class="screen_list">
              <li v-for="(item,index) in screenBy.data"
               :key="index"
               :class="{'screen_li':item.select}"
               @click="screenA(item,screenBy.data)">
                  <img v-if="item.icon" :src="item.icon" alt="">
                  <span>{{item.name}}</span>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    props :{
        screenBy: Object
    },
    methods: {
        screenA (item,data) {
            if (!item.icon) {
                data.forEach(val => {
                    val.select = false
                })
            }
            item.select = !item.select
        }
    }
}
</script>

<style scoped>
.screen_text {
    margin-top: 10px;
}
.screen_text p {
    color: #666;
    font-size: 12px;
    font-weight: bold;
}
.screen_list {
    padding: 0 10px;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;

}
.screen_list li img {
    width: 15px;
    height: 15px;
    vertical-align: middle;
    margin-right: 3px;
}
.screen_list li span {
    vertical-align: middle;
}
.screen_list li {
    width: 100px;
    height: 35px;
    background: #f1f1f1;
    margin-left: 5px;
    margin-top: 5px;
    text-align: center;
    line-height: 35px;
    font-size: 12px;
    vertical-align: middle;
}
.screen_li {
    color: #009eef;
}
</style>