// LoadingIndicator.tsx

import React from "react";
import styled, { keyframes } from "styled-components";
import { COLORS } from "../theme";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border: 4px solid ${COLORS.MYSTIC_NIGHT_SKY}; /* Light grey */
  border-top: 4px solid ${COLORS.DAPPLED_SUNLIGHT}; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${rotate} 2s linear infinite;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* Adjust the height as needed */
`;

export const LoadingIndicator: React.FC = () => (
  <LoadingContainer>
    <Loader />
  </LoadingContainer>
);
