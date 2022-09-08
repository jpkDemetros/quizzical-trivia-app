import React, {useState, useEffect} from 'react';
import Question from './Question';

export default function Quiz() {
    const [quiz, setQuiz] = useState([])
    const [corrected, setCorrected] = useState(false)
    const [score, setScore] = useState(0)
    const url = ("https://opentdb.com/api.php?amount=5&encode=url3986")
    
    useEffect(callForQuestions, [])
    
    function callForQuestions() {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const dataArray = []
                for (let i = 0; i < 5; i++) {
                    dataArray.push(newQuiz(data.results[i], i))
                }
                setQuiz(dataArray)
            })
    }
    
    function newQuiz(res, index) {
        return {
            id: index,
            value: decodeURIComponent(res.question),
            options: getOptions([res.correct_answer, ...res.incorrect_answers])
        }
    }
    
    function randomNumber(max) {
        return Math.floor(Math.random() * max)
    }
    
    function getOptions(array) {
        const len = array.length
        const res = []
        const newArray = []
        const correctAns = array[0]
        let randNum = randomNumber(len)
        while (res.length < len){
            if (newArray.includes(randNum)) {
                randNum = randomNumber(len)
            }
            else {
                newArray.push(randNum)
                res.push({
                    id: randNum,
                    isCorrect: array[randNum] === correctAns ? true : false,
                    isSelected: false,
                    value: decodeURIComponent(array[randNum])
                })
            }  
        }
        return res
    }
    
    function handleClick(quesId, ansId){
        setQuiz(prevQuiz => {
            const res = prevQuiz.map(q => {
                if(q.id === quesId) {
                    let res = []
                    for(let i = 0; i < q.options.length; i++) {
                        res = q.options.map(option => {
                            if(option.id === ansId) {
                                const newOption = {...option, isSelected : !option.isSelected}
                                return newOption
                            } else {
                                const newOption = {...option, isSelected : false}
                                return newOption
                              }
                        })
                    }
                    return {...q, options: res}
                }
                return q
            })
            return res
        })
    }

    function resetQuiz() {
        callForQuestions()
        setScore(0)
        setCorrected(false)
    }

    function getResult() {
        let finalScore = 0
        for (const question of quiz) {
            for (const option of question.options) {
                if(option.isSelected && option.isCorrect) {
                    finalScore += 1
                }
            }
        }
        setScore(finalScore)
        setCorrected(true)
    }
    
    function getHtmlArray() {
        const array = quiz.map(element => 
            <Question
                key={element.id} 
                question={element}
                corrected={corrected}
                handleClick={handleClick}
                id={element.id}
            />
        )
        return array
    }
    
    return (
        <div className="questions-container">
            {getHtmlArray()}
            <div className="results-container">
                {corrected && <p className="result">You scored {score}/5 correct answers</p>}
                <button 
                className="submit-btn"
                onClick={corrected ? resetQuiz : getResult}>
                    {corrected ? "Play again" : "Check answers"}
                </button>
            </div>
        </div>
    )
}