<template>
  <div id="app">
    <nuxt/>
    <div layout layout-align="start center" class="hfc-download">
      <img class="hfc-logo" src="https://static.hfc.highfaner.com/share/v1/hfc-logo.png"/>
      <div layout="column" flex layout-align="space-between start" class="hfc-desc">
        <span class="hfc-title">嗨范儿社区</span>
        <span class="hfc-profile">全球最大的青年文化社交网络</span>
      </div>
      <div class="download-bar">
        立即下载
      </div>
    </div>
  </div>
</template>

<style>
  [layout] {
    display: flex;
  }

  [flex] {
    flex: 1;
  }

  [layout="row"] {
    flex-direction: row;
  }

  [layout="column"] {
    flex-direction: column;
  }

  [layout-align="start start"],
  [layout-align="start center"],
  [layout-align="start end"] {
    justify-content: flex-start;
  }

  [layout-align="center start"],
  [layout-align="center center"],
  [layout-align="center end"] {
    justify-content: center;
  }

  [layout-align="end start"],
  [layout-align="end center"],
  [layout-align="end end"] {
    justify-content: flex-end;
  }

  [layout-align="space-between start"],
  [layout-align="space-between center"],
  [layout-align="space-between end"] {
    justify-content: space-between;
  }

  [layout-align="space-arround start"],
  [layout-align="space-arround center"],
  [layout-align="space-arround end"] {
    justify-content: space-around;
  }

  [layout-align="start start"],
  [layout-align="center start"],
  [layout-align="end start"],
  [layout-align="space-between start"],
  [layout-align="space-arround start"] {
    align-items: flex-start;
  }

  [layout-align="start center"],
  [layout-align="center center"],
  [layout-align="end center"],
  [layout-align="space-between center"],
  [layout-align="space-arround center"] {
    align-items: center;
  }

  [layout-align="start end"],
  [layout-align="center end"],
  [layout-align="end end"],
  [layout-align="space-between end"],
  [layout-align="space-arround end"] {
    align-items: flex-end;
  }

  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    font-size: 100px;
  }

  html, body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    height: 100%;

    font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    line-height: 1.4;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #__nuxt, #__layout, #app {
    height: 100%;
  }

  .hfc-download {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    height: 1.28rem;
    padding: 0 .3rem;
    background-color: #fff;
    box-shadow: 0 0 .48rem 0 rgba(0, 0, 0, .1);
  }

  .hfc-download .hfc-logo {
    width: .88rem;
    height: .88rem;
    margin-right: .3rem;
  }

  .hfc-download .hfc-desc {
  }

  .hfc-desc .hfc-title {
    font-size: .32rem;
    font-weight: 500;
    color: #383838;
  }

  .hfc-desc .hfc-profile {
    font-size: .26rem;
    color: #383838;
  }

  .hfc-download .download-bar {
    width: 1.44rem;
    height: .56rem;
    font-size: .26rem;
    font-weight: 500;
    color: #383838;
    text-align: center;
    line-height: .56rem;
    border: 1px solid #202020;
    border-radius: .06rem;
    overflow: hidden;
  }
</style>

