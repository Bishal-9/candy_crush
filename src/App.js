import { useEffect, useState } from "react"
import ScoreBoard from "./component/ScoreBoard"

import blank from './images/blank.png'
import Image01 from './images/image-01.jpg'
import Image02 from './images/image-02.jpg'
import Image03 from './images/image-03.jpg'
import Image04 from './images/image-04.jpg'
import Image05 from './images/image-05.jpg'
import Image06 from './images/image-06.jpg'
import Image07 from './images/image-07.jpg'
import Image08 from './images/image-08.jpg'
import Image09 from './images/image-09.jpg'
import Image10 from './images/image-10.jpg'
import Image11 from './images/image-11.jpg'
import Image12 from './images/image-12.jpg'
import Image13 from './images/image-13.jpg'

const width = 8
const candyColors = [
    blank,
    Image01,
    Image02,
    Image03,
    Image04,
    Image05,
    Image06,
    Image07,
    Image08,
    Image09,
    Image10,
    Image11,
    Image12,
    Image13
]

const App = () => {

    const [currentColorArrangement, setCurrentColorArrangement] = useState([])
    const [squareBeingDragged, setSquareBeingDragged] = useState(null)
    const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
    const [scoreDisplay, setScoreDisplay] = useState(0)

    const checkForColumnForFour = () => {
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
            const decidedColor = currentColorArrangement[i]
            const isBlank = currentColorArrangement[i] === blank

            if (columnOfFour.every(candy => currentColorArrangement[candy] === decidedColor) && !isBlank) {
                setScoreDisplay(score => score + 4)
                columnOfFour.forEach(candy => currentColorArrangement[candy] = blank)
                return true
            }
        }
    }    

    const checkForRowForFour = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3]
            const decidedColor = currentColorArrangement[i]
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
            const isBlank = currentColorArrangement[i] === blank

            if (notValid.includes(i)) continue

            if (rowOfFour.every(candy => currentColorArrangement[candy] === decidedColor) && !isBlank) {
                setScoreDisplay(score => score + 4)
                rowOfFour.forEach(candy => currentColorArrangement[candy] = blank)
                return true
            }
        }
    }

    const checkForColumnForThree = () => {
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2]
            const decidedColor = currentColorArrangement[i]
            const isBlank = currentColorArrangement[i] === blank

            if (columnOfThree.every(candy => currentColorArrangement[candy] === decidedColor) && !isBlank) {
                setScoreDisplay(score => score + 3)
                columnOfThree.forEach(candy => currentColorArrangement[candy] = blank)
                return true
            }
        }
    }

    const checkForRowForThree = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2]
            const decidedColor = currentColorArrangement[i]
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
            const isBlank = currentColorArrangement[i] === blank

            if (notValid.includes(i)) continue

            if (rowOfThree.every(candy => currentColorArrangement[candy] === decidedColor) && !isBlank) {
                setScoreDisplay(score => score + 3)
                rowOfThree.forEach(candy => currentColorArrangement[candy] = blank)
                return true
            }
        }
    }

    const moveIntoSquareBelow = () => {
        for (let i = 0; i < 56; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)

            if (isFirstRow && currentColorArrangement[i] === blank) {
                let randomNumber = Math.floor(Math.random() * candyColors.length)
                currentColorArrangement[i] = candyColors[randomNumber]
            }

            if ((currentColorArrangement[i + width]) === blank) {
                currentColorArrangement[i + width] = currentColorArrangement[i]
                currentColorArrangement[i] = blank
            }
        }
    }

    const dragStart = e => {
        setSquareBeingDragged(e.target)
    }

    const dragDrop = e => {
        setSquareBeingReplaced(e.target)
    }

    const dragEnd = e => {
        const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('id'))
        const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('id'))

        currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
        currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

        const validMoves = [
            squareBeingDraggedId - 1,
            squareBeingDraggedId - width,
            squareBeingDraggedId + 1,
            squareBeingDraggedId + width
        ]

        const validMove = validMoves.includes(squareBeingReplacedId)

        const isAColumnForFour = checkForColumnForFour()
        const isARowForFour = checkForRowForFour()
        const isAColumnForThree = checkForColumnForThree()
        const isARowForThree = checkForRowForThree()

        if (
            squareBeingReplacedId &&
            validMove && (
                isAColumnForFour ||
                isARowForFour ||
                isAColumnForThree ||
                isARowForThree
            )
        ) {
            setSquareBeingDragged(null)
            setSquareBeingReplaced(null)
        } else {
            currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
            currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
            setCurrentColorArrangement([...currentColorArrangement])
        }
    }

    const createBoard = () => {
        const randomColorArrangement = []
        
        for (let i = 0; i < width * width; i++) {
            const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
            randomColorArrangement.push(randomColor)
        }
        setCurrentColorArrangement(randomColorArrangement)
    }

    useEffect(() => {
        createBoard()
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnForFour()
            checkForRowForFour()
            checkForColumnForThree()
            checkForRowForThree()
            moveIntoSquareBelow()
            setCurrentColorArrangement([...currentColorArrangement])
        }, 100)
        return () => clearInterval(timer)
    }, [
        checkForColumnForFour,
        checkForRowForFour,
        checkForColumnForThree,
        checkForRowForThree,
        moveIntoSquareBelow,
        currentColorArrangement
    ])

    return (
        <div className='app'>
            <div className="game">
                {
                    currentColorArrangement.map((candyColor, index) => (
                        <img
                            key={index}
                            src={candyColor}
                            alt={candyColor}
                            id={index}
                            draggable={true}
                            onDragStart={dragStart}
                            onDragOver={e => e.preventDefault()}
                            onDragEnter={e => e.preventDefault()}
                            onDragLeave={e => e.preventDefault()}
                            onDrop={dragDrop}
                            onDragEnd={dragEnd}
                        />
                    ))
                }
            </div>
            <ScoreBoard
                score={scoreDisplay}
            />
        </div>
    )
}

export default App
