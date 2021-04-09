<template>
  <div>
    <h1>Patients</h1>
    <h1>{{ id }}</h1>
    <div class="columns">
      <div class="column is-2">
        <img
          src="https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.6435-9/41575445_1918000258267098_6614958726350635008_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=rtID_NzwUpAAX_QZxYB&_nc_ht=scontent.fbkk2-6.fna&oh=e8d93a6fcf9bc52624f1c19335885d7f&oe=6094AD03"
        />
      </div>
      <div class="column">
        <h1>น้องพั้น</h1>
        <h1>เพศ: หญิง อายุ: 999 ปี</h1>
        <h1>อาการ:</h1>
      </div>
    </div>
    <div class="columns">
      <button class="column">ประวัติการรักษา</button>
      <button class="column">ยาที่รับประทานอยู่</button>
    </div>
    <div class="rows">
      <div>
        <h1>ไม่สบายไอสัส</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.id = this.$route.params.id;
  },
  data() {
    return {
      id: null,
    };
  },
};
</script>

<style scoped>
</style>