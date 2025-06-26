import React , {useState} from 'react';
import Square from "./Square";

function Board(){
    const [state , setState] = useState(Array(9).fill(null));
    const [isXTurn , setIsXTurn] = useState(true);
    // console.log(state);
    // state is an array of size 9 , each value filled with null


    function checkWinner(){
        const winnerLogic = [
            [0,1,2] ,
            [3,4,5] ,
            [6,7,8] ,
            [0,3,6] ,
            [1,4,7] ,
            [2,5,8] ,
            [0,4,8] ,
            [2,4,6] ,
        ];

        for(let logic of winnerLogic){
            const [a,b,c] = logic;
            if(state[a] !== null && state[a] === state[b] && state[a] === state[c]){
                return state[a];
            }
        }
        return false;
    }

    function checkDraw(){
        let count=0;
        for(let i=0 ; i<9 ; i++){
            if(state[i]!=null) count++;
        }
        if(count === 9) return true;
        return false;
    }

    const isWinner = checkWinner();
    const isDraw = checkDraw();

    function handleClick(index){
        // console.log(`clicked on index ${index}`);

        if(state[index] !== null) return ;
        let newState = [...state];
        (isXTurn) ? (newState[index]='X') : (newState[index]='O');
        setState(newState);
        setIsXTurn(!isXTurn);
    }

    function reset(){
        let newState = [...state];
        for(let i=0 ; i<9 ; i++) newState[i]=null;
        setState(newState);
        setIsXTurn(true);
    }

    return (
        <div className='board-container'>
            {(isWinner) ? (<>{isWinner} won the game ! <button onClick={()=> reset() }>Play Again</button></>) : (
                (isDraw) ? (<>Game got Draw ! <button onClick={()=> reset() }>Play Again</button></>) : (
                    <>
                    <h4>Player {(isXTurn) ? (<>X</>) : (<>O</>)} please move !</h4>
                <div className='board-row'>
                <Square onClick={()=> handleClick(0)} value={state[0]} />
                <Square onClick={()=> handleClick(1)} value={state[1]}/>
                <Square onClick={()=> handleClick(2)} value={state[2]}/>
            </div>
            <div className='board-row'>
                <Square onClick={()=> handleClick(3)} value={state[3]}/>
                <Square onClick={()=> handleClick(4)} value={state[4]}/>
                <Square onClick={()=> handleClick(5)} value={state[5]}/>
            </div>
            <div className='board-row'>
                <Square onClick={()=> handleClick(6)} value={state[6]}/>
                <Square onClick={()=> handleClick(7)} value={state[7]}/>
                <Square onClick={()=> handleClick(8)} value={state[8]}/>
            </div>
            </>
                )
            )}
        </div>
    )
}

export default Board;