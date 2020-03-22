export const getVH = () => {
  return Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
};

