<template>
  <div>
    <div class="columns ml-6">
      <div class="picprofile">
        <div class="picprofile3">
          <img
            src="https://i.pinimg.com/736x/6b/eb/5d/6beb5d8607e0a9bb2e3d5b82b09cbfe1.jpg"
            width="100%"
          />
        </div>

        <div class="detailpf">
          <div>
            <p class="styletxt" >
              <b style="display: grid; text-align: center">
                {{ medical.name }} <br />
                <!-- Dr.Wanwisa Tansiricharernkul (Dr.Lin) -->
              </b>
              <br />
              <b>ตำ</b>แหน่ง : {{ medical.position }}

              <br /><br />

              {{ medical.description }}
            </p>
          </div>
        </div>
      </div>

      <div class="picprofile2">
        <div class="Patientcare ml-5 mt-5">
          <table class="table">
            <thead>
              <th class="font">คนไข้ที่ดูแล</th>
              <tr>
                <li v-for="patient in patients" :key="patient.id">
                  {{ patient.name }} 
                  อายุ {{ patient.age }} 
                  เพศ {{ patient.gender }}
                </li>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
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
        .get(`http://localhost:3000/medical/${id}`)
        .then((response) => {
          this.medical = response.data.medical;
          this.patients = response.data.patients;
          this.id = id;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
  },
};
</script>

<style scoped>
.columns {
  background-color: rgb(236, 236, 236);
  width: 80%;
  height: 820px;
  margin: 5px;
  border-radius: 25px;
}
.picprofile {
  background-color: rgb(255, 255, 255);
  width: 50%;
  height: 100%;
  margin: 1%;
  border-radius: 25px;
  display: grid;
  /* justify-content: center; */
  align-items: center;
}
.picprofile2 {
  background-color: rgb(255, 255, 255);
  width: 50%;
  height: 98%;
  margin: 1%;
  border-radius: 25px;
}
.detailpf {
  background-color: rgb(255, 255, 255);
  width: 98.5%;
  height: 100%;
  margin-top: 20%;
  margin-bottom: 10%;
  margin-left: 5px;
  border-radius: 25px;
  color: black;
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
  width: 70%;
  /* height: 0%; */
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
</style>