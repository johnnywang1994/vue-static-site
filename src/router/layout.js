import { fetchComponent } from './utils';

async function fetchLayouts(settings) {
  const { layout } = settings;
  const globalLayouts = {};

  if (layout) {
    const layoutData = [];
    const indexNameMap = {};

    Object.keys(layout).forEach((name, index) => {
      indexNameMap[index] = name;
      layoutData.push(fetchComponent(layout[name]));
    })

    const result = await Promise.all(layoutData);
    result.forEach((component, index) => {
      const name = indexNameMap[index];
      globalLayouts[name] = component
    })
  }
  
  return globalLayouts;
}

export default fetchLayouts;
