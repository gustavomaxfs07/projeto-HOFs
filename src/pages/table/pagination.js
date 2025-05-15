import { renderLineTable, setCurrentPage, listFilter, setItemsPerPage, itemsPerPage, currentPage } from "./pageTable.js";

export function selectItemPerPage(){
    const paginationSelect = document.getElementById("itemPagination");
    paginationSelect.addEventListener("change", () => {
        let items2 = parseInt(paginationSelect.value);
        setItemsPerPage(items2)
        setCurrentPage(1)
        renderLineTable(listFilter);
    });
}

export function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = document.getElementById("pagination");
    const ul = pagination.querySelector("ul");

    ul.innerHTML = "";

    ul.appendChild(createPaginationButton("<<", currentPage > 1, () => {
        if (currentPage > 1) {
            currentPage--;
            renderLineTable(listFilter);
        }
    }));


    for (let i = 1; i <= totalPages; i++) {
        ul.appendChild(createPaginationButton(i, true, () => {
            setCurrentPage(i);
            renderLineTable(listFilter);
        }, currentPage === i));
    }


    ul.appendChild(createPaginationButton(">>", currentPage < totalPages, () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderLineTable(listFilter);
        }
    }));
}

export function createPaginationButton(number, enabled, onClick, isActive = false) {
    const li = document.createElement("li");
    li.className = `page-item ${!enabled ? "disabled" : ""} ${isActive ? "active" : ""}`;

    const a = document.createElement("a");
    a.className = "page-link";
    a.href = "#";
    a.textContent = number;

    if (enabled) {
        a.addEventListener("click", (e) => {
            e.preventDefault();
            onClick();
        });
    }
    
    li.appendChild(a);
    return li;
}