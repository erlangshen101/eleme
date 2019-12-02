<template>
    <div class="Rating-gray">
        <i v-for="(item,index) in itemClasses" :key="index" class="fa fa-star" :class="item"></i>
    </div>
</template>

<script>
// 星星长的
const LENGTH = 5;
// 星星对应的 class 类
const CLS_ON = "fa-star";  //全星
const CLS_HALF = "fa-star-half-empty"; //半星
const CLF_OFF = "fa-star-o" //补齐
export default {
    props: {
        rating:Number
    },
    computed: {
        itemClasses() {
            // 4.8 四个全星 1个半星
            let result = [];

            // 对分数进行处理， 向下取整0.5的倍数
            let score =Math.floor(this.rating * 2) /2
            //控制半星
            let hasDecimal = score % 1 !==0
            //控制全星
            let integer = Math.floor(score)
            //全星放入到数组中
            for(let i = 0; i < integer; i++ ) {
                result.push(CLS_ON)
            }
            //半星
            if (hasDecimal) {
                result.push(CLS_HALF)
            }
            //补齐
            while(result.length < LENGTH) {
                result.push(CLF_OFF)
            }
            return result
        }
    }
}
</script>

<style scoped>
.Rating-gray {
    color: #ffbe00;
    display: block !important;
    display: inline-block
}
</style>