import { employee } from '../../data/employee.js';
export let listFilter = [...employee]
const capitalize = texto => texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();

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
    renderTable(employee)
    initActions(employee)
}

let currentPage = 1;
let itemsPerPage = 8;

const renderTable = (listEmployee) => {
    const tableEmployee = document.getElementById("tabelaFuncionarios")
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = listEmployee.slice(start, end);

    tableEmployee.innerHTML = ""

    paginatedItems.forEach(({name, salary, department}) => {
        const line = document.createElement("tr");
        name = capitalize(name);
        line.innerHTML = `
            <td>${name}</td>
            <td>${salary}</td>
            <td>${department}</td>
        `;
        tableEmployee.appendChild(line);
    });

    renderPagination(listEmployee.length);
}

function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = document.getElementById("pagination");
    const ul = pagination.querySelector("ul");
    ul.innerHTML = "";

    // Previous
    ul.appendChild(createPaginationButton("<<", currentPage > 1, () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable(listFilter);
        }
    }));

    // Numbers
    for (let i = 1; i <= totalPages; i++) {
        ul.appendChild(createPaginationButton(i, true, () => {
            currentPage = i;
            renderTable(listFilter);
        }, currentPage === i));
    }

    // Next
    ul.appendChild(createPaginationButton(">>", currentPage < totalPages, () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderTable(listFilter);
        }
    }));
}

function createPaginationButton(label, enabled, onClick, isActive = false) {
    const li = document.createElement("li");
    li.className = `page-item ${!enabled ? "disabled" : ""} ${isActive ? "active" : ""}`;
    const a = document.createElement("a");
    a.className = "page-link";
    a.href = "#";
    a.textContent = label;
    if (enabled) {
        a.addEventListener("click", (e) => {
            e.preventDefault();
            onClick();
        });
    }
    li.appendChild(a);
    return li;
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

        currentPage = 1;
        renderTable(listFilter);
        sortFor()
    }
}

function sortFor() {
    const sortSelect = document.getElementById('sort').value;

    currentPage = 1;
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