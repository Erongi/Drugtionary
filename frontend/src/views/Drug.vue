<template>
  <div class="columns mt-5 ml-5">
    <div class="column is-one-fifth">
      <div class="card">
        <div class="card-image">
          <figure class="image is-1by1">
            <img
              src="https://th.bing.com/th/id/OIP.1pVGxYSJ7fsmFriHE6M-igHaFL?w=250&h=180&c=7&o=5&dpr=1.25&pid=1.7"
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">ยา: Abacavir</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column box pt-5">
      <div class="box"><p>กลุ่มยา: ยาต้านไวรัส</p></div>
      <div class="box">
        <p>คุณสมบัติ: ช่วยลดจำนวนเชื้อเอชไอวีในร่างกายของผู้ป่วยที่ติดเชื้อ</p>
      </div>
      <div class="box"><p>ประเภทยา: ยาตามใบสั่งแพทย์</p></div>
      <div class="box"><p>กลุ่มผู้ป่วย: ยาตามใบสั่งแพทย์</p></div>
      <div class="box"><p>รูปแบบของยา: ยารับประทาน</p></div>

      <div class="columns">
        <div class="column is-10"></div>
        <div class="column is-2 mt-5">
          <button class="button is-success">Add</button>
        </div>
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
.test {
  justify-content: flex-end;
}
</style>