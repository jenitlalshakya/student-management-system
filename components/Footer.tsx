import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="text-center text-gray-500 text-sm py-4">
      © {year} Student Management System • Built with Next.js
    </footer>
  );
};

export default Footer;
