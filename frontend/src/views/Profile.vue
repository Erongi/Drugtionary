<template>
  <div>
    <div class="columns">
      <div class="picprofile column is-4">
        <div class="picprofile3">
          <img class="picture" :src="imagePath(user.picture)" />
          <br />
          <div class="detailpf">
            <div>
              <p class="styletxt">
                <b style="display: grid; text-align: center">
                  {{ user.first_name }} {{ user.last_name }} <br />
                </b>
                <br />
                อายุ: {{ user.age }}<br />
                เพศ: {{ user.gender }}<br />
                อีเมล: {{ user.email }}<br />
                ติดต่อ: {{ user.mobile }}<br />
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- ของหมอ -->

      <div
        v-if="user.role == 'admin' || user.role == 'medical'"
        class="picprofile2 column"
      >
        <div class="Patientcare ml-5 mt-5">
          <table class="table">
            <thead>
              <th class="font">คนไข้ที่ดูแล</th>
              <tr>
                <li v-for="patient in patients" :key="patient.id">
                  <span class="tag is-primary is-medium mt-2">
                    <router-link :to="`/patient/${patient.id}`"
                      ><b
                        >{{ patient.first_name }} {{ patient.last_name }}</b
                      ></router-link
                    ></span
                  >
                </li>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      <!-- ของคนไข้ -->

      <div v-if="user.role == 'patient'" class="picprofile2 column">
        <div class="Patientcare ml-5 mt-5">
          <div id="style-1" class="column scroll-bar">
            <p class="headtext">ยาที่รับประทาน</p>
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
                  <router-link :to="`/drug/${i.drug_id}`">
                    <td>{{ i.drug_name }}</td></router-link
                  >
                  <td>{{ i.type }}</td>
                  <td>{{ i.date }}</td>
                  <td>{{ i.time }}</td>
                  <td>{{ i.amount }}</td>
                </tr>
              </tbody>
            </table>
            <div>
              <hr class="underline" />
              <div>
                <tr>
                  <td>
                    <p class="headtext mr-5">อาการ</p>
                  </td>
                </tr>
                <hr class="underline" />
              </div>
            </div>
            <table>
              <td>
                <tr v-for="symptom in symptoms" :key="symptom.id">
                  <div class="tags has-addons mb-1">
                    <span class="tag is-danger is-medium">
                      {{ symptom.description }}</span
                    >
                  </div>
                </tr>
              </td>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  props: ["user"],
  mounted() {
    if (this.user.role === "patient") {
      this.getHistory();
      this.getSymptoms();
    } else {
      this.getPatients();
    }
  },
  data() {
    return {
      id: null,
      medical: {},
      patients: [],
      history: [],
      symptoms: [],
    };
  },
  methods: {
    getHistory() {
      axios
        .get(`/history/${this.user.id}`)
        .then((response) => {
          this.history = response.data.history;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    getSymptoms() {
      axios
        .get(`/symptom/${this.user.id}`)
        .then((response) => {
          this.symptoms = response.data.symptoms;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    getPatients() {
      axios
        .get(`/patient/pair/${this.user.id}`)
        .then((response) => {
          this.patients = response.data.patients;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
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
.columns {
  background-color: #17ccb15d;
  width: 110%;
  height: 820px;
  margin: 5px;
  border-radius: 25px;
}
.picprofile {
  background-color: rgb(255, 255, 255);
  /* width: 50%; */
  height: 98%;
  margin: 0.5%;
  /* margin-right: 1%; */
  border-radius: 25px;
  display: grid;
  /* justify-content: center; */
  align-items: center;
}
.picprofile2 {
  background-color: rgb(255, 255, 255);
  /* width: 50%; */
  height: 98%;
  margin: 0.5%;
  border-radius: 25px;
}
.picture {
  /* display: ; */
  align-items: center;
  width: 60%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
}
.detailpf {
  background-color: rgb(255, 255, 255);
  width: 100%;
  /* height: 80%; */
  /* margin-top: 20%; */
  /* margin-bottom: 10%; */
  /* margin-left: 5px; */
  border-radius: 25px;
  /* color: black; */
}
.styletxt {
  width: 100%;
  max-width: 80%;
  margin-left: 10%;
  text-align: start;
  height: 50%;
  /* word-break: break-all; */
}
.table {
  width: 98%;
  border-radius: 2%;
}
.picprofile3 {
  width: 100%;
  height: 100%;
  /* margin: 5px; */
  border-radius: 25px;
}
.name {
  text-align: center;
}
.Medicalhistory {
  height: 50%;
  margin-left: 2%;
}
.Patientcare {
  margin-left: 2%;
}
.font {
  font-size: 120%;
}
.scroll-bar {
  overflow-y: auto;
  overflow-x: hidden;
  padding: 5px;
  margin: 0;
  height: calc(75vh);
}
.button {
  display: inline-block;
  overflow: auto;
  white-space: nowrap;
  margin: 0px auto;
  /* position: relative; */
  display: block;
  /* align-self:; */
  /* margin-left: 90%; */
}
.headtext {
  font-size: 20px;
  font-weight: bold;
}
.underline {
  color: grey;
  background-color: rgb(224, 224, 224);
}
</style>

