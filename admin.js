const STORAGE_KEY = "allStarMusicData";

let data = structuredClone(window.ASM_DATA || {});

function loadData() {
  try {
    const local = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (local) data = local;
  } catch (error) {
    data = structuredClone(window.ASM_DATA || {});
  }
}

function $(id) {
  return document.getElementById(id);
}

function showToast(message = "Guardado correctamente") {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

function setValue(id, value = "") {
  const element = $(id);
  if (element) element.value = value;
}

function getValue(id) {
  const element = $(id);
  return element ? element.value.trim() : "";
}

function downloadFile(filename, content, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function dataJsContent(currentData) {
  return `window.ASM_DATA = ${JSON.stringify(currentData, null, 2)};`;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve("");
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("No se pudo leer la imagen."));
    reader.readAsDataURL(file);
  });
}

function renderPreview(containerId, src) {
  const container = $(containerId);
  if (!container) return;
  container.innerHTML = src ? `<img src="${src}" alt="Vista previa">` : "";
}

function fillMainFields() {
  setValue("brand_name", data.brand?.name);
  setValue("brand_primaryColor", data.brand?.primaryColor || "#f5c542");
  setValue("brand_phone", data.brand?.phone);
  setValue("brand_whatsapp", data.brand?.whatsapp);
  setValue("brand_email", data.brand?.email);
  setValue("brand_location", data.brand?.location);

  setValue("hero_title", data.hero?.title);
  setValue("hero_subtitle", data.hero?.subtitle);
  setValue("hero_cardTitle", data.hero?.cardTitle);
  setValue("hero_cardText", data.hero?.cardText);

  setValue("about_text", data.about?.text);

  setValue("founder_name", data.founder?.name);
  setValue("founder_role", data.founder?.role);
  setValue("founder_bio", data.founder?.bio);
  setValue("founder_photo", data.founder?.photo);
  renderPreview("founderPhotoPreview", data.founder?.photo);

  setValue("calendar_embedSrc", data.calendar?.embedSrc);
  setValue("calendar_note", data.calendar?.note);

  setValue("contact_text", data.contact?.text);

  setValue("social_instagram", data.social?.instagram);
  setValue("social_facebook", data.social?.facebook);
  setValue("social_tiktok", data.social?.tiktok);
  setValue("social_youtube", data.social?.youtube);
}

function itemShell(title, index, removeHandlerName) {
  return `
    <div class="editor-item-head">
      <strong>${title} ${index + 1}</strong>
      <button type="button" class="remove-btn" data-action="${removeHandlerName}" data-index="${index}">Eliminar</button>
    </div>
  `;
}

function renderStatsEditor() {
  const container = $("statsEditor");
  container.innerHTML = (data.about.stats || []).map((item, index) => `
    <div class="editor-item">
      ${itemShell("Indicador", index, "removeStat")}
      <div class="form-grid">
        <label>Número / símbolo
          <input data-group="stats" data-index="${index}" data-field="number" value="${item.number || ""}">
        </label>
        <label>Texto
          <input data-group="stats" data-index="${index}" data-field="label" value="${item.label || ""}">
        </label>
      </div>
    </div>
  `).join("");
}

function renderServicesEditor() {
  const container = $("servicesEditor");
  container.innerHTML = (data.services || []).map((item, index) => `
    <div class="editor-item">
      ${itemShell("Servicio", index, "removeService")}
      <div class="form-grid">
        <label>Ícono
          <input data-group="services" data-index="${index}" data-field="icon" value="${item.icon || ""}">
        </label>
        <label>Título
          <input data-group="services" data-index="${index}" data-field="title" value="${item.title || ""}">
        </label>
      </div>
      <label>Descripción
        <textarea data-group="services" data-index="${index}" data-field="text" rows="3">${item.text || ""}</textarea>
      </label>
    </div>
  `).join("");
}

function renderToquesEditor() {
  const container = $("toquesEditor");
  container.innerHTML = (data.toques || []).map((item, index) => `
    <div class="editor-item">
      ${itemShell("Toque", index, "removeToque")}
      <div class="form-grid">
        <label>Fecha
          <input data-group="toques" data-index="${index}" data-field="date" value="${item.date || ""}">
        </label>
        <label>Hora
          <input data-group="toques" data-index="${index}" data-field="time" value="${item.time || ""}">
        </label>
        <label>Título
          <input data-group="toques" data-index="${index}" data-field="title" value="${item.title || ""}">
        </label>
        <label>Lugar
          <input data-group="toques" data-index="${index}" data-field="place" value="${item.place || ""}">
        </label>
      </div>
      <label>Descripción
        <textarea data-group="toques" data-index="${index}" data-field="description" rows="3">${item.description || ""}</textarea>
      </label>
    </div>
  `).join("");
}

function renderGalleryEditor() {
  const container = $("galleryEditor");
  container.innerHTML = (data.gallery || []).map((item, index) => `
    <div class="editor-item">
      ${itemShell("Foto", index, "removePhoto")}
      <div class="form-grid">
        <label>Título
          <input data-group="gallery" data-index="${index}" data-field="title" value="${item.title || ""}">
        </label>
        <label>Texto alternativo
          <input data-group="gallery" data-index="${index}" data-field="alt" value="${item.alt || ""}">
        </label>
      </div>
      <label>Subir imagen
        <input type="file" accept="image/*" data-photo-upload="${index}">
      </label>
      <input type="hidden" data-group="gallery" data-index="${index}" data-field="src" value="${item.src || ""}">
      <div class="image-preview">${item.src ? `<img src="${item.src}" alt="Vista previa">` : ""}</div>
    </div>
  `).join("");
}

function renderAllEditors() {
  renderStatsEditor();
  renderServicesEditor();
  renderToquesEditor();
  renderGalleryEditor();
}

function collectMainFields() {
  data.brand = {
    name: getValue("brand_name"),
    primaryColor: getValue("brand_primaryColor") || "#f5c542",
    phone: getValue("brand_phone"),
    whatsapp: getValue("brand_whatsapp"),
    email: getValue("brand_email"),
    location: getValue("brand_location")
  };

  data.hero = {
    title: getValue("hero_title"),
    subtitle: getValue("hero_subtitle"),
    cardTitle: getValue("hero_cardTitle"),
    cardText: getValue("hero_cardText")
  };

  data.about.text = getValue("about_text");

  data.founder = {
    name: getValue("founder_name"),
    role: getValue("founder_role"),
    bio: getValue("founder_bio"),
    photo: getValue("founder_photo")
  };

  data.calendar = {
    embedSrc: getValue("calendar_embedSrc"),
    note: getValue("calendar_note")
  };

  data.contact = {
    text: getValue("contact_text")
  };

  data.social = {
    instagram: getValue("social_instagram"),
    facebook: getValue("social_facebook"),
    tiktok: getValue("social_tiktok"),
    youtube: getValue("social_youtube")
  };
}

function collectDynamicFields() {
  document.querySelectorAll("[data-group]").forEach((element) => {
    const group = element.dataset.group;
    const index = Number(element.dataset.index);
    const field = element.dataset.field;

    if (group === "stats") {
      data.about.stats[index][field] = element.value;
    } else {
      data[group][index][field] = element.value;
    }
  });
}

function saveLocal() {
  collectMainFields();
  collectDynamicFields();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  showToast("Cambios guardados en este navegador");
}

function addEventListeners() {
  $("saveBtn").addEventListener("click", saveLocal);
  $("saveLocalBtn").addEventListener("click", saveLocal);

  $("addStatBtn").addEventListener("click", () => {
    data.about.stats.push({ number: "★", label: "Nuevo indicador" });
    renderStatsEditor();
  });

  $("addServiceBtn").addEventListener("click", () => {
    data.services.push({ icon: "⭐", title: "Nuevo servicio", text: "Descripción del servicio." });
    renderServicesEditor();
  });

  $("addToqueBtn").addEventListener("click", () => {
    data.toques.push({ date: "Próximamente", time: "Por confirmar", title: "Nuevo toque", place: "Lugar", description: "Descripción del evento." });
    renderToquesEditor();
  });

  $("addPhotoBtn").addEventListener("click", () => {
    data.gallery.push({ title: "Nueva foto", src: "", alt: "Foto de All Star Music" });
    renderGalleryEditor();
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const index = Number(button.dataset.index);
    const action = button.dataset.action;

    if (action === "removeStat") data.about.stats.splice(index, 1);
    if (action === "removeService") data.services.splice(index, 1);
    if (action === "removeToque") data.toques.splice(index, 1);
    if (action === "removePhoto") data.gallery.splice(index, 1);

    renderAllEditors();
  });

  document.addEventListener("input", (event) => {
    const element = event.target;
    if (!element.dataset.group) return;

    const group = element.dataset.group;
    const index = Number(element.dataset.index);
    const field = element.dataset.field;

    if (group === "stats") {
      data.about.stats[index][field] = element.value;
    } else {
      data[group][index][field] = element.value;
    }
  });

  document.addEventListener("change", async (event) => {
    const element = event.target;

    if (element.id === "founder_photoFile") {
      const base64 = await fileToBase64(element.files[0]);
      setValue("founder_photo", base64);
      data.founder.photo = base64;
      renderPreview("founderPhotoPreview", base64);
    }

    if (element.dataset.photoUpload !== undefined) {
      const index = Number(element.dataset.photoUpload);
      const base64 = await fileToBase64(element.files[0]);
      data.gallery[index].src = base64;
      renderGalleryEditor();
    }
  });

  $("exportDataBtn").addEventListener("click", () => {
    saveLocal();
    downloadFile("data.js", dataJsContent(data), "application/javascript");
  });

  $("exportJsonBtn").addEventListener("click", () => {
    saveLocal();
    downloadFile("all-star-music-respaldo.json", JSON.stringify(data, null, 2), "application/json");
  });

  $("importJsonInput").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        data = JSON.parse(reader.result);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        fillMainFields();
        renderAllEditors();
        showToast("Respaldo importado");
      } catch (error) {
        showToast("El archivo JSON no es válido");
      }
    };
    reader.readAsText(file);
  });

  $("resetBtn").addEventListener("click", () => {
    const confirmReset = confirm("¿Seguro que quieres restaurar el contenido original?");
    if (!confirmReset) return;
    localStorage.removeItem(STORAGE_KEY);
    data = structuredClone(window.ASM_DATA || {});
    fillMainFields();
    renderAllEditors();
    showToast("Contenido original restaurado");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadData();
  fillMainFields();
  renderAllEditors();
  addEventListeners();
});
