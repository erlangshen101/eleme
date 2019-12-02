<template>
  <div class="text_group">
      <div class="input_group" :class="{'is-invalid':error}">
        <input 
          :type="type"
          :placeholder="placeholder"
          :name="name"
          :value="value"
          @input="$emit('input',$event.target.value)"
          >
          <button class="btnTitle" @click="$emit('btnClick')" :disabled="disabled" v-if="btnTitle">{{btnTitle}}</button>
      </div>
      <div v-if="error" class="error">{{error}}</div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default:'text',
    },
    placeholder:String,
    disabled:Boolean,
    name:String,
    value:String,
    error:String,
    btnTitle:String
  }
}
</script>

<style scoped>
  .input_group {
    margin-top: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
  .input_group input  {
    width: 60%;
    outline: none;
    border: none;
    margin-top: 5px;
    padding-left: 10px;
  }
  .input_group button {
    border: none;
    outline: none;
    background: #fff;
  }
  .input_group button[disabled] {
    color: #aaa;
  }
  .is-invalid {
    border: 1px solid red;
  }
  .error {
    color: red;
    padding-top: 5px;
  }
</style>