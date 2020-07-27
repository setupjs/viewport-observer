export default class ViewportObserver {
  targets = {}

  options = {
    threshold: [0, 0.5, 1]
  };

  handleObserveCallback = (entry) => {
    const id = entry.target.id;
    const target = this.targets[id];
    if (!entry.isIntersecting && target.notVisible) {
      target.notVisible(entry);
      return;
    }
    if (entry.intersectionRatio < 0.5 && target.lessThanHalf) {
      target.lessThanHalf(entry);
      return;
    }
    if (entry.intersectionRatio >= 0.5 && entry.intersectionRatio < 1 && target.moreThanHalf) {
      target.moreThanHalf(entry);
      return;
    }
    if (entry.intersectionRatio === 1 && target.fullyVisible) {
      target.fullyVisible(entry);
      return;
    }
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      this.handleObserveCallback(entry);
    });
  }, this.options);

  observe = (target) => {
    const el = document.getElementById(target.id);
    this.targets[target.id] = target;
    if (this.observer.observe) {
      this.observer.observe(el);
    }
  }

  unobserve = (id) => {
    const el = document.getElementById(id);
    if (this.observer.unobserve) {
      this.observer.unobserve(el);
    }
  }
}