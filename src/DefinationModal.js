import { useEffect, useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '900px',
        maxHeight: '70vh'
    },
};

Modal.setAppElement('#root')

const DefinationModal = ({ show, setShow, word }) => {
    const [definations, setDefinations] = useState([]);
    function closeModal() {
        setShow(false);
    }
      
    useEffect(() => {
        if (word !== undefined && word !== null && word !== "")
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                .then(res => res.json())
                .then(json => {
                    if (Array.isArray(json)) {
                        console.log(json)
                        setDefinations(json)
                    }
                })
                .catch(reasone => {
                    console.log(reasone)
                });
    }, [word])

    return (

        <Modal
            isOpen={show}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <button onClick={closeModal} className="btn btn-sm float-right">X</button>
            {
                definations && definations.map((item, no) => {
                    return (
                        <div key={no}>
                            {/* <h4>{item?.word}</h4> */}
                            {
                                item.meanings.map((meaning, index) => {
                                    return (
                                        <div className='mb-3' key={no + "." + index}>
                                            <h4><i>{meaning.partOfSpeech}</i></h4>
                                            {
                                                meaning.definitions.map((element, srl) => {
                                                    console.log(element.definition);
                                                    return (
                                                        <div key={no + "." + index + "." + srl}>
                                                            <span className='mr-1 font-weight-bold'>{srl + 1}. </span>
                                                            <span>{element.definition}</span>
                                                            {element.example && <i className='d-block ml-3 text-gray'>"{element.example}"</i>}
                                                            {element.synonyms.length > 0 && <div><b>synonyms:</b> {element.synonyms.join(', ')}</div>}
                                                            {element.antonyms.length > 0 && <div><b>antonyms:</b> {element.antonyms.join(', ')}</div>}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </Modal>
    )
}

export default DefinationModal;