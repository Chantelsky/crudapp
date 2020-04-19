import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/card';
import CardHeader from '@material-ui/core/cardHeader';
import CardContent from '@material-ui/core/cardContent';
import CardActions from '@material-ui/core/cardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = (theme) => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  actions: {
    display: 'flex'
  }
});

const GithubRepo = ({ classes, onKudo, isKudo, repo }) => {
  const handleClick = (e) => {
    onKudo(repo);
  };

  return (
    <Card className={classes.card}>
      <CardHeader title={repo.full_name} />
      <CardContent>
        <Typography
          component='p'
          style={{ minHeight: '90px', overflow: 'scroll' }}
        >
          {repo.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions} disableSpacing>
        <IconButton aria-label='Add to Favorites' onClick={handleClick}>
          <FavoriteIcon color={isKudo ? 'secondary' : 'primary'} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(GithubRepo);
