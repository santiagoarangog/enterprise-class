<template>
  <div class="px-3 lg:pl-12 lg:pr-6">
    <div class="pt-4">
      <p class="text-[13px] text-[#819AA0] mb-2">
        Los campos marcados con asterisco (*) son obligatorios
      </p>

      <div class="flex gap-6">
        <div class="flex-1">
          <el-form-item
            :label="'*Tipo de contrato'"
            prop="name"
            class="flex flex-col justify-start w-full vnvInput"
          >
            <el-select
              v-model="radio1"
              class="w-full lg:w-[310px]"
              placeholder="Select"
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
        </div>
      </div>
    </div>

    <div class="mb-4">
      <div class="flex gap-6">
        <div class="flex flex-col mt-2 lg:w-1/3">
          <p class="text-sm text-[#4E717A] mb-2">Horario laboral (opcional)</p>
          <el-radio-group
            v-model="radio1"
            class="flex justify-between uppercase"
          >
            <el-radio class="normal-case" label="1">De oficina</el-radio>
            <el-radio class="normal-case" label="2">Rotativo</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>

    <div class="pb-6 mb-6 border-b border-gray-300" v-if="radio1 == '1'">
      <div
        class="grid grid-cols-2 gap-4 my-2 lg:grid-cols-7 flex-nowrap lg:flex-nowrap"
      >
        <button
          class="m-0 rounded-md py-2 px-2 w-full bg-[#F6F8FA]"
          v-for="(item, index) in weekdays"
          :key="index"
        >
          <span class="text-[#67858D] text-sm">{{ item }} </span>
        </button>
      </div>
    </div>

    <div class="pb-6 mb-4 space-y-4" v-if="radio1 == '1'">
      <div class="flex gap-6 mt-6 lg:mt-0">
        <div class="flex-1">
          <p class="text-sm text-[#4E717A] mb-2">Hora de ingreso</p>
          <el-time-select
            v-model="startTime"
            :max-time="endTime"
            class="mr-4"
            start="08:30"
            step="00:15"
            end="18:30"
          />
        </div>
        <div class="flex-1">
          <p class="text-sm text-[#4E717A] mb-2">Hora de salida</p>
          <el-time-select
            v-model="endTime"
            :min-time="startTime"
            start="08:30"
            step="00:15"
            end="18:30"
          />
        </div>
      </div>

      <div class="flex flex-col p-1">
        <p class="text-sm text-[#4E717A] mb-2">Comentarios</p>
        <el-input
          type="textarea"
          placeholder="Incluye aquí información relevante relacionada a la jornada laboral"
          class="w-full"
          :rows="5"
          maxlength="800"
          show-word-limit
        />
      </div>
    </div>

    <div class="flex justify-end mb-8 lg:mb-4">
      <el-button class="bg-[#FFC915] py-2 px-6 rounded-full w-full lg:w-auto">
        Continuar
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  const radio1 = ref('1')
  const weekdays = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ]
  const startTime = ref('')
  const endTime = ref('')
</script>
