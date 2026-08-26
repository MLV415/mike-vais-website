const groups = document.querySelectorAll(".nav-group");

function closeGroup(group, returnFocus = false) {
  group.classList.remove("is-open");
  const toggle = group.querySelector(".submenu-toggle");
  toggle?.setAttribute("aria-expanded", "false");
  if (returnFocus) toggle?.focus();
}

groups.forEach((group) => {
  const toggle = group.querySelector(".submenu-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = !group.classList.contains("is-open");
    groups.forEach((other) => closeGroup(other));
    if (willOpen) {
      group.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }
  });

  group.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeGroup(group, true);
  });
});

document.addEventListener("click", () => groups.forEach((group) => closeGroup(group)));
