import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <span className="header-item">Home</span>
        <span className="header-item active">Dashboard V2</span>
      </div>
      <div className="header-search">
        <input type="search" placeholder="Search anything..." className="input" />
      </div>
      <div className="header-right">
        <Avatar />
      </div>
    </header>
  );
}

function Avatar() {
  return (
    <div className="avatar">
      <img src="/placeholder-user.jpg" alt="User" className="avatar-image" />
      <div className="avatar-fallback">U</div>
    </div>
  );
}

export { Header, Avatar };
