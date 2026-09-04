import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="page-container" style={{ textAlign: "center", paddingTop: "80px" }}>
      <h1 style={{ fontSize: "2.5rem" }}>🥄 poonful</h1>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: "32px" }}>
        Recipe Manager
      </p>
      <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
        <Link to="/recipes" className="btn btn-primary">Explore Recipes</Link>
        <Link to="/login" className="btn btn-secondary">Login</Link>
      </div>
    </div>
  );
}

export default Landing;
