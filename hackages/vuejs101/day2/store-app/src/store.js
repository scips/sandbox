import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import axios from 'axios'

const API_BASE = ''

let fetchingPost = false
const commentsFetched = {}

export default new Store({
  state: {
    posts: [],
    comments: [], // we use an array because it's very fast + if it's a bottle neck, refactor
    error: null
  },
  actions: {
    fetchAllPosts ({ commit }) {
      if (!fetchingPost) {
        axios.get(API_BASE + '/posts').then(({ data }) => {
          commit('saveAllPosts', {
            posts: data // use object it helps with debugging
          })
        })
        .catch(err => {
          commit('error', { err: err })
        })
      }
    },
    fetchCommentsForPost ({commit}, { id }) {
      if (!commentsFetched[id]) {
        axios.get(API_BASE + '/comments?postId=' + id).then(({ data }) => {
          commit('saveAllComments', {
            posts: data // use object it helps with debugging
          })
        })
        .catch(err => {
          commit('error', { err: err })
        })
      }
    }
  },
  mutations: {
    saveAllPosts (state, payload) {
      state.posts = payload.posts
    },
    saveComments (state, payload) {
      // replace the comments with additional comment
      state.comments = state.comments.concat(payload.comments)
    },
    error (state, error) {
      state.error = error.err
    }
  }
})
