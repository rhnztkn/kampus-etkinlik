import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

// Tek alan, tek hata metni; geçerliyse demo mesajı
function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = email.includes("@") ? "" : "E-posta adresinde @ işareti olmalı.";
    setError(message);
    setSent(message === "");
  };

  return (
    <section aria-labelledby="sifre-baslik">
      <h2 id="sifre-baslik" className="bolum-baslik">
        Şifremi Unuttum
      </h2>
      <p className="bilgi-notu">
        Hesabına kayıtlı e-posta adresini yaz; şifreni yenilemen için bir bağlantı gönderelim.
      </p>

      {sent ? (
        <p className="mesaj mesaj-basari" role="status">
          Bağlantı {email} adresine gönderildi (demo).
        </p>
      ) : null}

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="alan">
          <label htmlFor="unuttum-email">E-posta adresi</label>
          <input
            id="unuttum-email"
            type="email"
            autoComplete="email"
            placeholder="ornek@ogr.edu.tr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error !== "" || undefined}
            aria-describedby="unuttum-email-hata"
          />
          <span id="unuttum-email-hata" className="hata-metni">
            {error}
          </span>
        </div>

        <button type="submit">Bağlantı gönder</button>
      </form>

      <nav className="form-linkler" aria-label="Hesap bağlantıları">
        <Link to="/login">← Girişe dön</Link>
      </nav>
    </section>
  );
}

export default ForgotPasswordPage;
