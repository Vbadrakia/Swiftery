async function handleSignUp(event) {
    event.preventDefault(); // Prevent the default form submission
    const name = document.querySelector('input[placeholder="Enter your name"]').value;
    const email = document.querySelector('input[placeholder="Enter your email"]').value;
    const password = document.querySelector('input[placeholder="Enter your password"]').value;

    const response = await fetch("http://localhost:3000/create-user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    });

    if (response.ok) {
        const data = await response.json();
        alert("Welcom "+data.user.name); // Show success message
        window.location.href = "../HomePage/index.html"; // Redirect to homepage

    } else {
        const errorData = await response.json();
        alert(errorData.message); // Show error message
    }
}


document.querySelector("#form").addEventListener("submit",(e)=>{
    console.log("submit")
    handleSignUp(e);    
})

async function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const response = await fetch("http://localhost:3000/login", { 
        method: "POST", 
        headers: { 
            "Content-Type": "application/json" 
        }, 
        body: JSON.stringify({ email, password }) 
    });

    if (response.ok) {
        const data = await response.json();
        alert("Welcom "+data.user.name); // Show success message
        window.location.href = "Frontend\HomePage\index.html"; // Redirect to homepage

    } else {
        const errorData = await response.json();
        alert(errorData.message); // Show error message
    }
}

document.querySelector("#login").addEventListener("submit",(e)=>{
    handleLogin(e);
})
