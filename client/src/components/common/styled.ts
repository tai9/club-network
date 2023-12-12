import styled from "styled-components";

export const HighlightText = styled.span<{ fontSize?: number }>`
  font-size: ${(props) => props.fontSize || "inherit"};
  font-weight: 700;
  background: -webkit-linear-gradient(
    90deg,
    rgb(247, 200, 66) -14.75%,
    rgb(160, 254, 127) 132.93%,
    rgb(149, 236, 255) 151.36%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
