<template>
  <div>
    <div class="background">
      <div class="text">
        <h1 class="header">DRUGTIONARY</h1>
        <center>
          <img
            style="width: 100%"
            src="../assets/medical.jpg"
            alt="Girl in a jacket"
          />
        </center>
        <div class="mx-6">
          <article class="message is-primary mt-3">
            <div class="message-body">
              <p class="mx-6">
                เว็บไซด์นี้จัดทำขึ้นมีจุดประสงค์ในการจัดทำ เพื่อให้แพทย์
                และเภสัชกรณ์ สามาถเข้าดูรายการของยาต่างๆได้
                ซึ่งหลายๆครั้งที่แพทย์ และเภสัชกรณ์ ต้องคอยหาข้อมูล
                หรือสอบถามข้อมูลเกี่ยวกับยาจากผู้อื่น
                เราจึงได้นำมาเป็นหัวข้อในการศึกษาเพื่อประกอบกับเนื้อหาที่มีความสนใจ
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <h4>This project</h4>
        <p>
          Part of Web Programming class KMITL Faculty of Information Technology
        </p>
        <p>Copyright ©2021 Allright reserved</p>
      </div>
    </footer>
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