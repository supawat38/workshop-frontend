import { defineStore } from "pinia";

export const useUserStore = defineStore('user' , () => {

    const ResultAPI = ref()
    return {ResultAPI}
    // const count = ref(1)
    // const name = ref('Eduardo')
    // const doubleCount = computed(() => count.value * 2)

    // //ฟังก์ชั่น
    // function increment() {
    //   count.value++
    // }
  
    // return { count, name, doubleCount, increment}
})
