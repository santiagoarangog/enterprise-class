<script setup lang="ts">
  import getPlans from '../../actions/http/getPlans'
  import useSummaryFormStore from '@/components/summaryView/store'
  import { i18n, toMoney, useMobile } from '@/composables'
  import type { IOfferPlan } from '../../contracts/IPLans'

  const isMobile = useMobile().isMobile
  const summaryStore = useSummaryFormStore()
  const getPlanList = computed(() => summaryStore.getPlans())
  const planSelected = ref(0)
  const carousel = ref()
  const offerSelected = ref<IOfferPlan>()

  onMounted(async () => {
    await getPlans()

    const planWithOffer = getPlanList.value
      .filter((item) => item.offer !== null)
      .map((item) => item.offer)[0]

    if (planWithOffer) offerSelected.value = planWithOffer[0]
    carousel.value?.setActiveItem(0)
  })
</script>

<template>
  <div class="w-full h-full overflow-auto">
    <section
      id="header"
      class="bg-[#095669] lg:absolute top-0 left-0 right-0 overflow-hidden h-[150px] md:h-[125px] lg:h-[220px]"
    >
      <div class="flex items-center justify-center w-full h-full px-5 md:px-10">
        <div
          class="flex items-center justify-center w-full h-full px-5 md:px-10"
        >
          <div class="max-w-[747px] w-full h-full">
            <section
              class="flex flex-col items-center justify-center w-full mt-5 lg:mt-12 text-center text-white font-red-hat title"
            >
              <h1 class="text-[32px] md:text-[38px] font-bold">
                {{ i18n.summaryForm.plans.title }}
              </h1>

              <p class="text-[20px] mt-3 font-normal">
                {{ i18n.summaryForm.plans.subtitle }}
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>

    <section
      ref="content"
      name="content"
      class="lg:absolute top-[150px] md:top-[125px] lg:top-[220px] bottom-[76px] left-0 right-0 overflow-auto pb-8 bg-[#095669]"
    >
      <div class="flex items-center justify-center pb-10">
        <div class="w-full h-full">
          <div v-if="isMobile">
            <el-carousel
              class="mt-5"
              :autoplay="true"
              :interval="50000"
              height="550px"
              :initial-index="1"
              trigger="click"
              ref="carousel"
              type="card"
              arrow="always"
            >
              <el-carousel-item
                v-for="(item, index) in getPlanList"
                :key="index"
                class="flex justify-center items-center"
              >
                <div
                  class="py-10 px-6 bg-white rounded-lg m-auto w-full text-vincu-primary"
                >
                  <section class="font-red-hat h-28">
                    <div class="text-2xl font-medium">{{ item.header }}</div>
                    <div class="text-lg font-normal">
                      {{ item.description }}
                    </div>

                    <div v-if="item.offer" class="text-lg mt-3">
                      <div
                        class="text-sm flex gap-5 justify-between font-normal font-roboto text-sm font-normal"
                      >
                        <div
                          class="flex-1"
                          v-for="(offer, i2) in item.offer"
                          :key="i2"
                        >
                          <div
                            :class="
                              planSelected === i2
                                ? 'border-[#89D8A9] bg-[#89D8A940]'
                                : 'bg-transparent'
                            "
                            class="flex gap-2 border justify-center p-2 rounded-lg"
                          >
                            <el-radio-group v-model="planSelected">
                              <el-radio
                                @click="offerSelected = offer"
                                :label="i2"
                                :key="i2"
                                :id="`opt${i2}`"
                                >{{ offer.quantity }} Oferta{{
                                  offer.quantity > 1 ? 's' : ''
                                }}</el-radio
                              >
                            </el-radio-group>
                          </div>

                          <div
                            v-if="offer.discount > 0"
                            class="text-xs text-[#10A39C] font-medium text-center"
                          >
                            <label
                              >{{ offer.discount }}%
                              {{ i18n.summaryForm.plans.discount }}</label
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section class="mt-6">
                    <div v-if="item.offer === null">
                      <div
                        v-if="item.cost !== null"
                        class="text-xs font-red-hat"
                      >
                        <span class="text-[28px] font-medium mr-2 font-bold">{{
                          toMoney(item.cost)
                        }}</span
                        >/ {{ i18n.summaryForm.plans.month }}
                      </div>

                      <div v-else class="text-xs font-red-hat">
                        <span class="text-[28px] font-medium mr-2 font-bold">
                          {{ i18n.summaryForm.plans.letTalk }}
                        </span>
                      </div>
                    </div>

                    <div v-else>
                      <div
                        v-if="offerSelected?.cost != null"
                        class="text-xs font-red-hat"
                      >
                        <span class="text-[28px] font-medium mr-2 font-bold">{{
                          toMoney(offerSelected.cost)
                        }}</span
                        >/ {{ i18n.summaryForm.plans.month }}
                      </div>

                      <div v-else class="text-xs font-red-hat">
                        <span class="text-[28px] font-medium mr-2 font-bold">
                          {{ i18n.summaryForm.plans.letTalk }}
                        </span>
                      </div>
                    </div>

                    <div class="mt-3">
                      <el-button class="bg-vincu-yellow-primary w-full">
                        {{ item.button }}
                      </el-button>
                    </div>
                  </section>

                  <section class="mt-10">
                    <div class="text-[15px] font-red-hat text-[#095669]">
                      {{ i18n.summaryForm.plans.thisPlanIncludes }}
                    </div>

                    <div
                      v-if="item.include.length > 0"
                      class="mt-3 font-roboto"
                    >
                      <ul class="text-sm flex flex-col gap-2">
                        <li
                          class="flex gap-2 text-[14px] items-center"
                          v-for="(include, i3) in item.include"
                          :key="i3"
                        >
                          <i
                            class="fa-solid fa-circle-check text-[#CED4D8]"
                            :class="{ 'text-[#6CDBA5]': include.checked }"
                          />
                          <span>{{ include.description }}</span>
                        </li>
                      </ul>
                    </div>
                  </section>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>

          <section v-else class="w-full h-full mt-5">
            <div class="flex items-center justify-center py-3">
              <div
                class="w-full h-full flex flex-col md:flex-row gap-5 justify-center items-center"
              >
                <div
                  v-for="(item, i) in getPlanList"
                  :key="i"
                  class="flex gap-10 p-2 justify-center items-center"
                >
                  <div
                    class="py-10 px-6 bg-white rounded-lg w-[328px] h-[513px] text-vincu-primary"
                  >
                    <section class="font-red-hat h-28">
                      <div class="text-2xl font-medium">{{ item.header }}</div>
                      <div class="text-lg font-normal">
                        {{ item.description }}
                      </div>

                      <div v-if="item.offer" class="text-lg mt-3">
                        <div
                          class="text-sm flex gap-5 justify-between font-normal font-roboto text-sm font-normal"
                        >
                          <div
                            class="flex-1"
                            v-for="(offer, i2) in item.offer"
                            :key="i2"
                          >
                            <div
                              :class="
                                planSelected === i2
                                  ? 'border-[#89D8A9] bg-[#89D8A940]'
                                  : 'bg-transparent'
                              "
                              class="flex gap-2 border justify-center p-2 rounded-lg"
                            >
                              <el-radio-group v-model="planSelected">
                                <el-radio
                                  @click="offerSelected = offer"
                                  :label="i2"
                                  :key="i2"
                                  :id="`opt${i2}`"
                                  >{{ offer.quantity }} Oferta{{
                                    offer.quantity > 1 ? 's' : ''
                                  }}</el-radio
                                >
                              </el-radio-group>
                            </div>

                            <div
                              v-if="offer.discount > 0"
                              class="text-xs text-[#10A39C] font-medium text-center"
                            >
                              <label
                                >{{ offer.discount }}%
                                {{ i18n.summaryForm.plans.discount }}</label
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section class="mt-6">
                      <div v-if="item.offer === null">
                        <div
                          v-if="item.cost !== null"
                          class="text-xs font-red-hat"
                        >
                          <span
                            class="text-[28px] font-medium mr-2 font-bold"
                            >{{ toMoney(item.cost) }}</span
                          >/ {{ i18n.summaryForm.plans.month }}
                        </div>

                        <div v-else class="text-xs font-red-hat">
                          <span class="text-[28px] font-medium mr-2 font-bold">
                            {{ i18n.summaryForm.plans.letTalk }}
                          </span>
                        </div>
                      </div>

                      <div v-else>
                        <div
                          v-if="offerSelected?.cost != null"
                          class="text-xs font-red-hat"
                        >
                          <span
                            class="text-[28px] font-medium mr-2 font-bold"
                            >{{ toMoney(offerSelected.cost) }}</span
                          >/ {{ i18n.summaryForm.plans.month }}
                        </div>

                        <div v-else class="text-xs font-red-hat">
                          <span class="text-[28px] font-medium mr-2 font-bold">
                            {{ i18n.summaryForm.plans.letTalk }}
                          </span>
                        </div>
                      </div>

                      <div class="mt-3">
                        <el-button class="bg-vincu-yellow-primary w-full">
                          {{ item.button }}
                        </el-button>
                      </div>
                    </section>

                    <section class="mt-10">
                      <div class="text-[15px] font-red-hat text-[#095669]">
                        {{ i18n.summaryForm.plans.thisPlanIncludes }}
                      </div>

                      <div
                        v-if="item.include.length > 0"
                        class="mt-3 font-roboto"
                      >
                        <ul class="text-sm flex flex-col gap-2">
                          <li
                            class="flex gap-2 text-[14px] items-center"
                            v-for="(include, i3) in item.include"
                            :key="i3"
                          >
                            <i
                              class="fa-solid fa-circle-check text-[#CED4D8]"
                              :class="{ 'text-[#6CDBA5]': include.checked }"
                            />
                            <span>{{ include.description }}</span>
                          </li>
                        </ul>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
  .el-carousel {
  }

  .el-carousel__item--card {
    width: 80%;
    @apply shadow-lg m-auto !important;
  }

  /* el-carousel__item is-active  */
  .el-carousel__item--card {
    @apply opacity-40 !important;
  }

  .el-carousel__item--card.is-active {
    transform: translateX(40.5px) scale(1) !important;
    @apply shadow-2xl opacity-100 !important;
  }

  /* en tablet */
  @media (min-width: 768px) {
    .el-carousel__item--card {
      width: 50%;
      @apply shadow-lg m-auto !important;
    }

    /* el-carousel__item is-active  */
    .el-carousel__item--card {
      @apply opacity-40 !important;
    }

    .el-carousel__item--card.is-active {
      transform: translateX(45%) scale(1) !important;
      @apply shadow-2xl opacity-100 !important;
    }
  }

  .el-carousel__arrow--right {
    @apply bg-[#e3efea] text-[#77e0a2] shadow-lg !important;
  }

  .el-carousel__arrow--left {
    @apply bg-[#e3efea] text-[#77e0a2] shadow-lg !important;
  }
</style>
