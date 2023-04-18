<template>
  <ModalUpdate ref="modal" :itembyid="keep_databyid"></ModalUpdate>

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
      <div class="col-lg-12" style="padding: 0px">
        <img
          class="card-img-top img-responsive"
          :src="useImage('/img9.jpg')"
          style="
            height: 250px;
            width: 100%;
            object-fit: cover;
            object-position: center;
          "
        />
      </div>
      <div class="col-lg-12" style="margin-top: 20px">
        <form>
          <h4
            class="titleform"
            style="
              border-left: 4px solid rgb(250, 168, 25);
              margin-bottom: 20px;
            "
          >
            รายการข้อมูล
          </h4>
          <hr />
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">ลำดับ</th>
                <th scope="col">สถานะงาน</th>
                <th scope="col">ชื่อบริษัท</th>
                <th scope="col">ตำแหน่ง</th>
                <th scope="col">URL</th>
                <th scope="col">สถานที่ทำงาน</th>
                <th scope="col">เงินเดือน</th>
                <th scope="col">รูปแบบการทำงาน</th>
                <th scope="col">วันที่สมัคร</th>
                <th scope="col">แก้ไข / ลบ</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(items, key) in store.$state.ResultAPI">
                <tr>
                  <th>{{ key + 1 }}</th>

                  <td v-if="items.job_reject === false">
                    <Icon class="iconwait" name="uim:process" />
                    รอ
                  </td>
                  <td v-else>
                    <Icon class="iconreject" name="mdi:close-circle-outline" />
                    ไม่ผ่าน
                  </td>
                  <td>{{ items.name }}</td>
                  <td>{{ items.position ? items.position : "-" }}</td>
                  <td>{{ items.url ? items.url : "-" }}</td>
                  <td>{{ items.location ? items.location : "-" }}</td>
                  <td>{{ items.salary ? items.salary : "-" }}</td>
                  <td>{{ showtexttypejob(items.type) }}</td>
                  <td>
                    {{ moment(items.created_at).format("DD/MM/YYYY HH:mm") }}
                  </td>
                  <td>
                    <Icon
                      class="iconedit"
                      @click="EventUpdateJob(items)"
                      name="material-symbols:edit-square-outline-sharp"
                    />
                    |
                    <Icon
                      class="icondelete"
                      @click="KeepID(items.id)"
                      data-bs-toggle="modal"
                      data-bs-target="#ModalWaringDelete"
                      name="material-symbols:delete-outline"
                    />
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="ModalWaringDelete"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">แจ้งเตือน</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">ยืนยันที่จะลบข้อมูลหรือไม่ ?</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="EventDeleteJob()"
          >
            ยืนยัน
          </button>
        </div>
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

<script>
export default {
  name: "default",
  data() {
    return {
      id: null,
      keep_databyid: null,
    };
  },
  methods: {
    EventUpdateJob(items) {
      this.$refs.modal.show();
      this.keep_databyid = items;
    },
    KeepID(id) {
      this.id = id;
    },
    EventDeleteJob() {
      const data = {
        Id: parseInt(this.id),
      };

      (async () => {
        const rawResponse = await fetch(
          "http://127.0.0.1:5100/api/v2/deletejob",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        ).catch((err) => {
          var msgwaring = "กรุณาลองใหม่อีกครั้ง";
          this.AlertWaring(msgwaring);
          return;
        });

        const content = await rawResponse.json();
        console.log(content);
        // if (content.code != 200) {
        //   var msgwaring = content.msg.th;
        //   this.AlertWaring(msgwaring);
        // } else {
        //   var msgwaring = "ลบช้อมูลสำเร็จ";
        //   this.AlertWaring(msgwaring);

        //   setTimeout(() => {
        //     Object.assign(this.$data, this.$options.data.call());
        //     this.msgwaring = "ลบช้อมูลสำเร็จ";
        //   }, 1000);
        // }
      })();
    },
  },
};
</script>
