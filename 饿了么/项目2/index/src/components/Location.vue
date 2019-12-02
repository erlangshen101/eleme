<template>
    <div class="location-box">
        <p class="locat-title">当前定位</p>
        <div class="location-wan" @click="$emit('click')">
            <i class="fa fa-location-arrow"></i>
            <span>{{address}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        address:String
    }
}
</script>

<style scoped>
.locat-title {
    font-size: 12px;
    color: #666;
    margin-bottom: 10px;
}
.fa-location-arrow {
    color: #009eef;
    overflow: hidden;
}
</style>