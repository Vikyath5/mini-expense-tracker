const expenses = loadExpenses();

const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");
const expenseSummary = document.getElementById("expenseSummary");
const expenseSort = document.getElementById("expenseSort");
const expenseStatistics = document.getElementById("expenseStatistics");

function calculateTotal() {
    const total = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

    totalAmount.textContent = `₹${total.toFixed(2)}`;
}

function displaySummary() {
    const summary = {};

    expenses.forEach((expense) => {
        if (!summary[expense.category]) {
            summary[expense.category] = 0;
        }

        summary[expense.category] += expense.amount;
    });

    expenseSummary.innerHTML = "";

    Object.entries(summary).forEach(([category, amount]) => {
        const listItem = document.createElement("li");

        listItem.textContent =
            `${category}: ₹${amount.toFixed(2)}`;

        expenseSummary.appendChild(listItem);
    });
}

function displayStatistics() {
    expenseStatistics.innerHTML = "";

    if (expenses.length === 0) {
        const listItem = document.createElement("li");

        listItem.textContent = "No expenses available.";

        expenseStatistics.appendChild(listItem);

        return;
    }

    const amounts = expenses.map((expense) => expense.amount);

    const total = amounts.reduce(
        (sum, amount) => sum + amount,
        0
    );

    const average = total / amounts.length;
    const highest = Math.max(...amounts);
    const lowest = Math.min(...amounts);

    const statistics = [
        `Number of expenses: ${expenses.length}`,
        `Average expense: ₹${average.toFixed(2)}`,
        `Highest expense: ₹${highest.toFixed(2)}`,
        `Lowest expense: ₹${lowest.toFixed(2)}`
    ];

    statistics.forEach((text) => {
        const listItem = document.createElement("li");

        listItem.textContent = text;

        expenseStatistics.appendChild(listItem);
    });
}

function displayExpenses() {
    expenseList.innerHTML = "";

    const sortedExpenses = sortExpenses(
        expenses,
        expenseSort.value
    );

    sortedExpenses.forEach((expense) => {
        const originalIndex = expenses.indexOf(expense);

        const listItem = document.createElement("li");

        listItem.textContent =
            `${expense.name} - ₹${expense.amount.toFixed(2)} (${expense.category})`;

        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.addEventListener("click", () => {
            editExpense(originalIndex);
        });

        listItem.appendChild(editButton);

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            deleteExpense(originalIndex);
        });

        listItem.appendChild(deleteButton);

        expenseList.appendChild(listItem);
    });

    filterExpenses();
    displaySummary();
    displayStatistics();
}

function editExpense(index) {
    const expense = expenses[index];

    const newName = prompt(
        "Enter expense name:",
        expense.name
    );

    if (newName === null) {
        return;
    }

    const newAmount = prompt(
        "Enter expense amount:",
        expense.amount
    );

    if (newAmount === null) {
        return;
    }

    const amount = Number(newAmount);

    if (
        !newName.trim() ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    expense.name = newName.trim();
    expense.amount = amount;

    saveExpenses(expenses);

    displayExpenses();
    calculateTotal();
}

function deleteExpense(index) {
    expenses.splice(index, 1);

    saveExpenses(expenses);

    displayExpenses();
    calculateTotal();
}

expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);
    const category = expenseCategory.value;

    if (
        !name ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    expenses.push({
        name: name,
        amount: amount,
        category: category
    });

    saveExpenses(expenses);

    displayExpenses();
    calculateTotal();

    expenseForm.reset();
});

expenseSort.addEventListener("change", displayExpenses);

displayExpenses();
calculateTotal();