import { renderDefalt } from './src/pages/pageTable.js';
import { renderGraphics } from './src/pages/pageGraphics.js';
import { atualPageGraphics } from './src/pages/pageGraphics.js';
import { renderReport } from './src/pages/pageReport.js';

function actions(){
  document.getElementById('btnList').addEventListener('click', () => renderPage('table'));
  document.getElementById('btnGraphics').addEventListener('click', () => renderPage('graphics'));
  document.getElementById('btnReport').addEventListener('click', () => renderPage('report'));
}

window.onload = function () {
  renderPage("report");
  actions();
};

window.renderPage = function (pageName) {
  window.atualPage = pageName

  switch (window.atualPage) {
    case 'table':
      renderDefalt();
      break;
    case 'graphics':
      renderGraphics(atualPageGraphics);
      break;
    case 'report':
      renderReport();
      break;
  }
}
