<template>
  <div class="ranking">
    <div v-for="(user, i) in highScores" :key="i">
      <div class="rank">
        <span :style="`background:${rankingColor(user.ranking)}`">
          <span class="num">{{ user.ranking }}</span>
        </span>
      </div>
      <div class="userName">{{ user.userName }}</div>
      <div class="score">{{ user.points }}</div>
    </div>
    <div class="your-score">
      <div class="rank">{{ myData.ranking }}</div>
      <div class="userName">{{ myData.userName }}</div>
      <div class="score">{{ myData.points }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['userName', 'pointData']),
    highScores() {
      const { highScores } = this.pointData;
      return highScores.slice(0, 5);
    },
    myData() {
      const { myData } = this.pointData;
      return myData;
    },
    rankingColor() {
      return (i) => {
        if (i === 1) {
          return '#dab413';
        }
        if (i === 2) {
          return '#6e7b84';
        }
        if (i === 3) {
          return '#a0541a';
        }
        return 'transparent';
      };
    },
  },
};
</script>

<style scoped>
.rankingLayer {
  position: absolute;
  background: rgba(255, 255, 255, 0.4);
  top: 0;
  right: 0;
  z-index: 2;
}

.ranking {
  background: rgba(0, 21, 40, 0.8);
  width: 300px;
  position: fixed;
  top: 0;
  right: 0;
  color: #fff;
  z-index: 100;
}

.ranking > div {
  width: 100%;
  display: flex;
  text-align: center;
  line-height: 40px;
  height: 40px;
  border-bottom: 1px solid #888;
}

.title > div {
  margin: 0 auto;
}

.rank {
  width: 15%;
}

.rank > span {
  width: 18px;
  height: 18px;
  display: inline-block;
  line-height: 18px;
  transform: rotate(45deg);
}

.num {
  display: inline-block;
  transform: rotate(-45deg);
}

.userName {
  width: 60%;
  border-left: 1px solid #555;
}

.score {
  width: 25%;
  border-left: 1px solid #555;
}

.ranking > .your-score {
  border-bottom: none;
  border-top: 1px solid #fff;
}

@media screen and (max-width: 800px) {
  .ranking {
    width: 150px;
  }
  .ranking > div {
    line-height: 30px;
    height: 30px;
  }
  .rank > span {
    width: 14px;
    height: 14px;
    display: inline-block;
    line-height: 14px;
    transform: rotate(45deg);
  }
}
</style>
