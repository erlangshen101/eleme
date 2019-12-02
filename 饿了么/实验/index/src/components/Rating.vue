<template>
  <div class="Rating">
      <i v-for="(item,index) in xing" :key="index" class="fa" :class="item"></i>
  </div>
</template>

<script>
const LENGTH = 5;
// 星星对应的 class 类
const CLS_ON = "fa-star";  //全星
const CLS_HALF = "fa-star-half-empty"; //半星
const CLF_OFF = "fa-star-o" //补齐
export default {
    props: {
        Rationgs: Number
    },
    computed: {
        xing () {
            let xingbox = []
            let xinga = Math.floor(this.Rationgs * 2) / 2
            let xingb = xinga % 1 !==0
            let xingc = Math.floor(xinga)
            for (var i = 0; i < xingc; i ++) {
                xingbox.push(CLS_ON)
            }
            if (xingb) {
                xingbox.push(CLS_HALF)
            }
            if (xingbox.length < LENGTH) {
                xingbox.push(CLF_OFF)
            }
            return xingbox
        }
    }
}
</script>

<style>
.Rating {
    color: #ffbe00;
    display: flex;
    flex-direction: row;
}
</style>