import axios from 'axios'

const client = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  json: true
})

export default {
  async execute (method, resource, data) {
    return client({
      method,
      url: resource,
      data
    }).then(req => {
      return req.data
    })
  },
  getMoods () {
    return this.execute('get', '/moods')
  },
  getMood (id) {
    return this.execute('get', `/moods/${id}`)
  },
  createMood (data) {
    return this.execute('post', '/moods', data)
  },
  updateMood (id, data) {
    return this.execute('put', `/moods/${id}`, data)
  },
  deleteMood (id) {
    return this.execute('delete', `/moods/${id}`)
  }
}