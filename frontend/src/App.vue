<template>
  <div>
    <div class="navbar-brand fit-12">
      <router-link to="/">
        <img class="ml-5 mt-2" src="./assets/logo.png" width="50%"
      /></router-link>
      <div class="navbar-end">
        <div v-if="user" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <figure class="image is-24x24 my-auto">
              <img class="is-rounded" :src="imagePath(user.picture)" />
            </figure>
            <span class="pl-3">{{ user.first_name }} {{ user.last_name }}</span>
          </a>
          <div class="navbar-dropdown">
            <a class="navbar-item" @click="profile">โปรไฟล์</a>
            <a class="navbar-item" @click="editProfile">แก้ไขโปรไฟล์</a>
            <a class="navbar-item" @click="logout">ออกจากระบบ</a>
          </div>
        </div>

        <div v-if="!user" class="navbar-item">
          <router-link to="/login">
            <strong>Login</strong>
          </router-link>
        </div>
        <div v-if="!user" class="navbar-item">
          <router-link to="/signup">
            <strong>Signup</strong>
          </router-link>
        </div>
      </div>
    </div>
    <span class="line" />
    <div class="columns">
      <div class="column is-2">
        <!-- <div class="has-text-centered title">Menu</div> -->
        <div class="container-menu subtitle">
          <router-link to="/">หน้าแรก</router-link>
        </div>
        <div class="container-menu subtitle">
          <router-link to="/patients">คนไข้</router-link>
        </div>
        <div class="container-menu subtitle">
          <router-link to="/drugs">ยา</router-link>
        </div>
        <div v-if="user" class="container-menu subtitle">
          <router-link :to="`/note/${user.id}`">บันทึก</router-link>
        </div>
        <div v-if="user" class="container-menu subtitle">
          <router-link to="/profile">โปรไฟล์</router-link>
        </div>
      </div>

      <div class="vl" style="margin-top: 16px"></div>

      <div class="column is-9">
        <router-view
          :key="$route.fullPath"
          @auth-change="onAuthChange"
          :user="user"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  name: "App",
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    this.onAuthChange();
  },
  methods: {
    onAuthChange() {
      const token = localStorage.getItem("token");
      if (token) {
        this.getUser();
      }
    },
    getUser() {
      axios.get("/user/me").then((res) => {
        this.user = res.data;
        console.log(this.user);
      });
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    logout() {
      localStorage.clear();
      this.user = null;
      this.$router.push({ path: "/" });
    },
    editProfile() {
      this.$router.push({ path: "/editProfile" });
    },
    profile() {
      this.$router.push({ path: "/profile" });
    },
  },
};
</script>

<style>
#element::-webkit-scrollbar {
  display: none;
}
.line {
  border-bottom: 3px solid #c4c4c4;
  width: 100%;
  height: 10px;
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
.fit-12 {
  height: 8vh;
}
.vl {
  border-left: 4px solid #c4c4c4;
  height: 87vh;
}
.container-menu {
  padding: 20px;
  margin-left: 10px;
  border-bottom: 1px solid #c4c4c4;
  text-align: center;
}
.content {
  flex-direction: column;
  overflow-y: auto;
}
</style>
