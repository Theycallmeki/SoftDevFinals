import React from "react";
import { Sparkles } from "lucide-react";
import logo from "../assets/logo.png";

function HomePage() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.logoContainer}>
          <div style={styles.pandaCircle}>
            <img src={logo} alt="FoodTanda Logo" style={styles.logoImage} />
          </div>
          <h1 style={styles.title}>
            <span style={styles.foodText}>FOOD</span>
            <span style={styles.pandakText}>TANDA</span>
          </h1>
        </div>

        <p style={styles.subtitle}>
          <Sparkles size={20} style={styles.icon} />
          Your favorite food journey begins with one hungry soul,
          <Sparkles size={20} style={styles.icon} />
        </p>

        <div style={styles.storyContainer}>
          <h2 style={styles.storyTitle}>The Origin of FoodTanda</h2>
          <p style={styles.storyText}>
            Long ago, in a quiet corner of the Philippines, there lived an old man named <strong>Jehu</strong>.
            People fondly called him <strong>Tanda</strong>, for his hair was silver and his eyes carried the wisdom
            of countless meals savored under a thousand sunsets. But Jehu was no ordinary man, he was a wanderer
            with a heart that beat for flavors, aromas, and the stories hidden in every dish.
          </p>

          <p style={styles.storyText}>
            One morning, as dawn painted the sky with golden light, Jehu set out on a journey that would
            take him across oceans, mountains, and bustling cities. From the spicy streets of Bangkok to the
            cobblestone cafés of Paris, from the smoky grills of Seoul to the humble carinderias of Manila,
            Jehu tasted it all, learning that food was not merely to be eaten — it was to be felt, shared, remembered.
          </p>

          <p style={styles.storyText}>
            As the years passed, Jehu grew older, yet his passion only deepened. Wherever he went, people began
            to whisper his story — “There goes the old man who eats like the world belongs to him.”  
            They called him <strong>FoodTanda</strong>, the elder who united cultures through a single bite.
          </p>

          <p style={styles.storyText}>
            Now, his legend lives on. Every recipe, every aroma, every dish shared in this place
            carries the spirit of Jehu — the man who believed that food is not just sustenance,
            but the poetry of life itself.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fff0f6 0%, #ffe6f0 50%, #ffd9eb 100%)",
    padding: "40px 20px",
    overflowY: "auto",
    fontFamily: "'Poppins', sans-serif",
  },
  hero: {
    maxWidth: "900px",
    margin: "0 auto",
    textAlign: "center",
    animation: "fadeIn 1.5s ease",
  },
  logoContainer: {
    marginBottom: "30px",
  },
  pandaCircle: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    background: "white",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    boxShadow: "0 0 30px rgba(215, 15, 100, 0.4)",
    marginBottom: "20px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "50%",
  },
  title: {
    fontSize: "64px",
    fontWeight: "900",
    margin: "0",
    letterSpacing: "-2px",
    textShadow: "2px 2px 12px rgba(255, 43, 133, 0.3)",
  },
  foodText: {
    color: "#D70F64",
  },
  pandakText: {
    color: "#FF2B85",
  },
  subtitle: {
    fontSize: "22px",
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
  storyContainer: {
    background: "white",
    borderRadius: "24px",
    padding: "50px 40px",
    boxShadow: "0 0 60px rgba(215, 15, 100, 0.15)",
    textAlign: "left",
    lineHeight: "1.8",
    position: "relative",
    overflow: "hidden",
    animation: "slideUp 1.8s ease",
  },
  storyTitle: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#D70F64",
    marginBottom: "20px",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  storyText: {
    fontSize: "18px",
    color: "#444",
    marginBottom: "20px",
    textAlign: "justify",
  },
};

export default HomePage;
