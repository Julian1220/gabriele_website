document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".service-card"));
  const prevBtn = document.querySelector(".services__nav--prev");
  const nextBtn = document.querySelector(".services__nav--next");

  if (!cards.length || !prevBtn || !nextBtn) return;

  let current = 0;

  function showCard(nextIndex, direction) {
    if (nextIndex === current) return;

    const oldCard = cards[current];
    const maxIndex = cards.length;
    const newIndex = (nextIndex + maxIndex) % maxIndex;
    const newCard = cards[newIndex];

    // aktive Klassen vom alten entfernen
    oldCard.classList.remove(
      "is-active",
      "service-card--slide-in-left",
      "service-card--slide-in-right"
    );

    // Animation-Klasse für neue Card setzen
    newCard.classList.remove(
      "service-card--slide-in-left",
      "service-card--slide-in-right"
    );
    newCard.classList.add(
      "is-active",
      direction === "prev"
        ? "service-card--slide-in-left"
        : "service-card--slide-in-right"
    );

    current = newIndex;
  }

  prevBtn.addEventListener("click", () => {
    showCard(current - 1, "prev");
  });

  nextBtn.addEventListener("click", () => {
    showCard(current + 1, "next");
  });

  // optional: Tastatursteuerung
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") showCard(current - 1, "prev");
    if (e.key === "ArrowRight") showCard(current + 1, "next");
  });
});
