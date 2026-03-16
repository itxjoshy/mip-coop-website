async function sendForm(event) {
  event.preventDefault();
  const form = document.getElementById("contact-form");
  const formData = {};

  new FormData(form).forEach((value, key) => {
    formData[key] = value;
  });

  if (formData["bot_field"]) {
    // If the bot field is filled, it's a bot submission
    return;
  }

  //form validation
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
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    console.error("Error:", error);
    alert("⚠️ An error occurred while submitting the form.");
  }
}
