import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import { PUBLIC_URL } from "./constants.ts";

const HeartBackground = () => {
  const hearts = Array.from({ length: 30 }, (_, index) => ({
    id: index,
    size: Math.random() * 60 + 60, // Random size between 10 and 40
    left: Math.random() * 100, // Random horizontal position
    delay: Math.random() * 5, // Random delay for animation
    duration: Math.random() * 5 + 5, // Random duration for animation
  }));
  const [position, setPosition] = useState({ top: 0, left: 0, isMoved: false });
  const [opacity, setOpacity] = useState(1);
  const fadeOut = () => {
    if (opacity > 0) setOpacity(opacity - 0.2);
  };
  const [yes, setYes] = useState(false);
  const [displayText, setDisplayText] = useState("Will you be my Valentine?");
  const [imgSrc, setImgSrc] = useState(`${PUBLIC_URL}/Teddy.gif`);
  const [isMobile, setIsMobile] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Detect touch devices (mobile)
    const checkIfMobile = () => {
      setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (position.isMoved) {
      setImgSrc(`${PUBLIC_URL}/sad_teddy.gif`);
      setDisplayText("You don't love me anymore...");
    }
  }, [position.isMoved]);

  useEffect(() => {
    if (yes) {
      setPosition({ ...position, isMoved: false });
      setImgSrc(`${PUBLIC_URL}/happy_teddy.gif`);
      setDisplayText(`Yayyy! Smile, you made the right choice \u{1F496}`);
    }
  }, [yes]);

  const getRandomPosition = () => {
    if (!buttonRef.current) return { top: 0, left: 0, isMoved: false };
    if (isMobile) {
      // Get the button's dimensions
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const buttonWidth = buttonRect.width;
      const buttonHeight = buttonRect.height;

      // Calculate maximum allowed positions
      const maxWidth = window.innerWidth - buttonWidth;
      const maxHeight = window.innerHeight - buttonHeight;

      // Generate random positions within the viewport
      const newTop = Math.random() * maxHeight;
      const newLeft = Math.random() * maxWidth;

      return { top: newTop, left: newLeft, isMoved: true };
    }
    else {
      return { top: 0, left: 0, isMoved: false }
    }
  };

  const handleHover = () => {
    const newPosition = getRandomPosition();
    setPosition(newPosition);
  };

  return (
    <div
      className="heart-background"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {yes
        ? hearts.map((heart) => (
            <div
              key={heart.id}
              className="heart"
              style={{
                width: `${heart.size}px`,
                height: `${heart.size}px`,
                left: `${heart.left}%`,
                animationDelay: `${heart.delay}s`,
                animationDuration: `${heart.duration}s`,
              }}
            ></div>
          ))
        : ""}
      <div
        style={{
          zIndex: 100,
          marginBottom: "20vh",
        }}
      >
        <div
          style={{
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={imgSrc}
            alt="Animated GIF"
            style={{
              // marginLeft: "15vh",
              height: "300px",
              width: "300px",
              transition: "transform 0.5s ease-in-out",
            }}
          />
          <p style={{ fontWeight: "700", fontSize: "2rem" }}>{displayText}</p>
        </div>
        {yes ? (
          ""
        ) : (
          <div
            className="center-button"
            style={{ width: "50vw", margin: "auto" }}
          >
            <Button
              style={{
                backgroundColor: "#d72638",
                border: "none",
                width: "20%",
              }}
              onClick={() => setYes(true)}
            >
              Yes!
            </Button>
            <Button
              ref={buttonRef}
              // style={{ backgroundColor: "#b0b0b0", border: "none", width: "20%" }}
              onMouseEnter={handleHover}
              onTouchStart={fadeOut}
              style={{
                position: position.isMoved ? "absolute" : "static",
                opacity: opacity,
                backgroundColor: "#b0b0b0",
                border: "none",
                width: position.isMoved ? "10%" : "20%",
                top: position.isMoved ? `${position.top}px` : "",
                left: position.isMoved ? `${position.left}px` : "",
                transition: "top 0.2s, left 0.2s", // Smooth transition
              }}
            >
              No...
            </Button>
          </div>
        )}
      </div>
      <footer
        style={{
          zIndex: 1,
          position: "absolute",
          bottom: "2vh",
          fontWeight: "500",
        }}
      >
        Made by your Cutie Patootie &#129325;
      </footer>
    </div>
  );
};

export default HeartBackground;
