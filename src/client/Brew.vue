<template>
  <div v-if="brew">
    <router-link :to="{ name: routes.indexRoute.name }">Back to List</router-link>
    <h1>{{ brew.recipe.name }}</h1>
    <div>Brew Started: {{ brew.dateStarted | formatBrewStartedDate }}</div>
    <form
      @submit.prevent="addNote"
      v-on:keyup.ctrl.enter="addNote"
    >
      <h2>Add Note</h2>
      <Field
        label="Type"
        type="text"
        v-model="note.type"
        list="note-type-list"
        data-testid="brew__note-type"
      />
      <datalist id="note-type-list">
        <option
          v-for="type in noteTypes"
          :value="type"
          :key="type"
        ></option>
      </datalist>
      <TextAreaField
        v-model="note.text"
        data-testid="brew__note-text" />
      <input
        type="submit"
        value="Add"
        data-testid="brew__add-note"
      />
    </form>
    <hr />
    <h2>Alcohol</h2>
    <AlcoholCalculator
      :originalBrix="brew.originalBrix"
      :finalBrix="brew.finalBrix"
      @save="saveBrix"
    />
    <hr />
    <div v-if="!editingRecipe">
      <RecipeView
        :recipe="brew.recipe"
        :headerStartingLevel="2"
      />
      <button
        @click="editingRecipe = true"
        class="edit-recipe"
      >Edit</button>
    </div>
    <div v-if="editingRecipe">
      <RecipeEdit
        :recipe="brew.recipe"
        :headerStartingLevel="2"
        @committed="updateRecipe"
      />
    </div>
    <hr />
    <h2>Notes</h2>
    <div
      v-for="(notes, type) in notesDictionary"
      :key="type"
      data-testid="brew__notes-container"
    >
      <h3>{{ type }}</h3>
      <div
        v-for="note in notes"
        :key="note.time"
      >
        <h4>{{ note.moment.format('YYYY-MM-DD [@] HH:mm:ss') }}</h4>
        <div class="note__text">{{ note.text }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.edit-recipe {
  margin-top: 2rem;
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
import RecipeEdit from './components/RecipeEdit.vue';
import AlcoholCalculator from './components/AlcoholCalculator.vue';
import Field from './components/Field.vue';
import TextAreaField from './components/TextAreaField.vue';
import moment from 'moment';
import { getBrew, putBrew } from './dataAccess';
import optimisticallyRetry from './util/optimisticallyRetry';
import { indexRoute } from './routing/routes';

export default {
  name: 'Brew',
  props: {
    id: String
  },
  data() {
    return {
      note: { type: '', text: '' },
      brew: undefined,
      routes: { indexRoute },
      editingRecipe: false
    };
  },
  async created() {
    let response = await getBrew(this.id);
    if (response.err) {
      alert('No dice. Check the console.');
      console.error(response.err);
      return;
    }

    this.brew = response.brew;
  },
  components: {
    RecipeView,
    RecipeEdit,
    AlcoholCalculator,
    Field,
    TextAreaField
  },
  filters: {
    formatBrewStartedDate(value)  {
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
    async addNote() {
      const note = { time: moment().format(), type: this.note.type, text: this.note.text };
      const result = await this.put(brew => {
        brew.notes.push(note);
        return brew;
      });

      if (!result.err) {
        this.note.text = '';
      }
    },
    async saveBrix(payload) {
      await this.put(brew => {
        brew.originalBrix = payload.originalBrix;
        brew.finalBrix = payload.finalBrix;
        return brew;
      });
    },
    async updateRecipe(recipe) {
      await this.put(brew => {
        brew.recipe = recipe;
        return brew;
      });
    },
    async put(updateFunction) {
      const result = await optimisticallyRetry(
        putBrew,
        this.brew,
        updateFunction,
        'brew'
      );

      if (result.err) {
        alert('No dice. Check the console.');
        console.error(result);
        return { err: result };
      }

      this.brew = result.document;
      return {};
    }
  }
}
</script>
