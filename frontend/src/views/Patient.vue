<template>
  <div class="columns ml-5 mt-5">
    <div class="column is-one-fifth">
      <div class="card">
        <div class="card-image">
          <figure class="image is-1by1">
            <img :src="patients.image" alt="Placeholder image" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <button
                v-if="medical == null"
                class="button is-success is-inverted"
                @click="addPatient"
              >
                เพิ่มคนไข้
              </button>
              <div v-else>
                <p>{{ medical.name }}</p>
                <button
                  class="button is-danger is-inverted"
                  @click="delPatient"
                >
                  ลบคนไข้
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column">
      <p><b>ชื่อ: </b>{{ patients.name }}</p>
      <p><b>อายุ: </b>{{ patients.age }}</p>
      <p><b>เพศ: </b>{{ patients.gender }}</p>
      <p><b>อาการ: </b>{{ patients.symptom }}</p>
      <div class="columns mt-5">
        <div class="column">
          <p>ยาที่รับประทาน</p>
          <div class="columns">
            <table class="table mt-5">
              <thead>
                <tr>
                  <th>ชื่อยา</th>
                  <th>ประเภทยา</th>
                  <th>วันที่รับประทาน</th>
                  <th>เวลารับประทาน</th>
                  <th>จำนวน</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i in history" :key="i.id">
                  <td>{{ i.drug_name }}</td>
                  <td>{{ i.type }}</td>
                  <td>{{ i.date }}</td>
                  <td>{{ i.time }}</td>
                  <td>{{ i.amount }}</td>
                </tr>
              </tbody>
            </table>
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
    this.getPatientDetail(this.$route.params.id);
  },
  data() {
    return {
      id: null,
      patients: {},
      history: [],
      medical: null,
    };
  },
  methods: {
    getPatientDetail(id) {
      axios
        .get(`http://localhost:3000/patient/${id}`)
        .then((response) => {
          this.patients = response.data.patients;
          this.history = response.data.history;
          this.id = id;
          this.getMedical(this.patients.medical_id);
          console.log(this.medical);
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    getMedical(id) {
      axios
        .get(`http://localhost:3000/medical/${id}`)
        .then((response) => {
          this.medical = response.data.medical;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    addPatient() {
      axios
        .put(`http://localhost:3000/patient/pair/${this.id}`)
        .then((response) => {
          this.medical = response.data.medical;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    delPatient() {
      axios
        .put(`http://localhost:3000/patient/delPair/${this.id}`)
        .then((response) => {
          this.medical = null;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
  },
};
</script>

<style scoped>
.media-content {
  display: grid;
  align-items: center;
}
</style>