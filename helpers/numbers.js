export function formatNumber(num) {
  console.log("formatNumber -> num", num)
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
