import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Keywords from './Keywords';
import cookie from '../../utils/cookie';
import Router from 'next/router'
import { useDataProviderContext } from '../../contexts/DataContext';
import Button from '@mui/material/Button';
import useKeyword from '../../hooks/useKeyword'
import TextField from '@mui/material/TextField';

const drawerWidth = 240;

const mdTheme = createTheme();

function DashboardContent() {
  const { user } = useDataProviderContext()
  const { keywords, handleSubmit, handleFileChange, searchKey, setSearchKey, handleSearch } = useKeyword()

  const logout = () => {
    cookie.removeAccessTokenCookie()
    Router.push("/login")
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <form onSubmit={handleSubmit}>
                      <input name="file" type="file" onChange={handleFileChange} required="required" accept=".csv" />
                      <button type="submit">Submit CSV file</button>
                    </form>
                  </Grid>
                  <Grid item xs={4}>
                    <span>{user.email}<small style={{ color: 'blue', cursor: 'pointer' }} onClick={logout}> Logout</small></span>
                  </Grid>
                </Grid>

                <Box component="form" onSubmit={handleSearch} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="search"
                    label="Search Keyword"
                    name="search"
                    autoComplete="search"
                    autoFocus
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Search
                  </Button>
                </Box>

                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Keywords keywords={keywords} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
