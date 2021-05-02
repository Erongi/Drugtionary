<template>
  <div class="columns mt-5 ml-5">
    <div class="column is-one-fifth">
      <div class="card">
        <div class="card-image">
          <figure class="image is-1by1">
            <img :src="imagePath(drug.image)" alt="Placeholder image" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">ยา: {{ drug.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column box pt-5">
      <div class="box">
        <p>กลุ่มยา: {{ drug.group }}</p>
      </div>
      <div class="box">
        <p>คุณสมบัติ: {{ drug.properties }}</p>
      </div>
      <div class="box">
        <p>ประเภทยา: {{ drug.type }}</p>
      </div>
      <div class="box">
        <p>กลุ่มผู้ป่วย: {{ drug.patient_group }}</p>
      </div>
      <div class="box">
        <p>รูปแบบของยา: {{ drug.pattern }}</p>
      </div>

      <div class="columns">
        <div class="column is-10"></div>
        <div class="column is-2 mt-5">
          <button
            class="button is-success"
            @click="AddModal = true"
            v-if="user"
          >
            เพิ่มยา
          </button>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div class="modal" :class="{ 'is-active': AddModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ drug.name }}</p>
          <button
            class="delete"
            aria-label="close"
            @click="cancelModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <div class="columns">
            <div class="column is-4">
              <div class="field">
                <div class="control mx-6">
                  <p>จำนวน</p>
                  <input
                    class="input"
                    type="number"
                    placeholder="จำนวน"
                    v-model="amount"
                  />
                </div>
              </div>
            </div>
            <div class="column is-4">
              <div class="field">
                <div class="control">
                  <p>วันที่รับประทาน</p>
                  <div class="select">
                    <select v-model="date">
                      <option value="" disabled selected>--เลือกวัน--</option>
                      <option value="วันอาทิตย์">วันอาทิตย์</option>
                      <option value="วันจันทร์">วันจันทร์</option>
                      <option value="วันอังคาร">วันอังคาร</option>
                      <option value="วันพุธ">วันพุธ</option>
                      <option value="วันพฤหัสบดี">วันพฤหัสบดี</option>
                      <option value="วันศุกร์">วันศุกร์</option>
                      <option value="วันเสาร์">วันเสาร์</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-4">
              <div class="field">
                <div class="control">
                  <p>เวลารับประทาน</p>
                  <input
                    class="button"
                    type="time"
                    id="appt"
                    name="appt"
                    v-model="time"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="addDrug">เพิ่มยา</button>
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
    this.getDrugDetail(this.$route.params.id);
  },
  data() {
    return {
      id: null,
      drug: {},
      AddModal: false,
      date: "",
      time: "",
      amount: "",
    };
  },
  methods: {
    getDrugDetail(id) {
      axios
        .get(`/drug/${id}`)
        .then((response) => {
          this.drug = response.data.drug;
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
    cancelModal() {
      this.AddModal = false;
      this.amount = null;
      this.date = "";
      this.time = "";
    },
    addDrug() {
      axios
        .post(`/history/${this.id}`, {
          drug_name: this.drug.name,
          date: this.date,
          time: this.time,
          amount: this.amount,
          user_id: this.user.id,
          type: this.drug.type,
        })
        .then((response) => {
          this.AddModal = false;
          this.date = "";
          this.time = "";
          this.amount = "";
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
  },
};
</script>

<style scoped>
.test {
  justify-content: flex-end;
}
</style>