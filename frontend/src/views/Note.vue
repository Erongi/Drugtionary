<template>
  <div>
    <div class="task">
      Non Priority Tasks
      <div class="sub_task" v-for="task in note.npt" :key="task.id">
        {{ task.message }}
      </div>
      <div>
        <input
          v-if="nptForm"
          @click="nptForm = !nptForm"
          type="button"
          class="btn"
          value="+ Add Task"
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
              <a class="button is-primary" @click="addNPT"> Submit </a>
            </p>
            <p class="control">
              <a
                class="button is-light"
                @click="(nptForm = !nptForm), (nptText = '')"
              >
                Cancel
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="task">
      To-Do Tasks
      <div class="sub_task" v-for="task in note.tdt" :key="task.id">
        {{ task.message }}
      </div>
      <div>
        <input
          v-if="tdtForm"
          @click="tdtForm = !tdtForm"
          type="button"
          class="btn"
          value="+ Add Task"
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
              <a class="button is-primary" @click="addTDT"> Submit </a>
            </p>
            <p class="control">
              <a
                class="button is-light"
                @click="(tdtForm = !tdtForm), (tdtText = '')"
              >
                Cancel
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="task">
      In Progress Tasks
      <div class="sub_task" v-for="task in note.ipt" :key="task.id">
        {{ task.message }}
      </div>
      <div>
        <input
          v-if="iptForm"
          @click="iptForm = !iptForm"
          type="button"
          class="btn"
          value="+ Add Task"
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
              <a class="button is-primary" @click="addIPT"> Submit </a>
            </p>
            <p class="control">
              <a
                class="button is-light"
                @click="(iptForm = !iptForm), (iptText = '')"
              >
                Cancel
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="task">
      Complete Tasks
      <div class="sub_task" v-for="task in note.ct" :key="'ct' + task.id">
        {{ task.message }}
      </div>
      <div>
        <input
          v-if="ctForm"
          @click="ctForm = !ctForm"
          type="button"
          class="btn"
          value="+ Add Task"
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
              <a class="button is-primary" @click="addCT"> Submit </a>
            </p>
            <p class="control">
              <a
                class="button is-light"
                @click="(ctForm = !ctForm), (ctText = '')"
              >
                Cancel
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.getNote(this.$route.params.id);
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
        .get(`http://localhost:3000/note/${id}`)
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
        .post(`http://localhost:3000/note/ct/${this.id}`, {
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
        .post(`http://localhost:3000/note/ipt/${this.id}`, {
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
        .post(`http://localhost:3000/note/npt/${this.id}`, {
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
        .post(`http://localhost:3000/note/tdt/${this.id}`, {
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