import { useEffect, useState }
from "react";

import MainLayout
from "../layouts/MainLayout";

import FeedbackTable
from "../components/FeedbackTable";

import FeedbackModal
from "../components/FeedbackModal";

import {
  getAllFeedbacks,
  createFeedback,
  updateFeedback,
  deleteFeedback
}
from "../services/feedbackService";

function Feedbacks() {

  const [feedbacks,
    setFeedbacks] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [showModal,
    setShowModal] =
    useState(false);

  const [editingFeedback,
    setEditingFeedback] =
    useState(null);

  const [searchTerm,
    setSearchTerm] =
    useState("");

  useEffect(() => {

    loadFeedbacks();

  }, []);

  const loadFeedbacks =
    async () => {

      try {

        const data =
          await getAllFeedbacks();

        setFeedbacks(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  const handleCreateFeedback =
    async (feedback) => {

      try {

        await createFeedback(
          feedback.interviewId,
          {
            interviewerName:
              feedback.interviewerName,

            technicalScore:
              Number(
                feedback.technicalScore
              ),

            communicationScore:
              Number(
                feedback.communicationScore
              ),

            problemSolvingScore:
              Number(
                feedback.problemSolvingScore
              ),

            recommendation:
              feedback.recommendation,

            comments:
              feedback.comments
          }
        );

        setShowModal(false);

        loadFeedbacks();

      } catch (error) {

        console.log(error);

      }
    };

  const handleEditFeedback =
    async (feedback) => {

      try {

        await updateFeedback(
          editingFeedback.id,
          {
            interviewerName:
              feedback.interviewerName,

            technicalScore:
              Number(
                feedback.technicalScore
              ),

            communicationScore:
              Number(
                feedback.communicationScore
              ),

            problemSolvingScore:
              Number(
                feedback.problemSolvingScore
              ),

            recommendation:
              feedback.recommendation,

            comments:
              feedback.comments
          }
        );

        setEditingFeedback(
          null
        );

        setShowModal(false);

        loadFeedbacks();

      } catch (error) {

        console.log(error);

      }
    };

  const handleDeleteFeedback =
    async (id) => {

      const confirmed =
        window.confirm(
          "Delete feedback?"
        );

      if (!confirmed) {
        return;
      }

      try {

        await deleteFeedback(id);

        loadFeedbacks();

      } catch (error) {

        console.log(error);

      }
    };

  const filteredFeedbacks =
    feedbacks.filter(
      feedback =>
        feedback.interviewerName
          .toLowerCase()
          .includes(
            searchTerm
              .toLowerCase()
          )
    );

  if (loading) {

    return (

      <MainLayout>

        <div className="p-8">
          Loading Feedbacks...
        </div>

      </MainLayout>

    );
  }

  return (

    <MainLayout>

      <div
        className="
          min-h-screen
          p-8
        "
        style={{
          backgroundColor:
            "#F5F9FF"
        }}
      >

        <div className="mb-8">

          <h1
            className="
              text-4xl
              font-bold
            "
            style={{
              color:
                "#1E293B"
            }}
          >
            Feedbacks
          </h1>

          <p
            className="mt-2"
            style={{
              color:
                "#64748B"
            }}
          >
            Manage interview feedback
          </p>

        </div>

        <div
          className="
            flex
            flex-col
            md:flex-row
            gap-4
            mb-6
          "
        >

          <button
            onClick={() => {

              setEditingFeedback(
                null
              );

              setShowModal(true);

            }}
            className="
              px-5
              py-3
              rounded-2xl
              text-white
              font-semibold
            "
            style={{
              backgroundColor:
                "#71A5DE"
            }}
          >
            + Submit Feedback
          </button>

          <input
            type="text"
            placeholder="Search interviewer..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className="
              p-3
              rounded-2xl
              border
              bg-white
              w-full
              md:w-80
            "
          />

        </div>

        <FeedbackTable
          feedbacks={
            filteredFeedbacks
          }
          onEdit={(feedback) => {

            setEditingFeedback(
              feedback
            );

            setShowModal(true);

          }}
          onDelete={
            handleDeleteFeedback
          }
        />

        <FeedbackModal
          isOpen={showModal}
          initialData={
            editingFeedback
          }
          onClose={() => {

            setShowModal(false);

            setEditingFeedback(
              null
            );

          }}
          onSubmit={
            editingFeedback
              ? handleEditFeedback
              : handleCreateFeedback
          }
        />

      </div>

    </MainLayout>

  );
}

export default Feedbacks;