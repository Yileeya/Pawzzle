export const useTypeListStore = defineStore('typeList', () => {
  const { $api } = useNuxtApp();

  const genderList = ref<Partial<Record<string, string>>>({});
  const orderStatusList = ref<Partial<Record<string, string>>>({});

  function setGenderList(list: Partial<Record<string, string>>) {
    genderList.value = list;
  }

  function setOrderStatusList(list: Partial<Record<string, string>>) {
    orderStatusList.value = list;
  }

  async function getGenderList() {
    await $api<Partial<Record<string, string>>>('/genderList').then((response) => {
      setGenderList(response);
    });
  }

  return {
    genderList,
    orderStatusList,
    setGenderList,
    setOrderStatusList,
    getGenderList
  };
});
