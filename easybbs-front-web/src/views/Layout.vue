<template>
  <div>
    <div class="header" v-show="showHeader">
      <div
        class="header-content"
        :style="{ width: proxy.globalInfo.bodyWidth + 'px' }"
      >
        <!--logo-->
        <router-link to="/" class="logo">
          <span
            v-for="(item, index) in logoInfo"
            :style="{ color: item.color }"
            :key="index"
            >{{ item.letter }}</span
          >
        </router-link>

        <!-- 板块信息 -->
        <div class="menu-panel">
          <router-link :class="['menu-item home',activePboardId == undefined ? 'active' : '',]" to="/">首页</router-link>
          <template v-for="(board,index) in boardList" :key="index">
            <el-popover
              placement="bottom-start"
              :width="300"
              trigger="hover"
              v-if="board.children.length > 0"
            >
              <template #reference>
                <span :class="['menu-item',board.boardId == activePboardId ? 'active' : '',]"
                  @click="boardClickHandler(board)">{{ board.boardName }}</span>
              </template>
              <div class="sub-board-list">
                <span :class="['sub-board',subBoard.boardId == activeBoardId ? 'active' : '',]" v-for="(subBoard,index) in board.children"
                  @click="subBoardClickHandler(subBoard)" :key="index">{{ subBoard.boardName }}</span
                >
              </div>
            </el-popover>
            <span
              :class="[
                'menu-item',
                board.boardId == activePboardId ? 'active' : '',
              ]"
              v-else
              @click="boardClickHandler(board)"
              >{{ board.boardName }}</span
            >
          </template>
        </div>
        <!-- 登陆注册用户信息 -->
        <div class="user-info-panel">
          <div class="op-btn">
            <el-button type="primary" class="op-btn" @click="newPost">
              发帖<span class="iconfont icon-add"></span>
            </el-button>
            <el-button type="primary" class="op-btn" @click="goSearch">
              搜索<span class="iconfont icon-search"></span>
            </el-button>
          </div>

          <el-button-group :style="{ 'margin-left': '10px' }">
            <el-button type="primary" plain @click="loginAndRegister(1)"
              >登录</el-button
            >
            <el-button type="primary" plain @click="loginAndRegister(0)"
              >注册</el-button
            >
          </el-button-group>
        </div>
      </div>
    </div>

    <div class="body-content">
      <router-view />
    </div>

    <!--登录 注册-->
    <LoginAndRegister ref="loginRegisterRef"></LoginAndRegister>
  </div>
</template>

<script setup>
import LoginAndRegister from "./LoginAndRegister.vue";
import { ref, reactive, getCurrentInstance, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const route = useRoute();
const store = useStore();
// 拿到定义的全局宽度变量
const { proxy } = getCurrentInstance();
const logoInfo = ref([
  {
    letter: "E",
    color: "#3285FF",
  },
  {
    letter: "a",
    color: "#FB3624",
  },
  {
    letter: "s",
    color: "#FFBA02",
  },
  {
    letter: "y",
    color: "#3285FF",
  },
  {
    letter: "b",
    color: "#25B24E",
  },
  {
    letter: "b",
    color: "#FD3224",
  },
  {
    letter: "s",
    color: "#FFBA02",
  },
]);
const showHeader = ref(true);

//获取滚动条的高度
const getScrollTop = () => {
  let scrollTop =
    document.documentElement.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop;
  return scrollTop;
};
const initScroll = () => {
  let initScrollTop = getScrollTop();
  let scrollType = 0;
  window.addEventListener("scroll", () => {
    let currentScrollTop = getScrollTop();
    if (currentScrollTop > initScrollTop) {
      //往下滚动
      scrollType = 1;
    } else {
      //往上滚动
      scrollType = 0;
    }
    initScrollTop = currentScrollTop;
    if (scrollType == 1 && currentScrollTop > 100) {
      showHeader.value = false;
    } else {
      showHeader.value = true;
    }
  });
};
const loginRegisterRef = ref();
const loginAndRegister = (type) => {
  loginRegisterRef.value.showPanel(type);
};

onMounted(() => {
  initScroll();
  // getUserInfo();
  // loadSysSetting();
});
</script>

<style lang="scss" scoped>
.header {
  top: 0px;
  width: 100%;
  position: fixed;
  box-shadow: 0 2px 6px 0 #ddd;
  z-index: 1000;
  .header-content {
    margin: 0px auto;
    align-items: center;
    height: 60px;
    display: flex;
    background: white;
    align-items: center;
    .logo {
      display: block;
      text-decoration: none;
      margin-right: 5px;
      span {
        font-size: 35px;
      }
    }
    .menu-panel {
      flex: 1;
      .menu-item {
        margin-left: 20px;
        cursor: pointer;
      }
      .home {
        text-decoration: none;
        color: #000;
      }
      .active {
        color: var(--link);
      }
    }
    .user-info-panel {
      width: 300px;
      display: flex;
      align-items: center;
      .op-btn {
        .iconfont {
          margin-left: 5px;
        }
        .el-button + .el-button {
          margin-left: 5px;
        }
      }
      .message-info {
        margin-left: 5px;
        margin-right: 25px;
        cursor: pointer;
        .icon-message {
          font-size: 25px;
          color: rgb(147, 147, 147);
        }
      }
    }
  }
}

.sub-board-list {
  display: flex;
  flex-wrap: wrap;
  .sub-board {
    padding: 0px 10px;
    border-radius: 20px;
    margin-right: 10px;
    background: rgb(239, 239, 239);
    border: 1px solid #ddd;
    color: rgb(119, 118, 118);
    margin-top: 10px;
    cursor: pointer;
  }

  .sub-board:hover {
    color: var(--link);
  }
  .active {
    background: var(--link);
    color: #fff;
  }
  .active:hover {
    color: #fff;
  }
}

.body-content {
  margin-top: 60px;
  position: relative;
  min-height: calc(100vh - 210px);
}

.message-item {
  display: flex;
  justify-content: space-around;
  .text {
    flex: 1;
  }
  .count-tag {
    height: 15px;
    line-height: 15px;
    min-width: 20px;
    display: inline-block;
    background: #f56c6c;
    border-radius: 10px;
    font-size: 13px;
    text-align: center;
    color: #fff;
    margin-left: 10px;
  }
}

.footer {
  background: #e9e9e9;
  height: 140px;
  margin-top: 10px;
  .footer-content {
    margin: 0px auto;
    padding-top: 10px;
    .item {
      text-align: left;
      .title {
        font-size: 18px;
        margin-bottom: 10px;
      }
      a {
        font-size: 14px;
        text-decoration: none;
        color: var(--text2);
        line-height: 25px;
      }
    }

    .logo {
      .logo-letter {
        font-size: 30px;
      }
      .info {
        margin-top: 10px;
        color: rgb(93, 91, 91);
      }
    }
  }
}
</style>
