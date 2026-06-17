import api from "./api";

export const getAllInterviews =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await api.get(
        "/interviews",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
  };

export const createInterview =
  async (interview) => {

    const token =
      localStorage.getItem("token");

    const response =
      await api.post(
        "/interviews",
        interview,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
  };

export const updateInterview =
  async (
    id,
    interview
  ) => {

    const token =
      localStorage.getItem("token");

    const response =
      await api.put(
        `/interviews/${id}`,
        interview,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
  };

export const deleteInterview =
  async (id) => {

    const token =
      localStorage.getItem("token");

    await api.delete(
      `/interviews/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );
  };
  export const getInterviewsByStatus =
  async (status) => {

    const token =
      localStorage.getItem("token");

    const response =
      await api.get(
        `/interviews/status/${status}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
  };

export const getInterviewsByInterviewer =
  async (name) => {

    const token =
      localStorage.getItem("token");

    const response =
      await api.get(
        `/interviews/interviewer/${name}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
  };