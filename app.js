const hambugerMenu = document.querySelector('.hamburger-menu');
const mobileMenu = document.querySelector('.mobile-menu')
const pathName = window.location.pathname;
const pageName = pathName.split("/").pop();


hambugerMenu.addEventListener('click', () =>{
    hambugerMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
})
if(pageName === "index.html"){
    document.querySelector('.home').classList.add("activeLink");
}
if(pageName === "about.html"){
    document.querySelector('.about').classList.add("activeLink");
}
if(pageName === "projects.html"){
    document.querySelector('.projects').classList.add("activeLink");
}
if(pageName === "contact.html"){
    document.querySelector('.contact').classList.add("activeLink");
}