import { USER_TABLE_COLUMNS } from "../config";
import type { UserTableColumnKey, UserTableColumnWidths } from "../model";

interface GetResizedColumnWidthsParams {
  currentWidths: UserTableColumnWidths;
  columnKey: UserTableColumnKey;
  requestedWidth: number;
}

export function getResizedColumnWidths({
  currentWidths,
  columnKey,
  requestedWidth,
}: GetResizedColumnWidthsParams): UserTableColumnWidths {
  const columnIndex = USER_TABLE_COLUMNS.findIndex(
    (column) => column.key === columnKey,
  );

  if (columnIndex === -1) {
    return currentWidths;
  }

  const currentColumn = USER_TABLE_COLUMNS[columnIndex];

  const neighbourIndex =
    columnIndex < USER_TABLE_COLUMNS.length - 1
      ? columnIndex + 1
      : columnIndex - 1;

  const neighbourColumn = USER_TABLE_COLUMNS[neighbourIndex];

  if (!neighbourColumn) {
    return currentWidths;
  }

  const currentWidth = currentWidths[currentColumn.key];

  const neighbourWidth = currentWidths[neighbourColumn.key];

  const normalizedRequestedWidth = Math.max(
    currentColumn.minWidth,
    requestedWidth,
  );

  let widthDifference = normalizedRequestedWidth - currentWidth;

  if (widthDifference > 0) {
    const availableNeighbourWidth = neighbourWidth - neighbourColumn.minWidth;

    widthDifference = Math.min(widthDifference, availableNeighbourWidth);
  }

  if (widthDifference < 0) {
    const availableCurrentWidth = currentWidth - currentColumn.minWidth;

    widthDifference = Math.max(widthDifference, -availableCurrentWidth);
  }

  if (widthDifference === 0) {
    return currentWidths;
  }

  return {
    ...currentWidths,

    [currentColumn.key]: currentWidth + widthDifference,

    [neighbourColumn.key]: neighbourWidth - widthDifference,
  };
}
