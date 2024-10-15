import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';

const CatCard = ({ name, breed, origin, weight, lifeSpan, imageUrl, onBan }) => {
  return (
    <Card style={{ maxWidth: 345, margin: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <img src={imageUrl} alt={name} style={{ width: '100%', height: 'auto', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }} />
      <CardContent>
        <Typography variant="h5" gutterBottom>{name}</Typography>
        {/* <Typography variant="body2" color="text.secondary">Breed: {breed}</Typography> */}
        <Typography variant="body2" color="text.secondary">Origin: {origin}</Typography>
        <Typography variant="body2" color="text.secondary">Weight: {weight} lbs</Typography>
        <Typography variant="body2" color="text.secondary">Life Span: {lifeSpan} years</Typography>

        <Box display="flex" flexWrap="wrap" marginTop={2}>
          <Chip label={breed} onClick={() => onBan(breed)} style={{ margin: '4px' }} />
          <Chip label={`${weight} lbs`} onClick={() => onBan(weight)} style={{ margin: '4px' }} />
          <Chip label={origin} onClick={() => onBan(origin)} style={{ margin: '4px' }} />
          <Chip label={`${lifeSpan} years`} onClick={() => onBan(lifeSpan)} style={{ margin: '4px' }} />
        </Box>
      </CardContent>
    </Card>
  );
};

CatCard.propTypes = {
  name: PropTypes.string.isRequired,
  breed: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  lifeSpan: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onBan: PropTypes.func.isRequired,
};

export default CatCard;
