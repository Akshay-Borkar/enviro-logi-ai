import React from 'react';
import { Box, keyframes } from '@mui/material';

const bounce = keyframes`
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
`;

export const TypingIndicator: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        mb: 2,
      }}
    >
      <Box
        sx={{
          p: 1.5,
          borderRadius: 2,
          backgroundColor: 'grey.100',
          display: 'flex',
          alignItems: 'center',
          gap: 0.7,
        }}
      >
        {[0, 1, 2].map((dot) => (
          <Box
            key={dot}
            sx={{
              width: '8px',
              height: '8px',
              backgroundColor: 'grey.500',
              borderRadius: '50%',
              animation: `${bounce} 1.4s infinite ease-in-out both`,
              animationDelay: `${dot * 0.16}s`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
