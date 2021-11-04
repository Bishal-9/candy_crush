const ScoreBoard = ({score}) => {
    return (
        <div className='score-board'>
            <h1>Score: </h1>
            <h1>{score}</h1>
        </div>
    )
}

export default ScoreBoard
