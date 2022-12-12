<template>
  <div class="px-4 lg:pl-12 lg:pr-6">
    <div class="pt-4 border-b border-gray-300">
      <p class="text-[13px] text-[#819AA0] mb-2">
        Los campos marcados con asterisco (*) son obligatorios
      </p>

      <div class="flex flex-col justify-between gap-6 mt-8 lg:mt-2 lg:mb-2">
        <div class="flex flex-col w-full lg:w-1/2">
          <p class="text-sm text-[#4E717A] mb-3">
            *Experiencias requerida
            <i class="text-xs fa-solid fa-eye-slash text-[#F9A274]"></i>
          </p>
          <el-radio-group
            v-model="radio1"
            class="flex justify-between w-full uppercase"
          >
            <el-radio class="normal-case" label="1">Con experiencia</el-radio>
            <el-radio class="normal-case" label="2">Sin Experiencia</el-radio>
          </el-radio-group>
        </div>

        <div class="flex flex-col w-full" v-if="radio1 == '1'">
          <p class="text-sm text-[#4E717A] mb-2 font-semibold">
            Tipo de experiencia(opcional)
            <i class="text-xs fa-solid fa-eye-slash text-[#F9A274]"></i>
          </p>

          <el-form-item
            v-model="number"
            label="Industria"
            prop="name"
            class="flex flex-col justify-start w-full vnvInput"
          >
            <el-select
              v-model="select"
              class="w-full"
              multiple
              placeholder=""
              size="large"
            >
              <el-option
                v-for="item in 5"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            v-model="number"
            label="Área"
            prop="name"
            class="flex flex-col justify-start w-full vnvInput"
          >
            <el-select
              v-model="select"
              class="w-full"
              multiple
              placeholder=""
              size="large"
            >
              <el-option
                v-for="item in 5"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            v-model="number"
            label="Rol"
            prop="name"
            class="flex flex-col justify-start w-full vnvInput"
          >
            <el-select
              v-model="select"
              class="w-full"
              multiple
              placeholder=""
              size="large"
            >
              <el-option
                v-for="item in 5"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            label="Empresas con las que debió haber trabajado el candidato ideal (Opcional)"
            prop="name"
            class="flex flex-col justify-start w-full vnvInput"
          >
            <el-select
              class="w-full vnvMultiSelect min-h-40"
              v-model="multiSelect"
              suffix-icon=""
              multiple
              filterable
              allow-create
              :reserve-keyword="true"
              placeholder="Agregar"
            >
            </el-select>
          </el-form-item>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <p class="text-sm text-[#4E717A] mb-3">
        *Selecciona tus preferencias de edad
        <i class="text-xs fa-solid fa-eye-slash text-[#F9A274]"></i>
      </p>

      <div class="flex gap-4 flex-nowrap">
        <el-form-item
          label="*Desde"
          v-model="number"
          prop="name"
          class="flex flex-col justify-start w-full vnvInput md:w-36"
        >
          <el-input class="w-full" placeholder="18"> </el-input>
        </el-form-item>

        <el-form-item
          label="*Hasta"
          v-model="number"
          prop="name"
          class="flex flex-col justify-start w-full vnvInput md:w-36"
        >
          <el-input class="w-full" placeholder=""> </el-input>
        </el-form-item>
      </div>
    </div>

    <div class="flex justify-end mt-4 mb-4 lg:mb-2">
      <el-button class="bg-[#FFC915] py-2 px-6 rounded-full w-full lg:w-auto">
        Continuar
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  const number = ref(1)
  const select = ref('item1')
  const radio1 = ref('1')
  const multiSelect = ref(['one'])
</script>
