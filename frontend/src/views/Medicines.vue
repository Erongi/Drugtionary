<template>
  <div class="column is-8 pt-6">
    <div class="field is-grouped">
      <p class="control pr-6">
        <a class="button is-primary">+ Add Patient </a>
      </p>
      <p class="control is-expanded">
        <input class="input" type="text" placeholder="Find a patient" />
      </p>
      <p class="control">
        <a class="button is-info"> Search </a>
      </p>
    </div>
    <h1 class="is-size-4 mb-4">All patients ({{ patients.length }})</h1>
    <div class="container is-max-desktop">
      <div class="is-multiline columns is-variable is-2">
        <!-- Card element start here------------------------------------------>
        <div
          id="card_patients"
          class="column is-one-quarter"
          v-for="patient in patients"
          :key="patient.id"
        >
          <div
            class="card"
            v-bind:class="{
              'has-background-warning-light': patient.is_favorite,
            }"
          >
            <div class="card-image">
              <figure class="image is-1by1">
                <img :src="patient.image" alt="Placeholder image" />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-6">{{ patient.name }}</p>
                  <p class="subtitle is-6">
                    อายุ {{ patient.age }}<br />
                    {{ patient.gender }}
                  </p>
                  <div for></div>
                  <p class="subtitle is-6">{{ patient.symptom }}</p>
                  <div v-for="history in patient.history" :key="history">
                    <p class="subtitle is-6">{{ history }}</p>
                  </div>
                  <div v-for="medicines in patient.medicines" :key="medicines">
                    <p class="subtitle is-6">{{ medicines }}</p>
                  </div>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between">
                <!-- คลิกที่ดาว หาก is_favorite = true ให้แสดงดาว v1 ถ้า is_favorite = false -------- -->
                <div
                  class="icon is-size-4"
                  @click="patient.is_favorite = !patient.is_favorite"
                >
                  <!-- star ทึบ -->
                  <span v-if="patient.is_favorite" class="icon" key="true">
                    <i class="fas fa-star has-text-warning"></i>
                  </span>

                  <!-- star ใส -->
                  <span v-else class="icon" key="false">
                    <i class="far fa-star has-text-warning"></i>
                  </span>
                </div>

                <!-- >>>>>ไอคอนรูปตะกร้า <<<<<<,s----------------------------------------->
                <!-- <div class="icon is-size-4" @click="addToCart(patient)">
                  <i class="fas fa-shopping-cart has-text-warning"></i>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  created() {
    // axios
    //   .get("https://randomuser.me/api/")
    //   .then((response) => {
    //     this.patients = response.data.results;
    //     console.log(this.patients);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
  data() {
    return {
      id: null,
      medicine: [
        {
          id: 1,
          name: "Abacavir",
          group: "	ยาต้านไวรัสในกลุ่มเอ็นอาร์ทีไอ",
          type: "ยาตามใบสั่งแพทย์",
          properties: "ช่วยลดจำนวนเชื้อเอชไอวีในร่างกายของผู้ป่วยที่ติดเชื้อ",
          pg: "ผู้ใหญ่ เด็ก",
          pattern: "ยารับประทาน",
        },
        {
          id: 2,
          name: "Milk of Magnesia",
          group: "ยาระบาย",
          type: "ยาตามใบสั่งแพทย์ ยาหาซื้อได้เอง",
          properties: "ยาระบายสำหรับผู้ที่มีอาการท้องผูกและอาหารไม่ย่อย",
          pg: "ผู้ใหญ่และเด็ก",
          pattern: "ยารับประทานชนิดน้ำ เม็ดและเม็ดเคี้ยว",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>