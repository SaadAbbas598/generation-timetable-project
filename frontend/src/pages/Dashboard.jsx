import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearch } from "../context/searchContext";
import Layout from "../../layout/Layout";

const apiUrl = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm, searchResults } = useSearch();

  const [stakeholders, setStakeholders] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    new: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const userId = JSON.parse(storedUser).id;
      try {
        const res = await axios.get(`${apiUrl}/api/stakeholders/stats?userId=${userId}`);
        setStakeholders(res.data);
      } catch (err) {
        console.error("Error fetching stakeholder stats:", err);
      }
    };

    fetchStats();
  }, []);

  const stakeholderStats = [
    { title: "Total Stakeholders", value: stakeholders.total, bg: "#16a34a" },
    { title: "New Stakeholders", value: stakeholders.new, bg: "#f59e0b" },
  ];

  useEffect(() => {
    const fetchProjectsAndExpenses = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        console.error("User ID not found in localStorage");
        return;
      }

      try {
        const stakeholdersRes = await axios.get(
          `${apiUrl}/api/projects/with-stakeholders?userId=${user.id}`
        );

        const expensesRes = await axios.get(`${apiUrl}/api/projects/expenses`, {
          params: { userId: user.id },
        });

        const expenseMap = {};
        expensesRes.data.forEach((proj) => {
          expenseMap[proj._id] = proj.totalExpenditure;
        });

        const mergedProjects = stakeholdersRes.data.map((project) => ({
          ...project,
          totalExpenditure: expenseMap[project._id] || 0,
        }));

        const filtered = mergedProjects.filter(
          (p) => p.stakeholders && p.stakeholders.length > 0
        );

        setProjectsData(filtered);
      } catch (error) {
        console.error("Failed to fetch projects or expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsAndExpenses();
  }, []);

  const displayedProjects =
    searchTerm.trim() !== "" && Array.isArray(searchResults)
      ? searchResults
      : Array.isArray(projectsData)
      ? projectsData
      : [];

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6 text-[#1e1e1e]">Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stakeholderStats.map((stat, index) => (
          <div
            key={index}
            className="text-white p-4 rounded-xl shadow"
            style={{ backgroundColor: stat.bg }}
          >
            <p>{stat.title}</p>
            <h2 className="text-2xl font-bold">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Projects Section */}
      {loading ? (
        <p>Loading projects and stakeholders...</p>
      ) : displayedProjects.length === 0 ? (
        searchTerm.trim() ? (
          <p>No matching projects found for "{searchTerm}"</p>
        ) : (
          <p>No projects available.</p>
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-xl p-4 shadow space-y-4"
            >
              <h2 className="font-semibold text-lg">{project.name}</h2>
              <p>{project.description}</p>
              <p className="text-sm text-gray-600">
                Total Expenditure:{" "}
                <span className="font-bold text-black">
                  ${project.totalExpenditure}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
