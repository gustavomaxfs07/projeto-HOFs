const employee = [
    { id: 0, name: 'João Silva', salary: 1500, department: 'TI' },
    { id: 1, name: 'Ana Clara', salary: 2500, department: 'RH' },
    { id: 2, name: 'Carlos Alberto', salary: 4000, department: 'Financeiro' },
    { id: 3, name: 'Marina Souza', salary: 3200, department: 'RH' },
    { id: 4, name: 'Paulo Henrique', salary: 2700, department: 'TI' },
    { id: 5, name: 'Fernanda Lima', salary: 5500, department: 'Financeiro' },
    { id: 6, name: 'Roberto Carlos', salary: 1800, department: 'RH' },
    { id: 7, name: 'Juliana Paz', salary: 3100, department: 'RH' },
    { id: 8, name: 'Bruno César', salary: 2000, department: 'TI' },
    { id: 9, name: 'Larissa Menezes', salary: 6000, department: 'Marketing' },
    { id: 10, name: 'Ricardo Leite', salary: 3500, department: 'Financeiro' },
    { id: 11, name: 'Camila Borges', salary: 2900, department: 'RH' }
];

let listFilter = [...employee]

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

function addEmployee(){
    let newName = document.getElementById('novoNome').value
    let newSalary = document.getElementById('novoSalario').value
    let newDepartament = document.getElementById('novoSetor').value

    if (newName == "" || newSalary == "" || newDepartament == ""){
        alert("Preencha os campos")
    } else {
        const newEmployee = {id: employee.length, name: newName, salary: newSalary, department: newDepartament}
        employee.push(newEmployee)
        listFilter = [...employee]

        if(interfaceTable){
            filterEmployee()
            renderTable(listFilter)
        } else {
            renderGraphics()
        }

        console.log(employee)
        console.log(listFilter)

        document.getElementById('novoNome').value = ""
        document.getElementById('novoSalario').value = ""
        document.getElementById('novoSetor').value = ""
    }
}


function filterEmployee() {
    let searchName = document.getElementById('searchInput').value.toLowerCase();
    let searchSalary = document.getElementById('minSalary').value;
    let searchDepartament = document.getElementById('setorFilter').value;
    
    if (searchName === "" && searchSalary === "" && searchDepartament === "") {
        listFilter = [...employee]
        renderTable(employee);
    } else {
        listFilter = employee.filter(person => {
            const nameMatch = searchName === "" || person.name.toLowerCase().includes(searchName);
            const salaryMatch = searchSalary === "" || person.salary >= parseFloat(searchSalary);
            const departmentMatch = searchDepartament === "" || person.department === searchDepartament;
            
            return nameMatch && salaryMatch && departmentMatch;
        });
        
        renderTable(listFilter);
        sortFor()
    }
}

const removeFilter = () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('minSalary').value = '';
    document.getElementById('setorFilter').value = '';
    filterEmployee()
    sortFor()
};

function sortFor() {
    const sort = document.getElementById('sort').value;

    switch (sort) {
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
            listFilter = [...enployee]
            break;
    }

    renderTable(listFilter)
}

let interfaceTable = true

function renderDefalt(){
    interfaceTable = true
    const sectionFilter = document.querySelector('#section-filter')
    const headerDefalt = document.querySelector('.headerTable')
    const bodyDefalt = document.querySelector('.bodyTable')

    sectionFilter.innerHTML = `
        <h2>Filtros & Ações</h2>
        <input type="text" placeholder="Buscar por nome..." id="searchInput" onchange="filterEmployee()"/>
  
        <select id="setorFilter" onchange="filterEmployee()">
          <option value="">Filtrar por setor</option>
          <option value="TI">TI</option>
          <option value="RH">RH</option>
          <option value="Financeiro">Financeiro</option>
          <option value="Marketing">Marketing</option>
        </select>
  
        <input type="number" placeholder="Salário mínimo..." id="minSalary" onchange="filterEmployee()"/>
        <button id="btnFiltrar" onclick="removeFilter()">🗑️ Remover Filtro</button>`

    headerDefalt.innerHTML = `
    <h2>Funcionários</h2>
        <select class="sidebar" id="sort" onchange="sortFor()">
          <option value="">Classificar por</option>
          <option value="maiorsalario">Maior salário</option>
          <option value="menorsalario">Menor Salário</option>
          <option value="order-az">A -> Z</option>
          <option value="order-za">Z -> A</option>
        </select>
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
}

window.onload = function() {
    // renderDefalt()
    // renderGraphics()
    reportRender()
}