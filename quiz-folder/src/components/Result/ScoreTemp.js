import React from "react";

const ScoreTemp = (props) => {
    return(
        <>
            <div className="scoreBoard">
                <h1 className="title">Congrats! You completed the Quiz..</h1>
                <div className="quizWrapper">
                    <h2 className="title">Your Score is:</h2>
                    <p className="score-diplay"><span className="score">{props.score}</span><br /> <span>out of 10</span></p>
                </div>
            </div>
        </>
    );
}

export default ScoreTemp;