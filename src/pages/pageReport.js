import { employee } from '../data/employee.js';
import { getDepartments, BRL, salaryInOrder, filterEmployees } from '../utils/general.js';

function averageSalary(list) {
    return list.reduce((sum, item) => sum + parseFloat(item.salary), 0) / (list.length || 1);
}

export function renderReport() {
    const headerDefalt = document.querySelector(".headerTable");
    const bodyDefalt = document.querySelector(".bodyTable");

    headerDefalt.innerHTML = `<h2 id="title-graphics">Relatório Geral</h2>`;

    bodyDefalt.innerHTML = `
        <div class="report">
            <div class="report-summary">
                <p><strong>Total de Funcionários:</strong> ${employee.length}</p>
                <p><strong>Total de Setores:</strong> ${getDepartments(employee).length}</p>
                <p><strong>Média Salarial Geral:</strong> ${BRL(averageSalary(employee))}</p>
                <p><strong>Maior Salário:</strong> ${BRL(salaryInOrder(employee)[employee.length - 1]?.salary)}</p>
                <p><strong>Menor Salário:</strong> ${BRL(salaryInOrder(employee)[0]?.salary)}</p>
            </div>

            <div class="report-top-salaries">
                <h3>Top 5 Maiores Salários</h3>
                <ol>
                    <li>${salaryInOrder(employee)[employee.length - 1]?.name} - ${BRL(salaryInOrder(employee)[employee.length - 1]?.salary)}</li>
                    <li>${salaryInOrder(employee)[employee.length - 2]?.name} - ${BRL(salaryInOrder(employee)[employee.length - 2]?.salary)}</li>
                    <li>${salaryInOrder(employee)[employee.length - 3]?.name} - ${BRL(salaryInOrder(employee)[employee.length - 3]?.salary)}</li>
                    <li>${salaryInOrder(employee)[employee.length - 4]?.name} - ${BRL(salaryInOrder(employee)[employee.length - 4]?.salary)}</li>
                    <li>${salaryInOrder(employee)[employee.length - 5]?.name} - ${BRL(salaryInOrder(employee)[employee.length - 5]?.salary)}</li>
                </ol>
            </div>

            <div class="report-sector-percentage">
                <h3>Percentual por Setor</h3>
                <ul>
                    <li>TI: %</li>
                    <li>RH: 30%</li>
                    <li>Financeiro: 20%</li>
                    <li>Marketing: 10%</li>
                </ul>
            </div>

            <p class="report-date">Relatório gerado em: 28/04/2025 - 15:30</p>
        </div>
    `;
}


// Relatório gerado em: 28/04/2025 - 15:30