import type { ChangeEvent } from "react";
import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  category: Category | "";
  categories: Category[];
  onSearchChange: (text: string) => void;
  onCategoryChange: (category: Category | "") => void;
}

// Kutular burada çizilir ama değerler App'te tutulur (lifting state):
// bileşen değeri props'tan okur, değişikliği callback ile yukarı bildirir.
function EventFilter(props: EventFilterProps) {
  const { searchText, category, categories, onSearchChange, onCategoryChange } = props;

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    onSearchChange(e.target.value);
  }

  function handleCategory(e: ChangeEvent<HTMLSelectElement>) {
    onCategoryChange(e.target.value as Category | "");
  }

  return (
    <form className="filtre" role="search" aria-label="Etkinlik filtresi" onSubmit={(e) => e.preventDefault()}>
      <div className="alan">
        <label htmlFor="filtre-arama">Etkinlik ara</label>
        <input
          id="filtre-arama"
          type="search"
          placeholder="Örn. atölye, veri"
          autoComplete="off"
          value={searchText}
          onChange={handleSearch}
        />
      </div>

      <div className="alan">
        <label htmlFor="filtre-kategori">Kategori</label>
        <select id="filtre-kategori" value={category} onChange={handleCategory}>
          <option value="">Tümü</option>
          {categories.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </div>
    </form>
  );
}

export default EventFilter;
