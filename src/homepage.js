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
    const [imageLoading, setImageLoading] = useState(false);
    const generateScriptUrl = 'http://localhost:3001/api/generate-short-film';
    const generateImageUrl = 'https://api.replicate.com/v1/predictions';
    const apiKey = 'b1f2603fcb68b9a4e5195732c2092d37e77bb9ab';
    const version = 'f178fa7a1ae43a9a9af01b833b9d2ecf97b1bcb0acfd2dc5dd04895e042863f1';
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setImage1('loading.gif');
        try {
            // make request to generate script
            const scriptResponse = await axios.post(generateScriptUrl, {
                title: title,
                genre: genre,
                description: description,
                parameters: parameters,
            });
            setGeneratedScript(scriptResponse.data.script);
    
            // split script into sentences
            const sentences = scriptResponse.data.script.split(". ");
            if (sentences.length < 4) {
                setErrorMessage("Script has less than 4 sentences")
            } else {
                setPart1(sentences[0]);
                setPart2(sentences[1]);
                setPart3(sentences[2]);
                setPart4(sentences[3]);
    
                // make request to generate image
                const imageResponse = await axios({
                    method: 'post',
                    url: generateImageUrl,
                    headers: {
                        'Authorization': `Token ${apiKey}`,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        version: version,
                        input: {
                            prompt: sentences[0]
                        }
                    }
                });
                setImage1(imageResponse.data.output.url);
            }
            setIsLoading(false);
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
                , not exceeding 200 characters, without starting a new line.
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
