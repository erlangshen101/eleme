<template>
  <div class="merchanList">
        <ul>
            <li class="list_box" v-for="(item,index) in Resulto" :key="index">
                <div class="list_img">
                    <img :src="item.image_path" alt="" v-if="item.image_path">
                    <i v-else class="fa fa-search"></i>
                </div>
                <div class="list_content" v-if="item.name">
                    <span class="list_text">{{item.name}}</span>
                    <span class="list_qian">评分{{item.rating}}</span>
                </div>
                <div class="list_content" v-else>
                    <span>{{item}}</span>
                </div>
            </li>
        </ul>
  </div>
</template>

<script>
export default {
    props: {
        Resulto: Array
    }
}
</script>

<style scoped>
.list_box {
    padding: 15px 0;
    display: flex;

}
.list_content {
    width: 100%;
    border-bottom: 1px solid #000;
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px
}
.list_img img{
    width: 30px;
    height: 35px;
    margin-right: 8px;
}
.list_text {
    display: inline-block;
    width: 200px;
    text-overflow:ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.list_qian {
    color: #666;
}
.fa-search {
    margin-right: 10px;
}
</style>