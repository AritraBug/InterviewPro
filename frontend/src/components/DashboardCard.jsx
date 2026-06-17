function DashboardCard({
  title,
  value
}) {

  const getColor = () => {

    switch (title) {

      case "Selected":
        return "#22C55E";

      case "Rejected":
        return "#EF4444";

      case "Scheduled":
        return "#F59E0B";

      case "Completed":
        return "#8B5CF6";

      case "Cancelled":
        return "#6B7280";

      default:
        return "#71A5DE";
    }
  };

  return (

    <div
      className="
        rounded-3xl
        p-6
        transition
        hover:scale-105
      "
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #DCEBFA",
        boxShadow:
          "0 8px 25px rgba(113,165,222,0.12)"
      }}
    >

      <h3
        className="text-sm"
        style={{
          color: "#64748B"
        }}
      >
        {title}
      </h3>

      <p
        className="
          text-4xl
          font-bold
          mt-3
        "
        style={{
          color: getColor()
        }}
      >
        {value}
      </p>

    </div>

  );
}

export default DashboardCard;