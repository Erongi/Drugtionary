<template>
  <div>
    <div class="task">
      <p class="mb-5 subtitle">คนไข้ทั่วไป</p>

      <div v-for="task in note" :key="task.id">
        <div class="sub_task" v-if="task.type === 'note1'">
          {{ task.message }}
          <div class="level-right mr-3">
            <i @click="delTask(task.id)" class="fas fa-trash-alt ml-5"></i>
          </div>
        </div>
      </div>

      <div>
        <input
          v-if="form1"
          @click="form1 = !form1"
          type="button"
          class="btn"
          value="เพิ่มบันทึก"
        />
        <div v-else>
          <input
            class="input is-primary mb-2"
            type="text"
            v-model="text1"
            placeholder="บันทึก"
          />
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <a class="button is-primary" @click="addNote('note1')">
                บันทึก
              </a>
            </p>
            <p class="control">
              <a
                class="button is-light"
                @click="(form1 = !form1), (text1 = '')"
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
      <div v-for="task in note" :key="task.id">
        <div class="sub_task" v-if="task.type === 'note2'">
          {{ task.message }}
          <div class="level-right mr-3">
            <i @click="delTask(task.id)" class="fas fa-trash-alt ml-5"></i>
          </div>
        </div>
      </div>
      <div>
        <input
          v-if="form2"
          @click="form2 = !form2"
          type="button"
          class="btn"
          value="เพิ่มบันทึก"
        />
        <div v-else>
          <input
            class="input is-primary mb-2"
            type="text"
            v-model="text2"
            placeholder="บันทึก"
          />
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <a class="button is-primary" @click="addNote('note2')">
                บันทึก
              </a>
            </p>
            <p class="control">
              <a
                class="button is-light"
                @click="(form2 = !form2), (text2 = '')"
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
      <div v-for="task in note" :key="task.id">
        <div class="sub_task" v-if="task.type === 'note3'">
          {{ task.message }}
          <div class="level-right mr-3">
            <i @click="delTask(task.id)" class="fas fa-trash-alt ml-5"></i>
          </div>
        </div>
      </div>
      <div>
        <input
          v-if="form3"
          @click="form3 = !form3"
          type="button"
          class="btn"
          value="เพิ่มบันทึก"
        />
        <div v-else>
          <input
            class="input is-primary mb-2"
            type="text"
            v-model="text3"
            placeholder="บันทึก"
          />
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <a class="button is-primary" @click="addNote('note3')">
                บันทึก
              </a>
            </p>
            <p class="control">
              <a
                class="button is-light"
                @click="(form3 = !form3), (text3 = '')"
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
      form1: 1,
      form2: 1,
      form3: 1,

      text1: "",
      text2: "",
      text3: "",
      note: [],
    };
  },
  methods: {
    getNote(id) {
      axios
        .get(`/note/${id}`)
        .then((response) => {
          this.note = response.data.note;
          this.id = this.$route.params.id;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addNote(type) {
      let text = "what";
      if (type == "note1") {
        text = this.text1;
      }
      if (type == "note2") {
        text = this.text2;
      }
      if (type == "note3") {
        text = this.text3;
      }
      axios
        .post(`/note/${this.id}`, {
          type: type,
          message: text,
        })
        .then((response) => {
          if (type == "note1") {
            this.text1 = "";
            this.form1 = 1;
          }
          if (type == "note2") {
            this.text2 = "";
            this.form2 = 1;
          }
          if (type == "note3") {
            this.text3 = "";
            this.form3 = 1;
          }
          this.note.push(response.data);
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    delNote(id) {
      axios
        .delete(`/note/${id}`)
        .then((response) => {
          this.note.npt = this.note.npt.filter((e) => e.id != id);
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
  background: #1784cc2f;
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