export interface EnvironmentConfig {
  apiUrl: string;
}

export const environments: EnvironmentConfig = {
  apiUrl: process.env.REACT_APP_API_URL || "http://localhost:3001/api",
};
