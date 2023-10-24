import { widthQuery } from "@daohaus/ui";
import styled from "styled-components";

export const BiColumnBox = styled.div`
  margin-top: 5rem;
  width: 100%;
  max-width: 140rem;
  .subtitle {
    margin-bottom: 1.2rem;
    opacity: 0.6;
  }
  .title {
    margin-bottom: 3rem;
  }
  .description {
    margin-bottom: 5rem;
  }
  .split {
    display: flex;
    flex-direction: row;
    gap: 3rem;
    @media ${widthQuery.sm} {
      flex-direction: column;
    }
  }
  @media ${widthQuery.sm} {
    margin-top: 3rem;
  }
`;

export const TitleContainerWithActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;

export const ActionButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
`;
