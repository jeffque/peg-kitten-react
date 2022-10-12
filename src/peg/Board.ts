export type Position = 'FREE' | 'PEG' | 'BLOCKED';

export type Board = {
    lines: number,
    columns: number,
    t: Position[][]
}

function char2Position(ch: string): Position {
    switch (ch) {
        case 'F': return 'FREE';
        case 'P': return 'PEG';
        case 'B':
        default:
            return 'BLOCKED';
    }
}

function desserializeBoard(s: string): Board {
    const fragments = s.split('_');
    const lines = Number.parseInt(fragments[0]);
    const columns = Number.parseInt(fragments[1]);
    const t: Position[][] = [];
    const stringLen = fragments[2].length;
    const expectedLen = lines * columns;
    console.log({lines, columns, fragments})
    for (let i = 0; i < Math.min(stringLen, expectedLen); i++) {
        const ch = fragments[2][i];
        const c = i % columns;
        const l = Math.floor((i-c)/columns);
        console.log({i, l, c, t, len: t.length})
        if (t.length <= l) t.push([])
        t[l][c] = char2Position(ch);
    }
    for (let i = expectedLen; i < stringLen; i++) {
        const c = i % columns;
        const l = Math.floor((i-c)/columns);
        if (t.length <= l) t.push([])
        t[l][c] = 'BLOCKED';
    }
    return {
        lines,
        columns,
        t
    }
}

export function createBoard(modelo?: string): Board {
    if (!modelo) {
        modelo = '7_7_BBPPPBB' +
                     'BBPPPBB' +
                     'PPPPPPP' +
                     'PPPFPPP' +
                     'PPPPPPP' +
                     'BBPPPBB' +
                     'BBPPPBB';
    }
    return desserializeBoard(modelo);
}
