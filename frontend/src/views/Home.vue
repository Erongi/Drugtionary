<template>
  <div>
    <div class="font">DRUG<br />TIONARY</div>
    <div class="detail1">
      detaildetaildetaildetaildetaildetaildetaildetaildetaildetaildetaildetaildetail
      ย่อหน้าไม่เป็น Bitch!!!!
    </div>

    <div class="font">Title<br />2</div>
    <div class="detail1">
      detaildetaildetaildetaildetaildetaildetaildetaildetaildetaildetaildetaildetail
      ย่อหน้าไม่เป็น Bitch!!!!
    </div>

    <div class="font">Title<br />3</div>
    <div class="detail1">
      detaildetaildetaildetaildetaildetaildetaildetaildetaildetaildetaildetaildetail
      ย่อหน้าไม่เป็น Bitch!!!!
    </div>

    <div class="font">Title<br />4</div>
    <div class="detail1">
      detaildetaildetaildetaildetaildetaildetaildetaildetaildetaildetaildetaildetail
      ย่อหน้าไม่เป็น Bitch!!!!
    </div>

    <div class="font">Title<br />5</div>
    <div class="detail1">
      detaildetaildetaildetaildetaildetaildetaildetaildetaildetaildetaildetaildetail
      ย่อหน้าไม่เป็น Bitch!!!!
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
.font {
  font-family: "Zen Dots", cursive;
  font-size: 400%;
  margin-top: 60px;
  margin-left: 60px;
  background-color: rgb(255, 255, 255);
  width: 45%;
  height: 25%;
}
.detail1 {
  background-color: rgb(236, 236, 236);
  width: 90%;
  height: 300px;
  margin-top: -80px;
  margin-left: 150px;
  border-radius: 25px;
  word-break: break-all;
  font-family: "Zen Dots", cursive;
  font-size: 150%;
}
</style>