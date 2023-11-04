import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "出席者数推移",
    },
  },
};

import { RequireAuth } from "../components/RequireAuth";
import { Main } from "../components/Main";

export const Home = () => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "出席者数",
        data: labels.map(() => (Math.random() * 20) | 0),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <>
      <Main>
        <RequireAuth>
          <div className="mx-auto max-w-[800px]">
            <div className="h-[400px] mb-5 p-10 rounded-lg shadow-lg mt-10">
              <Line className="mx-auto" options={options} data={data} />
            </div>
            <div className="text-center w-full">
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Enter</div>
                  <div className="stat-value">31K</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Exit</div>
                  <div className="stat-value">4,200</div>
                </div>
              </div>
            </div>
          </div>
        </RequireAuth>
      </Main>
    </>
  );
};
