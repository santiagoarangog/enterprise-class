<script setup lang="ts">
  import { i18n } from '@/composables'
  import router from '@/router'
  import type { ResetPasswordContract } from './@actions/resetPassword'
  import resetPassword from './@actions/resetPassword'
  import passwordChangeRules from './rules/passwordChangeRules'
  import routesConfig from '@/router/routesConfig'

  const form = ref()
  const model = ref({} as ResetPasswordContract)
  const loading = ref(false)
  const sent = ref(false)
  const visiblePopoverPassword = ref(false)
  const rules = reactive(passwordChangeRules)
  const isMounted = ref(false)

  const hasEightCharacters = computed(() => {
    if (!model.value.password || model.value.password.length === 0) return false
    return model.value.password?.length >= 8
  })

  const hasOneCapitalLetter = computed(() => {
    if (!model.value.password || model.value.password.length === 0) return false
    return /[A-Z]/.test(model.value.password)
  })

  const hasOneLowerLetter = computed(() => {
    if (!model.value.password || model.value.password.length === 0) return false
    return /[a-z]/.test(model.value.password)
  })

  const submit = () => {
    form.value.validate(async (valid: any) => {
      if (!valid) return

      loading.value = true
      const result = await resetPassword(model.value)
      if (result) router.push(routesConfig.Index)
    })
  }

  const loadRouteParams = () => {
    const { country, email, token, type } = useRoute().params
    model.value.email = email as string
    model.value.token = token as string
    model.value.type = type as string
  }

  onMounted(() => {
    const { password_confirm } = rules
    password_confirm.push({
      validator: (rule: any, value: any, callback: any) => {
        if (value === '') callback(new Error('Por favor ingrese la contraseña'))
        else if (value !== model.value.password)
          callback(new Error('¡Las contraseñas no coinciden!'))
        else callback()
      },
      trigger: 'change',
    } as never)
    isMounted.value = true
    loadRouteParams()
  })
</script>

<template>
  <div
    class="bg-white md:bg-[#095669] h-screen w-full flex justify-center items-center"
  >
    <div class="w-full bg-white text-[#033541] rounded-lg max-w-[406px] z-10">
      <section class="px-6 pb-1 pt-12 text-center font-red-hat">
        <logo-vincu />
        <div class="text-2xl font-bold mt-8">
          {{ i18n.authentication.recoverPassword }}
        </div>

        <div class="text-[#033541] font-red-hat font-normal text-lg mt-4">
          {{ i18n.authentication.changePassword }}
        </div>
      </section>

      <section class="flex">
        <div
          class="text-base w-full bg-white rounded-lg max-w-[406px] py-4 pb-16 px-6 md:px-12"
        >
          <el-form
            v-if="isMounted"
            ref="form"
            :rules="rules"
            label-position="top"
            :model="model"
            class="flex-col mt-4"
            @submit.prevent="submit"
            scroll-to-error
          >
            <el-form-item :label="i18n.authentication.email" prop="email">
              <el-input
                autocomplete="off"
                type="email"
                v-model="model.email"
              ></el-input>
            </el-form-item>

            <el-form-item :label="i18n.clientCreate.password" prop="password">
              <el-popover
                ref="passwordPopover"
                placement="bottom-start"
                width="200"
                trigger="click"
                :visible="visiblePopoverPassword"
              >
                <template #reference>
                  <el-input
                    v-model="model.password"
                    show-password
                    type="password"
                    @click="visiblePopoverPassword = true"
                    @blur="visiblePopoverPassword = false"
                    maxlength="50"
                    autocomplete="off"
                  />
                </template>

                <div class="p-2">
                  <div class="font-roboto font-bold text-xs mb-4 opacity-70">
                    Crea una contraseña que contenga:
                  </div>

                  <div class="flex flex-col gap-2">
                    <div class="flex gap-2">
                      <i
                        class="fa-solid fa-circle-check text-xs text-[#CED4D8]"
                        :class="{ 'text-[#6CDBA5]': hasEightCharacters }"
                      />
                      <span
                        class="text-xs"
                        :class="
                          hasEightCharacters ? 'password-good' : 'password-bad'
                        "
                      >
                        {{
                          i18n.clientCreate.passwordRequirements.minCharacters
                        }}
                      </span>
                    </div>

                    <div class="flex gap-2">
                      <i
                        class="fa-solid fa-circle-check text-xs text-[#CED4D8]"
                        :class="{ 'text-[#6CDBA5]': hasOneLowerLetter }"
                      />
                      <span
                        class="text-xs"
                        :class="
                          hasOneLowerLetter ? 'password-good' : 'password-bad'
                        "
                      >
                        {{ i18n.clientCreate.passwordRequirements.lowercase }}
                      </span>
                    </div>

                    <div class="flex gap-2">
                      <i
                        class="fa-solid fa-circle-check text-xs text-[#CED4D8]"
                        :class="{ 'text-[#6CDBA5]': hasOneCapitalLetter }"
                      />
                      <span
                        class="text-xs"
                        :class="
                          hasOneCapitalLetter ? 'password-good' : 'password-bad'
                        "
                      >
                        {{ i18n.clientCreate.passwordRequirements.uppercase }}
                      </span>
                    </div>
                  </div>
                </div>
              </el-popover>
            </el-form-item>

            <el-form-item
              :label="i18n.clientCreate.confirmPassword"
              prop="password_confirm"
            >
              <el-input
                autocomplete="off"
                v-model="model.password_confirm"
                show-password
                type="password"
                maxlength="50"
                @keyup.enter="submit"
              />
            </el-form-item>

            <div class="mt-8 flex flex-col items-center justify-start">
              <el-button
                :loading="loading"
                @click="submit"
                class="bg-[#FFC915] text-[#033541] w-full"
                :disabled="sent"
              >
                {{ i18n.authentication.savePasswordAndEnter }}
              </el-button>
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
