<template>
  <div class="is-10 pt-6 background" style="margin-left: 5%">
    <div class="field is-grouped">
      <!-- <p class="control pr-6">
        <a class="button is-primary">+ Add Patient </a>
      </p> -->
      <p class="control is-expanded">
        <input
          class="input"
          type="text"
          placeholder="Find patient(s)"
          v-model="search"
        />
      </p>
      <p class="control">
        <a class="button is-info" @click="getPatients"> ค้นหา </a>
      </p>
    </div>
    <h1 class="is-size-4 mb-4">คนไข้ทั้งหมด ({{ patients.length }})</h1>
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
            <router-link :to="`/patient/${patient.id}`">
              <div class="card">
                <div class="card-image">
                  <figure class="image is-1by1">
                    <img
                      :src="imagePath(patient.picture)"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-8">
                        {{ patient.first_name }} {{ patient.last_name }}
                      </p>
                      <p class="is-6">อายุ : {{ patient.age }}</p>
                      <p class="is-6">เพศ : {{ patient.gender }}</p>
                      <p class="is-6">อาการ : {{ patient.symptom }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  mounted() {
    this.getPatients();
  },
  data() {
    return {
      search: "",
      patients: [],
    };
  },
  methods: {
    getPatients() {
      axios
        .get("/patients", {
          params: {
            search: this.search,
          },
        })
        .then((response) => {
          this.patients = response.data;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQHBg0QEBIPEA4QEBEQFRgQDRcQExAaFhUWFiATFRUYHSggGB4lGxgWITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NFQ0NDy0ZFRkrLSs3Ky0tLisrKzctNy0rNystLS0rKysrKy0rLSsrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwQFAgYBB//EADQQAQACAAMFBQcCBwEAAAAAAAABAgMEEQUSITFhQVFxgbETIlKRocHRFDQyQnKCkuHxJP/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A/TAGkAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAHVKTiW0iJmegOX2I1nSOM9F2mzL25zWv1lo5fLVy9eEce2Z5yauMzC2de8cdKx15/KE9dld9p8qtITVZ07Kj4p/wAUd9l2jlaJ8Y0aoaMHFyl8LnWdO+OMIHpVTNZGuNEzHu2747fGDUxijvFwpwbzW0aT69YcKgAAAAAAAAAAAAAAAAAA3Mjl/YYMfFPGfwx8vTfzFI77Q9ClWACKAAAAAAgzmXjMYWn80cpYUxuzMTzjg9IyNq4W5jxaOVo+sLEqiAqAAAAAAAAAAAAAAAALOz41zlPP0luMPZv7yvn6S3EqwARQAAAAABS2rTeyuvwzE/b7rqttGf8Ax316esAwwGmQAAAAAAAAAAAAAAAFrZ37ynn6S22FkJ0zlPH7S3UqwARQAAAAABibStM5u0azpGmnHlwhtsHPTrnL+P2WCABWQAAAAAAAAAAAAAAAE+SiZzNJiJmItHZybyHJ03MtSI7on5pkrQAgAAAAAAMDNxP6m+sTGtp5xz4t9U2nTeylp7Y0mPmsGKArIAAAAAAAAAAAAAAADc2fffylOnD5LLN2PicL1/uj0/DSZaAAAAAAAAFLa193LafFMR8uK6ydr4m9jVr8MeqwUAFZAAAAAAAAABQAAAAAEmXxpwMWLR/1t5XH/UYMW005xprrowGnsfE4Xr/d9vwlGkAigAAAAAIM3mP02Frprx056MPExJxMSbTzmdWhti/GlfGft+Wa1EAAAAAAAAAAABAAAAAABNlMb2GPW3ZynwlCA9LE6wKWysSb5eYn+WdIXWWgAAAAFbaN5plLadI+YMrOYvtszaezlHhCAGkABAAAAAAAAAAAAAAAAAAGxsmNMtPW0+kLqts+m5k6ddZ+c6rLLQAAAArbRjXJ38p+sLKPMU38C8d9Zj6A88A0yAAAAAAAAAAAAAAAAAAOqV37xEc5nQpSb20iJmejVyGS9jO9b+L0FXaxu1iO6NH0GVAAAAAAefzWH7LMWjrrHhKJt57KfqK6xwtHLr0lj4mHOFbS0TEtRHAAgAAAAAAAAAAAAPsRvTpHGei9l9mzfjf3Y7o5/wChVGtd+2kRMz0X8vsybcbzpHdHP5tHBwK4NdKxEes+aRNMR4WDXBrpWIhICKAAAAAAAAOcTDjErpaImOroBmZjZnbSfKftLPxMOcO2lomJ6vRuMTDjFrpaImOq6jzo0cxszTjSdek/aVC9JpbSYmJ6qOQBAAAAAH2OMg+LeVyNsbjPu1+s+ELeSyG5EWvxt2R2R+ZX01cRYGXrgR7sce+eMz5pQRQAAAAAAAAAAAAAAABHjYNcaulo19Y80gDIzOzpw+Nfej6x+VF6VTzmRjHiZrwv9J8VlTGMOrVmlpieEw5VAABpbKy2vvz4V/LOrG9aIjnM6PRYVPZ4cVjlEaFWOgGVAAAAAAAAAAAAAAAAAAAAAAUdqZffw9+P4q8+sMh6WY1h57Hw/ZY1q90rEqMBUTZX9zh/1R6t8EqwARQAAAAAAAAAAAAAAAAAAAAABibS/eW8vSAWJVUBUf/Z";
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