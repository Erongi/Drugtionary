<template>
  <div>
    <div class="navbar-brand fit-12">
      <router-link to="/">
        <img class="ml-5 mt-2" src="./assets/logo.png" width="50%"
      /></router-link>
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
        <div class="container-menu subtitle">
          <router-link to="/note/1">บันทึก</router-link>
        </div>
        <div class="container-menu subtitle">
          <router-link to="/profile">โปรไฟล์</router-link>
        </div>
      </div>

      <div class="vl" style="margin-top: 16px"></div>

      <div class="column is-9"><router-view /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
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
