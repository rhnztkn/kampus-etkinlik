import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Category, EventFormData, EventFormErrors } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

interface EventFormProps {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

// Formdaki yedi alanın tarifi: hangi alan, hangi etiket, hangi kutu türü
interface FieldSpec {
  name: keyof EventFormData;
  label: string;
  kind: "input" | "select" | "textarea";
  type?: "text" | "date" | "time" | "number";
  placeholder?: string;
}

const FIELD_SPECS: FieldSpec[] = [
  { name: "title", label: "Etkinlik Adı", kind: "input", type: "text", placeholder: "Örn. Mobil Uygulama Atölyesi" },
  { name: "category", label: "Kategori", kind: "select" },
  { name: "date", label: "Tarih", kind: "input", type: "date" },
  { name: "time", label: "Saat", kind: "input", type: "time" },
  { name: "location", label: "Yer", kind: "input", type: "text", placeholder: "Örn. C Blok Seminer Odası" },
  { name: "capacity", label: "Kontenjan", kind: "input", type: "number", placeholder: "1 – 1000" },
  { name: "description", label: "Açıklama", kind: "textarea" },
];

const CATEGORY_OPTIONS: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Controlled form: bütün değerler tek state nesnesinde (data).
// Form kaydetmeyi bilmez; hatasız veriyi onSubmit ile sayfaya verir.
function EventForm({ initialData, submitText, onSubmit }: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  // Tek handleChange yedi alana da yeter: hangi alanın değiştiğini name söyler
  function handleChange(e: ChangeEvent<FieldElement>) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const problems = validateEvent(data);
    setErrors(problems);
    if (Object.keys(problems).length > 0) return; // hata varsa yukarı bildirilmez
    onSubmit(data);
  }

  function renderControl(spec: FieldSpec) {
    const shared = {
      id: `etkinlik-${spec.name}`,
      name: spec.name,
      value: data[spec.name],
      onChange: handleChange,
      "aria-invalid": errors[spec.name] ? true : undefined,
      "aria-describedby": `etkinlik-${spec.name}-hata`,
    };

    if (spec.kind === "select") {
      return (
        <select {...shared}>
          <option value="">Seçiniz</option>
          {CATEGORY_OPTIONS.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      );
    }
    if (spec.kind === "textarea") {
      return <textarea {...shared} rows={5} />;
    }
    return <input {...shared} type={spec.type} placeholder={spec.placeholder} />;
  }

  return (
    <>
      <p className="bilgi-notu">Yıldızlı (*) alanların hepsi zorunludur.</p>
      <form className="form" onSubmit={handleSubmit} noValidate>
        {FIELD_SPECS.map((spec) => (
          <div className="alan" key={spec.name}>
            <label htmlFor={`etkinlik-${spec.name}`}>{spec.label} *</label>
            {renderControl(spec)}
            <span id={`etkinlik-${spec.name}-hata`} className="hata-metni">
              {errors[spec.name]}
            </span>
          </div>
        ))}
        <button type="submit">{submitText}</button>
      </form>
    </>
  );
}

export default EventForm;
