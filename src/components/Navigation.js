function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <a className="no-underline text-yellow-400" href="/">
            Home
          </a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/blog">Blog</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
