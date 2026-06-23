// Balance
let balance = localStorage.getItem("balance")
  ? parseFloat(localStorage.getItem("balance"))
  : 100000;

let portfolio = JSON.parse(localStorage.getItem("portfolio")) || [];

// Update balance if balanceBox exists
if (document.getElementById("balance")) {
  document.getElementById("balance").innerText = balance;
}

// Display portfolio if table exists
function displayPortfolio() {

  let tbody = document.querySelector("#portfolioTable tbody");

  if (!tbody) return;

  tbody.innerHTML = "";

  portfolio.forEach(asset => {

    let row = `
      <tr>
        <td>${asset.name}</td>
        <td>${asset.qty}</td>
        <td>$${asset.buyPrice}</td>
        <td>$${asset.qty * asset.buyPrice}</td>
      </tr>
    `;

    tbody.innerHTML += row;

  });

}

displayPortfolio();


// BUY
function buyAsset(name, price, qty) {

  let cost = price * qty;

  if (balance < cost) {
    alert("Insufficient Balance!");
    return;
  }

  balance -= cost;

  let found = portfolio.find(item => item.name === name);

  if (found) {
    found.qty += qty;
  } else {

    portfolio.push({
      name: name,
      qty: qty,
      buyPrice: price
    });

  }

  localStorage.setItem("balance", balance);
  localStorage.setItem("portfolio", JSON.stringify(portfolio));

  if (document.getElementById("balance")) {
    document.getElementById("balance").innerText = balance;
  }

  displayPortfolio();
let history = JSON.parse(localStorage.getItem("history")) || [];

history.push({
type:"BUY",
asset:name,
qty:qty,
price:price
});

localStorage.setItem("history", JSON.stringify(history));
  alert("Bought " + qty + " " + name);

}


// SELL
function sellAsset(name, price, qty) {

  let found = portfolio.find(item => item.name === name);

  if (!found || found.qty < qty) {
    alert("Not enough quantity!");
    return;
  }

  found.qty -= qty;

  balance += price * qty;

  portfolio = portfolio.filter(item => item.qty > 0);

  localStorage.setItem("balance", balance);
  localStorage.setItem("portfolio", JSON.stringify(portfolio));

  if (document.getElementById("balance")) {
    document.getElementById("balance").innerText = balance;
  }

  displayPortfolio();
let history = JSON.parse(localStorage.getItem("history")) || [];

history.push({
type:"SELL",
asset:name,
qty:qty,
price:price
});

localStorage.setItem("history", JSON.stringify(history));
  alert("Sold " + qty + " " + name);

}