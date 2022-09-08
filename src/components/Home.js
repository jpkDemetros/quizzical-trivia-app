import React from 'react';

export default function Home(props) {
    return (
        <div className="start-quiz">
            <h1 className="start-title">Quizzical</h1>
            <button className="start-btn" onClick={props.startQuiz}>Start Quiz</button>
        </div>
    )
}