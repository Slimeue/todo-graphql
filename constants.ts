export const environmentVariables = {
  API_URL: process.env.API_URL,
};

export const { API_URL } = environmentVariables;

export const constants = {
  ...environmentVariables,
  restUri: API_URL?.includes('localhost'),
};
