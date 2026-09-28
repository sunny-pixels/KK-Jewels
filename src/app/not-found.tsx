import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="row">
        <span className="subheading">Page not found</span>
        <h1 className="h1-large">This piece has moved on</h1>
        <p>The page you are looking for does not exist. Explore our collections instead.</p>
        <Link href="/#collections" className="button">
          Explore Collections
        </Link>
      </div>
    </section>
  );
}
