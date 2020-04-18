import { grey } from '@app/material/colors';
import { AugmentedTheme, fade } from '@app/material/styles';
import { useStyles } from '@app/utils';

export const generateColStyles = (width: number) => ({
  width,
  minWidth: width,
});

const useBoardStyles = useStyles((theme: AugmentedTheme) => ({
  container: {
    width: '100%',
    height: '100%',
  },
  header: {
    overflow: 'hidden',
    backgroundColor: theme.palette.background.default,
    '& tr > th': {
      borderRight: `1px solid ${grey['300']}`,
    },
    '& tr > th:first-child': {
      backgroundColor: theme.palette.background.default,
      // borderRight: 'none',
    },
    '& tr > th:last-child': {
      borderRight: 'none',
    },
  },
  thead: {
    tableLayout: 'fixed',
  },
  body: {
    height: 'calc(100% - 57px)',
    overflow: 'auto',
  },
  tbody: {
    width: '1400px',
    tableLayout: 'fixed',
    '& tr:last-child > td': {
      borderBottom: 'none',
    },
    '& tr > td': {
      borderRight: `1px solid ${grey['300']}`,
    },
    '& tr > td:first-child': {
      backgroundColor: theme.palette.common.white,
      // borderRight: 'none',
    },
    '& tr > td:last-child': {
      borderRight: 'none',
    },
  },
  stickyCol: {
    position: 'sticky',
    left: 0,
  },
  fixedCol: {
    '&::after': {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: '-1px',
      width: '30px',
      transform: 'translateX(100%)',
      transition: 'box-shadow .3s',
      content: '""',
      pointerEvents: 'none',
      boxShadow: `inset 10px 0 8px -8px ${fade(theme.palette.common.black, 0.15)}`,
    },
  },
}));

export default useBoardStyles;