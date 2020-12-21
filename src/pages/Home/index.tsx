import Button from "core/components/Button";
import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

const Home = () => (
  <div className="home">
    <h1 className="home-text-title">
      Desafio do Capítulo 3, <br />
      Bootcamp DevSuperior
    </h1>
    <p className="home-text-subtitle">
      Bem-vindos ao desafio do capítulo 3 do Bootcamp DevSuperior.
    </p>
    <p className="home-text-subtitle">
      Favor observar as instruções passadas no capítulo sobre a elaboração{" "}
      <br /> deste projeto.
    </p>
    <p className="home-text-subtitle" style={{ paddingBottom: `28px` }}>
      Este design foi adaptado a partir de Ant Design System for Figma, de{" "}
      <br /> Mateusz Wierzbicki:{" "}
      <a
        href="mailto:someone@example.com"
        style={{ color: `rgb(24, 144, 255)` }}
      >
        antforfigma@gmail.com
      </a>
    </p>
    <Link to="/profile">
      <Button text="Começar" />
    </Link>
  </div>
);

export default Home;
