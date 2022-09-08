import React from 'react';

export default function Question(props) {
    function Option(props) {
        let styles = {
            fontFamily: "'inter', sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            padding: "0.5em 2em",
            border: "2px solid #5461a2",
            color: "#293264",
            borderRadius: "10px",
            marginRight: "10px",
            marginBottom: "10px",
            backgroundColor:"transparent",
            cursor: "pointer"
        }
    
        if(props.corrected) {
            if(props.option.isCorrect) {
                styles = {
                    ...styles,
                    backgroundColor: "#94d7a2",
                }
            }
            else if(props.option.isSelected && !props.option.isCorrect) {
                styles = {
                ...styles,
                opacity: 0.8,
                backgroundColor: "#ff7f50"
                }
            }
            else {
                styles = {
                    ...styles,
                    opacity: 0.8
                }
            }
        }
        else if (props.option.isSelected) {
            styles = {
                ...styles,
                border: "none",
                backgroundColor: "#cbd0eb"
            }
        }

        return (
            <button 
                style={styles}
                onClick={() => {props.handleClick(props.quesId, props.id)}}>
                {props.option.value}
            </button>
        )
    }
    
    return (
        <div className="question-container">
            <h3 className="question">{props.question.value}</h3>
            {props.question.options.map(option => 
                <Option 
                    key={option.id} 
                    option={option}
                    corrected={props.corrected}
                    quesId={props.id}
                    id={option.id}
                    handleClick={props.handleClick}
                />
            )}
        </div>
    )
}