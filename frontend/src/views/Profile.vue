<template>
  <div>
    <div class="columns">
      <div class="column is-2">
        <img src="https://pbs.twimg.com/media/Dwn1NzeVAAAkJgL.jpg" />
      </div>
      <div class="column">
        <h1>นายแพทย์ประโยชน์ พุธโอชา</h1>
        <h1>เพศ: ชาย &emsp อายุ: 26 ปี</h1>
        <h1>เฉพาะทางด้าน: กระดูก</h1>
      </div>
    </div>
    <div>
      <h2>
        ข้อความอธิบาย ข้อความอธิบาย ข้อความอธิบาย ข้อความอธิบาย ข้อความอธิบาย
      </h2>
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
</style>