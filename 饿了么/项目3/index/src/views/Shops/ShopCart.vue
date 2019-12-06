<template>
  <div class="shop-cart">
      <transition name="fade">
        <div class="cartview-cartmask" @click.self="cartbody = false" v-if="cartbody && !isEmpty">
            <div class="cartview-cartbody">
                <p>
                    <span class="cartbody-title">已选商品</span>
                    <button @click="qing">
                        <i class="fa fa-trash-o"></i>
                        <span>清空</span>
                    </button>
                </p>
                <ul class="cartbody-list">
                    <li v-for="(val,index) in selectFoods" :key='index'>
                        <span class="list-name">{{val.name}}</span>
                        <span class="list-jiage" v-for="(item,i) in val.specfoods" :key="i">${{item.price}}</span>
                        <Calculation :content="val"/>
                    </li>
                </ul>
            </div>
        </div>
      </transition>


      <div class="cart-box" :class="{'ave':isEmpty}">
          <div class="cart-icon" @click="cartbody = !cartbody">
              <span>
                <i class="fa fa-cart-plus"></i>
                <i v-if="msg" class="sc">{{msg}}</i>
              </span>
          </div>
          <div class="cart-fei">
              <span v-if="isEmpty" >为选购商品</span>
              <p v-else>￥{{jiage.toFixed(2)}}</p>
              <p >令需配送费{{shopInfo.rst.float_delivery_fee}}</p>
          </div>
          <div class="cart-suan" >
              <span v-if="isEmpty">{{shopInfo.rst.float_minimum_order_amount}}元起送</span>
              <span v-else>去结算</span>
          </div>
      </div>
  </div>
</template>

<script>
import Calculation from '../../components/Shops/Calculation'
export default {
    data () {
        return {
            msg: 0,
            jiage: 0,
            selectFoods: [],
            cartbody:false,
        }
    },
    props: {
        shopInfo: Object
    },
    computed: {
        isEmpty () {
            let empty = true
            this.msg = 0
            this.jiage = 0
            this.selectFoods = []
            this.shopInfo.menu.forEach(menu => {
                menu.foods.forEach (foods => {
                    if (foods.content) {
                        empty = false
                        this.msg += foods.content
                        this.jiage += foods.content * foods.activity.fixed_price
                        this.selectFoods.push(foods)
                    }
                })
            })
            this.shopInfo.recommend.forEach(item => {
                item.items.forEach (val => {
                    if (val.content) {
                        empty = false
                        this.msg += val.content
                        this.jiage += val.content * val.activity.fixed_price
                        this.selectFoods.push(val)
                    }
                })
            })
            if (this.selectFoods.length == 0) {
                this.cartbody = false
            }
            return empty
        },
        
    },
    methods: {
        qing () {
            this.selectFoods.forEach(val => {
                val.content = 0
            })
            this.cartbody = false
        }
    },
    components: {
        Calculation
     }
}
</script>

<style scoped>
.shop-cart {
    height: 48px;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(61,61,63,0.9);
    z-index: 333;
}
.cart-box {
    display: flex;
}
.cart-icon {
    width: 50px;
    height: 50px;
    background: #444;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position:relative;
    top: -13px;
    left: 11px;
}
.cart-icon span {
    display: inline-block;
    width: 40px;
    height: 40px;
    background:rgb(35, 149, 255);
    border-radius: 50px;
    text-align: center;
    line-height: 45px;
}
.fa-cart-plus {
    font-size: 25px;
    color: #fff;
}
.cart-fei {
    margin-left: 30px;
    display: flex;
    justify-content: center;
    flex-direction: column
}
.cart-fei p:nth-child(1) {
    color: #fff;
}
.cart-fei p:nth-child(2) {
    margin-top: 2px;
    color: #888;
}
.cart-fei span {
    color: #fff;
}
.cart-suan {
    margin-left: auto;
    width: 100px;
    background: rgb(0, 255, 106);
    font-weight: 700;
    color: #fff;
    display: flex;
    font-size: 12px;
    justify-content: center;
    align-items: center;
}

.ave .cart-icon span{
    background:#666;
}
.ave .cart-icon span .fa-cart-plus {
    color: #888;
}
.ave .cart-suan {background: none
}
.sc {
    width: 20px;
    height: 20px;
    background: red;
    display: inline-block;
    border-radius: 50px;
    position: absolute;
    top: -5px;
    left: 30px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color: #fff;
}

.cartview-cartmask {
    position: fixed;
    top: 0;
    bottom: 48px;
    right: 0;
    left: 0;
    background: rgba(61,61,63,0.4);
    display: flex;
    align-items: flex-end;
}
.cartview-cartbody {
    background: red;
    width: 100%;
}
.cartbody-title {
    flex: 5;
    display: inline-block;
}
.cartview-cartbody p {
    display: flex;
    padding: 0 15px;
    background-color: #eceff1;
    color: #666;
    border-bottom: 1px #ddd solid;
    height: 40px;
    align-items: center;
}
.cartview-cartbody {
    float: 1;
}
.cartview-cartbody button {
    border: none;
    outline: none;
    background: #eceff1;
    color: #666;
}
.cartview-cartbody button i {
    margin-right: 3px;
}
.cartbody-list {
    background: #fff;
}
.cartbody-list li {
    height: 47.5px;
    padding: 7.5px 12.5px;
    display: flex;
    align-items: center;
    border-bottom: 1px #ddd solid;
}
.list-name {
    flex: 3;
    font-size: 14px;
}
.list-jiage {
    flex: 1;
    color: rgb(255, 83, 57);
    font-weight: 700;
}
.Calculation {
    flex: 2;
    display: flex;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>