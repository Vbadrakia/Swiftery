document.getElementById("locationForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;

    const response = await fetch("http://localhost:3000/location", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ latitude, longitude })
    });

    if (response.ok) {
        const data = await response.json();
        console.log("Location submitted successfully:", data);
        alert("Location submitted successfully!");
    } else {
        console.error("Error submitting location:", response.statusText);
        alert("Error submitting location.");
    }
});