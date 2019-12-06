<template>
  <div class="seavluate" v-if="evaluation">
      <div class="seavluate-score">
        <h4>{{evaluation.rating.shop_score.toFixed(1)}}</h4>
        <div class="score-x">
          <p class="score-tit">商家评分</p>
          <Rating :rating="evaluation.rating.shop_score"/>
        </div>
        <div class="score-f">
          <div>
            <p>味道</p>
            <p>{{evaluation.rating.taste_score.toFixed(1)}}</p>
          </div>
          <div>
            <p>包装</p>
            <p>{{evaluation.rating.package_score.toFixed(1)}}</p>
          </div>
        </div>
        <div class="score-p">
          <p>配送</p>
          <p>{{evaluation.rating.rider_score.toFixed(1)}}</p>
        </div>
      </div>
      <!-- 评论区 -->
      <div class="tags">
        <ul class="tags-cha">
          <li v-for="(val,index) in evaluation.tags" :key="index" :class="{'unsatisfied':val.unsatisfied}">
            <span>{{val.name}} </span>
            <span v-if="val.count > 0">{{val.count}}</span>
          </li>
        </ul>
        <!-- 内容 -->
        <ul class="seavluate-list">
          <li v-for="(item,index) in evaluation.comments" :key="index">
            <div class="comment-user">
              <img :src="item.avatar || 'https://shadow.elemecdn.com/faas/h5/static/sprite.3ffb5d8.png'"
              alt>
            </div>
            <div class="comments-info"> 
              <div class="comment-name">
                  <h4>{{item.username}}</h4>
                  <p>{{item.rated_at}}</p>
              </div>
              <div class="comment-rating">
                <Rating :rating="item.rating"/>
                <span :style="{color:ratingcontent(item.rating).color}">{{ratingcontent(item.rating).txt}}</span>
              </div>
              <div class="comment-reply">{{item.reply.content}}</div>
              <ul class="comment-imgs">
                <li v-for="(img,i) in item.order_images" :key="i">
                  <!-- <img :src="img.image_hash" alt> -->
                  <img v-lazy="img.image_hash">
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import { Lazyload } from 'mint-ui';
import Rating from '../../components/Rating'
export default {
  data () {
    return {
      evaluation:null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios("/api/profile/comments").then (res => {
        this.evaluation = res.data
      })
    },
    ratingcontent(rating) {
      const content = [
        { txt:"吐槽", color:"rgb(137,159,188)" },
        { txt:"较差", color:"rgb(137,159,188)" },
        { txt:"一般", color:"rgb(251,154,11)" },
        { txt:"满意", color:"rgb(251,154,11)" },
        { txt:"超赞", color:"rgb(255,960,0)" }
      ];
      return content[rating-1]
    }

  },
  components: {
    Rating
  }
}
</script>

<style scoped>
  .seavluate-score {
    display: flex;
    height: 97px;
    width: 100%;
    align-items: center;
    padding: 0 24px;
    box-sizing: border-box;
    background: #fff;
  }
  .seavluate-score h4 {
    font-size: 36px;
    color: #ff6000;
  }
  .seavluate-score p {
    color: #666;
    margin-bottom: 5px;
    font-size: 14px;
  }
  .score-f {
    display: flex;
    width: 100px;
    padding: 0 20px;
    justify-content:space-between;
  }
  .score-p {
    padding-left: 30px;
    border-left: 1px solid #ddd;
  }
  .score-x {
    width: 70px;
    margin-left: 30px;
  }
  .tags-cha {
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  .tags-cha li{
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    background-color: #ebf5ff;
    color: #6d7885;
    margin: 4px;
    font-size: 12px;
  }
  .tags-cha .unsatisfied {
    color: #aaa;
    background-color: #f5f5f5;
  }
  .tags {
    padding: 11px 13px;
    background: #fff;
    margin-top: 8px;
  }
  .seavluate-list {
    width: 375px;
  }
  .seavluate-list li{
    display: flex;
    padding: 16px 0 13px 0;
    border-bottom: 1px solid #eee;
  }
  .comment-user {
    width: 45px;
  }
  .comment-user img {
    width: 30px;
    height: 30px;
    border-radius: 50px;
  }
  .comment-name {
    display: flex;
    justify-content:space-between;
    margin-bottom: 5px;
  }
  .comment-name p {
    font-size: 12px;
    color: #999;
  }
  .comment-reply {
    font-size: 12px;
    padding: 10px;
    background: #f3f3f3;
    line-height: 15px;
    border-radius: 5px;
    position: relative;
    margin: 15px 0;
  }
  .comment-reply::after {
    content: " ";
    position: absolute;
    bottom: 100%;
    left: 4vw;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 2.133333vw 2.133333vw;
    border-color: transparent transparent #f3f3f3;
}
.comment-rating {
  display: flex;
}
.comment-rating span {
  margin-left: 10px;
  color: rgb(255, 96, 0);
}
.comment-imgs {
  margin: 5px 0;
}
.comment-imgs li {
  padding: 0;
  border-bottom: none;
}
.comment-imgs img {
  width: 165px;
  height: 165px;
}
.comments-info {
  width: 343px;
}
</style>