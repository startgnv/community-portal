import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles(() => ({
  listActions: {
    display: 'flex'
  },
  search: {
    flex: '2',
    marginRight: '20px'
  },
  sort: {
    flex: '1'
  }
}));

export const sortKeys = {
  Updated: 'TSUpdated',
  Created: 'TSCreated'
};

const sortIcon = isAscending =>
  isAscending ? (
    <ArrowUpwardIcon fontSize="inherit" />
  ) : (
    <ArrowDownwardIcon fontSize="inherit" />
  );

const ListFilter = ({ search, searchLabel, setSearch, sort, setSort }) => {
  const classes = useStyles();

  const onSortChange = ({ target: { value } }) => {
    if (value === sort.by) {
      setSort({
        ...sort,
        asc: !sort.asc
      });
      return;
    }
    setSort({
      by: value,
      asc: false
    });
  };

  return (
    <div className={classes.listActions}>
      <TextField
        className={classes.search}
        type="search"
        label={searchLabel}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <FormControl className={classes.sort}>
        <InputLabel htmlFor="age-simple">Sort By</InputLabel>
        <Select
          value={sort.by}
          renderValue={value => (
            <>
              {sortIcon(sort.asc)} {value}
            </>
          )}
          onChange={onSortChange}
        >
          <MenuItem value="Updated">Updated</MenuItem>
          <MenuItem value="Created">Created</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default ListFilter;
