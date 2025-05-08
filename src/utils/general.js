import { employee } from '../data/employee.js';

export function getDepartments(list){
    return list = [...new Set(employee.map(e => e.department))];
}

export function salaryInOrder(list) {
    return list.sort((a, b) => a.salary - b.salary);
}

export function BRL(value){
    return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function percentageBySector(list, sector){
    
}