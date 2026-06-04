import './styles/main.css';
import Popover from './js/Popover';

const button = document.getElementById('popover-btn');
const popover = new Popover(button, {
  title: 'Popover title',
  content: "And here's some amazing content. It's very engaging. Right?"
})
