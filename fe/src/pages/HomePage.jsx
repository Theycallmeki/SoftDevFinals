import React from "react";
import { ShoppingBag, Sparkles } from "lucide-react";
import logo from "../assets/logo.png"; // ✅ your circular logo image

function HomePage() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.logoContainer}>
          <div style={styles.pandaCircle}>
            <img src={logo} alt="FoodPandak Logo" style={styles.logoImage} />
          </div>
          <h1 style={styles.title}>
            <span style={styles.foodText}>FOOD</span>
            <span style={styles.pandakText}>TANDA</span>
          </h1>
        </div>

        <p style={styles.subtitle}>
          <Sparkles size={20} style={styles.icon} />
          Your favorite food delivery, now easier to manage!
          <Sparkles size={20} style={styles.icon} />
        </p>

        <div style={styles.card}>
          <ShoppingBag size={32} color="#D70F64" style={styles.bagIcon} />
          <h2 style={styles.cardTitle}>Restaurant Dashboard</h2>
          <p style={styles.cardText}>
            Manage your menu efficiently with our simple recipe system.
            Add, edit, and showcase your delicious dishes in seconds.
          </p>
          <p style={styles.cta}>
            👆 Click <strong>"Manage Recipes"</strong> on the top menu to get started
          </p>
        </div>

        <div style={styles.features}>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>🍕</div>
            <p>Easy Recipe Management</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>⚡</div>
            <p>Quick Updates</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>📸</div>
            <p>Photo Uploads</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #FFF5F7 0%, #FFE8F0 100%)",
    padding: "20px",
  },
  hero: {
    maxWidth: "800px",
    margin: "0 auto",
    paddingTop: "40px",
    textAlign: "center",
  },
  logoContainer: {
    marginBottom: "30px",
  },
  pandaCircle: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "white",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden", // ✅ clip image inside circle
    boxShadow: "0 10px 30px rgba(215, 15, 100, 0.25)",
    marginBottom: "20px",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover", // ✅ keeps image ratio
    borderRadius: "50%", // ✅ ensures circle crop
  },
  title: {
    fontSize: "64px",
    fontWeight: "900",
    margin: "0",
    letterSpacing: "-2px",
  },
  foodText: {
    color: "#D70F64",
  },
  pandakText: {
    color: "#FF2B85",
  },
  subtitle: {
    fontSize: "20px",
    color: "#666",
    marginBottom: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  icon: {
    display: "inline-block",
  },
  card: {
    background: "white",
    borderRadius: "24px",
    padding: "40px",
    boxShadow: "0 20px 60px rgba(215, 15, 100, 0.15)",
    marginBottom: "40px",
  },
  bagIcon: {
    marginBottom: "20px",
  },
  cardTitle: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "16px",
  },
  cardText: {
    fontSize: "18px",
    color: "#666",
    lineHeight: "1.6",
    marginBottom: "24px",
  },
  cta: {
    fontSize: "16px",
    color: "#D70F64",
    padding: "16px",
    background: "#FFF5F7",
    borderRadius: "12px",
    border: "2px dashed #FF2B85",
  },
  features: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
  },
  feature: {
    flex: "0 0 150px",
  },
  featureIcon: {
    fontSize: "40px",
    marginBottom: "10px",
  },
};

export default HomePage;
