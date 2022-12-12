<template>
  <div class="flex items-center justify-center gap-3 text-xl lg:justify-start">
    <i
      class="fa-duotone fa-person-rays text-3xl text-[#EBC133] vnvFaPersonRays"
    ></i>
    <span class="font-bold font-red-hat">Candidato ideal</span>
  </div>

  <p class="mt-3 text-[#033541] font-red-hat px-4">
    Esta es la información que necesitamos para conseguir a tu candidato ideal.
  </p>

  <div class="flex flex-col gap-5 mt-5">
    <div class="w-full space-y-6 text-base rounded-lg">
      <el-collapse
        accordion
        class="w-full lg:w-[747px] py-6 pb-20 pl-0 lg:px-6"
      >
        <el-collapse-item
          title="Experiencia deseada"
          name="generalInfoForm"
          class="w-full"
        >
          <experienceForm />
        </el-collapse-item>

        <el-collapse-item
          class="w-full"
          title="Educación y otras preferencias"
          name="otherRequirementsForm"
        >
          <education />
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
