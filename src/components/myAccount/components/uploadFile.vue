<script setup lang="ts">
  import { i18n } from '@/composables'
  import { ElMessage } from 'element-plus'
  import type { PropType } from 'vue'

  export interface FileObjectContract {
    name: string | null
    size: number | null
    sizeLabel: string | null
    type: string | null
    base64: string | null
    url?: string
  }

  const fileObject = ref<FileObjectContract | null>({
    name: null,
    size: 0,
    sizeLabel: '',
    type: null,
    base64: null,
  })
  const emits = defineEmits(['upload', 'change', 'remove'])
  const file = ref()
  const props = defineProps({
    accept: {
      type: String,
      default: '',
    },
    viewImage: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: () => 2,
    },
    value: {
      type: Object as PropType<FileObjectContract>,
      default: () => ({
        name: null,
        size: 0,
        sizeLabel: '',
      }),
    },
  })

  const image = ref()

  const convertToMb = (bytes: number) => {
    if (!+bytes)
      return {
        size: 0,
        sizeLabel: '',
      }
    const decimals = 2
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return {
      size: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)),
      sizeLabel: sizes[i],
    }
  }

  const showFile = () => {
    file.value.click()
    emits('change', file)
  }

  const loadFile = (e: any) => {
    if (!e.target.files[0]) return

    const { name, size, type } = e.target.files[0]
    const onlyType = `.${type.split('/')[1]}`
    const accepts = props.accept.split(',')
    if (accepts.includes('.doc') || accepts.includes('.docx')) {
      accepts.push(
        '.vnd.openxmlformats-officedocument.wordprocessingml.document'
      )
    }
    const isAccept = accepts.includes(onlyType)

    if (!isAccept) {
      alert(i18n.value.components.uploadFile.fileNotValid)
      file.value.value = ''
      return
    }

    const totalSize = convertToMb(size)

    if (size > props.size) {
      ElMessage.error(i18n.value.components.uploadFile.maxFileMessage)
      return
    }

    fileObject.value = {
      name,
      size: totalSize.size,
      sizeLabel: totalSize.sizeLabel,
      type: e.target.files[0].type,
      base64: null,
    }

    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      if (!fileObject.value?.base64) {
        fileObject.value = {
          ...fileObject.value,
          base64: reader.result as string,
        } as FileObjectContract
      }

      fileObject.value.base64 = reader.result as string

      emits('upload', fileObject.value)
      if (props.viewImage) image.value = fileObject.value?.base64
    }
  }

  const clearFile = () => {
    fileObject.value = null
    emits('remove')
  }

  onMounted(() => {
    const value = props.value
    const sizeObj = convertToMb(value.size as number)
    fileObject.value = {
      name: value.name as string,
      size: sizeObj.size,
      sizeLabel: sizeObj.sizeLabel,
      type: value.type as string,
      base64: value.base64 as string,
      url: value.url,
    }

    if (props.viewImage && fileObject.value.url)
      image.value = fileObject.value.url
  })

  const clearCache = () => {
    file.value.value = ''
  }
</script>
<template>
  <div
    v-if="fileObject?.name == null"
    class="w-full font-roboto h-[64px] flex justify-center items-center text-xs border border-dashed cursor-pointer upload-file"
    @click="showFile"
  >
    <div class="flex justify-center items-center gap-5 text-center">
      <i class="fa-light fa-up-from-bracket text-[27px] text-[#CDD4D9]"></i>
      <div class="flex flex-col md:text-left">
        <span class="text-[#10A39C] font-roboto font-bold text-sm">{{
          i18n.components.uploadFile.title
        }}</span>
        <span class="text-[#4E717A] opacity-70 uppercase"
          >{{ props.accept }} -
          <span class="capitalize"
            >Max {{ convertToMb(props.size).size
            }}{{ convertToMb(props.size).sizeLabel }}</span
          ></span
        >
      </div>
    </div>
  </div>

  <div
    v-else
    class="w-full md:w-[60%] font-roboto h-[64px] flex bg-[#EFF1F3] rounded-lg text-xs efectUpload"
  >
    <div class="w-full flex pr-5 pl-2">
      <div class="w-full flex items-center justify-start gap-5">
        <i
          v-if="!props.viewImage"
          class="fa-regular fa-file text-xl text-[#4E717A] pl-3"
        ></i>

        <div class="w-[53px]" v-else>
          <img class="w-[90%] h-[90%] object-cover rounded-md" :src="image" />
        </div>

        <div class="flex flex-col w-[80%] text-left text-[#033541]">
          <span
            class="font-roboto text-xs font-normal whitespace-nowrap overflow-ellipsis overflow-hidden"
            >{{ fileObject.name }}</span
          >
          <span class="opacity-70 text-[#4E717A]"
            >{{ fileObject.size }} {{ fileObject.sizeLabel }}</span
          >
        </div>
      </div>

      <div
        class="mt-3 text-base font-bold text-[#10A39C] cursor-pointer"
        @click="clearFile"
      >
        <i class="fa-regular fa-xmark"></i>
      </div>
    </div>
  </div>

  <input
    type="file"
    required
    :accept="props.accept"
    class="hidden"
    ref="file"
    @click="clearCache"
    @input="loadFile"
  />
</template>

<style scoped>
  .upload-file:hover {
    background: #095669 0% 0% no-repeat padding-box;
    border: 1px dashed #10a39c;
    border-radius: 4px;
    border-radius: 4px !important;
    color: white !important;
  }

  .upload-file:hover > div > div > span {
    color: white !important;
  }
</style>
