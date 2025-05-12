import { renderDefalt } from './src/pages/pageTable.js';
import { renderGraphics } from './src/pages/graphic/pageGraphics.js';
import { renderReport } from './src/pages/pageReport.js';
import { employee } from './src/data/employee.js';

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
  window.currentPage = pageName

  switch (window.currentPage) {
    case 'table':
      renderDefalt();
      break;
    case 'graphics':
      renderGraphics(window.currentPageGraphics);
      break;
    case 'report':
      renderReport(employee);
      break;
  }
}
