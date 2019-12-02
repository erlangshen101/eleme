<template>
    <transition name="fade">
        <div class="zhe" v-show="showInfoModel" @touchmove.prevent>
            <div class="info-model">
                <!-- 弹窗 -->
                <div class="brief-model">
                    <h2>
                        <i v-if="rst.is_premium">品牌</i>
                        <span>{{rst.name}}</span>
                    </h2>
                    <ul>
                        <li>
                            <h3>{{rst.rating}}</h3>
                            <p>评分</p>
                        </li>
                        <li>
                            <h3>{{rst.recent_order_num}}</h3>
                            <p>月售</p>
                        </li>
                        <li v-if="rst.delivery_mode">
                            <h3>蜂鸟专送</h3>
                            <p>约{{rst.order_lead_time}}分钟</p>
                        </li>
                        <li>
                            <h3>￥{{rst.float_devlivery_fee}}元</h3>
                            <p>配送费</p>
                        </li>
                        <li>
                            <h3>{{(rst.distance / 1000).toFixed(1)}}km</h3>
                            <p>距离</p>
                        </li>
                    </ul>
                    <h3 class="promotion">
                        <span>公告</span>
                    </h3>
                    <p class="brief-modal-yx">{{rst.promotion_info}}</p>
                </div>
                <!-- x 号 -->
                <div class="brief-modal-close" >
                    <img @click="$emit('close')" src="https://fuss10.elemecdn.com/8/ba/bcfa8cc62b20e044bd2ea1c1c7f3dpng.png?imageMogr/format/webp/" alt="">
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        rst:Object,
        showInfoModel:Boolean
    }
}
</script>

<style scoped>
.info-model {
    width: 335px;
    height: 150px;
    position: absolute;
    top: 220px;
    left: calc(100% - 50% - 165px);
    z-index: 999;
}
.brief-model {
    background: #fff;
    border-radius: 4px;
    padding: 30px 10px;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease-out;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.brief-model h2 {
    display: flex;
    width: 280px;
    justify-content: space-evenly;
    margin-left: 20px;
}
.brief-model h2 i {
    background: yellow;
    display: flex;
    width: 40px;
    height: 20px;
    justify-content: center;
    align-items: center;
}
.brief-model h2 span{
    margin-left: 10px;
    display: flex;
    text-align: center;
    font-size: 16px;
    font-weight:bold;
}
.brief-model ul {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
.brief-model ul li h3{
    margin-bottom: 5px;
    font-weight: bold;
}
.brief-model ul li p {
    font-size: 12px;
    color: #666;
    text-align: center;
}
.promotion {
    text-align: center;
    margin: 15px 0;
    color: #666;
}
.brief-modal-close {
    text-align: center;
    margin-top: 30px;
}
.zhe {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,0.3);
    z-index: 999;
    width: 100%;
    height: 100%;
}
</style>