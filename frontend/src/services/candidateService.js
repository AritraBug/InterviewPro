import api from "./api";

export const getAllCandidates = async () => {

  const token =
    localStorage.getItem("token");

  const response =
    await api.get(
      "/candidates",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return response.data;
};

export const searchCandidates = async (
  name
) => {

  const token =
    localStorage.getItem("token");

  const response =
    await api.get(
      `/candidates/search?name=${name}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return response.data;
};

export const getCandidatesPaginated =
  async (
    page,
    size
  ) => {

    const token =
      localStorage.getItem("token");

    const response =
      await api.get(
        `/candidates/paginated?page=${page}&size=${size}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
  };
  export const createCandidate =
  async (candidate) => {

    const token =
      localStorage.getItem("token");

    const response =
      await api.post(
        "/candidates",
        candidate,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
  };