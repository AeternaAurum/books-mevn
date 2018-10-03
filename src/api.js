
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8081/',
  json: true
})

export default {
  async execute(method, resource, data) {
    return client({
      method,
      url: resource,
      data
    }).then(req => {
      return req.data
    })
  },

  getBooks() {
    return this.execute('get', '/books')
  },
  getBook(id) {
    return this.execute('get', `/books/${id}`)
  },
  createBook(data) {
    return this.execute('post', '/books', data)
  },
  updateBook(id, data) {
    return this.execute('put', `/books/${id}`, data)
  },
  deleteBook(id) {
    return this.execute('delete', `/books/${id}`)
  }


}