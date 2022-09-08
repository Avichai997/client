import { Check, Close, Delete, Edit, EditOff } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

const ActionCellRenderer = (params) => {
  // get editing cell from grid
  const editingCells = params.api.getEditingCells();
  // checks if the rowIndex matches in at least one of the editing cells
  const isCurrentRowEditing = editingCells.some((cell) => {
    return cell.rowIndex === params.node.rowIndex;
  });

  const bolderIconStyle = { stroke: '#747474', strokeWidth: 1.5 };
  const actionButtons = isCurrentRowEditing ? (
    <>
      <Tooltip title='שמור'>
        <IconButton data-action='update'>
          <Check data-action='update' sx={bolderIconStyle} />
        </IconButton>
      </Tooltip>
      <Tooltip title='בטל שינויים'>
        <IconButton data-action='cancel'>
          <Close data-action='cancel' sx={bolderIconStyle} />
        </IconButton>
      </Tooltip>
    </>
  ) : (
    <>
      <Tooltip title='ערוך מידע'>
        <IconButton data-action='edit'>
          <Edit data-action='edit' />
        </IconButton>
      </Tooltip>
      <Tooltip title='מחק'>
        <IconButton data-action='delete'>
          <Delete data-action='delete' />
        </IconButton>
      </Tooltip>
    </>
  );

  return <>{actionButtons}</>;
};

export default ActionCellRenderer;
