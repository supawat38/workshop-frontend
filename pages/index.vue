<template>
  <div class="container">
    <SlideBar />
    <div class="row">
      <div class="col-xl-4 col-lg-6">
        <div class="card">
          <div class="card-body">
            <h5
              class="card-title"
              style="border-left: 4px solid rgb(250, 168, 25)"
            >
              รายการที่สนใจ
            </h5>
            <hr />
            <p class="card-text">
              <span class="jobreject" v-for="(items, key) in aItemJob">
                <NuxtLink class="detailjob" :to="'/detailjob/' + items.id">
                  <span>
                    {{ key + 1 }}. {{ items.name }}
                    (วันที่ :
                    {{
                      moment(items.created_at).format("DD/MM/YYYY HH:mm")
                    }})</span
                  >
                </NuxtLink>
              </span>
            </p>
            <NuxtLink to="/list">
              <label class="morelist"> เพิ่มเติม </label>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="col-xl-4 col-lg-6">
        <div class="card">
          <div class="card-body">
            <h5
              class="card-title"
              style="border-left: 4px solid rgb(250, 168, 25)"
            >
              รายการที่เรียกสัมภาษณ์
            </h5>
            <hr />
            <p class="card-text">
              <span class="jobreject" v-for="(items, key) in aItemReaction">
                <NuxtLink class="detailjob" :to="'/detailjob/' + items.id">
                  <span>
                    {{ key + 1 }}. {{ items.name }}
                    (วันที่ :
                    {{
                      moment(items.created_at).format("DD/MM/YYYY HH:mm")
                    }})</span
                  >
                </NuxtLink>
              </span>
            </p>
            <NuxtLink to="/list">
              <label class="morelist"> เพิ่มเติม </label>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="col-xl-4 col-lg-12">
        <div class="card">
          <div class="card-body">
            <h5
              class="card-title"
              style="border-left: 4px solid rgb(250, 168, 25)"
            >
              รายการที่ไม่ผ่านสัมภาษณ์
            </h5>
            <hr />
            <p class="card-text">
              <span class="jobreject" v-for="(items, key) in aItemReject">
                <NuxtLink class="detailjob" :to="'/detailjob/' + items.id">
                  <span>
                    {{ key + 1 }}. {{ items.name }}
                    (วันที่ :
                    {{
                      moment(items.created_at).format("DD/MM/YYYY HH:mm")
                    }})</span
                  >
                </NuxtLink>
              </span>
            </p>
            <NuxtLink to="/list">
              <label class="morelist"> เพิ่มเติม </label>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { useUserStore } from "@/store/user.ts";
const store = useUserStore();

const { data: list } = await useFetch("http://127.0.0.1:5100/api/v2/listjob");

var aItemJob = [];
var aItemReject = [];
var aItemReaction = [];

for (var i = 0; i < list.value.data.length; i++) {
  //บริษัทที่ไม่ผ่าน
  if (list.value.data[i].job_reject == true) {
    aItemReject.push(list.value.data[i]);
  }

  //บริษัทที่รอเรียกสัมภาษณ์
  if (list.value.data[i].job_reaction == true) {
    aItemReaction.push(list.value.data[i]);
  }

  //บริษัททั้งหมด (5 รายการ)
  if (list.value.data[i].job_reject == false) {
    //ต้องมีแค่ 5 รายการ
    if (aItemJob.length < 4) {
      aItemJob.push(list.value.data[i]);
    }
  }
}

//เก็บค่าเข้า store
store.$state.ResultAPI = list.value.data;
</script>
