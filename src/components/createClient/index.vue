<script setup lang="ts">
  import useRules from './rules/clientCreateRules'
  import type { ClientInfoContract } from '@/entities/Client'
  import { i18n, useMobile } from '@/composables'
  import newClient from './actions/newClient'
  import { ElMessage } from 'element-plus'
  import getDiscoveredList from './actions/getDiscoveredList'
  import useClientStore from './store'
  import routesConfig from '@/router/routesConfig'
  import Store from '@/Store'
  import imageWoman from '@/assets/images/mujer_registro.webp'
  import imageMen from '@/assets/images/hombre_registro.webp'

  const rules = reactive(useRules)
  const form = ref()
  const passwordPopover = ref()
  const visiblePopoverPassword = ref(false)
  const model = ref({} as ClientInfoContract)
  const activeTab = ref('business')
  const terms = ref([])
  const hearAboutUsOptions = computed(() =>
    useClientStore().getDiscoveredListForSelect()
  )
  const isMobile = useMobile().isMobile
  const loading = ref(false)
  const isMounted = ref(false)
  const { getCountry } = Store()

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
      if (terms.value.length !== 2) {
        ElMessage.error(i18n.value.clientCreate.pleaseAcceptTermsAndConditions)
        return
      }

      loading.value = true
      await newClient(model.value)
      loading.value = false
    })
  }

  const goToTerms = () => {
    window.open('https://vincu.com/co/privacidad/', '_blank')
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
    getDiscoveredList()
  })
</script>

<template>
  <div class="text-[#033541]">
    <div class="vin-container">
      <section class="mb-11 pt-20">
        <div class="text-sm font-red-hat tracking-[2px]">
          {{ i18n.clientCreate.title }}
        </div>
        <div class="text-3xl md:text-4xl font-bold mt-4 font-red-hat">
          {{ i18n.clientCreate.bePartOf.text }}
          <span class="block md:inline">{{
            i18n.clientCreate.bePartOf.text2
          }}</span>
        </div>
      </section>
    </div>

    <section class="flex gap-2" :class="{ 'vin-container': !isMobile }">
      <el-tabs
        v-model="activeTab"
        class="text-base w-full bg-white md:rounded-lg"
        stretch
        type="border-card"
      >
        <el-tab-pane
            label="Soy candidato"
            name="candidate"
            class="vincu-form-paddings"
        >
          <div
              class="font-roboto w-full text-left md:text-left opacity-50 text-[13px] mb-4 leading-[18px]"
          >
            {{ i18n.clientCreate.requiredFieldsText }}
          </div>

          <el-form
              v-if="isMounted"
              ref="form"
              label-position="top"
              :model="model"
              :rules="rules"
              class="flex flex-col"
              scroll-to-error
          >
            <div class="flex flex-col md:flex-row md:gap-[30.99px]">
              <el-form-item
                  :label="i18n.clientCreate.firstName"
                  prop="first_name"
                  class="w-full"
              >
                <el-input
                    type="text"
                    v-model="model.first_name"
                    maxlength="70"
                />
              </el-form-item>

              <el-form-item
                  :label="i18n.clientCreate.lastName"
                  prop="last_name"
                  class="w-full"
              >
                <el-input
                    type="text"
                    v-model="model.last_name"
                    maxlength="70"
                />
              </el-form-item>
            </div>

            <div class="flex flex-col md:flex-row md:gap-[30.99px]">
              <el-form-item
                  class="w-full"
                  :label="i18n.clientCreate.email"
                  prop="email"
              >
                <el-input v-model="model.email" type="email" maxlength="100" />
              </el-form-item>

              <el-form-item
                  class="w-full"
                  :label="i18n.clientCreate.phone"
                  prop="phone"
              >
                <el-input v-model="model.phone" type="tel" maxlength="12">
                  <template #prefix>
                    <div class="flex gap-1 justify-center items-center">
                      <component :is="getCountry().icon" class="w-4" />
                      <span>{{ getCountry().code }}</span>
                    </div>
                  </template>
                </el-input>
              </el-form-item>
            </div>

            <div class="flex flex-col md:flex-row md:gap-[30.99px]">
              <el-form-item
                  :label="i18n.clientCreate.businessName"
                  prop="business_name"
                  class="w-full"
              >
                <el-input
                    type="text"
                    v-model="model.business_name"
                    maxlength="100"
                />
              </el-form-item>

              <el-form-item
                  :label="i18n.clientCreate.jobTitle"
                  prop="job_title"
                  class="w-full"
              >
                <el-input
                    type="text"
                    v-model="model.job_title"
                    maxlength="100"
                    autocomplete="off"
                />
              </el-form-item>
            </div>

            <div class="flex flex-col md:flex-row md:gap-[30.99px]">
              <el-form-item
                  class="w-full"
                  :label="i18n.clientCreate.password"
                  prop="password"
              >
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
                            hasEightCharacters
                              ? 'password-good'
                              : 'password-bad'
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
                            hasOneCapitalLetter
                              ? 'password-good'
                              : 'password-bad'
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
                  class="w-full"
              >
                <el-input
                    v-model="model.password_confirm"
                    show-password
                    type="password"
                    maxlength="50"
                    autocomplete="off"
                />
              </el-form-item>
            </div>

            <div class="flex flex-col md:flex-row md:gap-[30.99px]">
              <el-form-item
                  class="w-full"
                  :label="i18n.clientCreate.about"
                  prop="about_us"
              >
                <el-select class="w-full" v-model="model.about_us">
                  <el-option
                      v-for="item in hearAboutUsOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-form-item>

              <div class="w-full" />
            </div>

            <el-form-item class="md:col-span-2 md:w-[95%] mt-3">
              <el-checkbox-group v-model="terms">
                <el-checkbox label="term1" size="large">
                  {{ i18n.clientCreate.privacyPolicy.text }}
                  <div class="inline customA" @click="goToTerms">
                    {{ i18n.clientCreate.privacyPolicy.link }}
                  </div>
                </el-checkbox>

                <el-checkbox label="term2" class="mt-4 whitespace-normal">
                  {{ i18n.clientCreate.termsAndConditions.text }}

                  <div class="inline customA" @click="goToTerms">
                    {{ i18n.clientCreate.termsAndConditions.link }}
                  </div>
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <div
                class="mt-8 flex flex-col md:flex-row items-center justify-start"
            >
              <el-button
                  :loading="loading"
                  class="bg-[#FFC915] w-full md:w-auto"
                  @click="submit"
              >
                {{ i18n.clientCreate.buttonText }}
              </el-button>

              <div
                  class="text-center font-red-hat font-medium mt-6 md:mt-0 md:ml-10 flex"
              >
                {{ i18n.clientCreate.alreadyRegistered.text }}

                <router-link :to="routesConfig.Login">
                  <div class="ml-1">
                    {{ i18n.clientCreate.alreadyRegistered.link }}
                  </div>
                </router-link>
              </div>
            </div>
          </el-form>
        </el-tab-pane>

        <el-tab-pane
          label="Soy empresa"
          name="business"
          class="vincu-form-paddings"
        >
          <div
            class="font-roboto w-full text-left md:text-left opacity-50 text-[13px] mb-4 leading-[18px]"
          >
            {{ i18n.clientCreate.requiredFieldsText }}
          </div>

          <el-form
            v-if="isMounted"
            ref="form"
            label-position="top"
            :model="model"
            :rules="rules"
            class="flex flex-col"
            scroll-to-error
          >
            <div class="flex flex-col md:flex-row md:gap-[30.99px]">
              <el-form-item
                :label="i18n.clientCreate.firstName"
                prop="first_name"
                class="w-full"
              >
                <el-input
                  type="text"
                  v-model="model.first_name"
                  maxlength="70"
                />
              </el-form-item>

              <el-form-item
                :label="i18n.clientCreate.lastName"
                prop="last_name"
                class="w-full"
              >
                <el-input
                  type="text"
                  v-model="model.last_name"
                  maxlength="70"
                />
              </el-form-item>
            </div>

            <div class="flex flex-col md:flex-row md:gap-[30.99px]">
              <el-form-item
                class="w-full"
                :label="i18n.clientCreate.email"
                prop="email"
              >
                <el-input v-model="model.email" type="email" maxlength="100" />
              </el-form-item>

              <el-form-item
                class="w-full"
                :label="i18n.clientCreate.phone"
                prop="phone"
              >
                <el-input v-model="model.phone" type="tel" maxlength="12">
                  <template #prefix>
                    <div class="flex gap-1 justify-center items-center">
                      <component :is="getCountry().icon" class="w-4" />
                      <span>{{ getCountry().code }}</span>
                    </div>
                  </template>
                </el-input>
              </el-form-item>
            </div>

            <div class="flex flex-col md:flex-row md:gap-[30.99px]">
              <el-form-item
                :label="i18n.clientCreate.businessName"
                prop="business_name"
                class="w-full"
              >
                <el-input
                  type="text"
                  v-model="model.business_name"
                  maxlength="100"
                />
              </el-form-item>

              <el-form-item
                :label="i18n.clientCreate.jobTitle"
                prop="job_title"
                class="w-full"
              >
                <el-input
                  type="text"
                  v-model="model.job_title"
                  maxlength="100"
                  autocomplete="off"
                />
              </el-form-item>
            </div>

            <div class="flex flex-col md:flex-row md:gap-[30.99px]">
              <el-form-item
                class="w-full"
                :label="i18n.clientCreate.password"
                prop="password"
              >
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
                            hasEightCharacters
                              ? 'password-good'
                              : 'password-bad'
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
                            hasOneCapitalLetter
                              ? 'password-good'
                              : 'password-bad'
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
                class="w-full"
              >
                <el-input
                  v-model="model.password_confirm"
                  show-password
                  type="password"
                  maxlength="50"
                  autocomplete="off"
                />
              </el-form-item>
            </div>

            <div class="flex flex-col md:flex-row md:gap-[30.99px]">
              <el-form-item
                class="w-full"
                :label="i18n.clientCreate.about"
                prop="about_us"
              >
                <el-select class="w-full" v-model="model.about_us">
                  <el-option
                    v-for="item in hearAboutUsOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>

              <div class="w-full" />
            </div>

            <el-form-item class="md:col-span-2 md:w-[95%] mt-3">
              <el-checkbox-group v-model="terms">
                <el-checkbox label="term1" size="large">
                  {{ i18n.clientCreate.privacyPolicy.text }}
                  <div class="inline customA" @click="goToTerms">
                    {{ i18n.clientCreate.privacyPolicy.link }}
                  </div>
                </el-checkbox>

                <el-checkbox label="term2" class="mt-4 whitespace-normal">
                  {{ i18n.clientCreate.termsAndConditions.text }}

                  <div class="inline customA" @click="goToTerms">
                    {{ i18n.clientCreate.termsAndConditions.link }}
                  </div>
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <div
              class="mt-8 flex flex-col md:flex-row items-center justify-start"
            >
              <el-button
                :loading="loading"
                class="bg-[#FFC915] w-full md:w-auto"
                @click="submit"
              >
                {{ i18n.clientCreate.buttonText }}
              </el-button>

              <div
                class="text-center font-red-hat font-medium mt-6 md:mt-0 md:ml-10 flex"
              >
                {{ i18n.clientCreate.alreadyRegistered.text }}

                <router-link :to="routesConfig.Login">
                  <div class="ml-1">
                    {{ i18n.clientCreate.alreadyRegistered.link }}
                  </div>
                </router-link>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <div class="hidden lg:flex lg:rounded-lg max-w-[467px]">
        <img
          class="object-cover lg:rounded-lg"
          :src="activeTab === 'business' ? imageWoman : imageMen"
        />
      </div>
    </section>
  </div>
</template>

<style>
  .password-good {
    @apply opacity-70 font-medium;
  }

  .password-bad {
    @apply opacity-50 font-normal;
  }

  .customA {
    font-family: 'Roboto', sans-serif;
    @apply text-[14px] md:text-[15px] font-medium cursor-pointer hover:underline !important;
    color: #10a39c !important;
  }

  /* el-tab */
</style>
