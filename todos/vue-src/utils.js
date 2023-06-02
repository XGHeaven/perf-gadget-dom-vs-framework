export function delay(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), num);
  })
}