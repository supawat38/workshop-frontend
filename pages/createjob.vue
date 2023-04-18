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
          :src="useImage('/img6.jpg')"
          style="height: 630px; width: 100%; object-fit: cover"
        />
      </div>
      <div class="col-lg-4 d-sm-block d-lg-none" style="padding: 0px">
        <img
          class="card-img-top img-responsive"
          :src="useImage('/img6.jpg')"
          style="height: 250px; width: 100%; object-fit: cover"
        />
      </div>
      <div class="col-lg-8" style="margin-top: 20px">
        <form class="fromCreateJob">
          <h4
            class="titleform"
            style="
              border-left: 4px solid rgb(250, 168, 25);
              margin-bottom: 20px;
            "
          >
            ระบุข้อมูล
          </h4>
          <hr />
          <div class="form-group">
            <label>* ชื่อบริษัท</label>
            <input
              formcontrolname="oetNameJob"
              type="text"
              class="form-control"
              id="oetNameJob"
              v-model="oetNameJob"
              :class="invalidoetNameJob ? 'inputinvalid' : ''"
              placeholder="กรุณาระบุชื่อบริษัท"
            />
          </div>

          <div class="form-group">
            <label>ตำแหน่ง</label>
            <input
              type="text"
              class="form-control"
              id="oetPosition"
              v-model="oetPosition"
              placeholder="กรุณาระบุตำแหน่ง"
            />
          </div>

          <div class="form-group">
            <label>URL (รายละเอียด)</label>
            <input
              type="text"
              class="form-control"
              id="oetURL"
              v-model="oetURL"
              placeholder="กรุณาระบุ URL"
            />
          </div>

          <div class="form-group">
            <label>สถานที่ทำงาน</label>
            <input
              type="text"
              class="form-control"
              id="oetLocation"
              v-model="oetLocation"
              placeholder="กรุณาระบุสถานที่ทำงาน"
            />
          </div>

          <div class="form-group">
            <label>เงินเดือน</label>
            <input
              type="text"
              class="form-control"
              id="oetSalary"
              v-model="oetSalary"
              placeholder="กรุณาระบุเงินเดือน"
            />
          </div>

          <div class="form-group">
            <label>รูปแบบการทำงาน</label><br />
            <div class="form-check form-check-inline" style="margin-top: 10px">
              <input
                class="form-check-input"
                type="radio"
                name="oetType"
                v-model="oetType"
                value="1"
                checked
              />
              <label class="form-check-label"> Work from home </label>
            </div>

            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="oetType"
                v-model="oetType"
                value="2"
              />
              <label class="form-check-label"> Hybrid </label>
            </div>

            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="oetType"
                v-model="oetType"
                value="3"
              />
              <label class="form-check-label"> Work at office </label>
            </div>

            <div class="form-check" style="margin-top: 10px">
              <input
                type="checkbox"
                class="form-check-input"
                name="oetApply"
                v-model="oetApply"
                id="oetApply"
              />
              <label class="form-check-label">สมัครแล้ว</label>
            </div>
          </div>

          <hr />

          <div style="float: right; margin-bottom: 15px">
            <input
              class="btn btn-light btninform"
              type="reset"
              @click="ResetForm()"
              value="ล้างข้อมูล"
            />
            <input
              class="btn btn-primary btninform"
              @click="createJOB()"
              value="ยืนยันข้อมูล"
            />
          </div>
        </form>
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
  </div>
</template>

<script>
export default {
  name: "createJOB",
  data() {
    return {
      oetNameJob: "",
      oetPosition: "",
      oetURL: "",
      oetLocation: "",
      oetSalary: "",
      oetType: 1,
      oetApply: true,
      msgwaring: "",
      invalidoetNameJob: false,
    };
  },
  mounted() {},
  methods: {
    async createJOB() {
      if (this.oetNameJob == "") {
        this.invalidoetNameJob = true;
      } else {
        //DATA
        const data = {
          Name: this.oetNameJob,
          Position: this.oetPosition,
          Url: this.oetURL,
          Location: this.oetLocation,
          Salary: this.oetSalary,
          Type: parseInt(this.oetType),
          Apply: this.oetApply,
        };

        (async () => {
          const rawResponse = await fetch(
            "http://127.0.0.1:5100/api/v2/createjob",
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
          if (content.code != 200) {
            var msgwaring = content.msg.th;
            this.AlertWaring(msgwaring);
          } else {
            var msgwaring = "เพิ่มข้อมูลสำเร็จ";
            this.AlertWaring(msgwaring);

            setTimeout(() => {
              Object.assign(this.$data, this.$options.data.call());
              this.msgwaring = "เพิ่มข้อมูลสำเร็จ";
            }, 1000);
          }
        })();
      }
    },
    ResetForm() {
      this.oetType = 1;
      this.oetNameJob = "";
      this.oetApply = true;
    },
    AlertWaring(msg) {
      this.msgwaring = msg;
      const toastBootstrap = new bootstrap.Toast(this.$refs.toastLiveExample);
      toastBootstrap.show();
    },
  },
  watch: {
    oetNameJob() {
      if (this.oetNameJob) {
        this.invalidoetNameJob = false;
      } else {
        this.invalidoetNameJob = true;
      }
    },
  },
};
</script>
