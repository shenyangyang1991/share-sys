<template>
  <scroll
    :data="list"
    :pullup="true"
    @pullup="loadMore"
  >
    <subject-card :content="card"/>

    <topic-item v-for="(item, index) in list" :key="index" :item="item" @played="playCallback" @paused="pauseCallback"/>
  </scroll>
</template>

<script>
  import Scroll from '~/components/Scroll'
  import SubjectCard from '~/components/SubjectCard'
  import TopicItem from '~/components/TopicItem'

  export default {
    name: 'Subject',

    data() {
      return {
        page: 1,
        next: true,
        av: null,
      }
    },

    components: {
      Scroll,
      SubjectCard,
      TopicItem
    },

    computed: {
      list() {
        return this.$store.state.subject.list
      },
      card() {
        return this.$store.state.subject.card
      },
      id() {
        return this.$store.state.subject.id
      }
    },

    methods: {
      async loadMore() {
        this.next = this.list && this.list.length === (10 * this.page)
        if (!this.next) return

        this.page++
        try {
          let list = await this.$axios.$get(`/api/v1/recommended/topics?subject_id=${this.id}&offset=${this.page}`)
          if (list.success) {
            this.$store.commit('subject/add', [].concat(this.list).concat(list.data.list))
          }
        } catch (e) {
          //
        }
      },
      playCallback(av) {
        if (this.av === av) return
        if (this.av) {
          this.av.pause()
        }
        this.av = av
      },
      pauseCallback() {
        this.av = null
      }
    },

    async fetch({store, query, app}) {

      store.commit('subject/id', query.subject_id || 0)

      try {
        let card = await app.$axios.$get(`/api/v1/recommended/subject?subject_id=${query.subject_id}`)
        if (card.success) {
          store.commit('subject/init', card.data)
        }
      } catch (e) {
        //
      }

      try {
        let list = await app.$axios.$get(`/api/v1/recommended/topics?subject_id=${query.subject_id}&offset=1`)
        if (list.success) {
          store.commit('subject/add', list.data.list)
        }
      } catch (e) {
        //
      }

    }
  }
</script>
