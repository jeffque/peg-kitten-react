import { useState } from 'react'
import { Posicao, Tab } from './Tab.js'

import styles from './Tabuleiro.module.css'

type PosicaoProp = {
    p: Posicao,
    l: number,
    c: number,
    tab: Tab,
    clicked: (x: number, y: number, hook: (ativado: boolean) => void) => void
}

function Elemento({p, l, c, tab, clicked}: PosicaoProp) {
    const [ativado, setAtivado] = useState(false)
    function clicado() {
        console.log(`foi clicado em linha ${l} coluna ${c}, chamando o clicked...`)
        clicked(l, c, (ativado: boolean) => {
            console.log("recebi o hook aqui no final", {l, c})
            setAtivado(ativado)
        });
    }
    
    return <td data-posicao={p} data-peca-ativa={ativado} onClick={clicado}/>
}

type TabLinhaProp = {
    p: number,
    linha: Posicao[],
    tab: Tab,
    clicked: (x: number, y: number, hook: (ativado: boolean) => void) => void
}

function TabuleiroLinha({p, linha, tab, clicked}: TabLinhaProp) {
    return <tr data-linha={p}>
        {
            linha.map((l, i) => <Elemento p={l} key={i} l={p} tab={tab} clicked={clicked} c={i}/>)
        }
    </tr>;
}

type TabuleiroProp = {
    tab: Tab
}

function Tabuleiro({tab}: TabuleiroProp) {
    const [myTab, setMyTab] = useState(tab);
    function apenasAlteraTab(x: number, y: number): Tab {
        const ondeCliquei = myTab.t[x][y];
        console.log(`cliquei em ${ondeCliquei}`)
        if (ondeCliquei === 'BLOQUEADA') {
            return {
                ...myTab,
                active: undefined
            };
        }
        if (ondeCliquei === 'PECA') {
            return {
                ...myTab,
                active: {x, y}
            };
        }
        
        if (!myTab.active) {
            return {
                ...myTab,
                active: undefined
            };
        }
        const actX = myTab.active.x;
        const actY = myTab.active.y;
        const novoTab = { ...myTab, active: undefined};

        function movimenta(origem: {x:number, y:number}, half: {x:number, y:number}, dest: {x:number, y:number}) {
            novoTab.t[origem.x][origem.y] = novoTab.t[half.x][half.y] = 'LIVRE'
            novoTab.t[dest.x][dest.y] = 'PECA'
        }
        if (x === actX) { // clique na mesma linha
            let halfY: number|null;
            if (y === actY - 2) {
                halfY = actY - 1;
            } else if (y === actY + 2) {
                halfY = actY + 1;
            } else {
                halfY = null;
            }

            if (halfY != null) {
                if (myTab.t[x][halfY] === 'PECA') {
                    // fazer jogada
                    console.log("finalmente um movimento válido")
                    movimenta(myTab.active, {x, y: halfY}, {x, y});
                }
            }
        }
        if (y === actY) { // clique na mesma coluna
            let halfX: number|null;
            if (x === actX - 2) {
                halfX = actX - 1;
            } else if (x === actX + 2) {
                halfX = actX + 1;
            } else {
                halfX = null;
            }

            if (halfX != null) {
                if (myTab.t[halfX][y] === 'PECA') {
                    // fazer jogada
                    console.log("finalmente um movimento válido")
                    movimenta(myTab.active, {x: halfX, y}, {x, y});
                }
            }
        }
        
        return novoTab;
    }

    const defaultHook = { h: (t: Tab) => {
        console.log("def hook")
    }}
    const [lastHook, setLastHook] = useState(defaultHook)
    //let lastHook = defaultHook

    function clicked(x: number, y: number, hook: (ativado: boolean) => void) {
        const novoTab = apenasAlteraTab(x, y);
        setMyTab(novoTab);
        console.log("chamando lasthook", lastHook)
        lastHook.h(novoTab);
        if (!novoTab.active) {
            setLastHook(defaultHook);
            hook(false)
            return;
        }
        setLastHook({h: (t: Tab) => {
            console.log("lastHook")
            hook(!!(t.active && t.active.x === x && t.active.y === y))
        }});
        console.log("setando lasthook", lastHook)
        hook(true)
    }
    return <table className={styles.game}>
        <tbody>
        {
            myTab.t.map((linha, i) => <TabuleiroLinha p={i} linha={linha} clicked={clicked} tab={tab} key={i}/>)
        }
        </tbody>
    </table>
}

export { Tabuleiro }