<template>
  <div class="flex items-center justify-center gap-3 text-xl lg:justify-start">
    <i
      class="fa-duotone fa-badge-dollar text-2xl text-[#EBC133] vnvFaBadgeDollar"
    ></i>
    <span class="font-bold font-red-hat">Beneficios</span>
  </div>

  <div class="flex flex-col gap-5 mt-5">
    <div class="w-full space-y-6 text-base rounded-lg">
      <el-collapse
        v-if="isMounted"
        accordion
        class="w-full lg:w-[747px] py-6 pb-20 pl-0 lg:px-6"
        v-model="currentCollapse"
        id="benefitsCollapse"
      >
        <el-collapse-item
          title="Salario y bonificaciones"
          name="salary"
          class="w-full"
        >
          <salary />
        </el-collapse-item>

        <el-collapse-item
          class="w-full"
          title="Contrato, jornada y/o horarios"
          name="otherRequirementsForm"
        >
          <contract />
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
  import getSalary from '@/actions/http/lists/getSalary'
  import useScroollColapse from '../../actions/scrollColapse'
  import useBenefitStore from './store'

  const currentCollapse = computed({
    get: () => useBenefitStore().getCurrentForm(),
    set: (value) => useBenefitStore().setCurrentForm(value),
  })

  const isMounted = ref(false)

  onMounted(async () => {
    await getSalary()
    isMounted.value = true
    setTimeout(() => {
      document
        .getElementById('benefitsCollapse')
        ?.scrollIntoView({ behavior: 'smooth' })
    }, 10)
  })

  useScroollColapse(currentCollapse)
</script>
