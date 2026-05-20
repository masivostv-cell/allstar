const STORAGE_KEY = "allStarMusicData";

function deepMerge(base, updates) {
  if (!updates) return base;
  const output = Array.isArray(base) ? [...base] : { ...base };
  Object.keys(updates).forEach((key) => {
    if (
      updates[key] &&
      typeof updates[key] === "object" &&
      !Array.isArray(updates[key]) &&
      base[key] &&
      typeof base[key] === "object" &&
      !Array.isArray(base[key])
    ) {
      output[key] = deepMerge(base[key], updates[key]);
    } else {
      output[key] = updates[key];
    }
  });
  return output;
}

function getSiteData() {
  const defaultData = window.ASM_DATA || {};
  try {
    const local = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return deepMerge(defaultData, local);
  } catch (error) {
    return defaultData;
  }
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value || "";
}

function setCssStarColor(color) {
  if (color) document.documentElement.style.setProperty("--star", color);
}

function renderStats(stats = []) {
  const container = document.getElementById("statsContainer");
  if (!container) return;
  container.innerHTML = stats.map((item) => `
    <article class="stat-card">
      <strong>${item.number || ""}</strong>
      <span>${item.label || ""}</span>
    </article>
  `).join("");
}

function renderServices(services = []) {
  const container = document.getElementById("servicesContainer");
  if (!container) return;
  container.innerHTML = services.map((service) => `
    <article class="info-card">
      <span class="icon">${service.icon || "★"}</span>
      <h3>${service.title || ""}</h3>
      <p>${service.text || ""}</p>
    </article>
  `).join("");
}

function renderToques(toques = []) {
  const container = document.getElementById("toquesContainer");
  if (!container) return;
  container.innerHTML = toques.map((toque) => `
    <article class="toque-card">
      <span class="toque-date">${toque.date || ""} · ${toque.time || ""}</span>
      <h3>${toque.title || ""}</h3>
      <p><strong>Lugar:</strong> ${toque.place || ""}</p>
      <p>${toque.description || ""}</p>
    </article>
  `).join("");
}

function renderCalendar(calendar = {}) {
  const box = document.getElementById("calendarBox");
  if (!box) return;
  setText("calendarNote", calendar.note || "");
  if (calendar.embedSrc) {
    box.innerHTML = `<iframe src="${calendar.embedSrc}" loading="lazy" title="Agenda de Google Calendar"></iframe>`;
  } else {
    box.innerHTML = `
      <div class="calendar-empty">
        <span>★</span>
        <h3>Agenda pendiente por conectar</h3>
        <p>Desde el panel de edición puedes pegar el enlace de inserción de Google Calendar.</p>
      </div>
    `;
  }
}

function renderFounder(founder = {}) {
  setText("founderName", founder.name);
  setText("founderRole", founder.role);
  setText("founderBio", founder.bio);

  const photoBox = document.querySelector(".founder-photo");
  if (!photoBox) return;

  if (founder.photo) {
    photoBox.innerHTML = `<img src="${founder.photo}" alt="${founder.name || "Fundador de All Star Music"}">`;
  } else {
    photoBox.innerHTML = `
      <div class="photo-placeholder">
        <span>★</span>
        <small>Foto del fundador</small>
      </div>
    `;
  }
}

function renderGallery(gallery = []) {
  const container = document.getElementById("galleryContainer");
  if (!container) return;

  container.innerHTML = gallery.map((photo) => {
    const image = photo.src
      ? `<img src="${photo.src}" alt="${photo.alt || photo.title || "Foto de All Star Music"}">`
      : `<div class="gallery-placeholder"><span>★</span><p>Espacio para foto</p></div>`;

    return `
      <article class="gallery-item">
        ${image}
        <div class="gallery-caption">${photo.title || "Foto"}</div>
      </article>
    `;
  }).join("");
}

function renderContact(data) {
  setText("contactText", data.contact?.text);
  setText("contactPhone", data.brand?.phone || "Por definir");
  setText("contactEmail", data.brand?.email || "Por definir");
  setText("contactLocation", data.brand?.location || "Colombia");

  const whatsappBtn = document.getElementById("whatsappBtn");
  const emailBtn = document.getElementById("emailBtn");

  if (whatsappBtn) {
    const phone = (data.brand?.whatsapp || "").replace(/\D/g, "");
    whatsappBtn.href = phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent("Hola, quiero cotizar una presentación de All Star Music.")}`
      : "#contacto";
  }

  if (emailBtn) {
    emailBtn.href = data.brand?.email ? `mailto:${data.brand.email}` : "#contacto";
  }
}

function renderSocial(social = {}) {
  const container = document.getElementById("socialLinks");
  if (!container) return;

  const labels = {
    instagram: "Instagram",
    facebook: "Facebook",
    tiktok: "TikTok",
    youtube: "YouTube"
  };

  container.innerHTML = Object.entries(social)
    .filter(([, url]) => url)
    .map(([key, url]) => `<a href="${url}" target="_blank" rel="noopener">${labels[key] || key}</a>`)
    .join("");
}

function renderSite() {
  const data = getSiteData();
  setCssStarColor(data.brand?.primaryColor);

  setText("brandName", data.brand?.name);
  setText("footerBrand", data.brand?.name);
  setText("heroTitle", data.hero?.title);
  setText("heroSubtitle", data.hero?.subtitle);
  setText("heroCardTitle", data.hero?.cardTitle);
  setText("heroCardText", data.hero?.cardText);
  setText("aboutText", data.about?.text);
  setText("year", new Date().getFullYear());

  renderStats(data.about?.stats);
  renderFounder(data.founder);
  renderToques(data.toques);
  renderServices(data.services);
  renderCalendar(data.calendar);
  renderGallery(data.gallery);
  renderContact(data);
  renderSocial(data.social);
}

document.addEventListener("DOMContentLoaded", () => {
  renderSite();

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => navLinks.classList.toggle("show"));
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => navLinks.classList.remove("show"));
    });
  }
});
