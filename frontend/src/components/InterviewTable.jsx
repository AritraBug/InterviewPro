function InterviewTable({
  interviews,
  onEdit,
  onDelete
}) {

  const getStatusBadge = (
    status
  ) => {

    switch (status) {

      case "SELECTED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      case "COMPLETED":
        return "bg-blue-100 text-blue-700";

      case "CANCELLED":
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-yellow-100 text-yellow-700";
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
              Title
            </th>

            <th className="p-4 text-left">
              Interviewer
            </th>

            <th className="p-4 text-left">
              Candidate
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Mode
            </th>

            <th className="p-4 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {
            interviews.map(
              interview => (

                <tr
                  key={interview.id}
                  className="border-b"
                >

                  <td className="p-4">
                    {interview.title}
                  </td>

                  <td className="p-4">
                    {interview.interviewer}
                  </td>

                  <td className="p-4">
                    {
                      interview.candidateName
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
                        ${getStatusBadge(
                          interview.status
                        )}
                      `}
                    >
                      {interview.status}
                    </span>

                  </td>

                  <td className="p-4">
                    {interview.mode}
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        onEdit(interview)
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
                          interview.id
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

export default InterviewTable;