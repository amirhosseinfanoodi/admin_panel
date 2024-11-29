import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import { PieChart } from '@mui/x-charts/PieChart';

import { LineChart } from '@mui/x-charts/LineChart';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2057' : '#afa',
  ...theme.typography.body2,
  padding: theme.spacing(10),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function MyComponent() {


  return (
    <>
      {/* ................................box one .......................... */}
      <Box m={4} display="flex" alignItems="center" justifyContent="center" component="section" sx={{ p: 2, border: '2px dashed grey' }}>
        <div>
          <Stack display="flex" alignItems="center" justifyContent="center"
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Item display="flex" textAlign="center" alignItems="center" >
              <GroupAddIcon /> {1}
            </Item>
            <Item>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: 'series A' },
                      { id: 1, value: 15, label: 'series B' },
                      { id: 2, value: 20, label: 'series C' },
                    ],
                  },
                ]}
                width={250}
                height={100}
              />
            </Item>

            <Item >Item 3</Item>

            <Item >
            <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: 'user  A' },
                      { id: 1, value: 25, label: 'user B' },
                      {  },
                    ],
                  },
                ]}
                width={150}
                height={100}
              />
            </Item>

          </Stack>
        </div>
      </Box>
      {/* ......................................box two............................................ */}

      <Box m={4} display="flex" alignItems="center" justifyContent="center" component="section" sx={{ p: 2, border: '2px dashed grey' }}>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 7,8,9, 10,] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5,7, 5, 9],
              area: true,
            },
          ]}
          width={500}
          height={300}
        />
      </Box>

      <Box m={4} display="flex" alignItems="center" justifyContent="center" component="section" sx={{ p: 2, border: '2px dashed grey' }}>
        
      </Box>
    </>
  );
}

