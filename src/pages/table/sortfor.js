import { renderTable, listFilter, currentPage } from './pageTable.js'

export function sortFor() {
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