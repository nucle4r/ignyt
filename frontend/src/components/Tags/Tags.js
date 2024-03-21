import React from 'react';
import { Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


export default function Tags({ tags, forFoodPage }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: "100%", bgcolor: '#edd87f', borderBottom: 1, borderColor: 'divider', marginBottom:'10px' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          textColor="secondary"
          indicatorColor="secondary"
        >
          {tags.map(tag => (
            
              <Tab key={tag.name} sx={{ color: "#000000" }} label={`${tag.name}`} value={tag.name} component={Link} to={`/menu/tag/${tag.name}`}/>
            
          ))}
        </Tabs>
      </Box>

    </div>
  );
}
