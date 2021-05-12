<template>
  <div class="container is-fluid mt-5">
    <div class="columns is-centered">
      <div class="column is-8">
        <h1 class="title">Welcome</h1>
        <p>
          เว็บไซด์นี้จัดทำขึ้นมีจุดประสงค์ในการจัดทำ เพื่อให้แพทย์ และเภสัชกรณ์ สามาถเข้าดูรายการของยาต่างๆได้ ซึ่งหลายๆครั้งที่แพทย์ และเภสัชกรณ์ ต้องคอยหาข้อมูล หรือสอบถามข้อมูลเกี่ยวกับยาจากผู้อื่น เราจึงได้นำมาเป็นหัวข้อในการศึกษาเพื่อประกอบกับเนื้อหาที่มีความสนใจ
        </p>
      </div>

      <div class="column is-4">
        <h1 class="title">Log in</h1>

        <p
          v-if="error"
          class="px-3 py-2 mb-3 has-text-danger-dark has-background-danger-light"
        >
          {{ error }}
        </p>

        <!-- Login form -->
        <div class="field">
          <label class="label">Username</label>
          <div class="control has-icons-left">
            <input v-model="username" class="input" type="text" />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left has-icons-right">
            <input v-model="password" class="input" type="password" />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </div>
        </div>

        <button class="button is-primary is-fullwidth" @click="submit">
          Login
        </button>

        <p class="my-3">
          Don't have an account yet?
          <router-link to="/signup">
            <strong>Sign up</strong>
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    submit() {
      if (this.username === "") {
        this.error = "กรุณากรอก username";
        return;
      }
      if (this.password === "") {
        this.error = "กรุณากรอก password";
        return;
      }
      const data = {
        username: this.username,
        password: this.password,
      };

      axios
        .post("/user/login/", data)
        .then((res) => {
          const token = res.data.token;
          localStorage.setItem("token", token);
          this.$emit("auth-change");
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          this.error = error.response.data;
          console.log(error.response.data);
        });
    },
  },
};
</script>