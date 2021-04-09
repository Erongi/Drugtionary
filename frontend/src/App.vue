<template>
  <div>
    <div class="navbar-brand fit-12">
      <router-link to="/">
        <img src="./assets/logo.png" width="50" height="10"
      /></router-link>
      <h3>Drugtionary</h3>
    </div>
    <span class="line" />
    <div class="columns">
      <div class="column is-2">
        <div class="has-text-centered">Menu</div>
        <div class="container-menu">
          <router-link to="/">Home</router-link>
        </div>
        <div class="container-menu">
          <router-link to="/patients">Patient</router-link>
        </div>
        <div class="container-menu">
          <router-link to="/medicines">Medicine</router-link>
        </div>
        <div class="container-menu">
          <router-link to="/note">Note</router-link>
        </div>
        <div class="container-menu">
          <router-link to="/profile">Profile</router-link>
        </div>
      </div>
      <div class="column is-1 has-text-centered"><div class="vl"></div></div>
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
}
.content {
  flex-direction: column;
  overflow-y: auto;
}
</style>
