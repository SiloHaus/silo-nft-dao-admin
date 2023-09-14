import { Card, widthQuery } from "@daohaus/ui";
import { styled } from "styled-components";

export const StyledLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.primary.step10};
  &:hover {
    text-decoration: none;
  }
`;

export const SettingsContainer = styled(Card)`
  width: 110rem;
  padding: 3rem;
  border: none;
  margin-bottom: 3rem;
  @media ${widthQuery.lg} {
    max-width: 100%;
    min-width: 0;
  }
`;

export const DataGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-content: space-between;
  div {
    margin-top: 3rem;
    width: 34rem;

    @media ${widthQuery.sm} {
      min-width: 100%;
    }
  }
`;
