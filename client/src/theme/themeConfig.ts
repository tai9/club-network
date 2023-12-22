import type { ThemeConfig } from "antd";
import { theme } from "antd";
import { Space_Grotesk } from "next/font/google";
const SpaceGroteskFont = Space_Grotesk({ subsets: ["latin"] });

const customTheme: ThemeConfig = {
  token: {
    colorText: "#ffffffd9",
    fontSize: 14,
    colorPrimary: "#f7c842",
    fontFamily: SpaceGroteskFont.style.fontFamily,
    colorLinkHover: "#f7c842",
  },
  components: {
    Button: {
      primaryColor: "#101010",
    },
  },
  algorithm: theme.darkAlgorithm,
};

export default customTheme;
