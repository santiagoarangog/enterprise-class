<script setup lang="ts">
  import { i18n } from '@/composables'
  import routesConfig from '@/router/routesConfig'
  import Store from '@/Store'

  const router = useRouter()
  const goToLogin = () => {
    router.push(routesConfig.Login)
  }

  Store().setIsNewUser()
</script>

<template>
  <div class="h-screen w-full flex justify-center items-center">
    <div
      class="w-full bg-transparent text-[#033541] rounded-lg vin-container font-red-hat flex flex-col md:flex-row justify-around px-5"
    >
      <section class="pt-5 md:mt-16">
        <div class="w-[102px] h-[36px] md:w-[138px] md:h-[48px]">
          <div class="text-sm font-medium">
            <a href="http://homevincu.talentu.co/empresas/">
              <img
                src="@/assets/images/Logosvg-01.svg"
                alt="logo"
                class="max-w-[138px] mx-auto"
              />
            </a>
          </div>
        </div>

        <div
          class="text-[32px] md:text-[34px] font-bold flex flex-col mt-10 md:mt-28 md:w-[80%] break-normal"
        >
          {{ i18n.accountVerifications.accountAlreadyVerified }}
        </div>
        <div class="mt-5 text-lg md:text-xl font-normal">
          {{ i18n.accountVerifications.accountAlreadyVerifiedMessage }}
        </div>

        <div class="mt-7 w-full md:w-[169px]">
          <el-button
            @click="goToLogin"
            class="bg-[#FFC915] text-[#033541] w-full"
          >
            {{ i18n.authentication.login }}
          </el-button>
        </div>
      </section>

      <section
        class="max-w-[361px] w-[361px] md:max-w-[550px] text-center md:w-[550px] flex justify-center items-center mt-5"
      >
        <img
          src="@/assets/images/Persona-pantalla-verificacionWEB.webp"
          alt="verified-account"
        />
      </section>
    </div>
  </div>
</template>
