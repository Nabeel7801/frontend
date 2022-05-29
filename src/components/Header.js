import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

const pages = [
    {name: "Books", href: "listBooks"}, 
    {name: "Students", href: "listStudents"}
];

const ResponsiveAppBar = () => {

  return (
    <AppBar position="static">

      <Container maxWidth="xl">

        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/listBooks"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ASSIGNMENT
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end'}}>
            {pages.map((page, index) => (
              <Button
                key={index}
                sx={{ my: 2, mx: 2, color: 'white', display: 'block' }}
                onClick={() => window.location.replace(page.href)}
              >
                {page.name}
              </Button>
            ))}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default React.memo(ResponsiveAppBar);
