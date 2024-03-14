import React from 'react';
import styled from 'styled-components';


import hausLogo from '../../assets/hausLogo.svg';
import alcxLogo from '../../assets/ALCX_Std_logo.svg';


import { Brand } from '../Brand';
import { Link, ParMd, widthQuery } from '@daohaus/ui';


const StyledFooter = styled.footer`
  margin-top: 17rem;
  padding-bottom: 5rem;
  display: flex;
  justify-content: center;
  .logo-box {
    display: flex;
    align-items: center;
    img {
      margin-right: 1.8rem;
    }
  }
  @media ${widthQuery.md} {
    margin-top: 12rem;
  }
  @media ${widthQuery.sm} {
    margin-top: 6rem;
  }
  @media ${widthQuery.xs} {
    margin-top: 3rem;
  }
`;

export const FooterJoint = () => {
    return (
        <StyledFooter>
            <div className="logo-box">
                <Link href="https://alchemix.fi/" showExternalIcon={false}><img style={{ width: "200px" }} src={alcxLogo} alt="Alchemix" title='Alchemix' /></Link>
                <Brand />
                <Link href="https://daohaus.club" showExternalIcon={false}><img src={hausLogo} alt="Built with DAOhaus" title='Built with DAOhaus' /></Link>
            </div>
        </StyledFooter>
    );
};