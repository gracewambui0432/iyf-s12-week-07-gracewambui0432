const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchHistory = document.getElementById("search-history");
const searchResult = document.getElementById("search-result");

let recentSearches = [];

try {
    const savedSearches = JSON.parse(
        localStorage.getItem("recentSearches") || "[]"
    );

    recentSearches = Array.isArray(savedSearches) ? savedSearches : [];
} catch {
    recentSearches = [];
}

function displayHistory() {
    searchHistory.innerHTML = "";

    recentSearches.forEach((search) => {
        const listItem = document.createElement("li");

        listItem.textContent = search;

        listItem.addEventListener("click", () => {
            searchInput.value = search;
            performSearch(search);
        });

        searchHistory.appendChild(listItem);
    });
}

function performSearch(search) {
    searchResult.textContent = `You searched for: ${search}`;
}

function saveSearch() {
    const search = searchInput.value.trim();

    if (!search) {
        searchResult.textContent = "Please enter something to search.";
        return;
    }

    recentSearches = [
        search,
        ...recentSearches.filter((item) => item !== search)
    ].slice(0, 5);

    localStorage.setItem(
        "recentSearches",
        JSON.stringify(recentSearches)
    );

    performSearch(search);
    displayHistory();

    searchInput.value = "";
}

searchButton.addEventListener("click", saveSearch);

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        saveSearch();
    }
});

displayHistory();
