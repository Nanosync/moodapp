<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Mood Log</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-alert :show="loadingError" variant="danger">Loading from server failed</b-alert>
    <b-row v-if="!loading && !loadingError">
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Feeling</th>
              <th>Message</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mood in moods" :key="mood._id">
              <td>{{ mood.timestamp | formatDateTime }}</td>
              <td>{{ mood.feeling }}</td>
              <td>{{ mood.message }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateMoodToEdit(mood)">Edit</a> -
                <a href="#" @click.prevent="deleteMood(mood._id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model._id ? 'Edit Mood ID#' + model._id : 'New Mood')">
          <b-alert v-model="showError" variant="danger" dismissible>Feeling cannot be empty</b-alert>
          <form @submit.prevent="saveMood">
            <b-form-group label="Feeling">
              <b-form-input type="text" v-model="model.feeling" placeholder="How are you feeling today?"></b-form-input>
            </b-form-group>
            <b-form-group label="Message">
              <b-form-textarea rows="4" v-model="model.message" placeholder="Describe the situation"></b-form-textarea>
            </b-form-group>
            <b-form-group label="Date">
              <b-form-input type="date" v-model="prettyDate"></b-form-input>
            </b-form-group>
            <b-form-group label="Time">
              <b-form-input type="time" v-model="prettyTime"></b-form-input>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success" class="mr-1">{{ this.model._id ? "Update" : "Create" }}</b-btn>
              <b-btn type="submit" variant="secondary" class="mr-1" @click.prevent="onCancel" v-if="this.model._id">Cancel</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '@/api'
import moment from 'moment'

export default {
  data () {
    return {
      loading: false,
      loadingError: false,
      moods: [],
      model: {},
      showError: false,
      console
    }
  },
  async created () {
    this.model.timestamp = new Date(Date.now()).toISOString()
    this.refreshMoods()
  },
  computed: {
    prettyDate: {
      get: function () {
        return this.$options.filters.formatDate(this.model.timestamp)
      },
      set: function (newValue) {
        let currTime = moment(this.model.timestamp).format("HH:mm:ss")
        if (moment(newValue + " " + currTime).isValid()) {
          this.model.timestamp = moment(newValue + " " + currTime).toISOString()
        }
      }
    },
    prettyTime: {
      get: function () {
        return this.$options.filters.formatTime(this.model.timestamp)
      },
      set: function (newValue) {
        let currDate = moment(this.model.timestamp).format(moment.HTML5_FMT.DATE)
        if (moment(currDate + " " + newValue).isValid()) {
          this.model.timestamp = moment(currDate + " " + newValue).toISOString()
        }
      }
    }
  },
  methods: {
    async refreshMoods() {
      this.loading = true
      try {
        this.moods = await api.getMoods()
      } catch(e) {
        this.loading = false
        this.loadingError = true
        return
      }
      this.loading = false
      this.loadingError = false
      this.showError = false
    },
    async populateMoodToEdit(mood) {
      this.model = Object.assign({}, mood)
    },
    async saveMood() {
      if (!this.model.feeling) {
        this.showError = true
        return
      }
      if (this.model._id) {
        await api.updateMood(this.model._id, this.model)
      } else {
        await api.createMood(this.model)
      }
      this.model = {} // reset form
      this.model.timestamp = new Date(Date.now()).toISOString()
      await this.refreshMoods()
    },
    async deleteMood(id) {
      if (confirm('Are you sure you want to delete this mood?')) {
        if (this.model._id === id) {
          this.model = {}
        }
        await api.deleteMood(id)
        await this.refreshMoods()
      }
    },
    async onCancel() {
      this.model = {}
      this.model.timestamp = new Date(Date.now()).toISOString()
      await this.refreshMoods()
    }
  }
}
</script>