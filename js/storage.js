function saveExpenses(expenses) {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function loadExpenses() {
    const storedExpenses = localStorage.getItem("expenses");

    if (!storedExpenses) {
        return [];
    }

    return JSON.parse(storedExpenses);
}