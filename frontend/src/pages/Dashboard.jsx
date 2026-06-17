import { useEffect, useState } from "react";

import DashboardCard from "../components/DashboardCard";
import MainLayout from "../layouts/MainLayout";

import {
  getDashboardStats
} from "../services/dashboardService";

function Dashboard() {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const data =
        await getDashboardStats();

      setStats(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {

    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
        "
      >
        Loading Dashboard...
      </div>
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
          backgroundColor: "#F5F9FF"
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
            Dashboard
          </h1>

          <p
            className="mt-2"
            style={{
              color: "#64748B"
            }}
          >
            Welcome to InterviewPro
          </p>

        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >

          <DashboardCard
            title="Total Candidates"
            value={stats.totalCandidates}
          />

          <DashboardCard
            title="Total Interviews"
            value={stats.totalInterviews}
          />

          <DashboardCard
            title="Total Feedbacks"
            value={stats.totalFeedbacks}
          />

          <DashboardCard
            title="Selected"
            value={stats.selectedInterviews}
          />

          <DashboardCard
            title="Rejected"
            value={stats.rejectedInterviews}
          />

          <DashboardCard
            title="Scheduled"
            value={stats.scheduledInterviews}
          />

          <DashboardCard
            title="Completed"
            value={stats.completedInterviews}
          />

        </div>

      </div>

    </MainLayout>

  );
}

export default Dashboard;