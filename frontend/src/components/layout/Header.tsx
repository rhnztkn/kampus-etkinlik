// Sprint 6'dan itibaren üst başlık sabit; sayfa adı main içindeki h2'de yazar
const SITE_NAME = "Kampüs Etkinlikleri";
const SLOGAN = "Seminer, atölye, söyleşi ve yarışmalar: fakültede olan her şey tek sayfada.";

function Header() {
  return (
    <header className="site-baslik">
      <h1>{SITE_NAME}</h1>
      <p>{SLOGAN}</p>
    </header>
  );
}

export default Header;
