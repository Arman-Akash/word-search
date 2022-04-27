import { useEffect, useState } from 'react';
import './App.css';
// import  db  from './data/db.json';
import wordsDb from 'an-array-of-english-words';

function App() {
  const [dictionary, setDictionary] = useState(null);
  const [letterNo, setLetterNo] = useState(0);
  const [words, setWords] = useState(null);
  const [searchWord, setSearchWord] = useState('');

  // const loadData = () => JSON.parse(JSON.stringify(db));

  const handleKeyUp = (e) => {
    e.preventDefault();
    if (e.key === 'Backspace') {
      setSearchWord(word => word.slice(0, -1));
      return;
    }
    if (e.key === 'Enter') {
      submit(e);
      return;
    }
    if (/^[A-Za-z ]$/.test(e.key)) {
      setSearchWord(word => word + e.key.toLowerCase());
    }
  }


  useEffect(() => {
    setDictionary(wordsDb)
  }, [setDictionary])

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    }
  }, [handleKeyUp])

  const submit = (e) => {
    e.preventDefault();
    var words = dictionary.filter(e => e.length == letterNo).sort();
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
        <label>Number of Letters: </label>
        <input name="letterNo" type="number" onInput={(e) => {
          setLetterNo(e.target.value);
        }} />
        <input type="submit" />
        <div className='searched-word'>
          {searchWord && Object.keys(searchWord).map(i => (
            <span key={i} className='letter-box'>{searchWord[i]}</span>
          ))}
        </div>
      </form>
      <div className="word-box">
        {
          words && (
            <>
              <div className='mt-2'>{words.length} words found</div>
              <ul>
                {words.map(e => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </>
          )
        }
      </div>
    </div>
  );
}

export default App;
