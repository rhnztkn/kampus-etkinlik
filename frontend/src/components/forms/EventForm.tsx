interface EventFormProps {
  onSubmit: () => void;
}

// Form ne yapılacağını bilmez; gönderimi yukarı bildirir
function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <p className="bilgi-notu">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
      <form
        className="form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="alan">
          <label htmlFor="title">Etkinlik Adı</label>
          <input id="title" type="text" maxLength={80} placeholder="Örn. Mobil Uygulama Atölyesi" />
        </div>
        <div className="alan">
          <label htmlFor="category">Kategori</label>
          <select id="category" defaultValue="">
            <option value="">Seçiniz</option>
            <option value="Seminer">Seminer</option>
            <option value="Atölye">Atölye</option>
            <option value="Söyleşi">Söyleşi</option>
            <option value="Yarışma">Yarışma</option>
          </select>
        </div>
        <div className="alan">
          <label htmlFor="date">Tarih</label>
          <input id="date" type="date" />
        </div>
        <div className="alan">
          <label htmlFor="time">Saat</label>
          <input id="time" type="time" />
        </div>
        <div className="alan">
          <label htmlFor="location">Yer</label>
          <input id="location" type="text" placeholder="Örn. C Blok Seminer Odası" />
        </div>
        <div className="alan">
          <label htmlFor="capacity">Kontenjan</label>
          <input id="capacity" type="number" min={1} max={1000} />
        </div>
        <div className="alan">
          <label htmlFor="description">Açıklama</label>
          <textarea id="description" rows={5} />
        </div>
        <button type="submit">Kaydet</button>
      </form>
    </>
  );
}

export default EventForm;
