<template>
  <div class="subject-panel">
    <div class="subject-poster">
      <img class="subject-image" :src="content.subject_poster"/>
      <i class="subject-helper"></i>
    </div>
    <div layout layout-align="start center" class="subject-cnt">
      <span>{{content.follower_cnt}}人关注</span>
      <span>·</span>
      <span>{{content.topic_cnt}}条内容</span>
    </div>
    <div class="subject-title">
      {{content.subject_title}}
    </div>
    <div class="subject-follower">
      关注
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SubjectCard',
    props: ['content'],
  }
</script>

<style>
  .subject-panel {
    position: relative;
  }

  .subject-poster {
    position: relative;
    height: 4.22rem;

    overflow: hidden;
  }

  .subject-poster .subject-helper {
    position: absolute;
    z-index: 6;

    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    width: 7.5rem;
    height: 4.22rem;

    background: url('https://static.hfc.highfaner.com/share/v1/subject-helper.png') no-repeat;
    background-size: 7.5rem, 4.22rem;
  }

  .subject-poster .subject-image {
    display: block;

    width: 7.5rem;
    height: 4.22rem;
  }

  .subject-panel .subject-cnt {
    padding: 0 .44rem;
  }

  .subject-cnt > span {
    margin-right: .1rem;

    font-size: .26rem;
    color: #a7a7a7;
  }

  .subject-panel .subject-title {
    padding: .1rem .44rem;

    font-size: .66rem;
    font-weight: 600;
    color: #383838;
  }

  .subject-panel .subject-follower {
    width: 1.44rem;
    height: .6rem;

    margin: 0 .44rem .3rem;

    font-size: .28rem;
    font-weight: 500;
    color: #383838;

    text-align: center;
    line-height: .6rem;

    border-radius: .06rem;
    overflow: hidden;

    background-color: #fadc22;
  }
</style>
