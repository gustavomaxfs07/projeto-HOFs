import { employee } from '../../data/employee.js';
import { BRL } from '../../utils/general.js';
import { sortFor } from './sortfor.js';
import { selectItemPerPage, renderPagination } from './pagination.js';

export let listFilter = [...employee]
const capitalize = texto => texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();

export function renderPageTable(){
    const headerDefalt = document.querySelector('.headerTable')
    const bodyDefalt = document.querySelector('.bodyTable')

    headerDefalt.innerHTML = `
        <h2>Funcionários</h2>

        <div class="filter sidebar" id="section-filter">
            <input type="text" placeholder="Buscar por nome..." id="searchInput"/>

            <select id="setorFilter">
                <option value="">Todos os setores</option>
                <option value="TI">TI</option>
                <option value="RH">RH</option>
                <option value="Financeiro">Financeiro</option>
                <option value="Marketing">Marketing</option>
            </select>

            <button id="btnRemoveFilter">Remover filtro 🗑️</button>
        </div>
    `

    bodyDefalt.innerHTML = `
        <div class="selectItemPerPage">
            <div>
                <label>Items por página: </label>
                <select id="itemPagination">
                    <option value="5">5</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </div>

            <div>
                <label>Ordenar por: </label>
                <select id="sort">
                    <option value="">Ordenar</option>
                    <option value="order-az">A -> Z</option>
                    <option value="order-za">Z -> A</option>
                    <option value="maiorsalario">Maior salário</option>
                    <option value="menorsalario">Menor Salário</option>
                </select>
            </div>
        </div>

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

        <div id="pagination" class="pagination">
            <nav aria-label="...">
                <ul class="pagination">
                    <li class="page-item"><a href="#" class="page-link">Previous</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item active">
                        <a class="page-link" href="#" aria-current="page">2</a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </div>
    `
    renderLineTable(employee)
    initActions(employee)
    selectItemPerPage()
}

export let currentPage = 1;
export let itemsPerPage = 5;

export function setCurrentPage(value){
    currentPage = value
}

export function setItemsPerPage(items){
    itemsPerPage = items
}

export const renderLineTable = (list) => {
    const tableEmployee = document.getElementById("tabelaFuncionarios")

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = list.slice(start, end);

    tableEmployee.innerHTML = ""

    window.showLoading();
    setTimeout(() => {
        paginatedItems.forEach(({name, salary, department}) => {
            const line = document.createElement("tr");
            name = capitalize(name);
            line.innerHTML = `
                <td>${name}</td>
                <td>${BRL(salary)}</td>
                <td>${department}</td>
            `;
            tableEmployee.appendChild(line);
        });

        window.hideLoading();
    }, 200)

    renderPagination(list.length);
}

export function filterEmployee(list) {
    let searchName = document.getElementById('searchInput').value.toLowerCase();
    let searchDepartament = document.getElementById('setorFilter').value;
    
    if (searchName === "" && searchDepartament === "") {
        listFilter = [...list]
        renderLineTable(list);
    } else {
        listFilter = list.filter(person => {
            const nameMatch = searchName === "" || person.name.toLowerCase().includes(searchName);
            const departmentMatch = searchDepartament === "" || person.department === searchDepartament;
            
            return nameMatch && departmentMatch;
        });

        currentPage = 1;
        renderLineTable(listFilter);
        sortFor()
    }
}

function initActions(list) {
    const searchInput = document.getElementById("searchInput");
    const setorFilter = document.getElementById("setorFilter");
    const deleteFilter = document.getElementById("btnRemoveFilter");
    const sortSelect = document.getElementById("sort");

    searchInput.addEventListener("input", () => filterEmployee(list));
    setorFilter.addEventListener("change", () => filterEmployee(list));
    deleteFilter.addEventListener("click", () => removeFilter(list));
    sortSelect.addEventListener("change", () => sortFor(list));
}

const removeFilter = (list) => {
    document.getElementById('searchInput').value = '';
    document.getElementById('setorFilter').value = '';
    filterEmployee(list);
    sortFor(list);
}