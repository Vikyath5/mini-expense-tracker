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

    totalAmount.textContent = ₹${total.toFixed(2)};
}

function displayExpenses() {
    expenseList.innerHTML = "";

    expenses.forEach((expense) => {
        const listItem = document.createElement("li");

        listItem.textContent =
            ${expense.name} - ₹${expense.amount.toFixed(2)};

        expenseList.appendChild(listItem);
    });
}

expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);

    if (!name || amount <= 0) {
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