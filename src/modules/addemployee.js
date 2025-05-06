import { atualPage } from '../../router.js';
import { employee } from '../data/employee.js';
import { filterEmployee } from '../pages/pageTable.js';

document.addEventListener("DOMContentLoaded", () => {
    const addemployee = document.getElementById("btnAdicionar");
    addemployee.addEventListener("click", () => addEmployee(employee));
});

function addEmployee(list){
    let newName = document.getElementById('novoNome').value
    let newSalary = document.getElementById('novoSalario').value
    let newDepartament = document.getElementById('novoSetor').value

    if (!newName || isNaN(newSalary) || !newDepartament) {
        alert("Preencha os campos")
    } else {
        const newList = {id: list.length, name: newName, salary: newSalary, department: newDepartament}
        list.push(newList)

        atualPage === 'table'
        ?filterEmployee(list)
        :renderPage(atualPage)
        
        document.getElementById('novoNome').value = ""
        document.getElementById('novoSalario').value = ""
        document.getElementById('novoSetor').value = ""
    }
} 