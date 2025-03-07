fetch("http://localhost:5000/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Example", value: "123" }),
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));


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