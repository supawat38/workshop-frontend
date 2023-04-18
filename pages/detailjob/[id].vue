<template>
  <div class="container">
    <div
      class="row"
      style="
        margin-top: 20px;
        border: #fff 1px solid;
        box-shadow: rgba(149, 157, 165, 0.2) 2px 2px 11px 2px;
        border-radius: 2px;
        background-color: #fff;
      "
    >
      <div class="col-lg-4 d-lg-block d-none" style="padding: 0px">
        <img
          class="card-img-top img-responsive"
          :src="useImage('/img7.jpg')"
          style="height: 420px; width: 100%; object-fit: cover"
        />
      </div>
      <div class="col-lg-4 d-sm-block d-lg-none" style="padding: 0px">
        <img
          class="card-img-top img-responsive"
          :src="useImage('/img7.jpg')"
          style="height: 250px; width: 100%; object-fit: cover"
        />
      </div>
      <div class="col-lg-8" style="margin-top: 20px">
        <form class="row">
          <div class="col-6">
            <h4
              class="titleform"
              style="
                border-left: 4px solid rgb(250, 168, 25);
                margin-bottom: 20px;
              "
            >
              รายละเอียด
            </h4>
          </div>
          <div class="col-6">
            <p style="text-align: right; margin-top: 5px">
              {{ moment.utc(item.created_at).format("DD/MM/YYYY HH:mm") }}
            </p>
          </div>
          <hr />
          <p><b>ชื่อบริษัท</b> : {{ item.name }}</p>
          <p><b>ตำแหน่ง</b> : {{ position }}</p>
          <p><b>URL</b> : {{ url }}</p>
          <p><b>สถานที่ทำงาน</b> : {{ location }}</p>
          <p><b>เงินเดือน</b> : {{ salary }}</p>
          <p><b>ประเภทการทำงาน</b> : {{ type }}</p>
          <NuxtLink to="/">
            <label class="morelist" style="margin-bottom: 20px">
              ย้อนกลับ
            </label>
          </NuxtLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const item = ref({});
const id = route.params.id;
var type, salary, location, url, position;
fetch("http://127.0.0.1:5100/api/v2/detailjob/" + id)
  .then((res) => res.json())
  .then((result) => {
    item.value = result.data;

    //ประเภทการทำงาน
    switch (item.value.type) {
      case 1:
        type = "Work form home";
        break;
      case 2:
        type = "Hybrid";
        break;
      case 3:
        type = "Work at office";
        break;
      default:
        type = "-";
    }

    //เงินเดือน
    if (item.value.salary == "") {
      salary = "-";
    } else {
      salary = item.value.salary;
    }

    //สถานที่ทำงาน
    if (item.value.location == "") {
      location = "-";
    } else {
      location = item.value.location;
    }

    //url
    if (item.value.url == "") {
      url = "-";
    } else {
      url = item.value.url;
    }

    //ตำแหน่ง
    if (item.value.position == "") {
      position = "-";
    } else {
      position = item.value.position;
    }
  });
</script>

<script>
import moment from "moment";

export default {
  data: () => ({
    moment: moment,
  }),
};
</script>
