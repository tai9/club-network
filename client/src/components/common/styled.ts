import styled from "styled-components";

export const HighlightText = styled.span`
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  background: linear-gradient(
    90deg,
    rgb(247, 200, 66) -14.75%,
    rgb(160, 254, 127) 132.93%,
    rgb(149, 236, 255) 151.36%
  );
  -webkit-background-clip: text; /* Clip the background to the text for WebKit browsers */
  background-clip: text; /* Clip the background to the text for other browsers */
  display: inline-block;
`;
