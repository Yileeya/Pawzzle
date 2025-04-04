export const useTypeListStore = defineStore('typeList', () => {
  const genderList = ref<Partial<Record<string, string>>>({});
  const orderStatusList = ref<Partial<Record<string, string>>>({});

  function setGenderList(list: Partial<Record<string, string>>) {
    genderList.value = list;
  }

  function setOrderStatusList(list: Partial<Record<string, string>>) {
    orderStatusList.value = list;
  }

  return {
    genderList,
    orderStatusList,
    setGenderList,
    setOrderStatusList
  };
});
