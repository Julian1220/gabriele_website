(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const errorEl = document.getElementById("contact-error");
  const successEl = document.getElementById("contact-success");

  function setError(msg) {
    if (successEl) successEl.textContent = "";
    if (errorEl) errorEl.textContent = msg || "";
  }

  function setSuccess(msg) {
    if (errorEl) errorEl.textContent = "";
    if (successEl) successEl.textContent = msg || "";
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // ⚠️ Seite NICHT neu laden

    setError("");
    setSuccess("");

    const firstname = form.firstname.value.trim();
    const lastname = form.lastname.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    // Frontend-Validierung
    if (!firstname || !lastname || !email || !subject || !message) {
      setError("Bitte alle Felder ausfüllen.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Bitte eine gültige E-Mail-Adresse eingeben.");
      return;
    }

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data || !data.success) {
        const msg =
          (data && data.message) ||
          "Leider ist ein Fehler aufgetreten. Bitte versuche es später erneut.";
        setError(msg);
        return;
      }

      // Erfolg
      setSuccess(data.message || "Danke, deine Nachricht wurde gesendet.");
      form.reset();
    } catch (err) {
      console.error(err);
      setError(
        "Es ist ein Verbindungsfehler aufgetreten. Bitte versuche es später erneut."
      );
    }
  });
})();
