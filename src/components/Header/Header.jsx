import PropTypes from 'prop-types';
import './Header.css';

function Header({ searchQuery, setSearchQuery }) {
  return (
    <header className="header">
      <div className="header-left">
        <span className="header-item">Home&ensp;&gt;&ensp;</span>
        <span className="header-item active">Dashboard V2</span>
      </div>
      <div className="header-search">
        <input
          type="search"
          placeholder="Search anything..."
          className="input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="header-right">U</div>
    </header>
  );
}

Header.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default Header;
