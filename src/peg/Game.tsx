import { useState } from 'react'
import { Position, Board } from './Board.js'

import styles from './Game.module.css'

type ClickConsumer = (click: ClickablePosition, hook: (activated: boolean) => void) => void;

type ClickablePosition = {
    x: number,
    y: number
}

type ElementProp = {
    p: Position,
    l: number,
    c: number,
    clicked: ClickConsumer
}

function Element({p, l, c, clicked}: ElementProp) {
    const [activated, setActivated] = useState(false)
    function __clicked() {
        console.log(`fclicked on line ${l} column ${c}, calling clicked...`)
        clicked({x: l, y: c}, (activated: boolean) => {
            console.log("recieved hook here at the end", {l, c})
            setActivated(activated)
        });
    }
    
    return <td data-position={p} data-peg-active={activated} onClick={__clicked}/>
}

type GameboardLineProp = {
    p: number,
    line: Position[],
    clicked: ClickConsumer
}

function GameboardLine({p, line, clicked}: GameboardLineProp) {
    return <tr data-line={p}>
        {
            line.map((l, i) => <Element p={l} key={i} l={p} clicked={clicked} c={i}/>)
        }
    </tr>;
}

type GameboardProp = {
    board: Board,
    playable?: boolean
}

function Gameboard({board}: GameboardProp) {
    const [myBoard, setMyBoard] = useState(board);
    const [activePosition, setActivePosition] = useState<ClickablePosition>()
    function apenasAlteraTab(clickedHere: ClickablePosition): { newBoard: Board, activePos?: ClickablePosition} {
        const {x, y} = clickedHere
        const whereClicked = myBoard.tiles[x][y];
        console.log(`clicked on ${whereClicked}`)
        if (whereClicked === 'BLOCKED') {
            return { newBoard: myBoard }
        }
        if (whereClicked === 'PEG') {
            return { newBoard: myBoard, activePos: clickedHere }
        }
        
        if (!activePosition) {
            return { newBoard: myBoard }
        }
        const actX = activePosition.x;
        const actY = activePosition.y;
        const oldPos = { ...activePosition }
        const newBoard = { ...myBoard};

        function move(origin: ClickablePosition, half: ClickablePosition, dest: ClickablePosition) {
            newBoard.tiles[origin.x][origin.y] = newBoard.tiles[half.x][half.y] = 'FREE'
            newBoard.tiles[dest.x][dest.y] = 'PEG'
        }
        if (x === actX) { // same line click
            let halfY: number|null;
            if (y === actY - 2) {
                halfY = actY - 1;
            } else if (y === actY + 2) {
                halfY = actY + 1;
            } else {
                halfY = null;
            }

            if (halfY != null) {
                if (myBoard.tiles[x][halfY] === 'PEG') {
                    move(oldPos, {x, y: halfY}, clickedHere);
                }
            }
        }
        if (y === actY) {
            let halfX: number|null;
            if (x === actX - 2) {
                halfX = actX - 1;
            } else if (x === actX + 2) {
                halfX = actX + 1;
            } else {
                halfX = null;
            }

            if (halfX != null) {
                if (myBoard.tiles[halfX][y] === 'PEG') {
                    console.log("at last a valida move")
                    move(oldPos, {x: halfX, y}, clickedHere);
                }
            }
        }
        
        return { newBoard };
    }

    const defaultHook = { h: (clickedHere: ClickablePosition) => {
        console.log("def hook")
    }}
    const [lastHook, setLastHook] = useState(defaultHook)

    function clicked(c: ClickablePosition, hook: (active: boolean) => void) {
        const { newBoard, activePos } = apenasAlteraTab(c);
        setActivePosition(activePos)
        if (myBoard !== newBoard) {
            setMyBoard(newBoard);
        }
        console.log("calling lasthook", lastHook, activePos)
        lastHook.h(c);
        if (!activePos) {
            setLastHook(defaultHook);
            hook(false)
            return;
        }
        setLastHook({h: (clickedHere: ClickablePosition) => {
            console.log("lastHook", clickedHere, c)
            hook(!!(clickedHere && clickedHere.x === c.x && clickedHere.y === c.y))
        }});
        console.log("setting lasthook", lastHook)
        hook(true)
    }
    return <table className={styles.game}>
        <tbody>
        {
            myBoard.tiles.map((line, i) => <GameboardLine p={i} line={line} clicked={clicked} key={i}/>)
        }
        </tbody>
    </table>
}

export { Gameboard }