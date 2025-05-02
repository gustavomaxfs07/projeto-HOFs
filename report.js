function department(list){
    list = [...new Set(employee.map(e => e.department))];
    return list.length
}

function averageSalary(list) {
    const totalSalaries = list.reduce((sum, item) => sum + parseFloat(item.salary), 0);
    const average = totalSalaries / list.length || 0;
    
    return average.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function highestSalary(list) {
    const sortedList = [...list].sort((a, b) => parseFloat(b.salary) - parseFloat(a.salary));
    const highest = sortedList[0];
  
    return parseFloat(highest.salary).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function lowestSalary(list) {
    const sortedList = [...list].sort((a, b) => parseFloat(b.salary) + parseFloat(a.salary));
    const highest = sortedList[0];
  
    return parseFloat(highest.salary).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function reportRender() {
    interfaceTable = false;

    const headerDefalt = document.querySelector(".headerTable");
    const bodyDefalt = document.querySelector(".bodyTable");

    headerDefalt.innerHTML = `<h2 id="title-graphics">Relatório Geral</h2>`;

    bodyDefalt.innerHTML = `
        <div class="report">
            <div class="report-summary">
                <p><strong>Total de Funcionários:</strong> ${employee.length}</p>
                <p><strong>Total de Setores:</strong> ${department(employee)}</p>
                <p><strong>Média Salarial Geral:</strong> ${averageSalary(employee)}</p>
                <p><strong>Maior Salário:</strong> ${highestSalary(employee)}</p>
                <p><strong>Menor Salário:</strong> ${lowestSalary(employee)}</p>
            </div>

            <div class="report-top-salaries">
                <h3>Top 5 Maiores Salários</h3>
                <ol>
                    <li>João Silva - R$ 15.000,00</li>
                    <li>Ana Costa - R$ 12.500,00</li>
                    <li>Lucas Pereira - R$ 11.000,00</li>
                    <li>Mariana Souza - R$ 10.500,00</li>
                    <li>Felipe Lima - R$ 10.000,00</li>
                </ol>
            </div>

            <div class="report-sector-percentage">
                <h3>Percentual por Setor</h3>
                <ul>
                    <li>TI: 40%</li>
                    <li>RH: 30%</li>
                    <li>Financeiro: 20%</li>
                    <li>Marketing: 10%</li>
                </ul>
            </div>

            <p class="report-date">Relatório gerado em: 28/04/2025 - 15:30</p>
        </div>
    `;
}




// Relatório Geral
// ------------------------------
// Total de Funcionários: 25
// Total de Setores: 4

// Média Salarial Geral: R$ 5.200,00
// Maior Salário: R$ 15.000,00
// Menor Salário: R$ 1.200,00

// Top 5 Maiores Salários:
// 1. João Silva - R$ 15.000,00
// 2. Ana Costa - R$ 12.500,00
// ...

// Percentual por Setor:
// - TI: 40%
// - RH: 30%
// - Financeiro: 20%
// - Marketing: 10%

// Relatório gerado em: 28/04/2025 - 15:30