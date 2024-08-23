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
  },
  // Add more images as needed
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 300, // Default height
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    height: 400, // Height for small screens and up
  },
  [theme.breakpoints.up('md')]: {
    width: '40%', // Width for medium screens and up
    height: 400, // Ensure consistent height for medium screens and up
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.3,
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
  padding: theme.spacing(2), // Adjust padding
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
  bottom: 20,
  left: 'calc(50% - 65px)', // Centered based on width
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
        backgroundColor: '#F4F6F6 ', // Background color for the entire page
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
          fontSize: { xs: 'h4.fontSize', sm: 'h3.fontSize', md: 'h2.fontSize' }, // Responsive text size
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
              width: '90%', // Full width with some margin for mobile
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
                  p: 2,
                  textAlign: 'center',
                  fontSize: { xs: 'body2.fontSize', sm: 'body1.fontSize' }, // Responsive text size
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
