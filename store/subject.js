export const state = () => ({
  list: [],
  card: {},
  id: 0
})

export const mutations = {
  add(state, list) {
    state.list = list
  },
  init(state, subject) {
    state.card = subject
  },
  id(state, id) {
    state.id = id
  }
}
