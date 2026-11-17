const form = document.getElementById("contact-form");
const saveStatus = document.getElementById("save-status");

const STORAGE_KEY = "contactFormData";

function loadFormData() {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
        return;
    }

    try {
        const formData = JSON.parse(savedData);

        Object.entries(formData).forEach(([name, value]) => {
            const input = form.elements.namedItem(name);

            if (input) {
                input.value = value;
            }
        });

        saveStatus.textContent = "Your saved information has been restored.";
    } catch {
        localStorage.removeItem(STORAGE_KEY);
        saveStatus.textContent = "Saved information was invalid.";
    }
}

function saveFormData() {
    const formData = Object.fromEntries(new FormData(form));

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

    saveStatus.textContent = "Your information has been saved!";
}

loadFormData();

const autoSave = setInterval(saveFormData, 5000);

form.addEventListener("submit", (event) => {
    event.preventDefault();

    localStorage.removeItem(STORAGE_KEY);

    clearInterval(autoSave);

    form.reset();

    saveStatus.textContent = "Form submitted successfully!";
});
