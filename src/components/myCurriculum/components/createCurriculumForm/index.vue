<script setup lang="ts">
import { i18n } from '@/composables'
import { ElCollapse, ElCollapseItem } from 'element-plus'
import useScrollCollapse from './actions/scrollCollapse'
import useOfferInfoStore from './components/personalInfo/store'
import { EOfferInfoForm } from './components/personalInfo/store'

const t = i18n.value.myOffers
const { getCurrentForm, setCurrentForm, getGeneralInfoStatus } =
    useOfferInfoStore()

const activeName = computed({
  get: () => getCurrentForm(),
  set: (value: EOfferInfoForm) => {
    setCurrentForm(value)
  },
})

const isMounted = ref(true)
const isGeneralInfoValid = computed(() => getGeneralInfoStatus())

useScrollCollapse(activeName)
</script>

<template>
  <el-collapse
      v-model="activeName"
      accordion
      class="w-full lg:w-[747px] py-6 pb-20 px-2 lg:px-6"
      v-if="isMounted"
  >
    <el-collapse-item
        :name="EOfferInfoForm.generalInfo"
        class="w-full"
    >
      <template #title>
        <div class="flex justify-between mb-1 lg:text-[20px]">
          <div class="mr-2 lg:mr-5 text-[#6CDBA5]">
            <i class="fa-solid fa-address-card"></i>
          </div>
            Datos personales
          <div class="pl-10 w-35 h-15">
            <span class="bg-[#6CDBA5] text-black text-xs rounded-full w-full p-1">Sin Completar</span>
          </div>
        </div>
      </template>

      <general-info-offer-form />

    </el-collapse-item>

    <el-collapse-item
        :disabled="!isGeneralInfoValid"
        accordion
        class="w-full"
        :name="EOfferInfoForm.otherRequeriments"
    >
      <template #title>
        <div class="flex justify-between mb-1 text-[15px] lg:text-[20px]">
          <div class="mr-2 lg:mr-5 text-[#6CDBA5]">
            <i class="fa-solid fa-business-time"></i>
          </div>
          Experiencia Laboral
          <div class="pl-10 w-35 h-15">
            <span class="bg-[#6CDBA5] text-black text-xs rounded-full w-full p-1">Sin completar</span>
          </div>
        </div>
      </template>

      <other-requeriments />

    </el-collapse-item>

    <el-collapse-item
        :disabled="!isGeneralInfoValid"
        accordion
        class="w-full"
        :name="EOfferInfoForm.otherRequeriments"
    >
      <template #title>
        <div class="flex justify-between mb-1 text-[15px] lg:text-[20px]">
          <div class="mr-2 lg:mr-5 text-[#6CDBA5]">
            <i class="fa-solid fa-graduation-cap"></i>
          </div>
          Estudios e idiomas
          <div class="pl-10 w-35 h-15">
            <span class="bg-[#6CDBA5] text-black text-xs rounded-full w-full p-1">Sin completar</span>
          </div>
        </div>
      </template>

      <other-requeriments />

    </el-collapse-item>

    <el-collapse-item
        :disabled="!isGeneralInfoValid"
        accordion
        class="w-full"
        :name="EOfferInfoForm.otherRequeriments"
    >
      <template #title>
        <div class="flex justify-between mb-1 text-[14.5px] lg:text-[20px]">
          <div class="mr-2 lg:mr-5 text-[#6CDBA5]">
            <i class="fa-solid fa-puzzle"></i>
          </div>
          Otros conocimientos
          <div class="pl-10 w-35 h-15">
            <span class="bg-[#6CDBA5] text-black text-xs rounded-full w-full p-1">Sin completar</span>
          </div>
        </div>
      </template>

      <other-requeriments />

    </el-collapse-item>

    <el-collapse-item
        :disabled="!isGeneralInfoValid"
        accordion
        class="w-full"
        :name="EOfferInfoForm.otherRequeriments"
    >
      <template #title>
        <div class="flex justify-between mb-1 text-[15px] lg:text-[20px]">
          <div class="mr-2 lg:mr-5 text-[#6CDBA5]">
            <i class="fa-solid fa-address-book"></i>
          </div>
          Referencias
          <div class="pl-10 w-35 h-15">
            <span class="bg-[#6CDBA5] text-black text-xs rounded-full w-full p-1">Sin completar</span>
          </div>
        </div>
      </template>

      <other-requeriments />

    </el-collapse-item>

    <el-collapse-item
        :disabled="!isGeneralInfoValid"
        accordion
        class="w-full"
        :name="EOfferInfoForm.otherRequeriments"
    >
      <template #title>
        <div class="flex justify-between mb-1 text-[15px] lg:text-[20px]">
          <div class="mr-2 lg:mr-5 text-[#6CDBA5]">
            <i class="fa-solid fa-hand-holding-dollar"></i>
          </div>
          Aspiración salarial
          <div class="pl-10 w-35 h-15">
            <span class="bg-[#6CDBA5] text-black text-xs rounded-full w-full p-1">Sin completar</span>
          </div>
        </div>
      </template>

      <other-requeriments />

    </el-collapse-item>

    <el-collapse-item
        :disabled="!isGeneralInfoValid"
        accordion
        class="w-full"
        :name="EOfferInfoForm.otherRequeriments"
    >
      <template #title>
        <div class="flex justify-between mb-1 text-[12.4px] lg:text-[20px]">
          <div class="mr-2 lg:mr-5 text-[#6CDBA5]">
            <i class="fa-solid fa-folder-open"></i>
          </div>
          Documentación adicional
          <div class="pl-10 w-35 h-15">
            <span class="bg-[#6CDBA5] text-black text-xs rounded-full w-full p-1">Sin completar</span>
          </div>
        </div>
      </template>

      <other-requeriments />

    </el-collapse-item>


  </el-collapse>
</template>

<style>
.el-collapse-item__header title {
  background: #000;
  max-width: 100% !important;
}
</style>
