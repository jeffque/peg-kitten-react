export type Position = "FREE" | "PEG" | "BLOCKED";
type TileTypes = "F" | "P" | "B";
type TyleTypesObject = {
  [key in TileTypes]: Position;
};

export type Board = {
  rows: number;
  columns: number;
  tiles: Position[][];
};

type TileModel = {
  size: {
    columns: number;
    rows: number;
  };
  tiles: string;
};

const tileTypes: TyleTypesObject = {
  F: "FREE",
  P: "PEG",
  B: "BLOCKED",
};

const convertLetterToType = (substring: string) =>
  tileTypes[substring as TileTypes] + "|";

function desserializeBoard(model: TileModel): Board {
  const { rows, columns } = model.size;

  const tilesTypesString = model.tiles
    .replaceAll(/[A-Z]/g, convertLetterToType)
    .split("|");

  const tilesArray: Position[][] = [];

  for (let i = 0; i < columns * rows; i += columns) {
    tilesArray.push(tilesTypesString.slice(i, i + columns) as Position[]);
  }

  return {
    rows,
    columns,
    tiles: tilesArray,
  };
}

export function createBoard(model?: TileModel): Board {
  if (!model) {
    model = {
      size: {
        rows: 7,
        columns: 7,
      },
      tiles: "BBPPPBBBBPPPBBPPPPPPPPPPFPPPPPPPPPPBBPPPBBBBPPPBB",
    };
  }
  return desserializeBoard(model);
}
