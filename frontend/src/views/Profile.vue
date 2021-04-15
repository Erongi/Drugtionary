<template>
  <div>
    <div class="columns">
      <div class="picprofile">
        <div class="picprofile3">
          <img
            src="data:image/jpeg;base64,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"
            alt=""
            width="500"
            height="600"
          />
        </div>

        <div class="detailpf">
          <div>
            <h1 class="styletxt">Doctor Profile</h1>
            <br />
            <p class="styletxt">
              พญ.วันวิสาข์ ตันศิริเจริญกุล (หมอหลิน) <br />
              Dr.Wanwisa Tansiricharernkul (Dr.Lin)
              <br /><br />
              Academic Background, Certification and study visiting <br /><br />
              Doctor of Medicine, Faculty of Medicine, Chiang Mai University.<br />
              Certificate of Orthopedic surgery, Faculty of Medicine, Chiang Mai
              University.<br />
              Fellowship in Bone and Soft tissue Tumour, Mayo Clinic, USA,
              2005<br />
              Master degree of Biomedical Science in clinical research, Mayo
              Graduated School, Rochester, Minnesota, USA, 2005<br />
              Clinical Visitor in Joint Replacement Surgery for Hip and Knee,
              Western Ontario University, Canada, 2006<br />
              Master of Business Administration, Payap University, 2009<br />
            </p>
          </div>
        </div>
      </div>

      <div class="picprofile2">
        <table class="table">
          <thead>
            <tr>
              <th>ประวัติการรักษา</th>
              <th>ยาที่รับประทานอยู่</th>
            </tr>
            <tr>
              <td>รักษามาเเล้วหลายคน</td>
              <td>ยาบ้า</td>
            </tr>
            <tr></tr>
          </thead>
        </table>
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
      NPT: [
        { id: 1, userId: 1, massage: "npt1" },
        { id: 2, userId: 1, massage: "npt2" },
        { id: 3, userId: 1, massage: "npt3" },
      ],
      TDT: [
        { id: 1, userId: 1, massage: "tdt1" },
        { id: 2, userId: 2, massage: "tdt2" },
      ],
      IPT: [{ id: 1, userId: 2, massage: "ipt1" }],
      CT: [
        { id: 1, userId: 1, massage: "ct1" },
        { id: 2, userId: 1, massage: "ct2" },
        { id: 3, userId: 2, massage: "ct3" },
      ],
    };
  },
};
</script>

<style scoped>
.columns {
  background-color: rgb(236, 236, 236);
  width: 1560px;
  height: 820px;
  margin: 5px;
  border-radius: 25px;
}
.picprofile {
  background-color: rgb(255, 255, 255);
  width: 40%;
  height: 810px;
  margin: 5px;
  border-radius: 25px;
}
.picprofile2 {
  background-color: rgb(255, 255, 255);
  width: 65%;
  height: 810px;
  margin: 5px;
  border-radius: 25px;
}
.detailpf {
  background-color: rgb(255, 255, 255);
  width: 98.5%;
  height: 484px;
  margin-top: 2%;
  margin-left: 5px;
  color: black;
}
.styletxt {
  width: 100%;
  max-width: 400px;
  margin-left: 10px;
  text-align: justify;
  word-break: break-all;
}
.table {
  width: 100%;
  border-radius: 25px;
}
.picprofile3 {
  background-color: rgb(207, 38, 38);
  width: auto;
  height: 300px;
  margin: 5px;
  border-radius: 25px;
}
</style>