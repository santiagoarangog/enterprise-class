<script setup lang="ts">
  import loginRules from '@/components/auth/rules/loginRules'
  import type { AuthenticatePayloadContract } from '@/components/auth/@actions/authenticate'
  import { i18n } from '@/composables'
  import recoverPassword from '@/components/auth/@actions/recoverPassword'
  import routesConfig from '@/router/routesConfig'

  const form = ref()
  const model = ref({} as AuthenticatePayloadContract)
  const loading = ref(false)
  const sent = ref(false)
  const rules = ref(loginRules)

  const submit = () => {
    form.value.validate(async (valid: any) => {
      if (!valid) return
      loading.value = true
      const result = await recoverPassword(model.value.email)
      if (result) {
        sent.value = true
        model.value.email = ''
      }
      loading.value = false
    })
  }
</script>

<template>
  <div
    class="bg-white md:bg-[#095669] h-screen w-full flex justify-center items-center"
  >
    <div class="w-full bg-white text-[#033541] rounded-lg form-max-with z-10">
      <section class="px-6 pb-1 pt-12 text-center font-red-hat">
        <logo-vincu />
        <div class="text-2xl font-bold mt-8">
          {{ i18n.authentication.forgotPassword }}
        </div>

        <div class="text-[#033541] font-red-hat font-normal text-lg mt-4">
          {{ i18n.authentication.forgotPasswordMessage }}
        </div>
      </section>

      <section class="flex">
        <div
          class="text-base w-full bg-white rounded-lg form-max-with py-4 pb-16 px-6 md:px-12"
        >
          <el-form
            ref="form"
            :rules="rules"
            label-position="top"
            :model="model"
            class="flex-col mt-4"
            @submit.prevent="submit"
            scroll-to-error
          >
            <el-form-item :label="i18n.authentication.email" prop="email">
              <el-input type="email" v-model="model.email"></el-input>
            </el-form-item>

            <div class="mt-8 flex flex-col items-center justify-start">
              <el-button
                :loading="loading"
                @click="submit"
                class="bg-[#FFC915] text-[#033541] w-full"
                :disabled="sent"
              >
                {{ i18n.authentication.recoverPassword }}
              </el-button>

              <div
                v-if="sent"
                class="mt-6 mb-6 rounded border border-[#97E038] shadow-md shadow-[#00000029] text-sm p-4 text-vincu-primary w-[348px] flex gap-2"
              >
                <div>
                  <i class="fa-solid fa-circle-check text-lg text-[#97E038]" />
                </div>
                <div>
                  <b>{{ i18n.authentication.forgotPasswordSent.bold }} </b>
                  {{ i18n.authentication.forgotPasswordSent.normal }}
                </div>
              </div>

              <div class="text-center font-red-hat font-medium mt-6">
                <router-link :to="routesConfig.Login">
                  <i class="fa-light fa-arrow-left-long text-sm mr-1"></i>
                  {{ i18n.authentication.backToLogin }}
                </router-link>
              </div>
            </div>
          </el-form>
        </div>
      </section>
    </div>

    <div class="hidden md:flex">
      <div class="absolute left-0 bottom-0">
        <img src="@/assets/images/login/forma1.png" alt="forma1" />
      </div>

      <div class="absolute right-0 top-0">
        <img src="@/assets/images/login/forma2.png" alt="forma2" />
      </div>
    </div>
  </div>
</template>
