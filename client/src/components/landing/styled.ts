import { ScreenSizes } from "@/constants/screenSizes";
import styled from "styled-components";

export const LandingLayout = styled.div`
  display: flex;
  flex-direction: column;
`;
export const HeroLayout = styled.div`
  display: flex;
  flex-direction: column;

  padding: 40px 0px 136px;
  background-image: url("https://storage.googleapis.com/uncut-fm-production/production/home/background-3.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;

  .hero-row {
    display: flex;
    padding: 0px 40px;
    gap: 30px;
    justify-content: center;
    align-items: center;
    max-width: 1100px;
    margin: 146px auto;
    width: 100%;
  }

  .hero-title {
    position: relative;
    white-space: nowrap;
    z-index: 30;
    text-align: left;
    font-size: 48px;
    line-height: 140%;
    font-weight: 700;
  }

  .hero-desc {
    text-align: left;
    font-size: 20px;
    line-height: 150%;
    font-weight: 400;
  }

  .hero-left {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .hero-right {
    width: 50%;
    position: relative;
  }

  .left-btn {
    position: absolute;
    top: 50%;
    left: 40px;
    z-index: 10;
  }
  .right-btn {
    position: absolute;
    top: 50%;
    right: 40px;
    z-index: 10;
  }

  @media (max-width: ${ScreenSizes.medium}) {
    padding-top: 0;
    .hero-row {
      flex-direction: column;
      gap: 0;
      padding: 0 16px;
      margin: 100px auto;
    }
    .hero-left {
      width: 100%;
      justify-content: center;
      align-items: center;
    }
    .hero-desc {
      text-align: center;
    }
  }
  @media (max-width: ${ScreenSizes.small}) {
    .hero-title {
      font-size: 40px;
    }

    .hero-right {
      width: 100%;
    }
  }
`;

export const MembersLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;

  background-image: url(https://storage.googleapis.com/uncut-fm-production/production/home/landscape-new.webp);
  background-size: 700px;
  background-repeat: repeat-x;
  background-position: center bottom;
  padding-top: 64px;

  .member-carousel {
    width: 100%;
    position: relative;
  }

  .left-btn {
    position: absolute;
    top: 50%;
    left: 40px;
    z-index: 10;
  }
  .right-btn {
    position: absolute;
    top: 50%;
    right: 40px;
    z-index: 10;
  }
`;

export const InfoLayout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(247, 247, 247);
  color: rgb(64, 64, 64);
  min-height: auto;
  margin: 0px;
  padding-top: 128px;
  position: relative;
  align-items: center;
  padding-left: 32px;
  padding-right: 32px;

  .section {
    display: flex;
    max-width: 1100px;
    align-items: center;
  }

  .section img {
    width: 521px;
    height: 521px;
  }

  .heading {
    font-size: 36px;
    line-height: 120%;
    margin-bottom: 80px;
    font-weight: 700;
    text-transform: unset;
  }

  .title {
    font-size: 32px;
    line-height: 120%;
    font-weight: 700;
    text-transform: unset;
  }

  .desc {
    font-size: 18px;
    line-height: 150%;
    font-weight: 400;
    text-transform: unset;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .section-2 {
    order: 2;
  }

  @media (max-width: ${ScreenSizes.small}) {
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 60px;

    .heading {
      margin-bottom: 60px;
    }

    .section {
      flex-direction: column;
    }

    .info {
      gap: 8px;
    }

    .section-2 {
      order: unset;
    }

    .section img {
      width: 360px;
      height: unset;
    }
  }
`;

export const MemberCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  color: rgb(255, 255, 255);
  inset: 130px 0px;
  position: relative;

  .mask {
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 128px 128px;
    -webkit-mask-image: url("/mask.svg");
  }

  .user-avatar {
    transition: all 0.3s ease-in-out 0s;
    top: 8px;
    transform: translate3d(0px, 0px, 200px);
    position: absolute;
    left: 50%;
    margin-left: -64px;
    position: absolute;
    top: -70px;
    z-index: 2;
  }

  .body {
    padding: 72px 16px 48px;
    border-radius: 1rem;
    overflow: hidden;
    z-index: 1;
    border-top: 1px solid rgba(255, 255, 255, 0.4);
    position: relative !important;
    margin: 0 auto;
    width: 60%;
    background-color: rgba(217, 217, 217, 0.1);

    display: flex;
    flex-direction: column;
    gap: 12px;

    font-size: 14px;
    line-height: 140%;
    text-align: center;
    font-weight: 400;
    text-transform: unset;
  }

  .role {
    font-size: 12px;
    color: #fcf8f2;
  }

  .text1 {
    font-size: 20px;
    line-height: 110%;
    text-transform: unset;
    margin: 0px;
    text-align: center;
    font-weight: 600;
  }

  /* position: absolute;
  inset: -200px -80px;
  backface-visibility: hidden;
  transform: translate3d(0px, 0px, -100px);
  z-index: 9;
  background-blend-mode: multiply;
  background-size: cover;
  filter: blur(24px);
  background-repeat: no-repeat;
  background-image: url(https://ik.imagekit.io/n8imvdjvz/tr:w-128,h-128/https://storage.googleapis.com/uncut-fm-production/production/users/4294970938/user_1690540602.jpeg);
  background-color: rgba(99, 40, 33, 0.8); */
`;

export const MemberCard2Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  position: relative;
  background: rgba(217, 217, 217, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 4px 4px 0px;
`;
