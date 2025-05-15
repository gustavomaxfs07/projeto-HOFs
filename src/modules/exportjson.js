import { employee } from "../data/employee.js";

const btnExport = document.getElementById("btnExport");
btnExport.addEventListener("click", () => exportEmployeeJSON(employee))

function exportEmployeeJSON(list) {
    list.sort((a, b) => a.id - b.id);
    const dataStr = JSON.stringify(list, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "funcionarios.json";
    a.click();
    URL.revokeObjectURL(url);
}