<template>
  <div class="Header">
      <header>
          <div class="Return">
              <i class="fa fa-chevron-left"></i>
              <button @click="$router.go(-1)">返回</button>
          </div>
          <span class="header-title">{{title}}</span>
      </header>
  </div>
</template>

<script>
export default {
    props: {
        title:String
    }
}
</script>

<style scoped>
.Header {
    width: 100%;
}
header {
  background: #009eef;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  width: 100%;
  height: 40px;
  padding: 10px;
  box-sizing:border-box;
}
.Return {
    display: inline-block;
}
.Return button {
    background: #fff;
    border: none;
    outline: none;
    background: #009eef;
    color: #fff;
    font-weight: bold;
}
.header-title {
    display: inline-block;
    width: 160px;
    text-align: right;
}
</style>