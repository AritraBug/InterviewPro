import { useEffect } from "react";
import { useState } from "react";

import MainLayout
  from "../layouts/MainLayout";

import CandidateTable
  from "../components/CandidateTable";

import AddCandidateModal
  from "../components/AddCandidateModal";

import {
  getCandidatesPaginated,
  searchCandidates,
  createCandidate
}
from "../services/candidateService";

function Candidates() {

  const [candidates, setCandidates] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [page, setPage] =
    useState(0);

  const [totalPages, setTotalPages] =
    useState(0);

  const [showModal, setShowModal] =
    useState(false);

  useEffect(() => {

    loadCandidates();

  }, [page]);

  const loadCandidates =
    async () => {

      try {

        const data =
          await getCandidatesPaginated(
            page,
            5
          );

        setCandidates(
          data.content
        );

        setTotalPages(
          data.totalPages
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  const handleSearch =
    async (value) => {

      setSearchTerm(value);

      if (!value.trim()) {

        loadCandidates();

        return;
      }

      try {

        const data =
          await searchCandidates(
            value
          );

        setCandidates(data);

      } catch (error) {

        console.log(error);

      }
    };

  const handleAddCandidate =
    async (candidate) => {

      try {

        await createCandidate(
          candidate
        );

        setShowModal(false);

        loadCandidates();

      } catch (error) {

        console.log(error);

      }
    };

  if (loading) {

    return (

      <MainLayout>

        <div
          className="
            p-8
          "
        >
          Loading Candidates...
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
              color: "#1E293B"
            }}
          >
            Candidates
          </h1>

          <p
            className="mt-2"
            style={{
              color: "#64748B"
            }}
          >
            Manage and track all candidates
          </p>

        </div>

        <div className="mb-6">

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="
              px-5
              py-3
              rounded-2xl
              text-white
              font-semibold
              mb-4
            "
            style={{
              backgroundColor:
                "#71A5DE"
            }}
          >
            + Add Candidate
          </button>

          <div>

            <input
              type="text"
              placeholder="Search candidate name..."
              value={searchTerm}
              onChange={(e) =>
                handleSearch(
                  e.target.value
                )
              }
              className="
                w-full
                md:w-96
                p-3
                rounded-2xl
                border
                bg-white
                outline-none
              "
              style={{
                borderColor:
                  "#DCEBFA"
              }}
            />

          </div>

        </div>

        <CandidateTable
          candidates={candidates}
        />

        <div
          className="
            flex
            items-center
            justify-between
            mt-6
          "
        >

          <button
            disabled={page === 0}
            onClick={() =>
              setPage(page - 1)
            }
            className="
              px-4
              py-2
              rounded-xl
              bg-white
              border
              disabled:opacity-50
            "
          >
            Previous
          </button>

          <span>

            Page {page + 1}
            {" "}
            of
            {" "}
            {totalPages}

          </span>

          <button
            disabled={
              page === totalPages - 1
            }
            onClick={() =>
              setPage(page + 1)
            }
            className="
              px-4
              py-2
              rounded-xl
              bg-white
              border
              disabled:opacity-50
            "
          >
            Next
          </button>

        </div>

        <AddCandidateModal
          isOpen={showModal}
          onClose={() =>
            setShowModal(false)
          }
          onSubmit={
            handleAddCandidate
          }
        />

      </div>

    </MainLayout>

  );
}

export default Candidates;