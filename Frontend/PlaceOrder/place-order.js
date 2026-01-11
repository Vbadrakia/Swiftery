// Clear the order ID when the page loads
window.addEventListener("load", () => {
  const orderIdElement = document.getElementById("order-id");
  if (orderIdElement) {
    orderIdElement.innerHTML = ""; // Clear the content
  }
});

// Load persisted data from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedOrder = localStorage.getItem("orderData");
  if (savedOrder) {
    document.getElementById("order-id").innerHTML = savedOrder;
  }
});

// Existing code for placing the order
document
  .getElementById("place-order-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const item = document.getElementById("item").value;
    const source = document.getElementById("source").value;
    const destination = document.getElementById("destination").value;
    const weight = document.getElementById("weight").value;

    try {
      const response = await fetch("http://localhost:3000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item, source, destination, weight }),
      });

      if (response.ok) {
        const data = await response.json();
        document.getElementById("order-id").innerHTML = `
          <p>Your Order ID is: <strong>${data.trackingId}</strong></p>
          <p>Total Bill: <strong>Rs. ${data.totalBill}</strong></p>
        `;
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while placing the order.");
    }
  });
