import React, {useState} from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import blueBlob from './images/blue-blob.png';
import yellowBlob from './images/yellow-blob.png';

export default function App() {
    const [start, setStart] = useState(false)
    
    function startQuiz() {
        setStart(true)
    }
    
    return (
        <div className="container">
            <img className="blue-blob" alt="" src={blueBlob}/>
            <img className="yellow-blob" alt="" src={yellowBlob}/>
            {
                start
                ?
                <Quiz />
                :
                <Home startQuiz={startQuiz} />
            }
        </div>
    )
}