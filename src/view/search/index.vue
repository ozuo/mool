/**
* 搜索页
* Created by zuo on 2017/9/27.
*/

<template>
  <div class="main-wrapper">
    <div class="head-wrapper">
      <div class="head-content">
        <div class="head-position">
          <i class="iconfont icon-dingwei1"></i>
          <span class="address">黄浦区上海市委(人民大道北)</span>
          <i class="iconfont icon-xiasanjiao"></i>
        </div>
        <div class="head-weather">
          <div>
            <h2 class="weather-temperature">26&deg;</h2>
            <p class="weather-desc">多云天</p>
          </div>
          <i class="iconfont icon-duoyun weather-icon"></i>
        </div>
      </div>
    </div>
    <div class="search-wrapper" style="position: sticky; top: 0; z-index: 999;">
      <div href="javascript:" class="search-content" style="top: 0; z-index: 999;">
        <a class="content-href">
          <i class="iconfont icon-sousuo"></i>
          <span class="search-text">搜索商家、商品名称</span>
        </a>
      </div>
    </div>
    <div class="keyword-wrapper">
      <div class="keyword-content">
        <a href="javascript:"> 面包 </a>
        <a href="javascript:"> 粥 </a>
        <a href="javascript:"> 麻辣烫 </a>
        <a href="javascript:"> 咖啡 </a>
        <a href="javascript:"> 沙拉 </a>
        <a href="javascript:"> 星巴克 </a>
        <a href="javascript:"> 麦当劳 </a>
        <a href="javascript:"> 奶茶 </a>
        <a href="javascript:"> 一点点 </a>
        <a href="javascript:"> 水果 </a>
      </div>
    </div>

    <div class="components-container">
      <code>Sticky header 当页面滚动到预设的位置会吸附在顶部</code>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
      <div>我是占位</div>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .main-wrapper
    .head-wrapper
      padding: 10px 15px 0
      background-image: linear-gradient(90deg, #0af, #0085ff)
      color: #fff
      .head-content
        display: flex
        align-items: center
        justify-content: space-between
        height: 40px
      .head-position
        width: 60%
        display: flex
        align-items: center
        .icon-dingwei1
          font-size: 20px
        .address
          margin: 0 5px;
          font-weight: 700
          font-size: 20px
          /*max-width: 80%;*/
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        .icon-xiasanjiao
          font-size: 8px
      .head-weather
        display: flex;
        align-items: center;
        text-align: right;
        .weather-temperature
          font-size: 12px
        .weather-desc
          font-size: 10px
        .weather-icon
          font-size: 26px
          margin-left: 3px;
    .search-wrapper
      background-image: linear-gradient(90deg, #0af, #0085ff)
      .search-content
        padding: 10px 15px;
        background-image: linear-gradient(90deg, #0af, #0085ff)
        &:before
          top: -1px
        &:after
          bottom: -1px
        &:after, &:before
          content: ""
          position: absolute
          width: 100%
          height: 2px
          left: 0
          background-image: linear-gradient(90deg, #0af, #0085ff)
        .content-href
          display: flex
          width: 100%
          height: 40px
          justify-content: center
          align-items: center
          border-radius: 1px
          background: #fff
          color: #666
          .icon-sousuo
            display: inline-block
            font-size: 18px
            margin-right: 2px
          .search-text
            font-weight: 700
            font-size: 15px

    .keyword-wrapper
      padding: 5px 15px 15px
      background-image: linear-gradient(90deg, #0af, #0085ff)
      .keyword-content
        width: 100%
        color: #fff
        white-space: nowrap
        overflow-x: auto
        & > a
          font-size: 10px
          color: #fff
        & > a:not(:last-child)
          margin-right: 15px

  /*滚动条整体部分 定义滚动条高宽及背景*/
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: none;
  }

  /*!*滚动条的轨道 内阴影+圆角*!*/
  ::-webkit-scrollbar-track-piece {
    background: none;
  }

  /*!*滚动条里面的滑块 内阴影+圆角*!*/
  ::-webkit-scrollbar-thumb {
    background: none;
  }
</style>
