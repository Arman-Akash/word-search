import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [dictionary, setDictionary] = useState(null);
  const [letterNo, setLetterNo] = useState(0);
  const [words, setWords] = useState(null);
  const [searchWord, setSearchWord] = useState('');

  const handleKeyUp = (e) => {
    if (e.key === 'Backspace') {
      setSearchWord(word => word.slice(0, -1));
      return;
    }
    if(e.key === 'Enter') {
      submit(e);
      return;
    }
    if (/^[A-Za-z ]$/.test(e.key)) {
      setSearchWord(word => word + e.key.toLowerCase());
    }
  }


  useEffect(() => {
    fetch('http://localhost:3001/dictionary')
      .then(res => res.json())
      .then(json => {
        setDictionary(json);
      })
  }, [setDictionary])

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    }
  }, [handleKeyUp])

  const submit = (e) => {
    e.preventDefault();
    var words = Object.keys(dictionary).filter(e => e.length == letterNo).sort();
    if (searchWord != '') {
      for (let i in searchWord) {
        if (searchWord[i] != ' ') {
          words = words.filter(e => e[i] == searchWord[i]);
        }
      }
    }
    setWords(words);
  }

  return (
    <div className="App">
      <form onSubmit={(e) => submit(e)}>
        <p>{searchWord}</p>
        <label>Number of Letters: </label>
        <input name="letterNo" type="number" onInput={(e) => {
          setLetterNo(e.target.value);
        }} />
        <input type="submit" />
      </form>
      {words && words.map(e => (
        <p key={e}>{e}</p>
      ))}
    </div>
  );
}

export default App;
