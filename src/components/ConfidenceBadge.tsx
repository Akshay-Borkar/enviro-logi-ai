import React from 'react';
import { Chip, Tooltip } from '@mui/material';
import { ErrorOutline, CheckCircleOutline, HelpOutline } from '@mui/icons-material';

interface ConfidenceBadgeProps {
  value: number;
  showIcon?: boolean;
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ value, showIcon = true }) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'success';
    if (confidence >= 0.8) return 'warning';
    return 'error';
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.9) return <CheckCircleOutline />;
    if (confidence >= 0.8) return <HelpOutline />;
    return <ErrorOutline />;
  };

  const confidencePercent = Math.round(value * 100);
  const color = getConfidenceColor(value);
  
  return (
    <Tooltip title={`Confidence: ${confidencePercent}%`}>
      <Chip
        icon={showIcon ? getConfidenceIcon(value) : undefined}
        label={`${confidencePercent}%`}
        color={color}
        size="small"
        variant="outlined"
      />
    </Tooltip>
  );
};
