import { renderLineTable, listFilter, setCurrentPage } from './pageTable.js'

export function sortFor() {
    const sortSelect = document.getElementById('sort').value;

    setCurrentPage(1)

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
            listFilter.sort((a, b) => a.id - b.id);
            break;
    }
    renderLineTable(listFilter)
}