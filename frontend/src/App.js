import React, { useEffect, useState } from "react";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    fetch("http://127.0.0.1:5000/api/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, [darkMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setFormStatus(data.message);
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("Error submitting contact form:", error);
        setFormStatus("There was an error submitting the form.");
      });
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <header className="header">
        <h1>Welcome to My Portfolio</h1>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? (
            <FontAwesomeIcon icon={faSun} />
          ) : (
            <FontAwesomeIcon icon={faMoon} />
          )}
        </button>
        <nav className="navbar">
          <a href="#about">About Me</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="about" className="about">
        <h2>About Me</h2>
        <p>
          Hi! I'm Joel Magati, a passionate web developer skilled in React,
          Python, and Flask. I love building clean, responsive, and engaging web
          and mobile applications.
        </p>
      </section>

      <section id="projects" className="projects">
        <h2>Projects</h2>
        {projects.length > 0 ? (
          <ul>
            {projects.map((project, index) => (
              <li key={index}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Projects to display.</p>
        )}
      </section>

      <section id="skills" className="skills">
        <h2>Skills</h2>
        <ul>
          <li>Frontend: HTML, CSS, JavaScript, React</li>
          <li>Backend: Python, Flask, SQL, PostgreSQL</li>
          <li>Flutter, TypeScript, Kotlin, PHP, Java, C++ </li>
        </ul>
      </section>

      <section id="testimonials" className="testimonials">
        <h2>Testimonials</h2>
        <p>
          "Magati Joel is an amazing developer! Always delivers top-quality
          work."
        </p>
        <h4>- Mike Joseph, Colleague</h4>
        <p>
          "Magati Joel is an amazing person! Always Lights up the room and even
          better with his work."
        </p>
        <h4>- Sharon Wafula, Colleague</h4>
      </section>

      <section id="contact" className="contact">
        <h2>Contact Me</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Send</button>
        </form>
        {formStatus && <p>{formStatus}</p>}
      </section>

      <footer>
        <p>Connect with me:</p>
        <a
          href="https://github.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a
          href="https://twitter.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a
          href="https://instagram.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a
          href="https://youtube.com/yourchannel"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </footer>
    </div>
  );
}

export default App;
