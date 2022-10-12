export type Position = 'FREE' | 'PEG' | 'BLOCKED';

export type Board = {
    lines: number,
    columns: number,
    tiles: Position[][]
}

type TileModel = {
    size: {
        columns: number,
        lines: number
    },
    tiles: string;
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

function desserializeBoard(model: TileModel): Board {
    const lines = model.size.lines;
    const columns = model.size.columns;
    const tiles: Position[][] = [];
    const stringLen = model.tiles.length;
    const expectedLen = lines * columns;
    console.log({lines, columns, model})

    for (let i = 0; i < Math.min(stringLen, expectedLen); i++) {
        const ch = model.tiles[i];
        const c = i % columns;
        const l = Math.floor((i-c)/columns);
        console.log({i, l, c, t: tiles, len: tiles.length})
        if (tiles.length <= l) tiles.push([])
        tiles[l][c] = char2Position(ch);
    }

    for (let i = expectedLen; i < stringLen; i++) {
        const c = i % columns;
        const l = Math.floor((i-c)/columns);
        if (tiles.length <= l) tiles.push([])
        tiles[l][c] = 'BLOCKED';
    }
    
    return {
        lines,
        columns,
        tiles
    }
}

export function createBoard(model?: TileModel): Board {
    if (!model) {
        model = {
            size: {
                lines: 7,
                columns: 7
            },
            tiles: 'BBPPPBB' +
                    'BBPPPBB' +
                    'PPPPPPP' +
                    'PPPFPPP' +
                    'PPPPPPP' +
                    'BBPPPBB' +
                    'BBPPPBB'
        };
    }
    return desserializeBoard(model);
}
