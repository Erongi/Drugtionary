<template>
  <div class="column is-10 pt-6 background" style="margin-left: 5%">
    <div class="field is-grouped">
      <p
        class="control pr-6"
        v-if="user && (user.role === 'medical' || user.role === 'admin')"
      >
        <router-link to="/addDrug">
          <a class="button is-primary">+ เพิ่มยา </a>
        </router-link>
      </p>
      <p class="control is-expanded">
        <input
          class="input"
          type="text"
          placeholder="Find drug(s)"
          v-model="search"
        />
      </p>
      <p class="control">
        <a class="button is-info" @click="getDrugs"> ค้นหา </a>
      </p>
    </div>
    <h1 class="is-size-4 mb-4">ยาทั้งหมด ({{ drugs.length }})</h1>
    <div id="style-1" class="scroll-bar mt-6">
      <div class="container">
        <div class="is-multiline columns is-variable is-5">
          <!-- Card element start here------------------------------------------>
          <div
            id="card_drugs"
            class="column is-one-quarter"
            v-for="drug in drugs"
            :key="drug.id"
          >
            <div class="card" @click="drugDetail(drug.id)">
              <header class="card-header">
                <p class="card-header-title">{{ drug.name }}</p>
              </header>
            </div>
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
    this.getDrugs();
  },
  data() {
    return {
      search: "",
      drugs: [],
    };
  },
  methods: {
    getDrugs() {
      axios
        .get("/drugs", {
          params: {
            search: this.search,
          },
        })
        .then((response) => {
          this.drugs = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    drugDetail(id) {
      axios
        .get(`/drug/${id}`)
        .then((response) => {
          this.$router.push(`/drug/${id}`);
        })
        .catch((err) => {
          console.log(err);
        });
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
.fit-20 {
  height: 20vh;
}
.fit-50 {
  height: 50vh;
}
.scroll-bar {
  overflow-y: auto;
  overflow-x: hidden;
  padding: 5px;
  margin: 0;
  height: calc(75vh - 90px);
}
.background {
  background-image: url("../assets/pic.png");
  margin-left: 5%;
  background-size: 105%;
  background-position: inherit;
  background-repeat: no-repeat;
  position: relative;
}
</style>
