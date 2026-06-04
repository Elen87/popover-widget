
export default class Popover {
  constructor(triggerElement, options = {}) {
    this.trigger = triggerElement;
    this.title = options.title || 'Popover title';
    this.content = options.content || "And here's some amazing content. It's very engaging. Right?";
    this.popoverElement = null;
    this.isVisible = false;
    this.bindEvents();
  }

  bindEvents() {
    this.trigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });
  }

  toggle() {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    if (this.popoverElement) {
      this.popoverElement.remove();
    }
    this.createPopover();
    this.positionPopover();
    this.popoverElement.classList.add('show');
    this.isVisible = true;
  }

  hide() {
    if (this.popoverElement) {
      this.popoverElement.classList.remove('show');
      this.popoverElement.remove();
      this.popoverElement = null;
    }
    this.isVisible = false;
  }

  createPopover() {
    const popover = document.createElement('div');
    popover.className = 'popover';
    popover.innerHTML = `
      <div class="popover-header">${this.title}</div>
      <div class="popover-body">${this.content}</div>
      <div class="popover-arrow"></div>
    `;
    document.body.appendChild(popover);
    this.popoverElement = popover;
  }

  positionPopover() {
    const triggerRect = this.trigger.getBoundingClientRect();
    const popoverRect = this.popoverElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    let top = triggerRect.top + scrollTop - popoverRect.height - 10;
    let left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (popoverRect.width / 2);

    const arrow = this.popoverElement.querySelector('.popover-arrow');
    const arrowOffset = (triggerRect.width / 2) - 6;
    arrow.style.left = `${arrowOffset}px`;
    arrow.style.bottom = '-6px';
    arrow.style.top = 'auto';

    this.popoverElement.style.top = `${top}px`;
    this.popoverElement.style.left = `${left}px`;
  }

  destroy() {
    this.hide();
    this.trigger.removeEventListener('click', this.toggle);
  }
}
