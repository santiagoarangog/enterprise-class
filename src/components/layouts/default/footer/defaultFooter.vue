<script setup lang="ts">
  import Store from '@/Store'
  import { i18n } from '@/composables'

  const { getCountryHeader, setCountryHeader, getCountry } = Store()
  const country = ref(getCountryHeader())
</script>

<template>
  <footer class="w-full md:h-[254px] bg-[#033541] text-[#DEE8E4] pt-5">
    <div class="vin-container py-10">
      <div
        class="flex flex-col md:flex-row justify-center items-center gap-2 w-full"
      >
        <div
          class="flex w-full md:flex-row flex-col gap-2 justify-center items-center md:justify-start md:flex-1"
        >
          <LogoVincuWhite
            class="w-[145px] flex justify-center md:justify-start"
          />

          <div class="md:w-[182px] w-[90%]">
            <el-select
              class="selectedCountry"
              v-model="country"
              @change="setCountryHeader"
            >
              <template #prefix>
                <component :is="getCountry().icon" class="w-4" />
              </template>

              <el-option label="Colombia" value="co">
                <div class="flex gap-2 items-center justify-start">
                  <colombia class="w-4" />
                  Colombia
                </div>
              </el-option>

              <el-option label="Mexico" value="mx">
                <div class="flex gap-2 items-center justify-start">
                  <mexico class="w-4" />
                  Mexico
                </div>
              </el-option>
            </el-select>
          </div>
        </div>

        <div
          class="flex flex-col md:flex-row items-center gap-8 justify-end font-red-hat text-[15px] w-full md:flex-1 mt-5 links"
        >
          <span>{{ i18n.components.footer.link.contactUs }}</span>
          <span>{{ i18n.components.footer.link.privacyPolicy }}</span>
          <span>{{ i18n.components.footer.link.regulations }}</span>
          <span>{{ i18n.components.footer.link.fraudNotice }}</span>
        </div>
      </div>

      <div
        class="flex md:flex-row justify-center items-center text-center gap-2 w-full mt-10 flex-col-reverse"
      >
        <div class="flex w-full">
          <div
            class="font-roboto md:text-left text-center text-xs md:text-sm px-3 md:px-0"
          >
            <p>
              {{ i18n.components.footer.services }}
            </p>

            <p>
              {{ i18n.components.footer.authorized }}
            </p>
          </div>
        </div>

        <div
          class="flex justify-center md:justify-between font-red-hat w-full flex-1 text-2xl mb-5 md:mb-0 gap-8 icons"
        >
          <i class="fa-brands fa-facebook"></i>
          <i class="fa-brands fa-instagram"></i>
          <i class="fa-brands fa-linkedin"></i>
        </div>
      </div>
    </div>

    <div
      class="vin-container md:border-t flex flex-col justify-center items-center"
    >
      <div class="font-roboto text-[13px] text-center py-4">
        <span> {{ i18n.components.footer.copyRight }} </span>
      </div>
    </div>
  </footer>
</template>

<style>
  /* .el-input__wrapper */
  .selectedCountry .el-input__wrapper {
    background-color: #033541;
    color: #fff;
  }

  .selectedCountry .el-input__inner {
    color: white !important;
  }

  .selectedCountry .el-input__wrapper.is-focus {
    border-color: transparent !important;
    background-color: rgba(255, 255, 255, 0.1);
  }

  .links > span:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .icons > i:hover {
    cursor: pointer;
    opacity: 50%;
  }
</style>
