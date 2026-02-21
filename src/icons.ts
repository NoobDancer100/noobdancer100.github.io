const modules = import.meta.glob('./assets/icons/*.*', { eager: true });
export const icons: Record<string, string> = {};

for (const path in modules) {
  const fileName = path.split('/').pop()!.replace(/\.[^/.]+$/, '');
  const url = (modules[path] as any).default;
  icons[fileName] = url;
}