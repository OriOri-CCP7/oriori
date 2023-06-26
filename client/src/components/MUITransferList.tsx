import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import '../styles/AdminAddProduct.css';

function not(a: readonly Prefecture[], b: readonly Prefecture[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly Prefecture[], b: readonly Prefecture[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

interface Prefecture {
  pk: number,
  name: string
}

interface Props {
  options: Prefecture[],
  setSelected: React.Dispatch<React.SetStateAction<number[]>>
}

export default function MUITransferList({ options, setSelected }: Props) {
  const [checked, setChecked] = React.useState<readonly Prefecture[]>([]);
  const [left, setLeft] = React.useState<readonly Prefecture[]>(options);
  const [right, setRight] = React.useState<readonly Prefecture[]>([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: Prefecture) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  React.useEffect(() => {
    setSelected(right.map(pref => pref.pk))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [right]);

  const customList = (items: readonly Prefecture[]) => (
    <Paper sx={{ width: 200, height: 230, overflow: 'auto', marginLeft: 'auto', marginRight: 'auto' }}>
      <List dense component="div" role="list">
        {items.map((value: Prefecture) => {
          const labelId = `transfer-list-item-${value.pk}-label`;

          return (
            <ListItem
              key={value.pk}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.name} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12}><h3>Location Options</h3></Grid>
      <Grid item xs={12}>{customList(left)}</Grid>
      <Grid item xs={12}>
        <Grid container direction="column" alignItems="center">
          <Button
            className='admin__location-options-button'
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            Add All
          </Button>
          <Button
            className='admin__location-options-button'
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            Add Checked
          </Button>
          <Button
            className='admin__location-options-button'
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            Remove Checked
          </Button>
          <Button
            className='admin__location-options-button'
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            Remove All
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}><h3>Selected Locations</h3></Grid>
      <Grid item xs={12}>{customList(right)}</Grid>
    </Grid>
  );
}