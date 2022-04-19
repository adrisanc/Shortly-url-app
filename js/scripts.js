window.onload = () =>{
    const burgerMenu = document.getElementById("burger-icon");
    const navUl = document.getElementById("nav-ul");

    burgerMenu.addEventListener("click", ()=> {
        navUl.classList.toggle("show")
    })
    console.log("Hola desde el script");
}