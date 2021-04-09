<template>
  <div class="column is-10 pt-6">
    <div class="field is-grouped">
      <p class="control pr-6">
        <a class="button is-primary">+ Add Medicine </a>
      </p>
      <p class="control is-expanded">
        <input class="input" type="text" placeholder="Find a Medicine" />
      </p>
      <p class="control">
        <a class="button is-info"> Search </a>
      </p>
    </div>
    <h1 class="is-size-4 mb-4">All medicines ({{ medicines.length }})</h1>
    <div id="style-1" class="scroll-bar mt-6">
      <div class="container">
        <div class="is-multiline columns is-variable is-5">
          <!-- Card element start here------------------------------------------>
          <div
            id="card_medicines"
            class="column is-one-quarter"
            v-for="medicine in medicines"
            :key="medicine.id"
          >
            <div
              class="card"
              v-bind:class="{
                'has-background-warning-light': medicine.is_favorite,
              }"
            >
              <div class="card-image">
                <figure class="image is-1by1">
                  <img :src="medicine.image" alt="Placeholder image" />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-6">{{ medicine.name }}</p>
                    <p class="subtitle is-6">
                      อายุ {{ medicine.age }}<br />
                      {{ medicine.gender }}
                    </p>
                    <div for></div>
                    <p class="subtitle is-6">{{ medicine.symptom }}</p>
                    <div v-for="history in medicine.history" :key="history">
                      <p class="subtitle is-6">{{ history }}</p>
                    </div>
                    <div
                      v-for="medicines in medicine.medicines"
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
                    @click="medicine.is_favorite = !medicine.is_favorite"
                  >
                    <!-- star ทึบ -->
                    <span v-if="medicine.is_favorite" class="icon" key="true">
                      <i class="fas fa-star has-text-warning"></i>
                    </span>

                    <!-- star ใส -->
                    <span v-else class="icon" key="false">
                      <i class="far fa-star has-text-warning"></i>
                    </span>
                  </div>

                  <!-- >>>>>ไอคอนรูปตะกร้า <<<<<<,s----------------------------------------->
                  <!-- <div class="icon is-size-4" @click="addToCart(medicine)">
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
    //     this.medicines = response.data.results;
    //     console.log(this.medicines);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
  data() {
    return {
      id: null,
      medicines: [
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
  padding: 0px;
  margin: 0;
  height: calc(75vh - 90px);
}
</style>
