const expenseFilter = document.getElementById("expenseFilter");

function filterExpenses() {
    const filterText = expenseFilter.value.toLowerCase().trim();

    const items = expenseList.querySelectorAll("li");

    items.forEach((item) => {
        const expenseText = item.textContent.toLowerCase();

        if (expenseText.includes(filterText)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
}

expenseFilter.addEventListener("input", filterExpenses);