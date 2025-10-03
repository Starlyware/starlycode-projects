/*
  Project: Elegant Top Navigation
  Author: Gianluca Grasso (https://github.com/gian-grasso)
  License: http://www.apache.org/licenses/LICENSE-2.0
*/

//Toggle mobile menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

//Toggle dropdown
const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(drop => {
    drop.addEventListener("click", function(e) {
        if(window.innerWidth <= 768){
            e.preventDefault(); // prevent link jump
            const menu = this.querySelector(".dropdown-menu");
            menu.style.display = (menu.style.display === "block") ? "none" : "block";
        }
    });
});

//Close dropdown when clicking outside
document.addEventListener("click", function(e) {
    dropdowns.forEach(drop => {
        const menu = drop.querySelector(".dropdown-menu");
        if (!drop.contains(e.target)) {
            menu.style.display = "none";
        }
    });
});