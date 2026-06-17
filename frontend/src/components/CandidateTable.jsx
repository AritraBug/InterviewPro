function CandidateTable({
  candidates
}) {

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
              Name
            </th>

            <th className="p-4 text-left">
              Email
            </th>

            <th className="p-4 text-left">
              College
            </th>

            <th className="p-4 text-left">
              Skills
            </th>

          </tr>

        </thead>

        <tbody>

          {
            candidates.map(
              candidate => (

                <tr
                  key={candidate.id}
                  className="
                    border-b
                  "
                >

                  <td className="p-4">
                    {candidate.name}
                  </td>

                  <td className="p-4">
                    {candidate.email}
                  </td>

                  <td className="p-4">
                    {candidate.college}
                  </td>

                  <td className="p-4">
                    {candidate.skills}
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

export default CandidateTable;