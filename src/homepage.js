import React, { useState } from 'react';
import './HomePage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedScript, setGeneratedScript] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setIsLoading(true);
  
      axios
        .post('http://localhost:3000/api/generate-short-film', {
          title: title,
          genre: genre,
          description: description,
        })
        .then((response) => {
          setIsLoading(false);
          setGeneratedScript(response.data.script);
        })
        .catch((error) => {
          setIsLoading(false);
          // Display an error message to the user
        });
    };

  return (
    <div className="container">
      <h1 className="title">Welcome to the Tales</h1>
      <div className="image-container">
        {/* Add an image or video showcasing the product here */}
      </div>
      <p className="description">
        Use our AI tools to help generate scripts and visuals for your short movie.
        Simply enter your ideas and preferences, and we'll do the rest!
      </p>
      <div className="image-container">
        {/* Add an image or video showcasing the product here */}
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="title" className="label">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="input"
        />
        <br />
        <label htmlFor="genre" className="label">
            Genre:
            </label>
            <select
            id="genre"
            name="genre"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            className="select"
            >
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="horror">Horror</option>
            </select>
            <br />
            <label htmlFor="description" className="label">
            Description:
            </label>
            <textarea
            id="description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="textarea"
            />
            <br />
            {isLoading ? (
            <button type="submit" disabled>
                Generating Script...
            </button>
            ) : (
            <button type="submit">Generate Script</button>
            )}
            </form>
            {generatedScript && (
            <Link to="/script-view" className="view-script-link">
                View Generated Script
            </Link>
            )}
        </div>
    );
};

export default HomePage;
