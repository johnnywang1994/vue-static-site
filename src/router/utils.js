/* eslint-disabled */
import axios from 'axios';
import globalComponents from '../components';

const sass = window.Sass;

export function randomStr(len = 8) {
  const $chars = 'abcdefhijkmnprstwxyz';
  const maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

export function matchData(data) {
  const matchTemplate =
    data.match(/<template\b[^>]*>([\s\S]*?)<\/template>/) || [];
  const matchScript = data.match(/<script\b[^>]*>([\s\S]*?)<\/script>/) || [];
  const matchStyle = data.match(/<style\b[^>]*>([\s\S]*?)<\/style>/) || [];
  return {
    template: matchTemplate[1] || '',
    script: matchScript[1] || '',
    style: matchStyle[1] || '',
  };
}

export function setStyle(text) {
  if (text && text.trim()) {
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    const done = (result) => {
      if (result) {
        style.textContent = result.replace(/\n/g, '');
        document.head.appendChild(style);
      }
    };
    if (sass) {
      sass.compile(text, (css) => done(css.text));
    } else {
      done(text);
    }
  }
}

export async function fetchComponent(path) {
  const { data } = await axios.get(path);
  const { template, script: _script, style } = matchData(data);
  const script = _script.replace('export default ', 'return ');

  if (style) setStyle(style);

  const component = new Function('', script)();
  component.template = template;
  component.components = component.components || {};
  component.components = {
    ...component.components,
    ...globalComponents,
  };
  return component;
}
