import { Flex } from "antd";
import { CustomLink } from "../Header/styled";
import { FooterLayout } from "./styled";

const Footer = () => {
  return (
    <FooterLayout>
      <div className="footer-main">
        <Flex gap={56}>
          <Flex gap={16} vertical>
            <div>Uncut</div>
            <Flex gap={4} vertical>
              <CustomLink href={"/"}>Home</CustomLink>
              <CustomLink href={"/all-profiles"}>Members</CustomLink>
              <CustomLink href={"/tickets"}>Tickets</CustomLink>
              <CustomLink href={"/explorer"}>Explorer</CustomLink>
            </Flex>
          </Flex>
          <Flex gap={16} vertical>
            <div>Resources</div>
            <Flex gap={4} vertical>
              <CustomLink href={"/"}>Follow us on Twitter</CustomLink>
              <CustomLink href={"/"}>Help center</CustomLink>
              <CustomLink href={"/"}>Contact us</CustomLink>
            </Flex>
          </Flex>
        </Flex>

        <div>
          <svg
            width="163"
            height="29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="#FCF8F2">
              <path
                fill="#FCF8F2"
                d="M147.636.55v12.398h-12.388a1.373 1.373 0 0 0-1.272.852 1.378 1.378 0 0 0 1.272 1.906h4.818v12.398h-12.388V12.929h-7.582V.53l27.54.02ZM27.532.55v13.764a13.78 13.78 0 0 1-8.497 12.726 13.756 13.756 0 0 1-5.267 1.049 13.762 13.762 0 0 1-9.724-4.04 13.784 13.784 0 0 1-4.029-9.735V.535h12.392V21.2a1.377 1.377 0 0 0 2.752 0V.535L27.532.55Zm2.373 27.276V13.79a13.764 13.764 0 1 1 27.533 0v14.037H45.049V6.889a1.379 1.379 0 0 0-2.351-.976 1.374 1.374 0 0 0-.401.976v20.938l-12.392-.001Zm57.165.278H73.3a13.757 13.757 0 0 1-9.742-4.037 13.775 13.775 0 0 1-4.03-9.753c0-3.653 1.449-7.158 4.03-9.743A13.763 13.763 0 0 1 73.295.535h13.768v12.398H66.414a1.38 1.38 0 0 0 0 2.758h20.648l.008 12.413ZM117.353.55v13.764a13.785 13.785 0 0 1-4.034 9.74 13.76 13.76 0 0 1-21.183-2.088 13.762 13.762 0 0 1-2.315-7.652V.535h12.388V21.2a1.376 1.376 0 0 0 1.378 1.378 1.377 1.377 0 0 0 1.378-1.378V.535l12.388.015Z"
              ></path>
            </g>
            <defs>
              <clipPath id="uncut-red_svg__a">
                <path fill="#fff" d="M0 0h163v28.104H0z"></path>
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      <Flex gap={24} className="footer-bottom">
        <div>©Uncut.fm Inc. 2021-2023</div>
        <div>privacy</div>
        <div>terms of service</div>
      </Flex>
    </FooterLayout>
  );
};

export default Footer;
