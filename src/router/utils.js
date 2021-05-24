import axios from 'axios';
import globalComponents from '../components';

const sass = window.Sass;

function matchData(data) {
  const matchTemplate = data.match(/<template\b[^>]*>([\s\S]*?)<\/template>/)
  const matchScript = data.match(/<script\b[^>]*>([\s\S]*?)<\/script>/);
  const matchStyle = data.match(/<style\b[^>]*>([\s\S]*?)<\/style>/);
  return {
    template: matchTemplate[1] || '',
    script: matchScript[1] || '',
    style: matchStyle[1] || '',
  }
}

export function setStyle(textContent) {
  if (textContent && textContent.trim()) {
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.textContent = textContent.replace(/\n/g, '');
    document.head.appendChild(style);
  }
}

export async function fetchComponent(path) {
  const { data } = await axios.get(path);
  const { template, script: _script, style } = matchData(data);
  const script = _script.replace('export default ', 'return ');

  if (sass) {
    sass.compile(style, (css) => setStyle(css.text));
  } else {
    setStyle(style);
  }

  const component = new Function('', script)();
  component.template = template;
  component.components = component.components || {};
  component.components = {
    ...component.components,
    ...globalComponents,
  };
  return component;
}
