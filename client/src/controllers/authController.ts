import axiosClient from "@/configs/axiosConfig";
import axios, { AxiosInstance } from "axios";

export class AuthController {
  public static axiosClient: AxiosInstance;
  public static isAuthenticated: boolean;

  static initialize(accessToken?: string): void {
    AuthController.axiosClient = axiosClient;
    AuthController.isAuthenticated = false;

    try {
      if (accessToken) {
        AuthController.isAuthenticated = true;
        AuthController.axiosClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
      } else {
        console.error("Access token not available.");
      }
    } catch (error) {
      console.error("Error fetching access token:", error);
      throw error;
    }
  }
}
