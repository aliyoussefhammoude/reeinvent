// Import React and useState hook
import React, { useState } from "react";

import './Synonyms.css';


function Synonyms() {
  // state variable called words that stores an object with words as keys and arrays of synonyms as values
  const [words, setWords] = useState({
    clean: ["wash", "purify", "sanitize"],
    wash: ["clean", "rinse", "scrub"],
    purify: ["clean", "refine", "clarify"],
  });
  const [synonyms, setSynonyms] = useState('');

  // state variable called input that stores the user input
  const [input, setInput] = useState("");

  // state variable called output that stores the synonyms for the input word
  const [output, setOutput] = useState([]);

  // function that handles the change event of the input element
    function handleChange(event) {
        const value = event.target.value;
        let matchingWords = [];

        Object.entries(words).forEach(([word, synonyms]) => {
            if ((word.includes(value) || synonyms.includes(value)) && word !== value) {
            matchingWords.push(word, ...synonyms.filter(synonym => synonym !== value));
            }
        });

        setOutput([...new Set(matchingWords)]);
        setInput(value);
    }

  
  //function that handles the submit event of the form element
  function handleSubmit(event) {
    event.preventDefault();

    // Get the value of the input element
    const value = event.target.elements.word.value;

    // Check if it is not empty and not already in the words object
    if (value && !words[value]) {

      // Check if synonyms are entered
      if (synonyms) {
        // Split synonyms by commas and trim whitespace
        const synonymArray = synonyms.split(",").map((s) => s.trim());

        // Set words state to include new word and its synonyms using spread syntax 
        setWords((prevWords) => ({ ...prevWords, [value]: synonymArray }));

        const prevWords = { ...words };
        // Loop through each synonym in synonymArray 
        synonymArray.forEach((synonym) => {
          // Check if synonym is already in words object 
          if (prevWords[synonym]) {
            // Add new word to its existing array of synonyms using spread syntax 
            setWords((prevWords) => ({ ...prevWords, [synonym]: [...prevWords[synonym], value] }));
          } else {
            // Add new word as a single-element array for synonym key using spread syntax 
            setWords((prevWords) => ({ ...prevWords, [synonym]: [value] }));
          }
        });

        alert("New word added successfully!");
      }
      
      else{
       alert("No synonyms entered.");
     }
   }

   else{
     alert("Invalid or duplicate word.");
   }

   setInput("");
   setOutput([]);
 }

 return (
   <div className="Synonyms">
    <div className="cover"></div>
     <form onSubmit={handleSubmit}>
      <h1 className="title">Synonyms Search</h1>
        <div className="input-group">
          <label htmlFor="name">Enter a new word:</label>
          <input
            type="text"
            id="name" name="word"
          />
        </div>
        <div className="input-group">
          <label htmlFor="synonym">Enter synonyms separated by commas:</label>
          <input
            type="synonym"
            id="synonym" name="synonym"
            onChange={(e) => setSynonyms(e.target.value)}
          />
        </div>
        <div className="submitBtnDiv">
          <button type="submit" className="submit-btn">
            + Add word
          </button>
        </div>
      </form>
     <div className="input-group-result">
      <label className="search" htmlFor="search">Search for synonyms:</label>
      <input type="text" id="search" name="search" value={input} onChange={handleChange} />
      {input && 
        output.length > 0 && (
            <table class="styled-table">
              <thead>
                  <tr>
                      <th className="tableTitle">Synonym for: <span className="synonymInput"> {input}</span></th>
                  </tr>
              </thead>
              <tbody>
                <td>
                    {output.map((synonym) => (
                        <tr key={synonym}>{synonym}</tr>
                    ))}
                </td>
              </tbody>
          </table>
      )}
     </div>
   </div>
 );
}

export default Synonyms;