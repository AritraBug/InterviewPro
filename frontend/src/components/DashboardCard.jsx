function DashboardCard({
  title,
  value
}) {

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
          color: "#64748B",
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
          color: "#71A5DE",
        }}
      >
        {value}
      </p>

    </div>
  );
}

export default DashboardCard;