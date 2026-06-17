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

  export const updateCandidate =
  async (
    id,
    candidate
  ) => {

    const token =
      localStorage.getItem("token");

    const response =
      await api.put(
        `/candidates/${id}`,
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

export const deleteCandidate =
  async (id) => {

    const token =
      localStorage.getItem("token");

    await api.delete(
      `/candidates/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );
  };