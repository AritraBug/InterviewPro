import { useEffect, useState }
from "react";

import MainLayout
from "../layouts/MainLayout";

import InterviewTable
from "../components/InterviewTable";

import InterviewModal
from "../components/InterviewModal";

import {
  getAllInterviews,
  createInterview,
  updateInterview,
  deleteInterview,
  getInterviewsByStatus,
  getInterviewsByInterviewer
}
from "../services/interviewService";

function Interviews() {

  const [interviews,
    setInterviews] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [showModal,
    setShowModal] =
    useState(false);

  const [editingInterview,
    setEditingInterview] =
    useState(null);

  const [searchTerm,
    setSearchTerm] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
    useState("");

  useEffect(() => {

    loadInterviews();

  }, []);

  const loadInterviews =
    async () => {

      try {

        const data =
          await getAllInterviews();

        setInterviews(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  const handleCreateInterview =
    async (interview) => {

      try {

        await createInterview(
          interview
        );

        setShowModal(false);

        loadInterviews();

      } catch (error) {

        console.log(error);

      }
    };

  const handleEditInterview =
    async (interview) => {

      try {

        await updateInterview(
          editingInterview.id,
          interview
        );

        setEditingInterview(
          null
        );

        setShowModal(false);

        loadInterviews();

      } catch (error) {

        console.log(error);

      }
    };

  const handleDeleteInterview =
    async (id) => {

      const confirmed =
        window.confirm(
          "Delete interview?"
        );

      if (!confirmed) {
        return;
      }

      try {

        await deleteInterview(id);

        loadInterviews();

      } catch (error) {

        console.log(error);

      }
    };

  const handleSearch =
    async (value) => {

      setSearchTerm(value);

      if (!value.trim()) {

        loadInterviews();

        return;
      }

      try {

        const data =
          await getInterviewsByInterviewer(
            value
          );

        setInterviews(data);

      } catch (error) {

        console.log(error);

      }
    };

  const handleStatusFilter =
    async (status) => {

      setStatusFilter(status);

      if (!status) {

        loadInterviews();

        return;
      }

      try {

        const data =
          await getInterviewsByStatus(
            status
          );

        setInterviews(data);

      } catch (error) {

        console.log(error);

      }
    };

  if (loading) {

    return (

      <MainLayout>

        <div className="p-8">
          Loading Interviews...
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
            Interviews
          </h1>

          <p
            className="mt-2"
            style={{
              color:
                "#64748B"
            }}
          >
            Manage and track all interviews
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

              setEditingInterview(
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
            + Schedule Interview
          </button>

          <input
            type="text"
            placeholder="Search interviewer..."
            value={searchTerm}
            onChange={(e) =>
              handleSearch(
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

          <select
            value={statusFilter}
            onChange={(e) =>
              handleStatusFilter(
                e.target.value
              )
            }
            className="
              p-3
              rounded-2xl
              border
              bg-white
            "
          >

            <option value="">
              All Status
            </option>

            <option value="SCHEDULED">
              Scheduled
            </option>

            <option value="COMPLETED">
              Completed
            </option>

            <option value="SELECTED">
              Selected
            </option>

            <option value="REJECTED">
              Rejected
            </option>

            <option value="CANCELLED">
              Cancelled
            </option>

          </select>

        </div>

        <InterviewTable
          interviews={interviews}
          onEdit={(interview) => {

            setEditingInterview(
              interview
            );

            setShowModal(true);

          }}
          onDelete={
            handleDeleteInterview
          }
        />

        <InterviewModal
          isOpen={showModal}
          initialData={
            editingInterview
          }
          onClose={() => {

            setShowModal(false);

            setEditingInterview(
              null
            );

          }}
          onSubmit={
            editingInterview
              ? handleEditInterview
              : handleCreateInterview
          }
        />

      </div>

    </MainLayout>

  );
}

export default Interviews;