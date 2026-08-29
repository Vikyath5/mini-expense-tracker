const expenses = [];

const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");

function calculateTotal() {
    const total = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

    totalAmount.textContent = `₹${total.toFixed(2)}`;
}

function displayExpenses() {
    expenseList.innerHTML = "";

    expenses.forEach((expense, index) => {
        const listItem = document.createElement("li");

        listItem.textContent =
            `${expense.name} - ₹${expense.amount.toFixed(2)}`;

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteExpense(index);
        });

        listItem.appendChild(deleteButton);
        expenseList.appendChild(listItem);
    });

    filterExpenses();
}

function deleteExpense(index) {
    expenses.splice(index, 1);

    displayExpenses();
    calculateTotal();
}

expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);

    if (!name || !Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    expenses.push({
        name: name,
        amount: amount
    });

    displayExpenses();
    calculateTotal();

    expenseForm.reset();
});