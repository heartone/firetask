<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  modelValue: String,
  placeholder: String,
  rows: {
    default: 1,
  },
  minHeight: {
    default: 100,
  },
  maxHeight: {
    default: 300,
  }
});
const emits = defineEmits(['update:modelValue']);
const textarea = ref(null)
onMounted(() => {
  if (textarea.value.hasAttribute('autofocus')) {
    textarea.value.focus();
  }
});

const initHeight = () => {
  textarea.value.style.height = "auto"
}
const adjustHeight = () => {
  textarea.value.style.height = props.minHeight + 'px';
  let sh = textarea.value.scrollHeight;
  textarea.value.style.height = sh < props.maxHeight ? sh + 'px' : `${props.maxHeight}px`;
}
const updateValue = (e) => {
  emits('update:modelValue', e.target.value)
  adjustHeight()
}
const focus = () => {
  textarea.value.focus()
}
</script>

<template>
  <textarea
    ref="textarea"
    @input="updateValue($event)"
    :value="modelValue"
    class="w-full border-0 rounded bg-none focus:outline-none focus:ring-none text-sm"
    :rows="rows"
    :placeholder="placeholder"
  >
  </textarea>

</template>
