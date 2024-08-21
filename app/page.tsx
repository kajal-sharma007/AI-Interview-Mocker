"use client"

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';

const images = [
  {
    url: '/business-hand-robot-handshake-artificial-intelligence-digital-transformation.jpg',
    title: 'AI Mock Interview',
    width: '40%', // Set width for large screens
  },
  // Add more images as needed
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 400, // Increased height
  width: '100%', // Ensure full width on small screens
  [theme.breakpoints.up('md')]: {
    width: '40%', // Width on medium screens and up
  },
  [theme.breakpoints.down('sm')]: {
    height: 200, // Height on small screens
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column', // Stack the text vertically
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  padding: '20px', // Add padding for text
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 2,
  width: 130,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: 85,
  left: 'calc(30% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/dashboard'); // Navigate to /dashboard on button click
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // Align children vertically
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        p: 2,
        backgroundColor: '#BEDEF3', // Background color for the entire page
      }}
    >
      <Typography
        component="h1"
        variant="h2"
        sx={{
          mb: 4, // Margin bottom to space out from buttons
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'darkblue',
        }}
      >
        Let's get Started!
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          minWidth: 300,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {images.map((image) => (
          <ImageButton
            focusRipple
            key={image.title}
            style={{
              width: image.width,
              margin: '10px',
            }}
            onClick={handleClick}
          >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: 'relative',
                  p: 10,
                  textAlign: 'center',
                }}
              >
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        ))}
      </Box>
    </Box>
  );
}
