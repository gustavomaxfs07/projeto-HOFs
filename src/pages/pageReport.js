import { employee } from '../data/employee.js';
import { getDepartments, BRL, salaryInOrder, dateFormated, hoursFormated } from '../utils/general.js';

function averageSalary(list) {
    return list.reduce((sum, item) => sum + parseFloat(item.salary), 0) / (list.length || 1);
}

export function renderReport(list) {
    const headerDefalt = document.querySelector(".headerTable");
    const bodyDefalt = document.querySelector(".bodyTable");

    headerDefalt.innerHTML = `<h2 id="title-graphics">Relatório Geral</h2>`;

    bodyDefalt.innerHTML = `
        <div class="report">
            <div class="report-summary">
                <p><strong>Total de Funcionários:</strong> ${list.length}</p>
                <p><strong>Total de Setores:</strong> ${getDepartments(list).length}</p>
                <p><strong>Maior Salário:</strong> ${BRL(salaryInOrder(list)[list.length - 1]?.salary)}</p>
                <p><strong>Média Salarial:</strong> ${BRL(averageSalary(list))}</p>
                <p><strong>Menor Salário:</strong> ${BRL(salaryInOrder(list)[0]?.salary)}</p>
            </div>
            <p class="report-date">Relatório gerado em: ${dateFormated()} - ${hoursFormated()}</p>
        </div>
    `;

    const data = new Date()
    console.log(dateFormated())
    console.log(hoursFormated())

    

}


// Relatório gerado em: 28/04/2025 - 15:30