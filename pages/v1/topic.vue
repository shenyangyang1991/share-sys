<template>
  <topic-item :item="card"></topic-item>
</template>

<script>
  import TopicItem from '~/components/TopicItem'

  export default {
    name: 'Topic',

    components: {
      TopicItem
    },

    computed: {
      card() {
        return this.$store.state.topic.card
      },
    },

    head() {
      return {
        title: this.card ? this.card.subject_title : '嗨范儿社区'
      }
    },

    async fetch({store, query, app}) {
      try {
        let card = await app.$axios.$get(`/api/v1/recommended/topic?topic_id=${query.topic_id}`)
        if (card.success) {
          store.commit('topic/init', card.data)
        }
      } catch (e) {
        //
      }
    }
  }
</script>
