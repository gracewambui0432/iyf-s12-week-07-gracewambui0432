
const form = document.getElementById("contact-form");
const inputs = form.querySelectorAll("input, textarea");
const status = document.getElementById("status");

// Restore saved values and save changes
inputs.forEach(input => {
    const savedValue = sessionStorage.getItem(`form_${input.name}`);

    if (savedValue !== null) {
        input.value = savedValue;
    }

    input.addEventListener("input", () => {
        sessionStorage.setItem(`form_${input.name}`, input.value);
        status.textContent = "Your information has been saved!";
    });
});

// Handle form submission
form.addEventListener("submit", event => {
    event.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    inputs.forEach(input => {
        sessionStorage.removeItem(`form_${input.name}`);
    });

    form.reset();

    status.textContent = "Your message has been submitted successfully!";
});
