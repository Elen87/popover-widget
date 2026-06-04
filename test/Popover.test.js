import Popover from '../src/js/Popover';

describe('Popover', () => {
  let button;
  let popover;

  beforeEach(() => {
    document.body.innerHTML = '<button id="btn">Click me</button>';
    button = document.getElementById('btn');
    popover = new Popover(button, {
      title: 'Test Title',
      content: 'Test Content'
    });
  });

  afterEach(() => {
    popover.destroy();
    document.body.innerHTML = '';
  });

  test('should create popover on show', () => {
    popover.show();
    const popoverElement = document.querySelector('.popover');
    expect(popoverElement).toBeTruthy();
    expect(popoverElement.querySelector('.popover-header').textContent).toBe('Test Title');
    expect(popoverElement.querySelector('.popover-body').textContent).toBe('Test Content');
  });

  test('should hide popover on hide', () => {
    popover.show();
    expect(document.querySelector('.popover')).toBeTruthy();
    popover.hide();
    expect(document.querySelector('.popover')).toBeFalsy();
  });

  test('should toggle popover on click', () => {
    button.click();
    expect(document.querySelector('.popover')).toBeTruthy();
    button.click();
    expect(document.querySelector('.popover')).toBeFalsy();
  });

  test('should position popover', () => {
    button.getBoundingClientRect = jest.fn(() => ({
      top: 100, left: 100, width: 100, height: 40
    }));
    popover.show();
    const popoverElement = document.querySelector('.popover');
    expect(popoverElement).toBeTruthy();
  });

  test('should remove existing popover before creating new one', () => {
    // Создаём первый popover
    popover.show();
    const firstPopover = document.querySelector('.popover');
    expect(firstPopover).toBeTruthy();
    
    // Показываем снова (должен удалить существующий и создать новый)
    popover.show();
    const newPopover = document.querySelector('.popover');
    expect(newPopover).toBeTruthy();
    // Проверяем, что старый popover был удалён (не может быть двух)
    expect(document.querySelectorAll('.popover').length).toBe(1);
  });

  test('should use default title and content when options not provided', () => {
    // Создаём popover без опций
    const defaultButton = document.createElement('button');
    defaultButton.id = 'default-btn';
    defaultButton.textContent = 'Default Button';
    document.body.appendChild(defaultButton);
    
    const defaultPopover = new Popover(defaultButton);
    
    defaultPopover.show();
    const popoverElement = document.querySelector('.popover');
    
    expect(popoverElement.querySelector('.popover-header').textContent).toBe('Popover title');
    expect(popoverElement.querySelector('.popover-body').textContent).toBe("And here's some amazing content. It's very engaging. Right?");
    
    defaultPopover.destroy();
    defaultButton.remove();
  });
})