<template>
  <div class="topic-item">
    <div layout layout-align="start center" class="topic-user">
      <img class="avatar" :src="item.avatar_url || defaultAvatar"/>
      <div layout="column" flex layout-align="space-between start" class="user-body">
        <span class="nick-name">{{item.nickname}}</span>
        <span class="topic-created">{{item.created | parseTime}}</span>
      </div>
    </div>
    <div v-if="item.topic_context" class="topic-context">
      {{item.topic_context}}
    </div>
    <div v-if="item.topic_poster" class="topic-poster">
      <img class="topic-image" :src="item.topic_poster" :style="(item.poster_height / item.poster_width) | size"/>
    </div>
    <div v-if="item.topic_voice" class="topic-voice"
         :style="{background: 'url('+(item.avatar_url || defaultAvatar)+') no-repeat center',  backgroundPosition: 'center', backgroundSize: 'cover'}">
      <div layout layout-align="start center" class="voice-mask">
        <div layout="column" flex class="voice-body">
          <span class="voice-label">录音</span>
          <span class="voice-title">{{item.nickname}}上传了一段录音</span>
          <span v-if="avStatus === 'pause'" class="voice-time">正在播放...</span>
          <span v-else class="voice-time">{{item.voice_time | parseDuration}}</span>
        </div>
        <audio :ref="`av${item.topic_id}`" :src="item.topic_voice" @play="playCallBack"
               @ended="pauseCallBack"
               @pause="pauseCallBack"></audio>
        <div layout layout-align="center center" class="avatar"
             @click="toggle(item.topic_id)"
             :style="{background: 'url('+(item.avatar_url || defaultAvatar)+') no-repeat', backgroundPosition: 'center', backgroundSize: '1.2rem 1.2rem'}">
          <i :class="{'icon-play': avStatus === 'play', 'icon-pause': avStatus === 'pause'}"></i>
        </div>
      </div>
    </div>
    <div layout class="topic-action">
      <i class="action-liker"></i>
      <i class="action-comment"></i>
    </div>
    <div layout class="topic-cnt">
      <span>{{item.like_cnt}}次点赞</span>
    </div>
    <div v-for="(comment, index) in item.comment_list" :key="index" layout class="topic-comment">
      <span class="nick-name">{{comment.nickname}}{{comment.reply_name ? `回复${comment.reply_name}` : ''}}：</span>
      <span class="comment-context">{{comment.comment_context}}</span>
    </div>
    <div class="topic-comment-cnt">
      查看{{item.comment_cnt}}条评论
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TopicItem',
    data() {
      return {
        defaultAvatar: 'https://static.hfc.highfaner.com/share/v1/avatar.png',
        avStatus: 'play',
      }
    },
    props: ['item'],
    methods: {
      toggle(id) {
        let av = this.$refs[`av${id}`]
        if (av) {
          if (av.paused) {
            av.play()
            this.$emit('played', av)
          } else {
            av.pause()
            this.$emit('paused')
          }
        }
      },
      playCallBack(e) {
        this.avStatus = 'pause'
      },
      pauseCallBack() {
        this.avStatus = 'play'
      }
    },
    filters: {
      parseTime(val) {
        if (val && typeof val === 'string' && val.length === 25) {
          val = val.slice(0, -6)
        } else {
          return '刚刚'
        }

        let timestamp = ((new Date(val)).getTime() || 0) + 8 * 3600 * 1000
        let now = Date.now()

        let time = (now - timestamp) / 1000
        if (time < 60 * 5) {
          return '刚刚'
        } else if (time >= 60 * 5 && time < 60 * 60) {
          return `${parseInt(time / 60)}分钟前`
        } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
          return `${parseInt(time / (60 * 60))}小时前`
        } else if (time >= 60 * 60 * 24 && time < 60 * 60 * 24 * 30) {
          return `${parseInt(time / (60 * 60 * 24))}天前`
        } else if (time >= 60 * 60 * 24 * 30 && time < 60 * 60 * 24 * 30 * 12) {
          return `${parseInt(time / (60 * 60 * 24 * 30))}个月前`
        } else if (time >= 60 * 60 * 24 * 30 * 12) {
          return `${parseInt(time / (60 * 60 * 24 * 30 * 12))}年前`
        } else {
          return val
        }
      },
      parseDuration(val) {
        if (!val || !(parseInt(val))) {
          return '00:00:00'
        }
        let time = parseInt(val)
        let second = time % 60
        let minute = parseInt(time / 60) % 60
        let hour = parseInt(time / 60 / 60)

        return `${hour > 9 ? hour : '0' + hour}:${minute > 9 ? minute : '0' + minute}:${second > 9 ? second : '0' + second}`
      },
      size(radio) {
        if (!radio) {
          return {height: 'auto'}
        }
        return {height: (6.7 * radio) + 'rem'}
      }
    }
  }
</script>

<style>
  .topic-item {
    padding: 0.3rem 0;
    margin: 0 0.44rem;
    border-bottom: 1px solid #e1e1e1;
  }

  .topic-item:last-child {
    border: 0;
  }

  .topic-item .topic-user {
  }

  .topic-user .avatar {
    display: block;
    width: 0.72rem;
    height: 0.72rem;
    margin-right: 0.2rem;
    border-radius: 0.36rem;
    overflow: hidden;
  }

  .topic-user .user-body {
  }

  .user-body .nick-name {
    font-size: 0.28rem;
    font-weight: 500;
    color: #383838;
  }

  .user-body .topic-created {
    font-size: 0.24rem;
    color: #a7a7a7;
  }

  .topic-item .topic-context {
    padding: 0.3rem 0 0;
    font-size: 0.32rem;
    font-weight: 500;
    color: #383838;
  }

  .topic-item .topic-poster {
    padding: 0.3rem 0 0;
    border-radius: 0.06rem;
    overflow: hidden;
  }

  .topic-poster .topic-image {
    display: block;
    width: 6.7rem;
    height: auto;
  }

  .topic-item .topic-voice {
    position: relative;
    width: 100%;
    height: 1.8rem;
    padding: 0.3rem 0 0;
    border-radius: 0.06rem;
    overflow: hidden;
  }

  .topic-voice .voice-mask {
    position: absolute;
    z-index: 6;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 1.8rem;
    padding: 0 0.3rem;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .voice-mask .avatar {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 0.6rem;
    overflow: hidden;
  }

  .voice-mask .icon-play {
    width: .48rem;
    height: .48rem;
    background: url('https://static.hfc.highfaner.com/share/v1/icon-play.png') no-repeat;
    background-size: 0.48rem 0.48rem;
  }

  .voice-mask .icon-pause {
    width: .48rem;
    height: .48rem;
    background: url('https://static.hfc.highfaner.com/share/v1/icon-pause.png') no-repeat;
    background-size: 0.48rem 0.48rem;
  }

  .topic-voice .voice-body {
  }

  .voice-body .voice-label {
    width: .48rem;
    height: .24rem;
    font-size: 0.12rem;
    color: #000;
    text-align: center;
    line-height: 0.24rem;
    border-radius: 0.04rem;
    overflow: hidden;
    background-color: #fadc22;
  }

  .voice-body .voice-title {
    padding: 0.05rem 0;
    font-size: 0.32rem;
    color: #fff;
  }

  .voice-body .voice-time {
    font-size: 0.22rem;
    color: #fff;
    opacity: 0.6;
  }

  .topic-item .topic-action {
    padding: 0.3rem 0;
  }

  .topic-action .action-liker {
    background: url('https://static.hfc.highfaner.com/share/v1/icon-liker.png') no-repeat;
    background-position: center center;
    background-size: 0.48rem 0.44rem;
  }

  .topic-action .action-comment {
    background: url('https://static.hfc.highfaner.com/share/v1/icon-comment.png') no-repeat;
    background-position: center center;
    background-size: 0.46rem 0.46rem;
  }

  .topic-action > i {
    display: block;
    width: .48rem;
    height: .48rem;
    margin-right: 0.3rem;
  }

  .topic-item .topic-cnt {
    padding-bottom: 0.1rem;
  }

  .topic-cnt > span {
    margin-right: 0.2rem;
    font-size: 0.27rem;
    font-weight: 500;
    color: #383838;
  }

  .topic-item .topic-comment {
    padding-bottom: 0.1rem;

  }

  .topic-comment .nick-name {
    font-size: 0.27rem;
    font-weight: 500;
    color: #383838;
  }

  .topic-comment .comment-context {
    font-size: 0.27rem;
    color: #383838;
  }

  .topic-item .topic-comment-cnt {
    font-size: 0.27rem;
    color: #a7a7a7;
  }
</style>
