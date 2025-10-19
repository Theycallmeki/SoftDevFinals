import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import logo from "../assets/logo.png";
import { getMe } from "../api/authApi"; // make sure this exists
import "../main.css";

function HomePage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // new state to handle loading

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getMe();
        setCurrentUser(data?.user || null);
      } catch {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <div className="home-container">
      {/* Show username ONLY if user is logged in */}
      {!loading && currentUser && (
        <div className="home-username">
          Hello, <strong>{currentUser.username}</strong>
        </div>
      )}

      <div className="home-hero">
        {/* LEFT COLUMN */}
        <div className="home-left-column">
          <div className="logo-container">
            <div className="panda-circle">
              <img src={logo} alt="FoodTanda Logo" className="logo-image" />
            </div>
            <h1 className="home-title">
              <span className="food-text">FOOD</span>
              <span className="pandak-text">TANDA</span>
            </h1>

            <p className="home-subtitle">
              <Sparkles size={20} className="icon" />
              Your favorite food journey begins with one hungry soul,
              <Sparkles size={20} className="icon" />
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="home-right-column">
          <div className="story-container">
            <h2 className="story-title">The Origin of FoodTanda</h2>
            <p className="story-text">
              Long ago in a quiet Philippine town lived an old man named{" "}
              <strong>Jehu</strong>, called <strong>Tanda</strong> for his
              silver hair and wise eyes. He loved flavors, aromas, and the
              stories behind every dish.
            </p>
            <p className="story-text">
              One morning, Jehu began a journey across oceans and cities, from
              Bangkok to Paris, Seoul to Manila, tasting food and discovering
              that it was to be felt, shared, and remembered.
            </p>
            <p className="story-text">
              As he grew older, his passion only deepened. People whispered
              about the man who ate like the world belonged to him, calling him{" "}
              <strong>FoodTanda</strong>, the elder who united cultures through
              food.
            </p>
            <p className="story-text">
              Today, his legend lives on. Every recipe shared here carries his
              spirit, reminding us that food is not just sustenance but the
              poetry of life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
