import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Chat, ChevronRight } from '@mui/icons-material';

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const ChatButton: React.FC<ChatButtonProps> = ({ isOpen, onClick }) => {
  return (
    <Tooltip title={isOpen ? "Close chat" : "Open chat"} placement="left">
      <IconButton
        onClick={onClick}
        sx={{
          position: 'fixed',
          right: isOpen ? 'calc(320px - 28px)' : '20px',
          bottom: '20px',
          zIndex: 1301,
          backgroundColor: 'primary.main',
          color: 'white',
          transition: 'right 0.3s ease-in-out',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
          boxShadow: 3,
          height: '56px',
          width: '56px',
        }}
      >
        {isOpen ? <ChevronRight /> : <Chat />}
      </IconButton>
    </Tooltip>
  );
};
