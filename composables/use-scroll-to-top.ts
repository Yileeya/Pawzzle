export function useScrollToTop(targetId = 'scrollTarget') {
  const showButton = ref(false);
  
  onMounted(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        showButton.value = !entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
  
    const target = document.getElementById(targetId);
    if (target) observer.observe(target);
  });
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return { showButton, scrollToTop };
}