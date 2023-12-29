// theme.ts

// One centralized place to define styling for our theme so that we can change it easily 

import styled from "styled-components";

// Enchanted Forest Color Palette
export const COLORS = {
  FOREST_GREEN: "#014421",
  DAPPLED_SUNLIGHT: "#FEDD44",
  MORNING_MIST: "#D9E5D6",
  MAJESTIC_LION: "#C09255",
  MYSTIC_NIGHT_SKY: "#0D2036",
};

// Enchanted Forest Font Pairings
export const FONTS = {
  TITLE: "Cinzel",
  BODY: "Lora",
};

export const StyledH1 = styled.h1`
  font-family: ${FONTS.TITLE};
  color: ${COLORS.DAPPLED_SUNLIGHT};
  font-size: 2.5em; // Adjust as needed
`;

export const StyledBody = styled.div`
  font-family: ${FONTS.BODY};
  color: ${COLORS.MORNING_MIST};
  font-size: 1em; // Adjust as needed
`;
