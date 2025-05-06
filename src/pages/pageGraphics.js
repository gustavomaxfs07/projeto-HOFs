import { employee } from '../data/employee.js';

export function renderGraphics(pageName) {
  const headerDefalt = document.querySelector(".headerTable");
  const bodyDefalt = document.querySelector(".bodyTable");

  headerDefalt.innerHTML = `
    <h2 id="title-graphics">Gráficos</h2>
    <spam id="select-filter"></spam>
  `;

  bodyDefalt.innerHTML = `
    <div class="graphic">
      <canvas id="graphic"></canvas>
    </div>
    <div class="sidebar buttons-charts">
      <button id="avaregeGraphics">Média Salarial por setor</button>
      <button id="empByDepGraphic">Funcionários por setor</button>
      <button id="salaryEmployee">Salário dos Funcionários</button>
    </div>
  `;

  setTimeout(currentGraphics(pageName, employee), 0);
  initGraphics(employee)
}

export let atualPageGraphics = 'average'
const currentGraphics = function (pageName, list) {
  atualPageGraphics = pageName

  switch (pageName) {
    case 'average':
      averageByDepartment(list);
      break;
    case 'employeeByDepartment':
      employeeByDepartment(list);
      break;
    case 'salaryByDepartment':
      selectDepartment(list);
      break;
  }
}

function initGraphics(list) {
    const graphicAvarege = document.getElementById("avaregeGraphics");
    const graphicEmpByDep = document.getElementById("empByDepGraphic");
    const employeeSalary = document.getElementById("salaryEmployee");
    
    graphicAvarege.addEventListener("click", () => currentGraphics('average', list));
    graphicEmpByDep.addEventListener("click", () => currentGraphics('employeeByDepartment', list));
    employeeSalary.addEventListener("click", () => currentGraphics('salaryByDepartment', list));
}

function averageByDepartment(list) {
  document.querySelector("#select-filter").innerHTML = ``;

  const departments = [...new Set(list.map(e => e.department))];

  const departmentSalaries = departments.map(dep => {
    const salaries = list
      .filter(e => e.department === dep)
      .map(e => parseFloat(e.salary));

    const average = salaries.reduce((sum, s) => sum + s, 0) / salaries.length || 0;
    return average.toFixed(2);
  });

  renderChart({
    type: "bar",
    labels: departments,
    data: departmentSalaries,
    label: "Média Salarial",
    backgroundColor: ["#4f6df5", "#44cc88", "#ffa600", "#f54291"],
    title: "Média Salarial por Setor",
    yAxisFormat: value => `R$ ${parseFloat(value).toFixed(2)}`
  });
}

function employeeByDepartment(list) {

  document.querySelector("#select-filter").innerHTML = ``;
  const departmentCount = {};
  list.forEach(e => {
    departmentCount[e.department] = (departmentCount[e.department] || 0) + 1;
  });
  const departments = Object.keys(departmentCount);
  const counts = Object.values(departmentCount);

  renderChart({
    type: "pie",
    labels: departments,
    data: counts,
    label: "Funcionários",
    backgroundColor: ["#4f6df5", "#44cc88", "#ffa600", "#f54291", "#6a67ce", "#f54242"],
    title: "Funcionários por Setor",
    legendPosition: "bottom"
  });
}

function selectDepartment(list){
  document.querySelector("#select-filter").innerHTML = `
    <select class="sidebar" id="departmentGraphics">
      <option value="default">Todos os Setores</option>
      <option value="TI">TI</option>
      <option value="RH">RH</option>
      <option value="Marketing">Marketing</option>
      <option value="Financeiro">Financeiro</option>
    </select>`;

  const departmentSelect = document.getElementById("departmentGraphics");
  salaryByDepartment('default', list);

  departmentSelect.addEventListener("change", (e) => {
    salaryByDepartment(e.target.value, list);
  });
}


function salaryByDepartment(selectedDepartment, list) {
  let employeesInDepartment = [];
  if (selectedDepartment === 'default') {
    employeesInDepartment = [...list];
  } else {
    employeesInDepartment = list.filter(e => e.department === selectedDepartment);
  }
  const names = employeesInDepartment.map(e => e.name);
  const salaries = employeesInDepartment.map(e => parseFloat(e.salary));

  renderChart({
    type: "bar",
    labels: names,
    data: salaries,
    label: "Salário",
    backgroundColor: "#44cc88",
    title: selectedDepartment === 'default' ? "Salários Gerais" : `Salários do(a) ${selectedDepartment}`,
    legendPosition: "bottom",
    yAxisFormat: value => `R$ ${parseFloat(value).toFixed(2)}`
  });
}


function renderChart({ type, labels, data, label, backgroundColor, title, legendPosition = "top", yAxisFormat = null }) {
  const ctx = document.getElementById("graphic").getContext("2d");
  if (window.currentChart) {
    window.currentChart.destroy();
  }
  window.currentChart = new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        backgroundColor: backgroundColor
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: title
        },
        legend: {
          position: legendPosition
        }
      },
      scales: {
        y: yAxisFormat ? {
          beginAtZero: true,
          ticks: {
            callback: yAxisFormat
          }
        } : undefined
      }
    }
  });
}


