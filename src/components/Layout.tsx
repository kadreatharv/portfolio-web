import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="ambient-glow"></div>
      <div className="ambient-corner corner-top-left"></div>
      <div className="ambient-corner corner-bottom-right"></div>
      
      {/* Top Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: 'var(--nav-height)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 4vw', zIndex: 100, mixBlendMode: 'difference'
      }}>
        <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>
          <a href="/" style={{ color: 'inherit', textDecoration: 'none', letterSpacing: '2px' }}>ATHARV.DEV</a>
        </div>
        <div style={{ display: 'flex', gap: '3rem', fontSize: '1.2rem', fontWeight: 700 }}>
          <a href="#about" style={{ letterSpacing: '2px' }}>ABOUT</a>
          <a href="#career" style={{ letterSpacing: '2px' }}>ACHIEVEMENTS</a>
          <a href="#work" style={{ letterSpacing: '2px' }}>WORK</a>
          <a href="#tech" style={{ letterSpacing: '2px' }}>TECH</a>
          <a href="#contact" style={{ letterSpacing: '2px' }}>CONTACT</a>
        </div>
      </nav>

      {/* Right Side Email (Vertical) */}
      <div style={{
        position: 'fixed', right: '-80px', top: '50%', transform: 'translateY(-50%) rotate(90deg)',
        fontSize: '1rem', letterSpacing: '4px', opacity: 0.6, zIndex: 100, fontWeight: 600, mixBlendMode: 'difference'
      }}>
        <a href="mailto:atharvkadre@gmail.com">ATHARVKADRE@GMAIL.COM</a>
      </div>

      {/* Left Sidebar */}
      <aside style={{
        position: 'fixed', top: 0, left: 0, width: 'var(--sidebar-width)', height: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        gap: '3.5rem', zIndex: 100, mixBlendMode: 'difference'
      }}>
        <a href="https://github.com/kadreatharv" target="_blank" rel="noreferrer" style={{ fontSize: '3.5rem' }}><FaGithub /></a>
        <a href="https://linkedin.com/in/atharv-kadre-01485b27b" target="_blank" rel="noreferrer" style={{ fontSize: '3.5rem' }}><FaLinkedin /></a>
        <a href="https://x.com/Kadreatharv" target="_blank" rel="noreferrer" style={{ fontSize: '3.5rem' }}><FaXTwitter /></a>
        <a href="https://www.instagram.com/kadre_athxrv?igsh=aGZ1czlqZGV0aXYy" target="_blank" rel="noreferrer" style={{ fontSize: '3.5rem' }}><FaInstagram /></a>
      </aside>

      {/* Main Content */}
      <div style={{ width: '100%', minHeight: '100vh' }}>
        {children}
      </div>
    </>
  );
};

export default Layout;
