hexo.extend.tag.register('more', (args, content) => {
  content = hexo.render.renderSync({ text: content, engine: 'markdown' });
  return `<div class="more"><a class="more-toggle"></a><div class="more-body">${content}</div></div>`;
}, { ends: true });
