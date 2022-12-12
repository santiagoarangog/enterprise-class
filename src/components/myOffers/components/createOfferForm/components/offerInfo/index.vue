<script setup lang="ts">
  import { i18n } from '@/composables'
  import { ElCollapse, ElCollapseItem } from 'element-plus'
  import useScrollCollapse from '../../actions/scrollColapse'
  import useOfferInfoStore from './store'
  import { EOfferInfoForm } from './store'

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
      :title="t.createOffer.offerInfo.generalInfo.title"
      :name="EOfferInfoForm.generalInfo"
      class="w-full"
    >
      <general-info-offer-form />
    </el-collapse-item>

    <el-collapse-item
      :disabled="!isGeneralInfoValid"
      class="w-full"
      :title="t.createOffer.offerInfo.otherRequeriments.title"
      :name="EOfferInfoForm.otherRequeriments"
    >
      <other-requeriments />
    </el-collapse-item>
  </el-collapse>
</template>
