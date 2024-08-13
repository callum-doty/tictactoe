import React, { useState, useRef } from "react";
import './TicTacToe.css';
import blue from '../assets/blue.svg';
import red from '../assets/red.svg';

const TicTacToe = () => {
    const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
    const [lock, setLock] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const titleRef = useRef(null);

    const handleClick = (index) => {
        if (lock || data[index] !== "") return;
        
        let newData = [...data];
        newData[index] = currentPlayer;
        setData(newData);
        checkWin(newData);
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    };

    const checkWin = (newData) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
                won(newData[a]);
                return;
            }
        }

        if (!newData.includes("")) {
            setLock(true);
            titleRef.current.innerHTML = "It's a Tie!";
        }
    };

    const won = (winner) => {
        setLock(true);
        titleRef.current.innerHTML = `Congratulations: <img src=${winner === "X" ? blue : red} alt="${winner}" /> won!`;
    };

    return (
        <div className="container">
            <h1 className="title" ref={titleRef}>Let's<span> PLAY</span></h1>
            <div className="board">
                {data.map((value, index) => (
                    <div key={index} className="box" onClick={() => handleClick(index)}>
                        {value && <img src={value === "X" ? blue : red} alt={value} />}
                    </div>
                ))}
            </div>
            <button className="reset" onClick={() => {
                setData(["", "", "", "", "", "", "", "", ""]);
                setLock(false);
                setCurrentPlayer("X");
                titleRef.current.innerHTML = "Let's<span> PLAY</span>";
            }}>RESTART</button>
        </div>
    );
}

export default TicTacToe;
