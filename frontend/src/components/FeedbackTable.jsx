function FeedbackTable({
  feedbacks,
  onEdit,
  onDelete
}) {

  const getBadgeClass =
    (recommendation) => {

      switch (
        recommendation
      ) {

        case "STRONG_HIRE":
          return "bg-green-100 text-green-700";

        case "HIRE":
          return "bg-blue-100 text-blue-700";

        case "HOLD":
          return "bg-yellow-100 text-yellow-700";

        case "REJECT":
          return "bg-red-100 text-red-700";

        default:
          return "bg-gray-100 text-gray-700";
      }
    };

  return (

    <div
      className="
        bg-white
        rounded-3xl
        shadow-md
        overflow-hidden
      "
    >

      <table
        className="w-full"
      >

        <thead>

          <tr
            style={{
              backgroundColor:
                "#DCEBFA"
            }}
          >

            <th className="p-4 text-left">
              Interviewer
            </th>

            <th className="p-4 text-left">
              Technical
            </th>

            <th className="p-4 text-left">
              Communication
            </th>

            <th className="p-4 text-left">
              Problem Solving
            </th>

            <th className="p-4 text-left">
              Recommendation
            </th>

            <th className="p-4 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {
            feedbacks.map(
              feedback => (

                <tr
                  key={feedback.id}
                  className="border-b"
                >

                  <td className="p-4">
                    {
                      feedback.interviewerName
                    }
                  </td>

                  <td className="p-4">
                    {
                      feedback.technicalScore
                    }
                  </td>

                  <td className="p-4">
                    {
                      feedback.communicationScore
                    }
                  </td>

                  <td className="p-4">
                    {
                      feedback.problemSolvingScore
                    }
                  </td>

                  <td className="p-4">

                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-semibold
                        ${getBadgeClass(
                          feedback.recommendation
                        )}
                      `}
                    >
                      {
                        feedback.recommendation
                      }
                    </span>

                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        onEdit(feedback)
                      }
                      className="
                        mr-3
                        text-blue-600
                      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        onDelete(
                          feedback.id
                        )
                      }
                      className="
                        text-red-600
                      "
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              )
            )
          }

        </tbody>

      </table>

    </div>

  );
}

export default FeedbackTable;