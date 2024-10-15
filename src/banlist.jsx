import PropTypes from 'prop-types';

import { Typography, List, ListItem, Chip } from '@mui/material';

const BanList = ({ banList }) => {
  return (
    <div>
    <Typography variant="h6">Ban List</Typography>
    {banList.length === 0 ? (
      <Typography variant="body2" color="text.secondary">No items in the ban list</Typography>
    ) : (
      <List>
        {banList.map((ban) => (
          <ListItem key={ban}>
            <Chip label={ban} />
          </ListItem>
        ))}
      </List>
    )}
  </div>
  );
};
BanList.propTypes = {
    banList: PropTypes.arrayOf(PropTypes.string).isRequired
  };
export default BanList;
