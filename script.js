const roleData = {
  pr: {
    number: "01",
    kicker: "RELATIONSHIPS / COMMUNICATION / CULTURAL RELEVANCE",
    title: "Someone to build relationships.",
    list: [
      "Media & creator relations",
      "Campaign communications",
      "Press outreach & follow-up",
      "Partnerships & community"
    ],
    note: "Good stories matter. So does making sure the right people actually hear them."
  },
  pm: {
    number: "02",
    kicker: "STRUCTURE / ALIGNMENT / MOMENTUM",
    title: "Someone to keep projects moving.",
    list: [
      "Timelines & priorities",
      "Stakeholder coordination",
      "Cross-functional communication",
      "Calm last-minute problem solving"
    ],
    note: "I like the space between a good idea and a successful launch. That is usually where the work is."
  },
  production: {
    number: "03",
    kicker: "DETAILS / DELIVERY / REAL LIFE",
    title: "Someone who can actually execute.",
    list: [
      "Events",
      "Showroom Events",
      "Guest experience",
      "Partners, suppliers & logistics",
      "On-site delivery"
    ],
    note: "Because every event still needs a guest list, a run sheet, a room and someone noticing what is about to go wrong."
  }
};

const tabs = document.querySelectorAll(".role-tab");
const roleNumber = document.querySelector("#roleNumber");
const roleKicker = document.querySelector("#roleKicker");
const roleTitle = document.querySelector("#roleTitle");
const roleList = document.querySelector("#roleList");
const roleNote = document.querySelector("#roleNote");

function renderRole(key) {
  const data = roleData[key];
  const panel = document.querySelector(".role-panel");
  panel.animate(
    [{ opacity: .25, transform: "translateY(10px)" }, { opacity: 1, transform: "translateY(0)" }],
    { duration: 340, easing: "ease-out" }
  );
  roleNumber.textContent = data.number;
  roleKicker.textContent = data.kicker;
  roleTitle.textContent = data.title;
  roleNote.textContent = data.note;
  roleList.innerHTML = data.list.map((item, index) => `<li><span>0${index + 1}</span>${item}</li>`).join("");
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(item => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    renderRole(tab.dataset.role);
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      if (entry.target.classList.contains("workflow-board")) {
        entry.target.classList.add("is-visible");
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .14 });

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min((index % 4) * 70, 210)}ms`;
  observer.observe(element);
});

const cursorDot = document.querySelector(".cursor-dot");
const cursorLabel = document.querySelector(".cursor-label");

window.addEventListener("pointermove", event => {
  cursorDot.style.left = `${event.clientX}px`;
  cursorDot.style.top = `${event.clientY}px`;
  cursorLabel.style.left = `${event.clientX}px`;
  cursorLabel.style.top = `${event.clientY}px`;
});

document.querySelectorAll("a, button, .case-card").forEach(element => {
  element.addEventListener("pointerenter", () => cursorDot.style.transform = "translate(-50%,-50%) scale(2.4)");
  element.addEventListener("pointerleave", () => cursorDot.style.transform = "translate(-50%,-50%) scale(1)");
});

document.querySelectorAll(".case-card").forEach(card => {
  card.addEventListener("pointerenter", () => {
    cursorLabel.textContent = "OPEN CASE";
    cursorLabel.classList.add("show");
  });
  card.addEventListener("pointerleave", () => cursorLabel.classList.remove("show"));
  card.addEventListener("click", () => card.classList.toggle("open"));
});

// Subtle magnetic movement on larger pointer-based screens.
document.querySelectorAll(".magnetic").forEach(element => {
  element.addEventListener("pointermove", event => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * .025;
    const y = (event.clientY - rect.top - rect.height / 2) * .025;
    element.style.transform = `translate(${x}px, ${y}px)`;
  });
  element.addEventListener("pointerleave", () => element.style.transform = "translate(0,0)");
});
