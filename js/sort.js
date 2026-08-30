function sortExpenses(expenses, sortType) {
    const sortedExpenses = [...expenses];

    if (sortType === "name-asc") {
        sortedExpenses.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    if (sortType === "amount-asc") {
        sortedExpenses.sort((a, b) =>
            a.amount - b.amount
        );
    }

    if (sortType === "amount-desc") {
        sortedExpenses.sort((a, b) =>
            b.amount - a.amount
        );
    }

    return sortedExpenses;
}