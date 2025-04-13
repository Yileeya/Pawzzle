export const useUiUxStore = defineStore('uiux', () => {
  const layoutLoading = ref(false);
  const pageLoading = ref(false);
  const loadingStartTime = ref(0);
  const MIN_LOADING_TIME = 1500;

  function setLoading(target: Ref<boolean>, value: boolean) {
    if (value) {
      loadingStartTime.value = Date.now();
      target.value = true;
    } else {
      const timePassed = Date.now() - loadingStartTime.value;
      const delay = Math.max(0, MIN_LOADING_TIME - timePassed);

      setTimeout(() => {
        target.value = false;
      }, delay);
    }
  }

  function setLayoutLoading(value: boolean) {
    setLoading(layoutLoading, value);
  }

  function setPageLoading(value: boolean) {
    setLoading(pageLoading, value);
  }

  const isLoading = computed(() => {
    return layoutLoading.value || pageLoading.value;
  });

  return {
    setLayoutLoading,
    setPageLoading,
    isLoading
  };
});