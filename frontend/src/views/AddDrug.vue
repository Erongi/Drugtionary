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
        <p class="title">สร้างยาใหม่</p>
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
        <label class="label">ชื่อยา</label>
        <div class="control">
          <input
            v-model="$v.name.$model"
            :class="{ 'is-danger': $v.name.$error }"
            class="input"
            type="text"
          />
        </div>
        <template v-if="$v.name.$error">
          <p class="help is-danger" v-if="!$v.name.required">
            This field is required
          </p>
        </template>
      </div>

      <div class="field mt-5">
        <label class="label">กลุ่มยา</label>
        <div class="control">
          <input
            v-model="$v.group.$model"
            :class="{ 'is-danger': $v.group.$error }"
            class="input"
            type="text"
          />
        </div>
        <template v-if="$v.group.$error">
          <p class="help is-danger" v-if="!$v.group.required">
            This field is required
          </p>
        </template>
      </div>

      <div class="field mt-5">
        <label class="label">ประเภทยา</label>
        <div class="control">
          <input
            v-model="$v.type.$model"
            :class="{ 'is-danger': $v.type.$error }"
            class="input"
            type="text"
          />
        </div>
        <template v-if="$v.type.$error">
          <p class="help is-danger" v-if="!$v.type.required">
            This field is required
          </p>
        </template>
      </div>
      <div class="field mt-5">
        <label class="label">สรรพคุณ</label>
        <div class="control">
          <input
            v-model="$v.properties.$model"
            :class="{ 'is-danger': $v.properties.$error }"
            class="input"
            type="text"
          />
        </div>
        <template v-if="$v.properties.$error">
          <p class="help is-danger" v-if="!$v.properties.required">
            This field is required
          </p>
        </template>
      </div>
      <div class="field mt-5">
        <label class="label">กลุ่มผู้ป่วย</label>
        <div class="control">
          <input
            v-model="$v.pg.$model"
            :class="{ 'is-danger': $v.pg.$error }"
            class="input"
            type="text"
          />
        </div>
        <template v-if="$v.pg.$error">
          <p class="help is-danger" v-if="!$v.pg.required">
            This field is required
          </p>
        </template>
      </div>
      <div class="field mt-5">
        <label class="label">รูปแบบของยา</label>
        <div class="control">
          <input
            v-model="$v.pattern.$model"
            :class="{ 'is-danger': $v.pattern.$error }"
            class="input"
            type="text"
          />
        </div>
        <template v-if="$v.pattern.$error">
          <p class="help is-danger" v-if="!$v.pattern.required">
            This field is required
          </p>
        </template>
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
import { required } from "vuelidate/lib/validators";
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
  validations: {
    name: {
      required,
    },
    group: {
      required: required,
    },
    type: {
      required: required,
    },
    properties: {
      required: required,
    },
    pg: {
      required: required,
    },
    pattern: {
      required: required,
    },
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
      this.$v.$touch();

      if (!this.$v.$invalid) {
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
      }
    },
  },
};
</script>

<style>
</style>