<template>
  <div>
    <div class="container is-fluid mt-5">
      <div class="columns is-centered">
        <div class="column">
          <div id="style-1" class="scroll-bar mt-6">
            <h1 class="title">Edit Password</h1>
            <!-- Sign up form -->

            <div class="field">
              <label class="label">Old Password</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  v-model="$v.old_password.$model"
                  :class="{ 'is-danger': $v.old_password.$error }"
                  class="input"
                  type="password"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </div>
              <template v-if="$v.old_password.$error">
                <p class="help is-danger" v-if="!$v.old_password.required">
                  This field is required
                </p>
                <p class="help is-danger" v-if="!$v.old_password.minLength">
                  length > 8
                </p>
              </template>
            </div>

            <div class="field">
              <label class="label">New Password</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  v-model="$v.new_password.$model"
                  :class="{ 'is-danger': $v.new_password.$error }"
                  class="input"
                  type="password"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </div>
              <template v-if="$v.new_password.$error">
                <p class="help is-danger" v-if="!$v.new_password.required">
                  This field is required
                </p>
                <p class="help is-danger" v-if="!$v.new_password.minLength">
                  length > 8
                </p>
                <p class="help is-danger" v-if="!$v.new_password.complex">
                  more complex pls
                </p>
              </template>
            </div>

            <div class="field">
              <label class="label">Confirm New Password</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  v-model="$v.confirm_new_password.$model"
                  :class="{ 'is-danger': $v.confirm_new_password.$error }"
                  class="input"
                  type="password"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </div>
              <template v-if="$v.confirm_new_password.$error">
                <p
                  class="help is-danger"
                  v-if="!$v.confirm_new_password.required"
                >
                  This field is required
                </p>
                <p
                  class="help is-danger"
                  v-if="!$v.confirm_new_password.sameAs"
                >
                  same as password?
                </p>
              </template>
            </div>

            <button class="button is-primary is-fullwidth" @click="submit()">
              Edit Password
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
 <script>
import axios from "@/plugins/axios";
import { required, minLength, sameAs } from "vuelidate/lib/validators";
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
  props: ["user"],
  data() {
    return {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    };
  },
  validations: {
    old_password: {
      required: required,
      minLength: minLength(8),
      complex: complexPassword,
    },
    new_password: {
      required: required,
      minLength: minLength(8),
      complex: complexPassword,
    },
    confirm_new_password: {
      required: required,
      sameAs(value) {
        if (value === this.new_password) {
          return true;
        }
        return false;
      },
    },
  },
  methods: {
    submit() {
      // Validate all fields
      this.$v.$touch();

      if (!this.$v.$invalid) {
        let data = {
          old_password: this.old_password,
          new_password: this.new_password,
        };
        axios
          .put("/user/editPassword", data)
          .then((res) => {
            alert("edit Success");
            this.$emit("auth-change");
            this.$router.push({ path: "/profile" });
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