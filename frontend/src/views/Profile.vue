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
            <!-- ปุ่มแอดสำหรับคนไข้ -->
            <button class="button is-success">+ เพิ่มคนไข้</button>

            <!-- ปุ่มสำหรับลบคนไข้ -->
            <button class="button is-danger">- ลบคนไข้</button>
          </div>
        </div>
      </div>
      <!-- ของหมอ -->

      <div class="picprofile2 column">
        <div class="Patientcare ml-5 mt-5">
          <table class="table">
            <thead>
              <th class="font">คนไข้ที่ดูแล</th>
              <tr>
                <li v-for="patient in patients" :key="patient.id">
                  {{ patient.name }}
                  อายุ {{ patient.age }} เพศ {{ patient.gender }}
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
                  <td>{{ i.drug_name }}</td>
                  <td>{{ i.type }}</td>
                  <td>{{ i.date }}</td>
                  <td>{{ i.time }}</td>
                  <td>{{ i.amount }}</td>
                </tr>
              </tbody>
            </table>
            <div>
              <hr class="underline" />
              <thread>
                <tr>
                  <td>
                    <p class="headtext mr-5">อาการ</p>
                  </td>
                  <!-- ปุ่มเพิ่มอาการ -->
                  <button class="button is-success">+ เพิ่มอาการ</button>
                </tr>
                <hr class="underline" />
              </thread>
            </div>
            <table>
              <td>
                <tr>
                  ไม่สบายค้าบ
                </tr>
                <tr>
                  หายใจไม่ออกค้าบ
                </tr>
                <tr>
                  ไม่สบายค้าบ
                </tr>
                <tr>
                  หายใจไม่ออกค้าบ
                </tr>
                <tr>
                  ไม่สบายค้าบ
                </tr>
                <tr>
                  หายใจไม่ออกค้าบ
                </tr>
                <tr>
                  ไม่สบายค้าบ
                </tr>
                <tr>
                  หายใจไม่ออกค้าบ
                </tr>
                <tr>
                  ไม่สบายค้าบ
                </tr>
                <tr>
                  หายใจไม่ออกค้าบ
                </tr>
                <tr>
                  ไม่สบายค้าบ
                </tr>
                <tr>
                  หายใจไม่ออกค้าบ
                </tr>
                <tr>
                  ไม่สบายค้าบ
                </tr>
                <tr>
                  หายใจไม่ออกค้าบ
                </tr>
                <tr>
                  ไม่สบายค้าบ
                </tr>
                <tr>
                  หายใจไม่ออกค้าบ
                </tr>
                <tr>
                  ไม่สบายค้าบ
                </tr>
                <tr>
                  หายใจไม่ออกค้าบ
                </tr>
                <tr>
                  ไม่สบายค้าบ
                </tr>
                <tr>
                  หายใจไม่ออกค้าบ
                </tr>
                <tr>
                  ไม่สบายค้าบ
                </tr>
                <tr>
                  หายใจไม่ออกค้าบ
                </tr>
                <tr>
                  ไม่สบายค้าบ
                </tr>
                <tr>
                  หายใจไม่ออกค้าบ
                </tr>
                <tr>
                  ไม่สบายค้าบ
                </tr>
                <tr>
                  หายใจไม่ออกค้าบ
                </tr>
                <tr>
                  ไม่สบายค้าบ
                </tr>
                <tr>
                  หายใจไม่ออกค้าบ
                </tr>
                <tr>
                  ไม่สบายค้าบ
                </tr>
                <tr>
                  หายใจไม่ออกค้าบ
                </tr>
                <tr>
                  ไม่สบายค้าบ
                </tr>
                <tr>
                  หายใจไม่ออกค้าบ
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
    this.getProfile(1);
  },
  data() {
    return {
      id: null,
      medical: {},
      patients: [],
    };
  },
  methods: {
    getProfile(id) {
      axios
        .get(`/medical/${id}`)
        .then((response) => {
          this.medical = response.data.medical;
          this.patients = response.data.patients;
          this.id = id;
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

