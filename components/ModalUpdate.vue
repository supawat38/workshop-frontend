<template>
  <div v-if="showModal">
    <div
      class="modal"
      tabindex="-1"
      role="dialog"
      style="display: block; background: rgb(0 0 0 / 60%)"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header" style="padding: 10px 20px !important">
            <h5 class="modal-title h5closemodal">อัพเดทข้อมูล</h5>
            <span class="spanclosemodal" @click="hide">x</span>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group row">
                <label class="col-sm-4 col-form-label">ชื่อบริษัท</label>

                <input
                  style="display: none"
                  ref="oetIDJob"
                  v-model="itembyid.id"
                />

                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    disabled
                    v-model="itembyid.name"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-4 col-form-label">ตำแหน่ง</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    v-model="itembyid.position"
                    ref="oetPosition"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-4 col-form-label">URL</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    ref="oetURL"
                    v-model="itembyid.url"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-4 col-form-label">สถานที่ทำงาน</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    ref="oetLocation"
                    v-model="itembyid.location"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-4 col-form-label">เงินเดือน</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    ref="oetSalary"
                    v-model="itembyid.salary"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-4 col-form-label">รูปแบบการทำงาน</label>
                <div class="col-sm-8">
                  <div
                    class="form-check form-check-inline"
                    style="margin-top: 10px"
                  >
                    <input
                      class="form-check-input"
                      type="radio"
                      ref="oetType"
                      v-model="itembyid.type"
                      value="1"
                    />
                    <label class="form-check-label"> Work from home </label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      ref="oetType"
                      v-model="itembyid.type"
                      value="2"
                    />
                    <label class="form-check-label"> Hybrid </label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      ref="oetType"
                      v-model="itembyid.type"
                      value="3"
                    />
                    <label class="form-check-label"> Work at office </label>
                  </div>
                </div>
              </div>

              <div class="form-group row BoxReject">
                <div class="col-sm-12">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      ref="theCheckbox"
                      v-model="itembyid.job_reject"
                      @change="checkbox_reject(this)"
                      :checked="itembyid.job_reject == true"
                    />
                    <label class="form-check-label">ไม่ผ่านการสัมภาษณ์</label>
                  </div>
                  <div class="col-sm-12" style="margin-top: 10px">
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      ref="oetRejectbecause"
                      :disabled="itembyid.job_reject == false"
                      v-model="itembyid.remark"
                      placeholder="กรุณาระบุเหตุผล"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary btnclosemodal"
              @click="updateJOB()"
            >
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--popup waring-->
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div
      ref="toastLiveExample"
      id="liveToast"
      class="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <strong class="me-auto">แจ้งเตือน</strong>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body">{{ msgwaring }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      msgwaring: "",
      keepremark: "",
    };
  },
  props: ["itembyid"],
  mounted() {},
  watch: {},
  methods: {
    show() {
      this.showModal = true;
    },
    hide() {
      this.showModal = false;
    },
    checkbox_reject(e) {
      //ปิด input
      if (this.$refs.theCheckbox.checked == false) {
        //เก็บค่าของเก่าไว้
        this.keepremark = this.itembyid.remark;
        this.itembyid.remark = "";
      } else {
        this.itembyid.remark = this.keepremark;
      }
    },
    AlertWaring(msg) {
      this.msgwaring = msg;
      const toastBootstrap = new bootstrap.Toast(this.$refs.toastLiveExample);
      toastBootstrap.show();
    },
    async updateJOB() {
      //DATA
      const data = {
        Id: parseInt(this.$refs.oetIDJob.value),
        Position: this.$refs.oetPosition.value,
        Url: this.$refs.oetURL.value,
        Location: this.$refs.oetLocation.value,
        Salary: this.$refs.oetSalary.value,
        Type: this.itembyid.type.toString(),
        Job_reject: this.$refs.theCheckbox.checked,
        Remark: this.$refs.oetRejectbecause.value,
      };

      (async () => {
        const rawResponse = await fetch(
          "http://127.0.0.1:5100/api/v2/updatejob",
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

        //ปิด modal
        this.showModal = false;

        if (content.code != 200) {
          var msgwaring = content.msg.th;
          this.AlertWaring(msgwaring);
        } else {
          await navigateTo("/list");

          var msgwaring = "แก้ไขข้อมูลสำเร็จ";
          this.AlertWaring(msgwaring);

          setTimeout(() => {
            this.msgwaring = "แก้ไขข้อมูลสำเร็จ";
          }, 1000);
        }
      })();
    },
  },
};
</script>
