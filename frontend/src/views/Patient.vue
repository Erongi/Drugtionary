<template>
  <div>
    <div class="columns">
      <div class="picprofile column is-4">
        <div class="picprofile3">
          <img class="picture" :src="imagePath(patient.picture)" />
          <br />
          <div class="detailpf">
            <div>
              <p class="styletxt">
                <b style="display: grid; text-align: center">
                  {{ patient.first_name }} {{ patient.last_name }} <br />
                </b>
                <br />
                อายุ: {{ patient.age }}<br />
                เพศ: {{ patient.gender }}<br />
                อีเมล: {{ patient.email }}<br />
                ติดต่อ: {{ patient.mobile }}<br />
                <br />
              </p>
            </div>
            <!-- ปุ่มแอดสำหรับคนไข้ -->
            <button
              v-if="
                medical == null &&
                (this.user.role === 'medical' || this.user.role === 'admin')
              "
              class="button button_modify is-success"
              @click="addPatient"
            >
              + เพิ่มคนไข้
            </button>

            <!-- ปุ่มสำหรับลบคนไข้ -->
            <div v-else>
              <article class="message is-primary mx-6">
                <div class="message-body">
                  <center>
                    ผู้ดูแล: {{ medical.first_name }} {{ medical.last_name }}
                  </center>
                </div>
              </article>
              <button
                v-if="checkPermission()"
                class="button button_modify is-danger"
                @click="delPatient"
              >
                - ลบคนไข้
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ของคนไข้ -->

      <div class="picprofile2 column is-7.2">
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
                  <!-- ปุ่มเพิ่มอาการ -->
                  <button
                    class="button is-success is-inverted"
                    v-if="checkPermission()"
                    @click="AddModal = true"
                  >
                    + เพิ่มอาการ
                  </button>
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
                    <a
                      v-if="checkPermission()"
                      class="tag is-delete is-medium"
                      @click="delSymptom(symptom.id)"
                    ></a>
                  </div>
                </tr>
              </td>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- modal -->
    <div class="modal" :class="{ 'is-active': AddModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">กรอกอาการ</p>
          <button
            class="delete"
            aria-label="close"
            @click="cancelModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="อาการ"
              v-model="text"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="addSymptom">
            เพิ่มอาการ
          </button>
          <button class="button" @click="cancelModal">ยกเลิก</button>
        </footer>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "@/plugins/axios";
export default {
  props: ["user"],
  mounted() {
    this.getPatientDetail(this.$route.params.id);
    if (
      this.$route.params.id != this.user.id &&
      this.user.role != "medical" &&
      this.user.role != "admin"
    ) {
      this.$router.push({ path: "/" });
    }
  },
  data() {
    return {
      id: null,
      patient: {},
      history: [],
      medical: null,
      AddModal: false,
      symptoms: [],
      text: "",
    };
  },
  methods: {
    getPatientDetail(id) {
      axios
        .get(`/patient/${id}`)
        .then((response) => {
          this.patient = response.data.users;
          this.history = response.data.history;
          this.symptoms = response.data.symptoms;
          this.id = id;
          if (response.data.patients) {
            this.getMedical(response.data.patients.medical_id);
          }
        })
        .catch((error) => {
          this.error = error.response;
          console.log(error);
        });
    },
    getMedical(id) {
      axios
        .get(`/user/${id}`)
        .then((response) => {
          this.medical = response.data.user;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    addPatient() {
      axios
        .put(`/patient/pair/${this.id}`)
        .then((response) => {
          this.medical = response.data.medical;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    delPatient() {
      axios
        .put(`/patient/delPair/${this.id}`)
        .then((response) => {
          this.medical = null;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQHBg0QEBIPEA4QEBEQFRgQDRcQExAaFhUWFiATFRUYHSggGB4lGxgWITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NFQ0NDy0ZFRkrLSs3Ky0tLisrKzctNy0rNystLS0rKysrKy0rLSsrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwQFAgYBB//EADQQAQACAAMFBQcCBwEAAAAAAAABAgMEEQUSITFhQVFxgbETIlKRocHRFDQyQnKCkuHxJP/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A/TAGkAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAHVKTiW0iJmegOX2I1nSOM9F2mzL25zWv1lo5fLVy9eEce2Z5yauMzC2de8cdKx15/KE9dld9p8qtITVZ07Kj4p/wAUd9l2jlaJ8Y0aoaMHFyl8LnWdO+OMIHpVTNZGuNEzHu2747fGDUxijvFwpwbzW0aT69YcKgAAAAAAAAAAAAAAAAAA3Mjl/YYMfFPGfwx8vTfzFI77Q9ClWACKAAAAAAgzmXjMYWn80cpYUxuzMTzjg9IyNq4W5jxaOVo+sLEqiAqAAAAAAAAAAAAAAAALOz41zlPP0luMPZv7yvn6S3EqwARQAAAAABS2rTeyuvwzE/b7rqttGf8Ax316esAwwGmQAAAAAAAAAAAAAAAFrZ37ynn6S22FkJ0zlPH7S3UqwARQAAAAABibStM5u0azpGmnHlwhtsHPTrnL+P2WCABWQAAAAAAAAAAAAAAAE+SiZzNJiJmItHZybyHJ03MtSI7on5pkrQAgAAAAAAMDNxP6m+sTGtp5xz4t9U2nTeylp7Y0mPmsGKArIAAAAAAAAAAAAAAADc2fffylOnD5LLN2PicL1/uj0/DSZaAAAAAAAAFLa193LafFMR8uK6ydr4m9jVr8MeqwUAFZAAAAAAAAABQAAAAAEmXxpwMWLR/1t5XH/UYMW005xprrowGnsfE4Xr/d9vwlGkAigAAAAAIM3mP02Frprx056MPExJxMSbTzmdWhti/GlfGft+Wa1EAAAAAAAAAAABAAAAAABNlMb2GPW3ZynwlCA9LE6wKWysSb5eYn+WdIXWWgAAAAFbaN5plLadI+YMrOYvtszaezlHhCAGkABAAAAAAAAAAAAAAAAAAGxsmNMtPW0+kLqts+m5k6ddZ+c6rLLQAAAArbRjXJ38p+sLKPMU38C8d9Zj6A88A0yAAAAAAAAAAAAAAAAAAOqV37xEc5nQpSb20iJmejVyGS9jO9b+L0FXaxu1iO6NH0GVAAAAAAefzWH7LMWjrrHhKJt57KfqK6xwtHLr0lj4mHOFbS0TEtRHAAgAAAAAAAAAAAAPsRvTpHGei9l9mzfjf3Y7o5/wChVGtd+2kRMz0X8vsybcbzpHdHP5tHBwK4NdKxEes+aRNMR4WDXBrpWIhICKAAAAAAAAOcTDjErpaImOroBmZjZnbSfKftLPxMOcO2lomJ6vRuMTDjFrpaImOq6jzo0cxszTjSdek/aVC9JpbSYmJ6qOQBAAAAAH2OMg+LeVyNsbjPu1+s+ELeSyG5EWvxt2R2R+ZX01cRYGXrgR7sce+eMz5pQRQAAAAAAAAAAAAAAABHjYNcaulo19Y80gDIzOzpw+Nfej6x+VF6VTzmRjHiZrwv9J8VlTGMOrVmlpieEw5VAABpbKy2vvz4V/LOrG9aIjnM6PRYVPZ4cVjlEaFWOgGVAAAAAAAAAAAAAAAAAAAAAAUdqZffw9+P4q8+sMh6WY1h57Hw/ZY1q90rEqMBUTZX9zh/1R6t8EqwARQAAAAAAAAAAAAAAAAAAAAABibS/eW8vSAWJVUBUf/Z";
      }
    },
    cancelModal() {
      this.AddModal = false;
      this.text = "";
    },
    addSymptom() {
      axios
        .post(`/symptom/${this.id}`, {
          description: this.text,
          create_by: this.user.id,
        })
        .then((response) => {
          this.symptoms.push(response.data);
          this.AddModal = false;
          this.text = "";
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    checkPermission() {
      if (this.user.role === "admin") {
        return true;
      }
      if (this.user.id === this.id) {
        return true;
      }
      if (this.user.id === this.medical?.id) {
        return true;
      }
      return false;
    },
    delSymptom(id) {
      axios
        .delete(`/symptom/${id}`)
        .then((response) => {
          this.symptoms = this.symptoms.filter((e) => e.id != id);
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
  background-color: rgb(221, 219, 219);
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
.button_modify {
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

