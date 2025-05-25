window.onload = function () {
  alert("Hello Tej!");
};

function changeQty(id, change) {
  let qtySpan = document.getElementById(id);
  let currentQty = parseInt(qtySpan.textContent);
  let newQty = currentQty + change;
  if (newQty < 0) newQty = 0;
  qtySpan.textContent = newQty;
}

function calculate() {
  let samosaPrice =
    parseFloat(document.getElementById("samosaPrice").value) || 0;
  let samosaQty =
    parseInt(document.getElementById("samosaQty").textContent) || 0;
  let teaPrice = parseFloat(document.getElementById("teaPrice").value) || 0;
  let teaQty = parseInt(document.getElementById("teaQty").textContent) || 0;

  let samosaTotal = samosaPrice * samosaQty;
  let teaTotal = teaPrice * teaQty;

  document.getElementById("samosaTotal").textContent = samosaTotal;
  document.getElementById("teaTotal").textContent = teaTotal;

  let totalPrice = samosaTotal + teaTotal;
  document.getElementById("totalPrice").textContent = totalPrice;

  let vat = totalPrice * 0.13;
  let tip = totalPrice * 0.1;
  let discount = totalPrice * 0.1;

  document.getElementById("vat").textContent = vat.toFixed(2);
  document.getElementById("tip").textContent = tip.toFixed(2);
  document.getElementById("discount").textContent = discount.toFixed(2);

  let grandTotal = totalPrice + vat + tip - discount;
  document.getElementById("grandTotal").textContent = grandTotal.toFixed(2);

  let submit_btn = document.getElementById("submit_btn");
  let submit_message = document.getElementById("message");

  submit_btn.addEventListener("click", () => {
    submit_message.style.display = "block";
    fetch("http://localhost:3000/api/bills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ grandTotal: grandTotal.toFixed(2) }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Saved:", data))
      .catch((err) => console.error("Error:", err));
  });
}
