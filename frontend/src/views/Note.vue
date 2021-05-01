<template>
  <div>
    <div class="task">
      <p class="mb-5 subtitle">คนไข้ทั่วไป</p>

      <div class="sub_task" v-for="task in note.npt" :key="task.id">
        {{ task.message }}
        <div class="level-right mr-3">
          <i @click="delTaskNPT(task.id)" class="fas fa-trash-alt ml-5"></i>
        </div>
      </div>

      <div>
        <input
          v-if="nptForm"
          @click="nptForm = !nptForm"
          type="button"
          class="btn"
          value="เพิ่มบันทึก"
        />
        <div v-else>
          <input
            class="input is-primary mb-2"
            type="text"
            v-model="nptText"
            placeholder="Add Non Priority Tasks"
          />
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <a class="button is-primary" @click="addNPT"> บันทึก </a>
            </p>
            <p class="control">
              <a
                class="button is-light"
                @click="(nptForm = !nptForm), (nptText = '')"
              >
                ยกเลิก
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="task">
      <p class="mb-5 subtitle">คนไข้ที่ต้องดูแล</p>
      <div class="sub_task" v-for="task in note.tdt" :key="task.id">
        {{ task.message }}
        <div class="level-right mr-3">
          <i @click="delTaskTDT(task.id)" class="fas fa-trash-alt ml-5"></i>
        </div>
      </div>
      <div>
        <input
          v-if="tdtForm"
          @click="tdtForm = !tdtForm"
          type="button"
          class="btn"
          value="เพิ่มบันทึก"
        />
        <div v-else>
          <input
            class="input is-primary mb-2"
            type="text"
            v-model="tdtText"
            placeholder="Add To-Do Tasks"
          />
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <a class="button is-primary" @click="addTDT"> บันทึก </a>
            </p>
            <p class="control">
              <a
                class="button is-light"
                @click="(tdtForm = !tdtForm), (tdtText = '')"
              >
                ยกเลิก
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="task">
      <p class="mb-5 subtitle">คนไข้ที่ดูแลอยู่</p>
      <div class="sub_task" v-for="task in note.ipt" :key="task.id">
        {{ task.message }}
        <div class="level-right mr-3">
          <i @click="delTaskIPT(task.id)" class="fas fa-trash-alt ml-5"></i>
        </div>
      </div>
      <div>
        <input
          v-if="iptForm"
          @click="iptForm = !iptForm"
          type="button"
          class="btn"
          value="เพิ่มบันทึก"
        />
        <div v-else>
          <input
            class="input is-primary mb-2"
            type="text"
            v-model="iptText"
            placeholder="Add In Progress Tasks"
          />
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <a class="button is-primary" @click="addIPT"> บันทึก </a>
            </p>
            <p class="control">
              <a
                class="button is-light"
                @click="(iptForm = !iptForm), (iptText = '')"
              >
                ยกเลิก
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="task">
      <p class="mb-5 subtitle">การจัดยาคนไข้</p>
      <div class="sub_task" v-for="task in note.ct" :key="'ct' + task.id">
        {{ task.message }}
        <div class="level-right mr-3">
          <i
            @click="delTaskCT(task.id)"
            class="fas fa-trash-alt level-right"
          ></i>
        </div>
      </div>
      <div>
        <input
          v-if="ctForm"
          @click="ctForm = !ctForm"
          type="button"
          class="btn"
          value="เพิ่มบันทึก"
        />
        <div v-else>
          <input
            class="input is-primary mb-2"
            type="text"
            v-model="ctText"
            placeholder="Add Complete Tasks"
          />
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <a class="button is-primary" @click="addCT"> บันทึก </a>
            </p>
            <p class="control">
              <a
                class="button is-light"
                @click="(ctForm = !ctForm), (ctText = '')"
              >
                ยกเลิก
              </a>
            </p>
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
    this.getNote(this.$route.params.id);
    if (this.$route.params.id != this.user.id) {
      this.$router.push({ path: "/" });
    }
  },
  data() {
    return {
      id: null,
      nptForm: 1,
      tdtForm: 1,
      iptForm: 1,
      ctForm: 1,
      nptText: "",
      tdtText: "",
      iptText: "",
      ctText: "",
      note: [],
    };
  },
  methods: {
    getNote(id) {
      axios
        .get(`/note/${id}`)
        .then((response) => {
          this.note = response.data;
          this.id = this.$route.params.id;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addCT() {
      axios
        .post(`/note/ct/${this.id}`, {
          message: this.ctText,
        })
        .then((response) => {
          this.ctText = "";
          this.ctForm = 1;
          this.note.ct.push(response.data);
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    addIPT() {
      axios
        .post(`/note/ipt/${this.id}`, {
          message: this.iptText,
        })
        .then((response) => {
          this.iptText = "";
          this.iptForm = 1;
          this.note.ipt.push(response.data);
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    addNPT() {
      axios
        .post(`/note/npt/${this.id}`, {
          message: this.nptText,
        })
        .then((response) => {
          this.nptText = "";
          this.nptForm = 1;
          this.note.npt.push(response.data);
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    addTDT() {
      axios
        .post(`/note/tdt/${this.id}`, {
          message: this.tdtText,
        })
        .then((response) => {
          this.tdtText = "";
          this.tdtForm = 1;
          this.note.tdt.push(response.data);
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    delTaskNPT(id) {
      axios
        .delete(`/note/npt/${id}`)
        .then((response) => {
          this.note.npt = this.note.npt.filter((e) => e.id != id);
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
      // console.log(id);
    },
    delTaskCT(id) {
      axios
        .delete(`/note/ct/${id}`)
        .then((response) => {
          this.note.ct = this.note.ct.filter((e) => e.id != id);
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
      // console.log(id);
    },
    delTaskIPT(id) {
      axios
        .delete(`/note/ipt/${id}`)
        .then((response) => {
          this.note.ipt = this.note.ipt.filter((e) => e.id != id);
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
      // console.log(id);
    },
    delTaskTDT(id) {
      axios
        .delete(`/note/tdt/${id}`)
        .then((response) => {
          this.note.tdt = this.note.tdt.filter((e) => e.id != id);
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
      // console.log(id);
    },
  },
};
</script>

<style scoped>
.task {
  background: rgb(236, 236, 236);
  margin: 4px;
  width: 24%;
  padding: 10px;
  display: inline-table;
  border-radius: 15px;
}
.sub_task {
  background: rgb(255, 255, 255);
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  word-break: break-all;
}
.btn {
  bottom: 5px;
  background-color: #ffffff;
  padding: 10px 128px;
  border-radius: 10px;
}
</style>