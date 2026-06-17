import { useState, useEffect } from "react";

import {
  getAllCandidates
} from "../services/candidateService";

function InterviewModal({
  isOpen,
  onClose,
  onSubmit,
  initialData
}) {

  const [candidates,
    setCandidates] =
    useState([]);

  const [formData,
    setFormData] =
    useState({
      title: "",
      interviewer: "",
      scheduledAt: "",
      status: "SCHEDULED",
      mode: "ONLINE",
      meetingLink: "",
      location: "",
      notes: "",
      candidateId: ""
    });

  useEffect(() => {

    loadCandidates();

  }, []);

  useEffect(() => {

    if (initialData) {

      setFormData({
        ...initialData,
        scheduledAt:
          initialData.scheduledAt
            ?.slice(0, 16)
      });

    } else {

      setFormData({
        title: "",
        interviewer: "",
        scheduledAt: "",
        status: "SCHEDULED",
        mode: "ONLINE",
        meetingLink: "",
        location: "",
        notes: "",
        candidateId: ""
      });

    }

  }, [initialData]);

  const loadCandidates =
    async () => {

      try {

        const data =
          await getAllCandidates();

        setCandidates(data);

      } catch (error) {

        console.log(error);

      }
    };

  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit({
      ...formData,
      candidateId:
        Number(formData.candidateId)
    });

  };

  return (

    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
      "
    >

      <div
        className="
          bg-white
          rounded-3xl
          p-8
          w-full
          max-w-2xl
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            mb-6
          "
        >
          {
            initialData
              ? "Edit Interview"
              : "Schedule Interview"
          }
        </h2>

        <form
          onSubmit={handleSubmit}
          className="
            grid
            grid-cols-2
            gap-4
          "
        >

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="border p-3 rounded-xl"
          />

          <input
            name="interviewer"
            value={formData.interviewer}
            onChange={handleChange}
            placeholder="Interviewer"
            className="border p-3 rounded-xl"
          />

          <input
            type="datetime-local"
            name="scheduledAt"
            value={formData.scheduledAt}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <select
            name="candidateId"
            value={formData.candidateId}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          >

            <option value="">
              Select Candidate
            </option>

            {
              candidates.map(
                candidate => (

                  <option
                    key={candidate.id}
                    value={candidate.id}
                  >
                    {candidate.name}
                  </option>

                )
              )
            }

          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          >
            <option>SCHEDULED</option>
            <option>COMPLETED</option>
            <option>CANCELLED</option>
            <option>SELECTED</option>
            <option>REJECTED</option>
          </select>

          <select
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          >
            <option>ONLINE</option>
            <option>OFFLINE</option>
          </select>

          <input
            name="meetingLink"
            value={formData.meetingLink}
            onChange={handleChange}
            placeholder="Meeting Link"
            className="border p-3 rounded-xl"
          />

          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="border p-3 rounded-xl"
          />

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
            className="
              border
              p-3
              rounded-xl
              col-span-2
            "
          />

          <div
            className="
              col-span-2
              flex
              justify-end
              gap-3
            "
          >

            <button
              type="button"
              onClick={onClose}
              className="
                border
                px-4
                py-2
                rounded-xl
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                px-4
                py-2
                rounded-xl
                text-white
              "
              style={{
                backgroundColor:
                  "#71A5DE"
              }}
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}

export default InterviewModal;