import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

// Giriş sayfasının kopyası + iki alan daha: ad soyad ve şifre tekrarı
interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
}

function checkRegister(name: string, email: string, password: string, password2: string) {
  const result: RegisterErrors = {};
  if (name.trim().length < 3) result.name = "Ad soyad en az 3 harf olmalı.";
  if (!email.includes("@")) result.email = "E-posta adresinde @ işareti olmalı.";
  if (password.length < 6) result.password = "Şifre en az 6 karakterden oluşmalı.";
  if (password2 !== password) result.password2 = "Şifreler aynı değil.";
  return result;
}

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = checkRegister(name, email, password, password2);
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  };

  return (
    <section aria-labelledby="kayit-baslik">
      <h2 id="kayit-baslik" className="bolum-baslik">
        Kayıt Ol
      </h2>

      {sent ? (
        <p className="mesaj mesaj-basari" role="status">
          Kayıt bilgileri doğru biçimde. Gerçek kayıt Sprint 10'da eklenecek.
        </p>
      ) : null}

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="alan">
          <label htmlFor="kayit-ad">Ad Soyad</label>
          <input
            id="kayit-ad"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name) || undefined}
            aria-describedby="kayit-ad-hata"
          />
          <span id="kayit-ad-hata" className="hata-metni">
            {errors.name}
          </span>
        </div>

        <div className="alan">
          <label htmlFor="kayit-email">E-posta adresi</label>
          <input
            id="kayit-email"
            type="email"
            autoComplete="email"
            placeholder="ornek@ogr.edu.tr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email) || undefined}
            aria-describedby="kayit-email-hata"
          />
          <span id="kayit-email-hata" className="hata-metni">
            {errors.email}
          </span>
        </div>

        <div className="alan">
          <label htmlFor="kayit-sifre">Şifre</label>
          <input
            id="kayit-sifre"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={Boolean(errors.password) || undefined}
            aria-describedby="kayit-sifre-hata"
          />
          <span id="kayit-sifre-hata" className="hata-metni">
            {errors.password}
          </span>
        </div>

        <div className="alan">
          <label htmlFor="kayit-sifre2">Şifre (tekrar)</label>
          <input
            id="kayit-sifre2"
            type="password"
            autoComplete="new-password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            aria-invalid={Boolean(errors.password2) || undefined}
            aria-describedby="kayit-sifre2-hata"
          />
          <span id="kayit-sifre2-hata" className="hata-metni">
            {errors.password2}
          </span>
        </div>

        <button type="submit">Kayıt ol</button>
      </form>

      <nav className="form-linkler" aria-label="Hesap bağlantıları">
        <Link to="/login">Zaten hesabın var mı? Giriş yap</Link>
      </nav>
    </section>
  );
}

export default RegisterPage;
