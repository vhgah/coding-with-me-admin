<template>
  <a-modal :open="open" title="Add link modal" @ok="handleOk" @cancel="handleCancel">
    <a-input v-model:value="internalValue" placeholder="Link" />
  </a-modal>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps({
  open: Boolean,
  link: String
})

const internalValue = ref('')

const emit = defineEmits(['close', 'ok'])

const handleOk = () => {
  emit('ok', internalValue.value)
}

const handleCancel = () => {
  emit('close')
}

watch(
  () => props.open,
  () => {
    if (props.open) {
      internalValue.value = props.link ?? ''
    }
  }
)
</script>
