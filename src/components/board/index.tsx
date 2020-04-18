import { BoardCol, BoardConfig, Resource } from '@app/components/types';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@app/material/components';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import useStyles, { generateColStyles } from './index.styles';

export interface SchedulerBoardProps {
  cols: BoardCol[];
  resourceList?: Resource[];
  config: BoardConfig;
}

const SchedulerBoard: React.FC<SchedulerBoardProps> = ({
  cols,
  resourceList = [],
  config,
}) => {
  const classes = useStyles();
  const headRef = useRef(null);
  const [shouldShowShadow, setShowShadow] = useState(false);

  const renderColGroup = () => (
    <colgroup>
      {!config.hiddenResourceCol && <col key="resourceCol" style={generateColStyles(config.resourceColWidth)} />}
      {cols.map((col) => (<col key={col.key} style={generateColStyles(config.colWidth)} />))}
    </colgroup>
  );

  const handleFirstColCellShadowShow = (left: number) => {
    if (left > 0 && !shouldShowShadow) {
      setShowShadow(true);
    } else if (left === 0) {
      setShowShadow(false);
    }
  };

  const handleBodyScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { target } = event;
    const left = (target as HTMLDivElement).scrollLeft;
    if (headRef && headRef.current) {
      headRef.current.scrollLeft = left;
      handleFirstColCellShadowShow(left);
    }
  };

  const renderFirstColCell = (key: string, title: string | React.ReactNode) => {
    if (!config.hiddenResourceCol) {
      return (
        <TableCell
          key="resourceTitle"
          className={classNames(classes.stickyCol, { [classes.fixedCol]: shouldShowShadow })}
          align="center"
        >
          {title}
        </TableCell>
      );
    }
    return null;
  };

  return (
    <div className={classes.container}>
      <TableContainer className={classes.header} ref={headRef}>
        <Table className={classes.thead}>
          {renderColGroup()}
          <TableHead>
            <TableRow>
              {renderFirstColCell('resourceTitle', config.resourceTitle)}
              {cols.map((col) => <TableCell align="center" key={col.key}>{col.title}</TableCell>)}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <TableContainer className={classes.body} onScroll={handleBodyScroll}>
        <Table className={classes.tbody}>
          {renderColGroup()}
          <TableBody>
            {resourceList.map((resource) => {
              const resourceCellContent = resource.render ? resource.render(resource) : resource.name;
              return (
                <TableRow key={resource.key}>
                  {renderFirstColCell(`${resource.key}${resource.name}`, resourceCellContent)}
                  {cols.map((col) => <TableCell align="center" key={`${resource.key}${col.key}`} />)}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SchedulerBoard;