import React, { useState } from 'react';
import './HomePage.css';
import axios from 'axios';
import ScriptView from './ScriptView';

const HomePage = () => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [parameters, setParameters] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedScript, setGeneratedScript] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [part1, setPart1] = useState('');
    const [part2, setPart2] = useState('');
    const [part3, setPart3] = useState('');
    const [part4, setPart4] = useState('');
    const [image1, setImage1] = useState('');

        // useEffect hook to only call the API when the form is submitted

    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      setImage1('loading.gif');
      try {
        const response = await axios.post('http://localhost:3001/api/generate-short-film', {
          title: title,
          genre: genre,
          description: description,
          parameters: parameters,
        });
        setIsLoading(false);
        setGeneratedScript(response.data.script);
        const sentences = response.data.script.split(". ");
        if (sentences.length < 4) {
          setErrorMessage("Script has less than 4 sentences")
        } else {
          setPart1(sentences[0]);
          setPart2(sentences[1]);
          setPart3(sentences[2]);
          setPart4(sentences[3]);
          const part1 = sentences[0];
          const imageResponse = await axios({
            method: 'post',
            url: 'https://api.replicate.com/v1/predictions',
            headers: {
              'Authorization': 'Token b1f2603fcb68b9a4e5195732c2092d37e77bb9ab',
              'Content-Type': 'application/json'
            },
            data: {
              version: 'f178fa7a1ae43a9a9af01b833b9d2ecf97b1bcb0acfd2dc5dd04895e042863f1',
              input: {
                prompt: part1
              }
            }
          });
          setImage1(imageResponse.data.output.url);
        }
      } catch (error) {
        setIsLoading(false);
        setErrorMessage(error.error);
      }
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
            <p 
            id="parameters" 
            name="parameters" 
            value={parameters} 
            onChange={(event) => setParameters(event.target.value)}>
            </p>
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
             <ScriptView generatedScript={generatedScript}         
             part1={part1}
             part2={part2}
             part3={part3}
             part4={part4}
             image1={image1}
             />
          )}
        </div>
    );
};

export default HomePage;
