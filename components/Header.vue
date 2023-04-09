<template>
  <nav class="NavbarHeader">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-sm-5 col-5">
          <NuxtLink to="/" target="">
            <label class="LabelHead1" style="cursor: pointer">JOB - </label>
            <label class="LabelHead2" style="cursor: pointer">
              interesting
            </label>
          </NuxtLink>
        </div>
        <div class="col-lg-6 col-sm-7 col-7" style="text-align: right">
          <NuxtLink to="/resume" target="" style="color: transparent">
            <label class="LabelHeadsub"> resume </label>
          </NuxtLink>

          <NuxtLink to="/createjob" target="" style="color: transparent">
            <label class="LabelHeadsub"> create job </label>
          </NuxtLink>

          <NuxtLink to="/list" target="" style="color: transparent">
            <label class="LabelHeadsub"> list job</label>
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>
