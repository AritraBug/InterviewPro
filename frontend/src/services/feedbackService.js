import api from "./api";

export const getAllFeedbacks =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await api.get(
        "/interviews/feedbacks",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
  };

export const createFeedback =
  async (
    interviewId,
    feedback
  ) => {

    const token =
      localStorage.getItem("token");

    const response =
      await api.post(
        `/interviews/${interviewId}/feedback`,
        feedback,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
  };

export const updateFeedback =
  async (
    id,
    feedback
  ) => {

    const token =
      localStorage.getItem("token");

    const response =
      await api.put(
        `/interviews/feedbacks/${id}`,
        feedback,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
  };

export const deleteFeedback =
  async (id) => {

    const token =
      localStorage.getItem("token");

    await api.delete(
      `/interviews/feedbacks/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );
  };