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
      ">
      <div class="col-lg-12" style="padding: 0px">
        <img
          class="card-img-top img-responsive"
          :src="useImage('/img9.jpg')"
          style="
            height: 250px;
            width: 100%;
            object-fit: cover;
            object-position: center;
          " />
      </div>
      <div class="col-lg-12" style="margin-top: 20px">
        <form>
          <h4
            class="titleform"
            style="
              border-left: 4px solid rgb(250, 168, 25);
              margin-bottom: 20px;
            ">
            รายการข้อมูล
          </h4>
          <hr />
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">ลำดับ</th>
                <th scope="col">ชื่อบริษัท</th>
                <th scope="col">ตำแหน่ง</th>
                <th scope="col">URL</th>
                <th scope="col">สถานที่ทำงาน</th>
                <th scope="col">เงินเดือน</th>
                <th scope="col">รูปแบบการทำงาน</th>
                <th scope="col">วันที่สมัคร</th>
                <th scope="col">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(items, key) in store.$state.ResultAPI">
                <tr>
                  <th>{{ key + 1 }}</th>
                  <td>{{ items.name }}</td>
                  <td>{{ items.position ? items.position : "-" }}</td>
                  <td>{{ items.url ? items.url : "-" }}</td>
                  <td>{{ items.location ? items.location : "-" }}</td>
                  <td>{{ items.salary ? items.salary : "-" }}</td>
                  <td>{{ showtexttypejob(items.type) }}</td>
                  <td>
                    {{ moment(items.created_at).format("DD/MM/YYYY HH:mm") }}
                  </td>
                  <td></td>
                </tr>
              </template>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { useUserStore } from "@/store/user.ts";
const store = useUserStore();

//ฟังก์ชั่น
function showtexttypejob(type) {
  var texttype = "";
  if (type == 1) {
    texttype = "work form home";
  } else if (type == 2) {
    texttype = "Hybrid";
  } else {
    texttype = "Work at office";
  }
  return texttype;
}
</script>
