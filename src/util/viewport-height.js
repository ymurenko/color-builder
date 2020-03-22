export const getViewport = () => {
  let VH = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  let VW = Math.max(
    document.documentElement.clientHeight,
    window.innerWidth || 0
  );
  
  return VH > VW ? VW : VH;
};
