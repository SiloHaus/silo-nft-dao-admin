import React from "react";
import styled from "styled-components";
import siloLogo from "../assets/silo-logo.png";
import { Link } from "@daohaus/ui";

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
      <Link showExternalIcon={false} href="http://silo.gg"><img src={siloLogo} alt="Silo RDF" title="SILO RDF A DAOhaus joint" /></Link>
    </ImageContainer>
  );
};
