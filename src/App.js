import { useEffect, useState } from 'react';
import './App.css';
import wordsDb from 'an-array-of-english-words';
import DefinationModal from './DefinationModal';

function App() {
  const [dictionary, setDictionary] = useState(null);
  const [letterNo, setLetterNo] = useState(0);
  const [words, setWords] = useState(null);
  const [searchWord, setSearchWord] = useState('');
  const [focused, setFocused] = useState(false);
  const [excludes, setExcludes] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedWord, setSelectedWord] = useState('');
  const [includeWords, setIncludes] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Space') {
      e.preventDefault();
    }
    if (e.key === 'Backspace' && !focused) {
      setSearchWord(word => word.slice(0, -1));
      return;
    }
    if (e.key === 'Enter') {
      submit(e);
      return;
    }
    if (!focused && /^[A-Za-z ]$/.test(e.key)) {
      setSearchWord(word => word + e.key.toLowerCase());
    }
  }

  useEffect(() => {
    setDictionary(wordsDb)
  }, [setDictionary])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [handleKeyDown])

  const submit = (e) => {
    e.preventDefault();
    var words = [...dictionary];
    if (letterNo !== 0 && letterNo !== null) {
      words = words.filter(e => e.length == letterNo)
    }
    words = words.sort();
    if (searchWord !== '') {
      for (let i in searchWord) {
        if (searchWord[i] !== ' ') {
          words = words.filter(e => e[i] == searchWord[i]);
        }
      }
    }
    if (excludes !== '') {
      for (let i in excludes) {
        words = words.filter(e => !e.includes(excludes[i]))
      }
    }
    if (includeWords !== '') {
      for (let i in includeWords) {
        words = words.filter(e => e.includes(includeWords[i]))
      }
    }
    setWords(words);
  }

  return (
    <div className="App mt-2">
      <form onSubmit={(e) => submit(e)}>
        <div className='row'>
          <div className='col-md-6 col-xs-12 text-right mr-2'>
            <label>Number of Letters: </label>
            <input name="letterNo"
              type="number"
              className='mr-2'
              onInput={(e) => {
                setLetterNo(e.target.value);
              }}
            />
          </div>
          <div className='col-md-4 col-xs-12  text-right mr-2'>
            <label>Excludes Letters: </label>
            <input type="text"
              name="excludes"
              style={{ textTranform: 'lowercase' }}
              className="mr-2"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onInput={(e) => setExcludes(e.target.value)}
            />
          </div>
          <div className='col-md-6 col-xs-12  text-right mr-2'>
            <label>Must Includes : </label>
            <input type="text"
              name="inclues"
              style={{ textTranform: 'lowercase' }}
              className="mr-2"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onInput={(e) => setIncludes(e.target.value)}
            />
          </div>
          <div className='col-md-4 col-xs-12  text-right mr-2'>
            <label>Words like:
              <input
                placeholder='press space to skip letter'
                value={searchWord}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onInput={(e) => {
                  if (/^[A-Za-z ]+$/.test(e.target.value)) {
                    setSearchWord(e.target.value.toLowerCase());
                  }
                  if (e.target.value === '') {
                    setSearchWord('');
                  }
                }}
              />
            </label>
          </div>
        </div>

        <input type="submit" value="search" /> <br />
        <div className='searched-word'>
          {searchWord && Object.keys(searchWord).map(i => (
            <span key={i} className='letter-box'>{searchWord[i]}</span>
          ))}
        </div>
      </form>
      {
        words && (
          <>
            <div>{words.length} words found</div>
            <div className="word-box">
              <ul>
                {words?.map(e => (
                  <li key={e} onClick={() => {
                    setShowModal(true);
                    setSelectedWord(e);
                  }}>{e}</li>
                ))}
              </ul>
            </div>
          </>
        )
      }

      <DefinationModal
        show={showModal}
        setShow={setShowModal}
        word={selectedWord}
      />

    </div>
  );
}

export default App;
