export class ViewportObserver {
  constructor(elements, callback) {
    this.elements = elements;
    this.callback = callback;
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
      root: null,
      threshold: 0.5
    });
    this.elements.forEach(element => {
      this.observer.observe(element);
    });
  }
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.callback(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

 
  // 停止监视所有元素
  disconnect() {
    this.observer.disconnect();
  }
}