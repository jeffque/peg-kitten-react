import { Posicao, Tab } from './Tab.js'

import './Tabuleiro.css'

type PosicaoProp = {
    p: Posicao
}

function Elemento({p}: PosicaoProp) {
    return <td data-posicao={p}/>
}

type TabLinhaProp = {
    p: number,
    linha: Posicao[]
}

function TabuleiroLinha({p, linha}: TabLinhaProp) {
    return <tr data-linha={p}>
        {
            linha.map((l, i) => <Elemento p={l} key={i}/>)
        }
    </tr>;
}

type TabuleiroProp = {
    tab: Tab
}

function Tabuleiro({tab}: TabuleiroProp) {
    const posicoes: number[] = []
    for (let i = 0; i < tab.linhas; i++) posicoes.push(i);
    return <table className='game'>
        <tbody>
        {
            posicoes.map(i => <TabuleiroLinha p={i} linha={tab.t[i]} key={i}/>)
        }
        </tbody>
    </table>
}

export { Tabuleiro }