export function stopScroll() {}
export function startScroll() {}

export function animIosScroll() {
  if (this.isVisible == 0) {
    return false;
  }
  if (this.iosupdaters.length) {
    for (let c of this.iosupdaters) {
      this.ios[c].class.update(window.scrollY);
    }
  }
}
