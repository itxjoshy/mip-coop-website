window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  params.forEach((value, key) => {
    const input = document.querySelector(`[name="${key}"]`);
    if (input) input.value = value;
  });
});

async function sendForm(event) {
  event.preventDefault();

  const form = document.getElementById("main-form");
  const formData = {};

  // Collect all input values
  new FormData(form).forEach((value, key) => {
    formData[key] = value.trim();
  });

  // Honeypot check
  if (formData["bot_field"]) {
    alert("Spam detected.");
    return;
  }

  // Validate all required fields
  let valid = true;
  let firstInvalid = null;
  form.querySelectorAll("[required]").forEach((field) => {
    if (!field.value.trim()) {
      valid = false;
      field.style.border = "2px solid red";
      if (!firstInvalid) firstInvalid = field;
    } else {
      field.style.border = "";
    }
  });

  if (!valid) {
    alert("Please fill in all required fields.");
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  try {
    // Submit to Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (result.success) {
      alert("✅ Form submitted successfully!");
      form.reset();
      window.location.href = "home.html";
    } else {
      alert("❌ Submission failed: " + (result.message || ""));
    }
  } catch (error) {
    console.error(error);
    alert("⚠️ An error occurred while submitting the form.");
  }
}
