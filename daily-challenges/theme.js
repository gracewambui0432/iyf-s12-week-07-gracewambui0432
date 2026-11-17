const themeToggle = document.getElementById("theme-toggle");

let currentTheme = localStorage.getItem("theme") || "light";

function applyTheme() {
    document.body.classList.toggle("dark", currentTheme === "dark");

    themeToggle.textContent =
        currentTheme === "dark"
            ? "Switch to Light Mode"
            : "Switch to Dark Mode";
}

applyTheme();

themeToggle.addEventListener("click", () => {
    currentTheme = currentTheme === "light" ? "dark" : "light";

    localStorage.setItem("theme", currentTheme);

    applyTheme();
});
