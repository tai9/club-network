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
`;

export const MembersLayout = styled.div`
  display: flex;
  flex-direction: column;
`;
export const InfoLayout = styled.div`
  display: flex;
  flex-direction: column;
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
