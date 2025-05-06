import { employee } from '../data/employee.js';

export let listFilter = []

const capitalize = texto => texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();

const renderTable = (listEmployee) => {
    const tableEmployee = document.getElementById("tabelaFuncionarios")
    tableEmployee.innerHTML = ""
    listEmployee.forEach(({name, salary, department}) => {
        const line = document.createElement("tr")
        name = capitalize(name)
        line.innerHTML = `
            <td>${name}</td>
            <td>${salary}</td>
            <td>${department}</td>
        `
        tableEmployee.appendChild(line)
    });
}

export function filterEmployee(list) {
    let searchName = document.getElementById('searchInput').value.toLowerCase();
    let searchDepartament = document.getElementById('setorFilter').value;
    
    if (searchName === "" && searchDepartament === "") {
        listFilter = [...list]
        renderTable(list);
    } else {
        listFilter = list.filter(person => {
            const nameMatch = searchName === "" || person.name.toLowerCase().includes(searchName);
            const departmentMatch = searchDepartament === "" || person.department === searchDepartament;
            
            return nameMatch && departmentMatch;
        });
        
        renderTable(listFilter);
        sortFor()
    }
}

function initFilters(list) {
    const searchInput = document.getElementById("searchInput");
    const setorFilter = document.getElementById("setorFilter");
    const deleteFilter = document.getElementById("btnRemoveFilter");
    const sortSelect = document.getElementById("sort");

    searchInput.addEventListener("input", () => filterEmployee(list));
    setorFilter.addEventListener("change", () => filterEmployee(list));
    deleteFilter.addEventListener("click", () => removeFilter(list));
    sortSelect.addEventListener("change", () => sortFor());
}

const removeFilter = (list) => {
    document.getElementById('searchInput').value = '';
    document.getElementById('setorFilter').value = '';
    filterEmployee(list);
    sortFor();
};


function sortFor() {
    const sortSelect = document.getElementById('sort').value;

    switch (sortSelect) {
        case "maiorsalario":
            listFilter.sort((a, b) => b.salary - a.salary);
            break;

        case "menorsalario":
            listFilter.sort((a, b) => a.salary - b.salary);
            break;

        case "order-az":
            listFilter.sort((a, b) => a.name.localeCompare(b.name));
            break;

        case "order-za":
            listFilter.sort((a, b) => b.name.localeCompare(a.name));
            break;

        default:
            listFilter.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }

    renderTable(listFilter)
}

export function renderDefalt(){
    const headerDefalt = document.querySelector('.headerTable')
    const bodyDefalt = document.querySelector('.bodyTable')

    headerDefalt.innerHTML = `
        <h2>Funcionários</h2>

        <div class="filter sidebar" id="section-filter">
            <input type="text" placeholder="Buscar por nome..." id="searchInput"/>

            <select id="setorFilter">
                <option value="">Setor</option>
                <option value="TI">TI</option>
                <option value="RH">RH</option>
                <option value="Financeiro">Financeiro</option>
                <option value="Marketing">Marketing</option>
            </select>

            <button id="btnRemoveFilter">Remover filtro 🗑️</button>

            <select id="sort">
                <option value="">Classificar por</option>
                <option value="maiorsalario">Maior salário</option>
                <option value="menorsalario">Menor Salário</option>
                <option value="order-az">A -> Z</option>
                <option value="order-za">Z -> A</option>
            </select>
        </div>
    `

    bodyDefalt.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Salário</th>
              <th>Setor</th>
            </tr>
          </thead>
          <tbody id="tabelaFuncionarios"></tbody>
        </table>
    `
    renderTable(employee)
    initFilters(employee)
}