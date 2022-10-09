type Posicao = 'LIVRE' | 'PECA' | 'BLOQUEADA';

type Tab = {
    linhas: number,
    colunas: number,
    t: Posicao[][],
    active?: {
        x: number,
        y: number
    }
}

function createTabuleiro(): Tab {
    const t:Posicao[][] = [];
    for (let i = 0; i < 7; i++) {
        const linha: Posicao[] = createLinha(i);
        t[i] = linha;
    }
    return {linhas: 7, colunas: 7, t};
}

function createLinha(i: number): Posicao[] {
    if (i < 2 || i >= 5) {
        return createLinhaExtrema();
    } else if (i === 3) {
        return createLinhaCentral();
    } else {
        return createLinhaCheia();
    }
}

function createLinhaCheia(): Posicao[] {
    const l: Posicao[] = [];

    for (let i = 0; i < 7; i++) {
        l[i] = 'PECA';
    }
    return l;
}

function createLinhaCentral(): Posicao[] {
    const l: Posicao[] = [];

    for (let i = 0; i < 7; i++) {
        l[i] = i === 3? 'LIVRE': 'PECA';
    }
    return l;
}

function createLinhaExtrema(): Posicao[] {
    const l: Posicao[] = [];

    for (let i = 0; i < 2; i++) {
        l[i] = 'BLOQUEADA';
    }
    for (let i = 2; i < 5; i++) {
        l[i] = 'PECA';
    }
    for (let i = 5; i < 7; i++) {
        l[i] = 'BLOQUEADA';
    }
    return l;
}

export {createTabuleiro};
export type {Tab, Posicao};