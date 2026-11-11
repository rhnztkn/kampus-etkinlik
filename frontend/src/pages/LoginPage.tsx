import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

interface LoginErrors {
  email?: string;
  password?: string;
}

// Kurallar ayrı bir fonksiyonda: e-postada @ olmalı, şifre en az 6 karakter
function checkLogin(email: string, password: string): LoginErrors {
  const result: LoginErrors = {};
  if (!email.includes("@")) {
    result.email = "E-posta adresinde @ işareti olmalı.";
  }
  if (password.length < 6) {
    result.password = "Şifre en az 6 karakterden oluşmalı.";
  }
  return result;
}

// Bu sprintte sadece sayfa: bilgiler hiçbir yere gönderilmez, kimse giriş yapmış olmaz
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = checkLogin(email, password);
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  };

  return (
    <section aria-labelledby="giris-baslik">
      <h2 id="giris-baslik" className="bolum-baslik">
        Giriş Yap
      </h2>

      {sent ? (
        <p className="mesaj mesaj-basari" role="status">
          Giriş bilgileri doğru biçimde. Gerçek giriş Sprint 10'da eklenecek.
        </p>
      ) : null}

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="alan">
          <label htmlFor="login-email">E-posta adresi</label>
          <input
            id="login-email"
            type="email"
            autoComplete="username"
            placeholder="ornek@ogr.edu.tr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email) || undefined}
            aria-describedby="login-email-hata"
          />
          <span id="login-email-hata" className="hata-metni">
            {errors.email}
          </span>
        </div>

        <div className="alan">
          <label htmlFor="login-sifre">Şifre</label>
          <input
            id="login-sifre"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={Boolean(errors.password) || undefined}
            aria-describedby="login-sifre-hata"
          />
          <span id="login-sifre-hata" className="hata-metni">
            {errors.password}
          </span>
        </div>

        <button type="submit">Giriş yap</button>
      </form>

      <nav className="form-linkler" aria-label="Hesap bağlantıları">
        <Link to="/forgot-password">Şifremi unuttum</Link>
        <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
      </nav>
    </section>
  );
}

export default LoginPage;
