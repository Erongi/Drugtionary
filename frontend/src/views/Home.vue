<template>
  <div>
    <div class="background">
      <div class="text">
        <h1 class="header">DRUGTIONARY</h1>
        <img
          url="https://i.kym-cdn.com/entries/icons/original/000/032/279/Screen_Shot_2019-12-30_at_11.26.24_AM.png"
        />
        <h3 class="font">
          เว็บไซด์นี้จัดทำขึ้นมีจุดประสงค์ในการจัดทำ เพื่อให้แพทย์ และเภสัชกรณ์
          สามาถเข้าดูรายการของยาต่างๆได้ ซึ่งหลายๆครั้งที่แพทย์ และเภสัชกรณ์
          ต้องคอยหาข้อมูล หรือสอบถามข้อมูลเกี่ยวกับยาจากผู้อื่น
          เราจึงได้นำมาเป็นหัวข้อในการศึกษาเพื่อประกอบกับเนื้อหาที่มีความสนใจ
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </h3>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <h4>Pages</h4>
        <i>
          <a href="./">หน้าแรก</a><br />
          <a href="./patients">คนไข้</a><br />
          <a href="./drugs">ยา</a><br />
          <a href="./note/1">บันทึก</a><br />
          <a href="./profile/">โปรไฟล์</a>
        </i>
      </div>
      <div class="column">
        <h4>Member</h4>
        <p>61070044</p>
        <p>61070141</p>
        <p>61070213</p>
      </div>
      <div class="column">
        <h4>This project</h4>
        <p>
          Part of Web Programming class KMITL Faculty of Information Technology
        </p>
        <p>Copyright ©2021 Allright reserved</p>
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
.header {
  text-align: center;
  position: initial;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 500%;
  margin-top: 1%;
  margin-left: 3%;
}
.text {
  margin: 2%;
}
.font {
  margin-top: 20%;
  margin-left: 20%;
  margin-right: 20%;
}
.background {
  background-image: url("../assets/pic.png");
  margin-left: 5%;
  background-size: 105%;
  background-position: inherit;
  background-repeat: no-repeat;
  position: relative;
}
.column {
  float: left;
  width: 33%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>