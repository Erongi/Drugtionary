<template>
  <div class="container is-widescreen">
    <section class="section" v-if="error">
      <div class="container is-widescreen">
        <div class="notification is-danger">
          <!-- <%= error.code + ': ' + error.sqlMessage %> -->
          <!---->
          {{ error }}
        </div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <p class="title">Create new Drug</p>
      </div>
    </section>
    <section class="px-6">
      <input
        class="mb-5"
        type="file"
        accept="image/png, image/jpeg, image/webp"
        @change="selectImages"
      />

      <div v-if="images" class="columns is-multiline">
        <div
          v-for="(image, index) in images"
          :key="image.id"
          class="column is-one-quarter"
        >
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="showSelectImage(image)" alt="Placeholder image" />
              </figure>
            </div>
            <footer class="card-footer">
              <a
                @click="deleteSelectImage(index)"
                class="card-footer-item has-text-danger"
                >Delete{{ image.id }}</a
              >
            </footer>
          </div>
        </div>
      </div>

      <div class="field mt-5">
        <label class="label">Name</label>
        <div class="control">
          <input
            v-model="name"
            class="input"
            type="text"
            placeholder="Text input"
          />
        </div>
      </div>

      <div class="field mt-5">
        <label class="label">Group</label>
        <div class="control">
          <input
            v-model="group"
            class="input"
            type="text"
            placeholder="Text input"
          />
        </div>
      </div>

      <div class="field mt-5">
        <label class="label">Type</label>
        <div class="control">
          <input
            v-model="type"
            class="input"
            type="text"
            placeholder="Text input"
          />
        </div>
      </div>
      <div class="field mt-5">
        <label class="label">Properties</label>
        <div class="control">
          <input
            v-model="properties"
            class="input"
            type="text"
            placeholder="Text input"
          />
        </div>
      </div>
      <div class="field mt-5">
        <label class="label">pg</label>
        <div class="control">
          <input
            v-model="pg"
            class="input"
            type="text"
            placeholder="Text input"
          />
        </div>
      </div>
      <div class="field mt-5">
        <label class="label">pattern</label>
        <div class="control">
          <input
            v-model="pattern"
            class="input"
            type="text"
            placeholder="Text input"
          />
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button @click="submitBlog" class="button is-link">Submit</button>
        </div>
        <div class="control">
          <button @click="$router.go(-1)" class="button is-link is-light">
            Cancel
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  data() {
    return {
      error: null,
      images: [], // array of image
      name: "",
      group: "",
      type: "",
      properties: "",
      pg: "",
      pattern: "",
    };
  },
  methods: {
    selectImages(event) {
      this.images = event.target.files;
    },
    showSelectImage(image) {
      // for preview only
      return URL.createObjectURL(image);
    },
    deleteSelectImage(index) {
      console.log(this.images);
      this.images = Array.from(this.images);
      this.images.splice(index, 1);
    },
    submitBlog() {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("group", this.group);
      formData.append("type", this.type);
      formData.append("properties", this.properties);
      formData.append("pg", this.pg);
      formData.append("pattern", this.pattern);
      formData.append("myImage", this.images[0]);
      axios
        .post("/drugs", formData)
        .then((res) => this.$router.push({ name: "Drugs" }))
        .catch((e) => console.log(e.response.data));
    },
  },
};
</script>

<style>
</style>