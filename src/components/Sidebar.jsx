

import { Stack, Button } from '@mui/material';
import { BookmarkBorder } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import {categories} from '../utils/constants';
const Sidebar = ({ selectedCategory, setSelectedCategory }) => (
  <Stack
    direction="row"
    sx={{
      overflowY: 'auto',
      height: { xs: 'auto', md: '95%' },
      flexDirection: { md: 'column' },
    }}
  >
    {categories.map((category) => (
      <button
        key={category.name}
        className="category-btn"
        onClick={() => setSelectedCategory(category.name)}
        style={{
          background:
            category.name === selectedCategory ? '#FC1503' : 'transparent',
          color: 'white',
        }}
      >
        <span
          style={{
            color: category.name === selectedCategory ? 'white' : 'red',
            marginRight: '15px',
          }}
        >
          {category.icon}
        </span>

        <span
          style={{
            opacity: category.name === selectedCategory ? '1' : '0.8',
          }}
        >
          {category.name}
        </span>
      </button>
       ))}

    <Button
      component={Link}
      to="/watch-later"
      startIcon={<BookmarkBorder />}
      sx={{
        color: 'white',
        justifyContent: 'flex-start',
        textTransform: 'none',
        minWidth: 'auto',
        padding: '10px 15px',
        '&:hover': {
          backgroundColor: '#272727',
        },
      }}
    >
      Watch Later
    </Button>
  </Stack>
);

export default Sidebar;
