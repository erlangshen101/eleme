<template>
  <div class="Calculation">
      <span  @click="jian">
          <i v-show="content.content > 0" class="fa fa-minus"></i>
      </span>
      <span class="con" v-show="content.content > 0">{{content.content}}</span>
      <span @click="jia">
          <i class="fa fa-plus-circle"></i>
      </span>
  </div>
</template>

<script>
export default {
    props: {
        content:Object
    },
    methods: {
        jia () {
            this.content.content ++
        },
        jian() {
            this.content.content --
        }
    },
}
</script>

<style scoped>
    .Calculation {
        margin-top: 5px;
        justify-content: flex-end;
    float: right;
    }
    .con {
        display: inline-block;
        width: 40px;
        text-align: center;
    }
    .Calculation i {
        font-size: 22px;
        color: rgb(35, 149, 255);
        vertical-align:middle;  

    }
</style>