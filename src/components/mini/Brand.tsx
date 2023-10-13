import React from "react";
import styled from "styled-components";
import siloLogo from "../../assets/silo-logo.png";

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    height: 6rem;
    width: 6rem;
  }
`;

export const Brand = () => {
  return (
    <ImageContainer>
      <img src={siloLogo} />
    </ImageContainer>
  );
};
