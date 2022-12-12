<script setup lang="ts">
  import loginRules from './rules/loginRules'
  import type { AuthenticatePayloadContract } from './@actions/authenticate'
  import { i18n } from '@/composables'
  import authenticate from './@actions/authenticate'
  import routesConfig from '@/router/routesConfig'

  const form = ref()
  const activeName = ref('business')
  const model = ref({} as AuthenticatePayloadContract)
  const loading = ref(false)
  const router = useRouter()
  const errorMessage = ref()

  const submit = (option: any) => {
    form.value.validate(async (valid: any) => {
      if (!valid) return
      loading.value = true
      const { status, message } = await authenticate(model.value)
      if (status)
        if (option === 'candidate') await router.push(routesConfig.MyCurriculum)
        else await router.push(routesConfig.Index)
      else {
        errorMessage.value = message

        setTimeout(() => {
          errorMessage.value = ''
        }, 5000)
      }
      loading.value = false
    })
  }
</script>

<template>
  <div
    class="bg-white md:bg-[#095669] h-screen w-full flex justify-center items-center"
  >
    <div class="w-full bg-white text-[#033541] rounded-lg w-[406px] z-10">
      <section class="px-6 pb-1 pt-12 text-center font-red-hat">
        <logo-vincu class="w-full flex items-center justify-center" />
        <div class="text-2xl font-bold mt-8">
          {{ i18n.authentication.login }}
        </div>
      </section>

      <section class="flex mt-5">
        <el-tabs
          v-model="activeName"
          class="text-base w-full bg-white rounded-lg"
          stretch
          type="border-card"
        >
          <el-tab-pane label="Soy candidato" name="candidate">
            <el-form
              ref="form"
              :rules="loginRules"
              label-position="top"
              :model="model"
              class="flex-col mt-4 vincu-form-paddings"
              scroll-to-error
            >
              <el-form-item :label="i18n.authentication.email" prop="email">
                <el-input type="email" v-model="model.email"></el-input>
              </el-form-item>

              <el-form-item
                :label="i18n.authentication.password"
                prop="password"
              >
                <el-input
                  show-password
                  type="password"
                  v-model="model.password"
                  @keydown.enter="submit"
                >
                </el-input>
              </el-form-item>

              <div
                class="text-xs font-roboto font-normal text-[#D92F58] text-center"
                v-if="errorMessage"
              >
                <span v-html="errorMessage"></span>
              </div>

              <div class="mt-8 flex flex-col items-center justify-start">
                <el-button
                  :loading="loading"
                  @click="submit('candidate')"
                  class="bg-[#FFC915] text-[#033541] w-full"
                >
                  {{ i18n.authentication.login }}
                </el-button>

                <div class="text-center font-red-hat font-medium mt-6">
                  <router-link :to="routesConfig.ResetPassword">
                    {{ i18n.authentication.forgotPassword }}
                  </router-link>
                </div>

                <div class="text-center font-red-hat font-medium mt-4">
                  <router-link :to="routesConfig.Client">
                    ¿No tienes una cuenta? Registrate
                  </router-link>
                </div>
              </div>
            </el-form>
          </el-tab-pane>

          <el-tab-pane
            label="Soy empresa"
            name="business"
            class="vinu-form-padings"
          >
            <el-form
              ref="form"
              :rules="loginRules"
              label-position="top"
              :model="model"
              class="flex-col mt-4 vincu-form-paddings"
              scroll-to-error
            >
              <el-form-item :label="i18n.authentication.email" prop="email">
                <el-input type="email" v-model="model.email"></el-input>
              </el-form-item>

              <el-form-item
                :label="i18n.authentication.password"
                prop="password"
              >
                <el-input
                  show-password
                  type="password"
                  v-model="model.password"
                  @keydown.enter="submit"
                >
                </el-input>
              </el-form-item>

              <div
                class="text-xs font-roboto font-normal text-[#D92F58] text-center"
                v-if="errorMessage"
              >
                <span v-html="errorMessage"></span>
              </div>

              <div class="mt-8 flex flex-col items-center justify-start">
                <el-button
                  :loading="loading"
                  @click="submit('entrepreneur')"
                  class="bg-[#FFC915] text-[#033541] w-full"
                >
                  {{ i18n.authentication.login }}
                </el-button>

                <div class="text-center font-red-hat font-medium mt-6">
                  <router-link :to="routesConfig.ResetPassword">
                    {{ i18n.authentication.forgotPassword }}
                  </router-link>
                </div>

                <div class="text-center font-red-hat font-medium mt-4">
                  <router-link :to="routesConfig.Client">
                    ¿No tienes una cuenta? Registrate
                  </router-link>
                </div>
              </div>
            </el-form>
          </el-tab-pane>
        </el-tabs>
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
