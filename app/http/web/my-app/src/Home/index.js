import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/grid';
import { withAuth } from '@okta/okta-react';

import GithubRepo from '../GithubRepo';
import SearchBar from '../SearchBar';

import githubClient from '../githubClient';
import APIClient from '../apiClient';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

const Home = ({ auth }) => {
  const [value, setValue] = useState(0);
  const [repos, setRepos] = useState([]);
  const [kudos, setKudos] = useState([]);

  let apiClient = APIClient();

  useEffect(async () => {
    const accessToken = await auth.getAccessToken();
    apiClient = APIClient(accessToken);
  }, [apiClient]);

  const handleTabChange = (e, value) => setValue(value);
  const handleTabChangeIndex = (index) => setValue(index);
  const resetRepos = (repos) => setRepos(repos);
  const isKudo = (repo) => kudos.find((r) => r.id == repo.id);
  const onKudo = (repo) => updateBackend(repo);

  const updateBackend = (repo) => {
    isKudo(repo) ? apiClient.deleteKudo(repo) : apiClient.createKudo(repo);

    updateState(repo);
  };

  const updateState = (repo) => {
    isKudo(repo) ? kudos.filter((r) => r.id !== repo.id) : setKudos(repo);
  };

  const onSearch = (e) => {
    const target = e.target;

    if (!target.value || target.length < 3) {
      return;
    }
    if (e.which !== 13) {
      return;
    }

    githubClient.getJSONRepos(target.value).then((response) => {
      target.blur();
      setValue(1);
      resetRepos(response.items);
    });
  };

  const renderRepos = (repos) => {
    if (!repos) {
      return [];
    }
    return repos.map((repo) => {
      return (
        <Grid item xs={12} md={3} key={repo.id}>
          <GithubRepo onKudo={onKudo} isKudo={isKudo(repo)} repo={repo} />
        </Grid>
      );
    });
  };

  return (
    <div className={styles.root}>
      <SearchBar auth={auth} onSearch={onSearch} />
      <Tabs
        value={value}
        onChange={handleTabChange}
        indicatorColor='primary'
        textColor='primary'
        fullWidth
      >
        <Tab label='Kudos' />
        <Tab label='Search' />
      </Tabs>

      <SwipeableViews
        axis={'x-reverse'}
        index={value}
        onChangeIndex={handleTabChangeIndex}
      >
        <Grid container spacing={16} style={{ padding: '20px 0' }}>
          {renderRepos(kudos)}
        </Grid>
        <Grid container spacing={16} style={{ padding: '20px 0' }}>
          {renderRepos(repos)}
        </Grid>
      </SwipeableViews>
    </div>
  );
};

export default withStyles(styles)(withAuth(Home));
