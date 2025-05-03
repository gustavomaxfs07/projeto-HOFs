import { renderDefalt } from './table.js';
import { renderGraphics } from './graphics.js';
import { renderReport } from './report.js';

window.onload = function () {
  renderPage('table');
};

function renderPage(pageName) {
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
