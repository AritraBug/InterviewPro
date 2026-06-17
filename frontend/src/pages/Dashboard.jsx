import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

import { useEffect, useState } from "react";

import DashboardCard from "../components/DashboardCard";
import MainLayout from "../layouts/MainLayout";

import {
  getDashboardStats
} from "../services/dashboardService";

function Dashboard() {

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const COLORS = [
    "#71A5DE",
    "#A5C8F0",
    "#DCEBFA",
    "#4F8FD4",
    "#90B9E8"
  ];

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard =
    async () => {

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

  const interviewStatusData = [
    {
      name: "Scheduled",
      value: stats.scheduledInterviews
    },
    {
      name: "Completed",
      value: stats.completedInterviews
    },
    {
      name: "Selected",
      value: stats.selectedInterviews
    },
    {
      name: "Rejected",
      value: stats.rejectedInterviews
    },
    {
      name: "Cancelled",
      value: stats.cancelledInterviews
    }
  ];

  const recommendationData = [
    {
      name: "Strong Hire",
      value: stats.strongHireCount
    },
    {
      name: "Hire",
      value: stats.hireCount
    },
    {
      name: "Hold",
      value: stats.holdCount
    },
    {
      name: "Reject",
      value: stats.rejectCount
    }
  ];

  const outcomeData = [
    {
      name: "Selected",
      count: stats.selectedInterviews
    },
    {
      name: "Rejected",
      count: stats.rejectedInterviews
    },
    {
      name: "Cancelled",
      count: stats.cancelledInterviews
    }
  ];

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

          <DashboardCard
            title="Cancelled"
            value={stats.cancelledInterviews}
          />

        </div>

        <div
          className="
            mt-10
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-8
          "
        >

          <div
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-md
            "
          >

            <h2
              className="
                text-xl
                font-semibold
                mb-4
              "
              style={{
                color: "#1E293B"
              }}
            >
              Interview Status Distribution
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={interviewStatusData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >

                  {
                    interviewStatusData.map(
                      (entry, index) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[
                              index %
                              COLORS.length
                            ]
                          }
                        />

                      )
                    )
                  }

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          <div
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-md
            "
          >

            <h2
              className="
                text-xl
                font-semibold
                mb-4
              "
              style={{
                color: "#1E293B"
              }}
            >
              Recommendation Distribution
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={recommendationData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >

                  {
                    recommendationData.map(
                      (entry, index) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[
                              index %
                              COLORS.length
                            ]
                          }
                        />

                      )
                    )
                  }

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div
          className="
            bg-white
            rounded-3xl
            p-6
            shadow-md
            mt-8
          "
        >

          <h2
            className="
              text-xl
              font-semibold
              mb-4
            "
            style={{
              color: "#1E293B"
            }}
          >
            Hiring Outcomes
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart
              data={outcomeData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#71A5DE"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </MainLayout>

  );
}

export default Dashboard;