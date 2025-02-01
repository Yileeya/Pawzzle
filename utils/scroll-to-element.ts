export default function (elementId = 'ServiceBlock', offset = 100) {
  setTimeout(() => {
    const section = document.getElementById(elementId);
    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, 100);
}
