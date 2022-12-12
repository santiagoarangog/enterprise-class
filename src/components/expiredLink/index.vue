<script setup lang="ts">
  import { i18n } from '@/composables'
  import emailGenerator, {
    type EmailGeneratorContract,
  } from '@/components/auth/@actions/emailGenerator'

  const route = useRoute()
  const sent = ref(false)
  const model = ref<EmailGeneratorContract>({
    token: '',
    type: '',
    country: '',
    email: '',
  })

  const submit = async () => {
    if (sent.value) {
      document.location.href = import.meta.env.VITE_APP_HOME_VINCU_EMPRESAS
      return
    }

    const response = await emailGenerator(model.value)
    if (response.status) sent.value = true
  }

  onMounted(() => {
    model.value = route.params as unknown as EmailGeneratorContract
  })
</script>

<template>
  <div class="h-screen w-full flex justify-center items-center">
    <div
      class="w-full bg-transparent text-[#033541] rounded-lg vin-container font-red-hat flex flex-col md:flex-row justify-around px-5"
    >
      <section class="pt-5 md:mt-16">
        <div class="w-[102px] h-[36px] md:w-[138px] md:h-[48px] flex">
          <LogoVincu :size="138" />
        </div>

        <div
          class="text-[32px] md:text-[34px] font-bold flex flex-col mt-10 md:mt-28 break-normal"
        >
          {{ i18n.infoPages.expiredLink.expiredLinkTitle }}
        </div>

        <div class="mt-5 text-lg md:text-xl font-normal">
          {{ i18n.infoPages.expiredLink.expiredLinkMessage }}
        </div>

        <div
          v-if="sent"
          class="my-10 rounded bg-white border border-[#97E038] shadow-md shadow-[#00000029] text-sm p-4 text-vincu-primary flex gap-2"
        >
          <div>
            <i class="fa-solid fa-circle-check text-lg text-[#97E038]" />
          </div>
          <div>
            <b>{{ i18n.infoPages.expiredLink.notification.title }} </b>
            <p>
              {{ i18n.infoPages.expiredLink.notification.message }}
              <b>{{ model.email }}</b>
            </p>
          </div>
        </div>

        <div class="mt-7 w-full md:w-[169px]">
          <el-button class="bg-[#FFC915] text-[#033541] w-full" @click="submit">
            {{
              sent ? 'Ir a vincu' : i18n.infoPages.expiredLink.expiredLinkButton
            }}
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
