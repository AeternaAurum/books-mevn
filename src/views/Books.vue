<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Book manager</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Pages</th>
              <th>Description</th>
              <th>Type</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in books" :key="post.id">
              <td>{{ post.id }}</td>
              <td>{{ post.title }}</td>
              <td>{{ post.author }}</td>
              <td>{{ post.pageCount }}</td>
              <td>{{ post.description }}</td>
              <td>{{ post.type }}</td>
              <td class="text-right">
                <b-button style="margin-right: 5px" variant="success" @click.prevent="populateBookToEdit(post)">Edit</b-button>
                <b-button variant="danger" @click.prevent="deleteBook(post.id)">Delete</b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? `Edit post id# ${model.id}` : 'New Post')">
          <form @submit.prevent="saveBook">
            <b-form-group label="Title">
              <b-form-input type="text" v-model="model.title"></b-form-input>
            </b-form-group>
            <b-form-group label="Author">
              <b-form-input type="text" v-model="model.author"></b-form-input>
            </b-form-group>
            <b-form-group label="Pages">
              <b-form-input type="text" v-model="model.pageCount"></b-form-input>
            </b-form-group>
            <b-form-group label="Description">
              <b-form-input type="text" v-model="model.description"></b-form-input>
            </b-form-group>
            <b-form-group label="Type">
              <b-form-input type="text" v-model="model.type"></b-form-input>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Book</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>


<script>
  import api from '@/api'

  export default {
    name: 'books',

    data() {
      return {
        loading: false,
        books: [],
        model: {}
      }
    },

    async created() {
      this.refreshBooks()
    },

    methods: {
      async refreshBooks() {
        this.loading = true
        this.books = await api.getBooks()
        this.loading = false
      },

      async populateBookToEdit(book) {
        this.model = { ...book }
      },

      async saveBook() {
        if (this.model.id) {
          await api.updateBook(this.model.id, this.model)
        } else {
          await api.createBook(this.model)
        }
        this.model = {}
        await this.refreshBooks()
      },

      async deleteBook(id) {
        if (confirm('Are you sure')) {
          if (this.model.id === id) {
            this.model = {}
          }

          await api.deleteBook(id)
          await this.refreshBooks()
        }
      }
    }
  }
</script>