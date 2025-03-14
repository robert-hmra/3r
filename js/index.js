
document.addEventListener("DOMContentLoaded", function () {
    var dropdowns = document.querySelectorAll(".dropdown-submenu > a");

    dropdowns.forEach(function (dropdown) {
        dropdown.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            let submenu = this.nextElementSibling;
            if (submenu.style.display === "block") {
                submenu.style.display = "none";
            } else {
                if (window.innerWidth > 768) {
                    // Em telas grandes, submenu abre ao lado
                    submenu.style.display = "block";
                    submenu.style.position = "absolute";
                    submenu.style.left = "100%";
                    submenu.style.top = "0px";
                } else {
                    // Em telas pequenas, submenu abre abaixo
                    submenu.style.display = "block";
                    submenu.style.position = "absolute";
                    submenu.style.left = "0";
                    submenu.style.top = "auto";
                }
            }
        });
    });
});
