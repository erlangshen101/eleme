<template>
  <div class="navdh">
      <router-link to="/sorder">
        点餐
        <i class="line"></i>
      </router-link>
      <router-link to="/seavluate">
        评价
        <i class="line"></i>
      </router-link>
      <router-link to="/sbusiness">
        商家
        <i class="line"></i>
      </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .navdh {
        position: sticky !important;
        top: 0px;
        height: 40px;
        display: flex;
        justify-content: space-evenly;
        border-bottom: 1px solid #ddd;
        background: #fff;
        line-height: 40px;
    }
    .navdh a {
        text-decoration:none;
        color: #666;
        font-weight: bold;
        font-size: 14px;
        outline: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        flex: 1;
        display: flex;
        justify-content: center;
    }
    .navdh .active {
        color: #333;
        font-weight: 700;
        border-bottom: 1px solid #2395ff;
    }
    .nav .active .line {
        width: 30px;
        height: 0.533333vw;
        background: #2395ff;
        display: inline-block;
        position: absolute;
        left: 45%;
        bottom: 0;
        margin-left: -10px;
    }

</style>