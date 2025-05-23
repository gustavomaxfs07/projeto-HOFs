import { averageByDepartment, employeeByDepartment, selectDepartment } from './pageGraphics.js';

export function initGraphics(list) {
    const graphicAvarege = document.getElementById("avaregeGraphics").addEventListener("click", () => currentGraphics('average', list))
    const graphicEmpByDep = document.getElementById("empByDepGraphic").addEventListener("click", () => currentGraphics('employeeByDepartment', list))
    const employeeSalary = document.getElementById("salaryEmployee").addEventListener("click", () => currentGraphics('salaryByDepartment', list, window.selectSector))
}

window.currentPageGraphics = 'average'
export const currentGraphics = function (pageName, list, select) {
  window.currentPageGraphics = pageName
  window.showLoading();

  setTimeout(() => {
    switch (pageName) {
      case 'average':
        averageByDepartment(list);
        break;
      case 'employeeByDepartment':
        employeeByDepartment(list);
        break;
      case 'salaryByDepartment':
        selectDepartment(list, select);
        break;
    }

    document.getElementById('avaregeGraphics').disabled = (pageName === 'average');
    document.getElementById('empByDepGraphic').disabled = (pageName === 'employeeByDepartment');
    document.getElementById('salaryEmployee').disabled = (pageName === 'salaryByDepartment');

    window.hideLoading();
  }, 250)
}