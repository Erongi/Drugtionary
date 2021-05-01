<template>
  <div>
    <div class="container is-fluid mt-5">
      <div class="columns is-centered">
        <div class="column">
          <div id="style-1" class="scroll-bar mt-6">
            <h1 class="title">Sign Up</h1>
            <!-- Sign up form -->
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
                      <img
                        :src="showSelectImage(image)"
                        alt="Placeholder image"
                      />
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
            <div class="field">
              <label class="label">Username</label>
              <div class="control has-icons-left">
                <input
                  v-model="$v.username.$model"
                  :class="{ 'is-danger': $v.username.$error }"
                  class="input"
                  type="text"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </div>
              <template v-if="$v.username.$error">
                <p class="help is-danger" v-if="!$v.username.required">
                  This field is required
                </p>
                <p class="help is-danger" v-if="!$v.username.minLength">
                  ไม่ต่ำกว่า 5 ตัวอักษร
                </p>
                <p class="help is-danger" v-if="!$v.username.maxLength">
                  ไม่เกิน 20 ตัวอักษร
                </p>
              </template>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  v-model="$v.password.$model"
                  :class="{ 'is-danger': $v.password.$error }"
                  class="input"
                  type="password"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </div>
              <template v-if="$v.password.$error">
                <p class="help is-danger" v-if="!$v.password.required">
                  This field is required
                </p>
                <p class="help is-danger" v-if="!$v.password.minLength">
                  length > 8
                </p>
                <p class="help is-danger" v-if="!$v.password.complex">
                  more complex pls
                </p>
              </template>
            </div>

            <div class="field">
              <label class="label">Confirm Password</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  v-model="$v.confirm_password.$model"
                  :class="{ 'is-danger': $v.confirm_password.$error }"
                  class="input"
                  type="password"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </div>
              <template v-if="$v.confirm_password.$error">
                <p class="help is-danger" v-if="!$v.confirm_password.required">
                  This field is required
                </p>
                <p class="help is-danger" v-if="!$v.confirm_password.sameAs">
                  same as password?
                </p>
              </template>
            </div>

            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  v-model="$v.email.$model"
                  :class="{ 'is-danger': $v.email.$error }"
                  class="input"
                  type="text"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
              <template v-if="$v.email.$error">
                <p class="help is-danger" v-if="!$v.email.required">
                  This field is required
                </p>
                <p class="help is-danger" v-if="!$v.email.email">
                  Invalid Email
                </p>
              </template>
            </div>

            <div class="field">
              <label class="label">Mobile Number</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  v-model="$v.mobile.$model"
                  :class="{ 'is-danger': $v.mobile.$error }"
                  class="input"
                  type="text"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-mobile"></i>
                </span>
              </div>
              <template v-if="$v.mobile.$error">
                <p class="help is-danger" v-if="!$v.mobile.required">
                  This field is required
                </p>
                <p class="help is-danger" v-if="!$v.mobile.mobile">
                  Invalid Mobile Number
                </p>
              </template>
            </div>

            <div class="field">
              <label class="label">First Name</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  v-model="$v.first_name.$model"
                  :class="{ 'is-danger': $v.first_name.$error }"
                  class="input"
                  type="text"
                />
              </div>
              <template v-if="$v.first_name.$error">
                <p class="help is-danger" v-if="!$v.first_name.required">
                  This field is required
                </p>
                <p class="help is-danger" v-if="!$v.first_name.maxLength">
                  ไม่เกิน 150 ตัวอักษร
                </p>
              </template>
            </div>

            <div class="field">
              <label class="label">Last Name</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  v-model="$v.last_name.$model"
                  :class="{ 'is-danger': $v.last_name.$error }"
                  class="input"
                  type="text"
                />
              </div>
              <template v-if="$v.last_name.$error">
                <p class="help is-danger" v-if="!$v.last_name.required">
                  This field is required
                </p>
                <p class="help is-danger" v-if="!$v.last_name.maxLength">
                  ไม่เกิน 150 ตัวอักษร
                </p>
              </template>
            </div>

            <div class="control mb-3">
              <label class="radio">
                <input
                  v-model="gender"
                  type="radio"
                  name="answer"
                  value="ชาย"
                />
                ชาย
              </label>
              <label class="radio">
                <input
                  v-model="gender"
                  type="radio"
                  name="answer"
                  value="หญิง"
                />
                หญิง
              </label>
              <template v-if="$v.gender.$error">
                <p class="help is-danger" v-if="!$v.gender.required">
                  This field is required
                </p>
              </template>
            </div>

            <div class="field">
              <label class="label">อายุ</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  v-model="$v.age.$model"
                  :class="{ 'is-danger': $v.age.$error }"
                  class="input"
                  type="number"
                />
              </div>
              <template v-if="$v.age.$error">
                <p class="help is-danger" v-if="!$v.age.required">
                  This field is required
                </p>
                <p class="help is-danger" v-if="!$v.age.between">
                  อายุไม่ถูกต้อง
                </p>
              </template>
            </div>

            <button class="button is-primary is-fullwidth" @click="submit()">
              Sign Up
            </button>
            <p class="my-3">
              Already have an account?
              <router-link to="/login">
                <strong>Login</strong>
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
 <script>
import axios from "@/plugins/axios";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  between,
} from "vuelidate/lib/validators";
function mobile(value) {
  return !!value.match(/0[0-9]{9}/);
}
function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}
export default {
  data() {
    return {
      username: "test3",
      images: [],
      password: "Testtest3",
      confirm_password: "Testtest3",
      email: "test3@gmail.com",
      mobile: "0531864865",
      first_name: "สาระ",
      last_name: "เลวะ",
      age: "21",
      gender: "ชาย",
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    mobile: {
      required: required,
      mobile: mobile,
    },
    password: {
      required: required,
      minLength: minLength(8),
      complex: complexPassword,
    },
    confirm_password: {
      required: required,
      sameAs(value) {
        if (value === this.password) {
          return true;
        }
        return false;
      },
    },
    username: {
      required: required,
      minLength: minLength(5),
      maxLength: maxLength(20),
    },
    first_name: {
      required: required,
      maxLength: maxLength(150),
    },
    last_name: {
      required: required,
      maxLength: maxLength(150),
    },
    age: {
      required: required,
      maxLength: maxLength(2),
      between: between(0, 99),
    },
    gender: {
      required: required,
    },
  },
  methods: {
    selectImages(event) {
      this.images = event.target.files;
      console.log(this.images[0]);
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
    submit() {
      // Validate all fields
      this.$v.$touch();

      if (!this.$v.$invalid) {
        let formData = new FormData();
        formData.append("username", this.username);
        formData.append("password", this.password);
        formData.append("confirm_password", this.confirm_password);
        formData.append("email", this.email);
        formData.append("mobile", this.mobile);
        formData.append("first_name", this.first_name);
        formData.append("last_name", this.last_name);
        formData.append("age", this.age);
        formData.append("gender", this.gender);
        formData.append("myImage", this.images[0]);
        axios
          .post("/user/signup", formData)
          .then((res) => {
            alert("Sign up Success");
          })
          .catch((err) => {
            alert(err.response.data.details.message);
          });
      }
    },
  },
};
</script>
<style>
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
.scroll-bar {
  overflow-y: auto;
  overflow-x: hidden;
  padding: 5px;
  margin: 0;
  height: calc(75vh);
  width: 100%;
}
</style>