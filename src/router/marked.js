import marked from 'marked';
import { matchData, randomStr, setStyle } from './utils';

let tempComponents;

const customRenderer = {
  code(code, _lang) {
    let result = '';
    let lang = _lang;
    if (lang === 'vue') {
      const { template, script: _script, style } = matchData(code);
      const script = _script.replace('export default ', 'return ');

      // handle script
      const component = script
        ? new Function('', script)()
        : {};
      const id = component.name || randomStr();
      component.template = template;
      // TODO: need to merge route components with source components
      component.components = tempComponents;
      tempComponents[id] = component;

      // handle style
      if (style) setStyle(style);

      result += `<${id} />`;
      lang = 'html';
      return result;
    }
    const codeNode = document.createElement('code');
    const text = document.createTextNode(code);
    codeNode.appendChild(text);
    codeNode.setAttribute('class', `language-${lang}`);
    return `<pre>${codeNode.outerHTML}</pre>`;
  },
  heading(text, level, rawText) {
    const nText = rawText.replace(/\s/gi, '-');
    return `
      <h${level} id="${nText}">
        <a class="header-anchor" href="#${nText}">#</a>
        ${text}
      </h${level}>
    `;
  },
  link(href, title, text) {
    return `
      <a href="${href}" target="_blank">
        ${text}
        <span><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg></span>
      </a>
    `;
  },
};

const markedOptions = {
  baseUrl: '/',
};

marked.use({ renderer: customRenderer });

function compileMarked(template) {
  const components = {};
  tempComponents = components;
  const compiledTemplate = marked(template, markedOptions);
  return {
    template: compiledTemplate,
    components,
  }
}

export default compileMarked;
