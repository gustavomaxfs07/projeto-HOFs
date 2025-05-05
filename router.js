import { renderDefalt } from './js/table.js';
import { renderGraphics } from './js/graphics.js';
import { renderReport } from './js/report.js';

export let atualPage = "table"
document.getElementById('btnList').addEventListener('click', () => renderPage('table'));
document.getElementById('btnGraphics').addEventListener('click', () => renderPage('graphics'));
document.getElementById('btnReport').addEventListener('click', () => renderPage('report'));

window.onload = function () {
  renderPage(atualPage);
};

window.renderPage = function (pageName) {
  atualPage = pageName

  switch (pageName) {
    case 'table':
      renderDefalt();
      break;
    case 'graphics':
      renderGraphics();
      break;
    case 'report':
      renderReport();
      break;
  }
}
