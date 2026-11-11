// Carga todas las imágenes de la carpeta; si falta una, devuelve null (no rompe el build)
const files = import.meta.glob("../assets/images/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

export function resolveImage(name) {
  const key = Object.keys(files).find((k) => k.endsWith(`/${name}`));
  return key ? files[key] : null;
}
