import { useState, useEffect } from "react";

import {
  getAllInterviews
} from "../services/interviewService";

function FeedbackModal({
  isOpen,
  onClose,
  onSubmit,
  initialData
}) {

  const [interviews,
    setInterviews] =
    useState([]);

  const [formData,
    setFormData] =
    useState({
      interviewId: "",
      interviewerName: "",
      technicalScore: 5,
      communicationScore: 5,
      problemSolvingScore: 5,
      recommendation: "HIRE",
      comments: ""
    });

  useEffect(() => {

    loadInterviews();

  }, []);

  useEffect(() => {

    if (initialData) {

      setFormData({
        ...initialData
      });

    }

  }, [initialData]);

  const loadInterviews =
    async () => {

      try {

        const data =
          await getAllInterviews();

        setInterviews(data);

      } catch (error) {

        console.log(error);

      }
    };

  if (!isOpen) {
    return null;
  }

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value
      });

    };

  const handleSubmit =
    (e) => {

      e.preventDefault();

      onSubmit({
        ...formData,
        interviewId:
          Number(
            formData.interviewId
          )
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
              ? "Edit Feedback"
              : "Submit Feedback"
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

          <select
            name="interviewId"
            value={
              formData.interviewId
            }
            onChange={
              handleChange
            }
            className="
              border
              p-3
              rounded-xl
            "
          >

            <option value="">
              Select Interview
            </option>

            {
              interviews.map(
                interview => (

                  <option
                    key={
                      interview.id
                    }
                    value={
                      interview.id
                    }
                  >
                    {
                      interview.title
                    }
                  </option>

                )
              )
            }

          </select>

          <input
            name="interviewerName"
            value={
              formData.interviewerName
            }
            onChange={
              handleChange
            }
            placeholder="Interviewer Name"
            className="
              border
              p-3
              rounded-xl
            "
          />

          <div>

  <label
    className="
      block
      mb-2
      font-medium
      text-gray-700
    "
  >
    Technical Score (1-10)
  </label>

  <input
    type="number"
    min="1"
    max="10"
    name="technicalScore"
    value={formData.technicalScore}
    onChange={handleChange}
    className="
      border
      p-3
      rounded-xl
      w-full
    "
  />

</div>

          <div>

  <label
    className="
      block
      mb-2
      font-medium
      text-gray-700
    "
  >
    Communication Score (1-10)
  </label>

  <input
    type="number"
    min="1"
    max="10"
    name="communicationScore"
    value={formData.communicationScore}
    onChange={handleChange}
    className="
      border
      p-3
      rounded-xl
      w-full
    "
  />

</div>

          <div>

  <label
    className="
      block
      mb-2
      font-medium
      text-gray-700
    "
  >
    Problem Solving Score (1-10)
  </label>

  <input
    type="number"
    min="1"
    max="10"
    name="problemSolvingScore"
    value={formData.problemSolvingScore}
    onChange={handleChange}
    className="
      border
      p-3
      rounded-xl
      w-full
    "
  />

</div>

          <select
            name="recommendation"
            value={
              formData.recommendation
            }
            onChange={
              handleChange
            }
            className="
              border
              p-3
              rounded-xl
            "
          >
            <option>
              STRONG_HIRE
            </option>

            <option>
              HIRE
            </option>

            <option>
              HOLD
            </option>

            <option>
              REJECT
            </option>

          </select>

          <textarea
            name="comments"
            value={
              formData.comments
            }
            onChange={
              handleChange
            }
            placeholder="Comments"
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
              onClick={
                onClose
              }
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

export default FeedbackModal;