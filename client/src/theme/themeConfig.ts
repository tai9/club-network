import type { ThemeConfig } from "antd";
import { theme } from "antd";

const customTheme: ThemeConfig = {
  token: {
    fontSize: 14,
    colorPrimary: "#f7c842",
  },
  algorithm: theme.darkAlgorithm,
};

export default customTheme;
