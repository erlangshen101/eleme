<template>
  <div class="sbusiness" v-if="sellerInfo">
      <div class="sbusiness-list">
        <img :src="sellerInfo.header_image" alt="">
        <h4 class="title">{{sellerInfo.title}}</h4>
        <ul>
          <li v-for="(val,index) in sellerInfo.brand_intros" :key="index">
            <p>{{val.brief}}</p>
          </li>
        </ul>
        <div class="cha">
          <span>查看品牌故事</span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sellerInfo: null
    }
  },
  created () {
    this.getData ()
  },
  methods: {
    getData () {
      this.$axios("/api/profile/seller").then(res => {
        this.sellerInfo = res.data
        console.log(this.sellerInfo)
      })
    }
  }
}
</script>

<style scoped>
  .sbusiness {
    padding: 20px;
    background: #fff;
  }
  .sbusiness-list img{
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 7px;
  }
  .sbusiness-list li p{
    height: 50px;
    line-height: 23px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: #444;
  }
  .cha {
    width: 100%;
    height: 47px;
    text-align: center;
    line-height: 47px;
    color: #666;
  }
</style>