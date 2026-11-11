import type { CampusEvent, Category } from "../types/campus-event";

// Saf fonksiyonlar: girdi alır, yeni sonuç döndürür, DOM'a dokunmaz.

/** Başlıkta veya açıklamada metin geçen etkinlikler (Türkçe harf duyarlı küçültme) */
export function searchEvents(list: CampusEvent[], text: string): CampusEvent[] {
  const q = text.trim().toLocaleLowerCase("tr-TR");
  if (!q) return list;
  return list.filter(
    (e) =>
      e.title.toLocaleLowerCase("tr-TR").includes(q) ||
      e.description.toLocaleLowerCase("tr-TR").includes(q),
  );
}

/** "" seçiliyse liste aynen, değilse sadece o kategori */
export function filterByCategory(
  list: CampusEvent[],
  category: Category | "",
): CampusEvent[] {
  if (category === "") return list;
  return list.filter((e) => e.category === category);
}

/** Tek etkinlik ya da undefined */
export function findEventById(
  list: CampusEvent[],
  id: string,
): CampusEvent | undefined {
  return list.find((e) => e.id === id);
}
