<template>
  <div class="column is-10 pt-6">
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
                    <div
                      v-for="medicines in patient.medicines"
                      :key="medicines"
                    >
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
      patients: [
        {
          id: 1,
          name: "พัสกร อรุณสดใส",
          gender: "ชาย",
          age: 20,
          symptom: "เผ็ด",
          history: ["ผ้าลิ้น"],
          medicines: ["นมจืด", "นมถั่วเหลือง"],
          image: "https://randomuser.me/api/portraits/women/1.jpg",
          is_favorite: 0,
        },
        {
          id: 2,
          name: "ลิง สดใส",
          gender: "หญิง",
          age: 40,
          symptom: "เผ็ด",
          history: ["ผ้าลิ้น", "ตัดแขน"],
          medicines: ["นมจืด", "นมถั่วเหลือง"],
          image: "https://randomuser.me/api/portraits/women/12.jpg",
          is_favorite: 1,
        },
        {
          id: 1,
          name: "พัสกร อรุณสดใส",
          gender: "ชาย",
          age: 20,
          symptom: "เผ็ด",
          history: ["ผ้าลิ้น"],
          medicines: ["นมจืด", "นมถั่วเหลือง"],
          image: "https://randomuser.me/api/portraits/women/2.jpg",
          is_favorite: 0,
        },
        {
          id: 2,
          name: "ลิง สดใส",
          gender: "หญิง",
          age: 40,
          symptom: "เผ็ด",
          history: ["ผ้าลิ้น", "ตัดแขน"],
          medicines: ["นมจืด", "นมถั่วเหลือง"],
          image: "https://randomuser.me/api/portraits/women/3.jpg",
          is_favorite: 1,
        },
        {
          id: 1,
          name: "พัสกร อรุณสดใส",
          gender: "ชาย",
          age: 20,
          symptom: "เผ็ด",
          history: ["ผ้าลิ้น"],
          medicines: ["นมจืด", "นมถั่วเหลือง"],
          image: "https://randomuser.me/api/portraits/women/4.jpg",
          is_favorite: 0,
        },
        {
          id: 2,
          name: "ลิง สดใส",
          gender: "หญิง",
          age: 40,
          symptom: "เผ็ด",
          history: ["ผ้าลิ้น", "ตัดแขน"],
          medicines: ["นมจืด", "นมถั่วเหลือง"],
          image: "https://randomuser.me/api/portraits/women/5.jpg",
          is_favorite: 1,
        },
        {
          id: 1,
          name: "พัสกร อรุณสดใส",
          gender: "ชาย",
          age: 20,
          symptom: "เผ็ด",
          history: ["ผ้าลิ้น"],
          medicines: ["นมจืด", "นมถั่วเหลือง"],
          image: "https://randomuser.me/api/portraits/women/1.jpg",
          is_favorite: 0,
        },
        {
          id: 2,
          name: "ลิง สดใส",
          gender: "หญิง",
          age: 40,
          symptom: "เผ็ด",
          history: ["ผ้าลิ้น", "ตัดแขน"],
          medicines: ["นมจืด", "นมถั่วเหลือง"],
          image: "https://randomuser.me/api/portraits/women/12.jpg",
          is_favorite: 1,
        },
        {
          id: 1,
          name: "พัสกร อรุณสดใส",
          gender: "ชาย",
          age: 20,
          symptom: "เผ็ด",
          history: ["ผ้าลิ้น"],
          medicines: ["นมจืด", "นมถั่วเหลือง"],
          image: "https://randomuser.me/api/portraits/women/1.jpg",
          is_favorite: 0,
        },
        {
          id: 2,
          name: "ลิง สดใส",
          gender: "หญิง",
          age: 40,
          symptom: "เผ็ด",
          history: ["ผ้าลิ้น", "ตัดแขน"],
          medicines: ["นมจืด", "นมถั่วเหลือง"],
          image: "https://randomuser.me/api/portraits/women/12.jpg",
          is_favorite: 1,
        },
      ],
    };
  },
};
</script>


<style scoped>
#style-1::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

#style-1::-webkit-scrollbar {
  width: 12px;
  background-color: #f5f5f5;
}

#style-1::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
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
  padding: 0px;
  margin: 0;
  height: calc(75vh - 90px);
}
</style>