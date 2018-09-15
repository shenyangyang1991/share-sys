export const state = () => ({
  card: {},
})

export const mutations = {
  init(state, topic) {
    state.card = topic
  },
}
