<template>
  <div class="is-10 pt-6" style="margin-left: 5%">
    <div class="field is-grouped">
      <p class="control pr-6">
        <a class="button is-primary">+ Add Patient </a>
      </p>
      <p class="control is-expanded">
        <input
          class="input"
          type="text"
          placeholder="Find patient(s)"
          v-model="search"
        />
      </p>
      <p class="control">
        <a class="button is-info" @click="getPatients"> Search </a>
      </p>
    </div>
    <h1 class="is-size-4 mb-4">All patients ({{ patients.length }})</h1>
    <div id="style-1" class="scroll-bar mt-6">
      <div class="container">
        <div class="is-multiline columns is-variable is-5">
          <!-- Card element start here------------------------------------------>
          <div
            id="card_patients"
            class="column is-one-quarter"
            v-for="patient in patients"
            :key="patient.id"
          >
            <router-link :to="`/patient/${patient.id}`">
              <div class="card">
                <div class="card-image">
                  <figure class="image is-1by1">
                    <img :src="patient.image" alt="Placeholder image" />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-8">{{ patient.name }}</p>
                      <p class="is-6">อายุ : {{ patient.age }}</p>
                      <p class="is-6">เพศ : {{ patient.gender }}</p>
                      <p class="is-6">อาการ : {{ patient.symptom }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.getPatients();
  },
  data() {
    return {
      search: "",
      patients: [],
    };
  },
  methods: {
    getPatients() {
      axios
        .get("http://localhost:3000/patients", {
          params: {
            search: this.search,
          },
        })
        .then((response) => {
          this.patients = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>


<style scoped>
#style-1::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #f5f5f5;
}

#style-1::-webkit-scrollbar {
  width: 12px;
  background-color: #f5f5f5;
}

#style-1::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #555;
}
.fit-20 {
  height: 20vh;
}
.fit-50 {
  height: 50vh;
}
.scroll-bar {
  overflow-y: auto;
  overflow-x: hidden;
  padding: 5px;
  margin: 0;
  height: calc(75vh - 90px);
}
</style>