import { defineStore } from "pinia";
import { ref } from "vue";

export const useMenuStore = defineStore('useMenuStore', () => {
  const collapsed = ref<boolean>(false)

  const toggleCollapse = () => {
    collapsed.value = !collapsed.value
  }

  return {
    collapsed,
    toggleCollapse,
  }
})