gsap.to("#nav", {
    
    backgroundColor: "#233329",
    height: "110px",
    duration: 0.5,
    scrollTrigger: {
        trigger: "#nav",                                  //navbar will be of green color with this gsap to full page 
        scroller: "body",
        // markers: true,
        start: "top -10%",
        end: "top -11%",
        scrub: 1
    }
})

gsap.to("#main", {
    backgroundColor: "#233329",
    scrollTrigger: {
        trigger: "#main",
        scroller: "body",                                 //giving black to full page with this gsap
        // markers: true,
        start: "top -25%",
        end: "top -70%",
        scrub: 2
    }
})

gsap.from("#about-us img, #about-us-in", {
    y: 50,
    opacity: 0,
    duration: 1,
    stragger: 0.4,  //Ek ek karine avse 
    scrollTrigger: {                                     //about-us (2) images will come with scrolling with this gsap
        trigger: "#about-us",
        scroller: "body",
        start: "top 70%",
        end: "top 65%",
        scrub: 1
    }
})

gsap.from(".card", {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    stragger: 0.4,  //Ek ek karine avse 
    scrollTrigger: {                                     //card (3)images will come with scrolling with this gsap
        trigger: ".card",
        scroller: "body",
        start: "top 70%",
        end: "top 65%",
        scrub: 1
    }
})

gsap.from("#colon1",{
    y:-70,
    x:-70,
    scrollTrigger:{
        trigger:"#colon1",
        scroller:"body",                                 //colon1 will come with scrolling with this gsap
        start:"top 55%",
        end:"top 45%",
        scrub:4
    }
})

gsap.from("#colon2",{
    y:70,
    x:70,
    scrollTrigger:{
        trigger:"#colon1",
        scroller:"body",                                 //colon2 will come with scrolling with this gsap
        start:"top 55%",
        end:"top 45%",
        scrub:4
    }
})

// Handle order creation (only if form exists)
if (document.getElementById("move-form")) {
    document.getElementById("move-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        const source = document.getElementById("source").value;
        const destination = document.getElementById("destination").value;

        // Display the entered values on the page
        document.getElementById("order-status").innerHTML = `
            <p><strong>Source:</strong> ${source}</p>
            <p><strong>Destination:</strong> ${destination}</p>
        `;

        // Debugging logs
        console.log("Source:", source);
        console.log("Destination:", destination);

        const response = await fetch("http://localhost:5555/create-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ source, destination }),
        });

        if (response.ok) {
            const data = await response.json();
            alert(`Order created successfully! Your tracking ID is: ${data.trackingId}`);
        } else {
            alert("Error creating order. Please try again.");
        }
    });
}

// Handle order tracking (only if form exists)
if (document.getElementById("track-form")) {
    document.getElementById("track-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        const trackingId = document.getElementById("trackingId").value;

        const response = await fetch(`http://localhost:5555/track-order/${trackingId}`);
        if (response.ok) {
            const data = await response.json();
            const order = data.order;

            // Display order details without a map
            document.getElementById("order-status").innerHTML = `
                <p><strong>Source:</strong> ${order.source}</p>
                <p><strong>Destination:</strong> ${order.destination}</p>
                <p><strong>Status:</strong> ${order.status}</p>
            `;
        } else {
            alert("Order not found. Please check your tracking ID.");
        }
    });
}
