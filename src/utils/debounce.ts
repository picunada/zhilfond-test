
export function debounce(fn: Function, wait: number): Function {
  let timer: number;
  return function () {
    if (timer) {
      clearTimeout(timer); // clear any pre-existing timer
    }
    // @ts-ignore
    const ctx = this
    timer = setTimeout(() => {
      fn.apply(ctx, arguments); // call the function if time expires
    }, wait);
  }
}
