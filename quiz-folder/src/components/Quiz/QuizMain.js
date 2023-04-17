import React, { useState } from "react";
import ScoreTemp from "../Result/ScoreTemp";

const questions = [
	{
		id: 0,
		quizQuestion: 'Who wrote Sanskrit grammar?',
		answerOptions: [
			{ optionText: 'Kalidasa', isCorrect: false },
			{ optionText: 'Charak', isCorrect: false },
			{ optionText: 'Panini', isCorrect: true },
			{ optionText: 'Aryabhatt', isCorrect: false },
		],
	},
	{
		id: 1,
		quizQuestion: 'Which one is known as the Diamond City of India?',
		answerOptions: [
			{ optionText: 'Mumbai', isCorrect: false },
			{ optionText: 'Panna', isCorrect: true },
			{ optionText: 'Surat', isCorrect: false },
			{ optionText: 'Jaipur', isCorrect: false },
		],
	},
	{
		id: 2,
		quizQuestion: 'Fathometer is used to measure?',
		answerOptions: [
			{ optionText: 'Ocean depth', isCorrect: true },
			{ optionText: 'Rainfall', isCorrect: false },
			{ optionText: 'Earthquakes', isCorrect: false },
			{ optionText: 'Sound intensity', isCorrect: false },
		],
	},
	{
		id: 3,
		quizQuestion: 'How many Harry Potter books are there?',
		answerOptions: [
			{ optionText: '1', isCorrect: false },
			{ optionText: '4', isCorrect: false },
			{ optionText: '6', isCorrect: false },
			{ optionText: '7', isCorrect: true },
		],
	},
	{
		id: 4,
		quizQuestion: 'What is the capital of France?',
		answerOptions: [
			{ optionText: 'New York', isCorrect: false },
			{ optionText: 'London', isCorrect: false },
			{ optionText: 'Paris', isCorrect: true },
			{ optionText: 'Dublin', isCorrect: false },
		],
	},
	{
		id: 5,
		quizQuestion: 'The cities Ankara and Istanbul located?',
		answerOptions: [
			{ optionText: 'Afghanistan', isCorrect: false },
			{ optionText: 'Iraq', isCorrect:  false},
			{ optionText: 'Turkey', isCorrect: true },
			{ optionText: 'Pakisthan', isCorrect: false },
		],
	},
	{
		id: 6,
		quizQuestion: 'How may squares are there in a Chess Board?',
		answerOptions: [
			{ optionText: '64', isCorrect: true },
			{ optionText: '48', isCorrect: false },
			{ optionText: '72', isCorrect: false },
			{ optionText: '36', isCorrect: false },
		],
	},
	{
		id: 7,
		quizQuestion: 'Hottest planet in the solar system?',
		answerOptions: [
			{ optionText: 'Mercury', isCorrect: false },
			{ optionText: 'Mars', isCorrect: false },
			{ optionText: 'Jupiter', isCorrect: false },
			{ optionText: 'Venus', isCorrect: true },
		],
	},
	{
		id: 8,
		quizQuestion: 'The iPhone was created by which company?',
		answerOptions: [
			{ optionText: 'Apple', isCorrect: true },
			{ optionText: 'Intel', isCorrect: false },
			{ optionText: 'Amazon', isCorrect: false },
			{ optionText: 'Microsoft', isCorrect: false },
		],
	},
	{
		id: 9,
		quizQuestion: 'Rock Garden is located in which city?',
		answerOptions: [
			{ optionText: 'Jaipur', isCorrect: false },
			{ optionText: 'Simla', isCorrect: false },
			{ optionText: 'Lucknow', isCorrect: false },
			{ optionText: 'Chandigarh', isCorrect: true },
		],
	},
];

function QuizMain(){   

	const [count, setCount] =  useState(0);
	const [optClicked, setOptClicked] = useState(null);	
	const [disabledOption, setDisabledOption] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const [quizScore, setQuizScore] = useState(0);
	const [nextBtnShow, setNextBtnShow] = useState(false);
	// const [showCorrectAns, setShowCorrectAns] = useState(false);

	// const optionClickHandler = (current) => {
	// 	setOptClicked(current => !current);
	// };

	

	const optionClickHandler = (index, isCorrect) => {
	
		// setShowCorrectAns(true);
		if(isCorrect === true){
			setQuizScore(quizScore + 1);
			
		}	
		setOptClicked(index);
		setNextBtnShow(true);
		setDisabledOption(true);
	};

	const nextBtnHandler = () => {
		if(count < questions.length - 1){
			setCount(count + 1); 
			setOptClicked(null);
			setDisabledOption(false);
		}
		else {
			setShowResult(true);
		}
		setNextBtnShow(false);
	};

	const optionList = questions[count].answerOptions.map((ansOption, index) => 
		// <li key={Math.random()} onClick={() => setOptClicked(index)} className={`option ${optClicked == index && 'option-active'}`}>
		// 	{ansOption.optionText}
		// </li>
		<li 
			// disabled={disabledOption === true}
			key={Math.random()} 
			onClick={() => optionClickHandler(index, ansOption.isCorrect)} 
			className={`option ${optClicked === index && 'option-active'}`}>
			{ansOption.optionText}
		</li>
	);
	

    return (
        <>
			{ !showResult ?   (
				<div className="quizBoard">
				<h1 className="title">Welcome to the Quiz!</h1>
				
				<div className="quizWrapper">
					<div className="quizContainer">
						<div className="quizBox">
							<p className="questNum">Question <span>{count + 1}</span>/<span>10</span></p>
							<h3 className="questionTitle">{questions[count].quizQuestion}</h3>
							<ul className={`optionLists ${disabledOption === true && 'inActive'}`} >
							{/* {questions[count].answerOptions.map((ansOption) => (
									<li className={optClicked ? 'option option-active' : 'option'} onClick={optionClickHandler}>{ansOption.optionText}</li>
								))} */}
								{ optionList }
							</ul>
						</div>
					</div>
				</div>
				<div className="btnWrap">					
					{/* {nextBtnShow ?  (
						<button className="btn1" onClick={nextBtnHandler}>{count === questions.length - 1 ? 'Completed' : 'Next'}</button>
					) : ''  } */}
					<button 
						disabled={nextBtnShow === false}
						className="btn1" 
						onClick={nextBtnHandler}>{count === questions.length - 1 ? 'Completed' : 'Next'}
					</button>
										
				</div>
			</div>
			) 
			
			: <ScoreTemp score={quizScore} />




			
			
			}
			

			
        </>
    );
}

export default QuizMain;