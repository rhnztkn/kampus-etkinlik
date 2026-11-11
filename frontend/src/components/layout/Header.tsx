interface HeaderProps {
  title: string;
  text?: string;
}

// Başlık dışarıdan gelir; alt yazı sadece verilmişse görünür
function Header({ title, text }: HeaderProps) {
  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </header>
  );
}

export default Header;
