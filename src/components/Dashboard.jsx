import React, { useEffect, useState } from "react";
import fetchCubeData from "../services/api";
import ChartCard from "./ChartCard";
import TableCard from "./TableCard";
import dashboardConfig from "../assets/data/dashboardConfig.json";

const Dashboard = () => {
  const [cardData, setCardData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        const dataMap = {};

        // Use Promise.all for parallel fetching
        const fetchPromises = dashboardConfig.cards.map(async (card) => {
          const data = await fetchCubeData(card.query);
          dataMap[card.id] = data;
        });

        await Promise.all(fetchPromises);
        setCardData(dataMap);
      } catch (err) {
        setError("Failed to fetch dashboard data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (isLoading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  // Separate charts and tables
  const chartCards = dashboardConfig.cards.filter(
    (card) => card.visualizationType === "linechart" || card.visualizationType === "semipiechart"
  );
  const tableCards = dashboardConfig.cards.filter(
    (card) => card.visualizationType === "table"
  );

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        {/* Render charts in a grid with 3 columns */}
        {chartCards.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {chartCards.map((card) => {
              const cardDataForId = cardData[card.id];
              return (
                <div key={card.id}>
                  <ChartCard
                    title={card.title}
                    description={card.description}
                    data={cardDataForId}
                    type={card.visualizationType}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Render tables in full-width rows */}
        {tableCards.map((card) => {
          const cardDataForId = cardData[card.id];
          return (
            <div key={card.id} className="w-full">
              <TableCard
                title={card.title}
                description={card.description}
                data={cardDataForId}
                datatableProperties={card.datatableProperties}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;