// Import React and useState hook
import React, { useState } from "react";


function Synonyms() {
  // state variable called words that stores an object with words as keys and arrays of synonyms as values
  const [words, setWords] = useState({
    clean: ["wash", "purify", "sanitize"],
    wash: ["clean", "rinse", "scrub"],
    purify: ["clean", "refine", "clarify"],
  });

  // state variable called input that stores the user input
  const [input, setInput] = useState("");

  // state variable called output that stores the synonyms for the input word
  const [output, setOutput] = useState([]);

  // function that handles the change event of the input element
  function handleChange(event) {
    // Get the value of the input element
    const value = event.target.value;

    // Set the input state to the value
    setInput(value);

    // Check if the value is a valid word in the words object
    if (words[value]) {
      // Set the output state to the array of synonyms for that word
      setOutput(words[value]);
    } else {
      // Set the output state to an empty array
      setOutput([]);
    }
  }

  //function that handles the submit event of the form element
  function handleSubmit(event) {
    event.preventDefault();

    // Get the value of the input element
    const value = event.target.elements.word.value;

    // Check if it is not empty and not already in the words object
    if (value && !words[value]) {
      // Prompt for synonyms separated by commas
      const synonyms = prompt("Enter synonyms for " + value + ", separated by commas:");

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
     <h1>Synonyms Search</h1>
     <form onSubmit={handleSubmit}>
       <label htmlFor="word">Enter a new word:</label>
       <input type="text" id="word" name="word" />
       <button type="submit">Add</button>
     </form>
     <hr />
     <label htmlFor="search">Search for synonyms:</label>
     <input type="text" id="search" name="search" value={input} onChange={handleChange} />
     {output.length > 0 && (
       <>
         <h2>Synonyms for {input}:</h2>
         <ul>
           {output.map((synonym) => (
             <li key={synonym}>{synonym}</li>
           ))}
         </ul>
       </>
     )}
   </div>
 );
}

export default Synonyms;