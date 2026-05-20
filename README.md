# All Star Music - Página web

Proyecto web estático listo para publicar en GitHub Pages.

## Archivos principales

- `index.html`: página pública.
- `admin.html`: panel de edición visual.
- `css/styles.css`: estilos profesionales en negro, gris y amarillo estrella.
- `js/data.js`: contenido editable de la página.
- `js/app.js`: carga y muestra la información en la página.
- `js/admin.js`: lógica del panel de edición.

## Cómo editar sin tocar código

1. Abre `admin.html` en el navegador.
2. Cambia textos, servicios, toques, contacto, agenda y fotos.
3. Haz clic en **Guardar en este navegador** para probar los cambios en tu computador.
4. Abre `index.html` para ver la página actualizada en ese navegador.
5. Para publicar los cambios en GitHub:
   - En `admin.html`, haz clic en **Descargar data.js**.
   - Reemplaza el archivo `js/data.js` del repositorio por el nuevo.
   - Sube el cambio a GitHub.

## Agenda de Google Calendar

En Google Calendar:
1. Entra desde computador.
2. Configuración.
3. Selecciona el calendario.
4. Integrar calendario.
5. Copia el código de inserción.
6. En el panel, pega solo el valor que aparece dentro de `src=""`.

Ejemplo:
```html
<iframe src="https://calendar.google.com/calendar/embed?src=..." ...></iframe>
```

En el panel debes pegar:
```txt
https://calendar.google.com/calendar/embed?src=...
```

## Publicar en GitHub Pages

1. Crea un repositorio.
2. Sube todos estos archivos.
3. Ve a Settings > Pages.
4. En Source selecciona Deploy from a branch.
5. Selecciona la rama `main` y carpeta `/root`.
6. Guarda.

## Importante

GitHub Pages es estático. Eso significa que el botón Guardar del panel no puede modificar automáticamente el repositorio en la nube. Para publicar cambios globales, debes exportar `data.js` y subirlo al repositorio, o usar un CMS/backend.
