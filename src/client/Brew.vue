<template>
  <div>
    <a href="/">Back to List</a>
    <h1>{{ brew.recipe.name }}</h1>
    <div>Brew Started: {{ brew.dateStarted | formatTitleDate }}</div>
    <form class="note-form" @submit.prevent="addNote" v-on:keyup.ctrl.enter="addNote">
      <h2>Add Note</h2>
      <label>
        Type
        <input type="text" v-model="note.type" list="note-type-list" />
        <datalist id="note-type-list">
          <option v-for="type in noteTypes" :value="type" :key="type"></option>
        </datalist>
      </label>
      <textarea class="note-form__text" v-model="note.text"></textarea>
      <button type="submit">Add</button>
    </form>
    <RecipeView :recipe="brew.recipe" />
    <div v-for="(notes, type) in notesDictionary" :key="type">
      <h2>{{ type }}</h2>
      <div v-for="note in notes" :key="note.time">
        <h3>{{ note.moment.format('YYYY-MM-DD [@] HH:mm:ss') }}</h3>
        <div class="note__text">{{ note.text }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.note-form {
  margin-bottom: 2rem;
}
.note-form__text {
  width: 100%;
}
.note__text {
  white-space: pre-wrap;
}
</style>
<script>
import RecipeView from './components/RecipeView.vue';
import moment from 'moment';
export default {
  name: 'Brew',
  props: {
    id: String
  },
  data() {
    return {
      note: { type: '', text: '' },
      brew: undefined
    };
  },
  async created() {
    this.brew = await this.getBrew(this.id);
  },
  components: {
    RecipeView
  },
  filters: {
    formatTitleDate(value)  {
      return moment(value).format('YYYY-MM-DD');
    }
  },
  computed: {
    notesDictionary() {
      return this.brew.notes
          // add moment for easy comparison
          .map(note => { return { ...note, moment: moment(note.time) } })
          .sort((left, right) => left.moment.diff(right.moment))
          // create dictionary using type as a lookup
          .reduce((dictionary, note) => {
            dictionary[note.type] === undefined ? dictionary[note.type] = [note]: dictionary[note.type].push(note);
            return dictionary;
          }, {});
    },
    noteTypes() {
      return this.brew.notes
          .map(note => note.type)
          .filter((value, index, source) => source.indexOf(value) === index);
    }
  },
  methods: {
    async getBrew(id) {
      const response = await fetch(`brews/${id}`);
      const json = await response.json();
      if (!json.notes) {
        // if notes are undefined and then instantiated later,
        // the computed property will not update correctly. If
        // we instantiate the collection now, we're all good.
        json.notes = [];
      }

      return json;
    },
    async addNote() {
      this.brew.notes.push({ time: moment().format(), type: this.note.type, text: this.note.text });
      await fetch(`brews/${this.brew._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.brew)
      });

      this.note.text = '';
    }
  }
}
</script>