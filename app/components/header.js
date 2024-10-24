// app/components/Header.js

export default function Header() {
    return (
      <header style={headerStyle}>
        <div style={logoStyle}>
          <img src="/company-logo.png" alt="Company Logo" style={logoImageStyle} />
        </div>
        <nav style={navStyle}>
          <a href="/contact" style={navLinkStyle}>Contact Us</a>
          <a href="/login" style={navLinkStyle}>Login</a>
        </nav>
      </header>
    );
  }
  
  // Styling for Header
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f7f9fc',
  };
  
  const logoStyle = {
    flex: '1',
  };
  
  const logoImageStyle = {
    height: '50px',
  };
  
  const navStyle = {
    flex: '1',
    display: 'flex',
    justifyContent: 'flex-end',
  };
  
  const navLinkStyle = {
    margin: '0 10px',
    padding: '10px',
    textDecoration: 'none',
    color: '#007bff',
    fontSize: '16px',
  };
  