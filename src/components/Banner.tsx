import React from 'react';
import styled from 'styled-components';
import { RiDiscordFill, RiToolsLine } from 'react-icons/ri/index.js';
import { Link, ParMd, breakpoints } from '@daohaus/ui';


export type BannerProps = {
    bannerText?: string;
    className?: string;
  };

  export const StyledBanner = styled.div`
  align-items: center;
  display: flex;
  background-color: ${({ theme }) => theme.banner.bg};
  border: 1px solid ${({ theme }) => theme.banner.border};
  color: ${({ theme }) => theme.banner.color};
  flex-wrap: wrap;
  height: auto;
  justify-content: space-between;
  min-height: 8rem;
  padding: 2rem 4rem;
  width: 100%;

  .banner--text-container {
    align-items: center;
    display: flex;
    margin-bottom: 1.6rem;
    @media (min-width: ${breakpoints.xs}) {
      margin-bottom: 0;
    }

    svg {
      font-size: 10.8rem;
      margin-right: 1.4rem;
      @media (min-width: ${breakpoints.xs}) {
        font-size: 2.8rem;
      }
    }
  }

  .banner--link-container {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
    @media (min-width: ${breakpoints.xs}) {
      justify-content: flex-start;
      width: auto;
    }

    svg {
      font-size: 2.4rem;
      margin-right: 1rem;
    }
  }

  .banner--link-item {
    @media (min-width: ${breakpoints.xs}) {
      margin: 0 6rem;
    }
  }
`;

export const Banner = ({
  className,
  bannerText = 'SILO is a MVP and under active development.',
}: BannerProps) => {
  return (
    <StyledBanner className={className}>
      <div className="banner--text-container">
        <RiToolsLine />
        <ParMd>{bannerText}</ParMd>
      </div>
      <div className="banner--link-container">
      <Link
          href="/#/about"
          showExternalIcon={false}
          className="banner--link-item"
        >
          Learn about TBAs
        </Link>
        <Link
          href="https://github.com/SiloHaus/silo-nft-dao-admin/issues"
          showExternalIcon={false}
          className="banner--link-item"
        >
          Give Feedback
        </Link>
        <Link showExternalIcon={false} href="https://discord.gg/NTfrBtKSB7">
          <RiDiscordFill />
          Chat
        </Link>
      </div>
    </StyledBanner>
  );
};