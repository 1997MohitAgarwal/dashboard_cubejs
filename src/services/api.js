const fetchCubeData = async (query) => {
    try {
      const parsedQuery = typeof query === "string" ? JSON.parse(query) : query;
      console.log("Parsed query:", parsedQuery);
  
      const updatedQuery = parsedQuery.map(q => ({
        ...q,
        timeDimensions: q.timeDimensions.map(td => ({
          ...td,
          granularity: td.granularity || "day",
        })),
      }));
      console.log("Updated query with granularity:", updatedQuery);
  
      // Make the API call
      const response = await fetch(
        "https://amaranth-muskox.aws-us-east-1.cubecloudapp.dev/dev-mode/feat/frontend-hiring-task/cubejs-api/v1/load",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJicmFuZElkIjoiNDkiLCJleHAiOjE3NDM0OTYyMTIsImlzcyI6ImN1YmVjbG91ZCJ9.luqfkt0CQW_B01j5oAvl_8hicbFzPmyLXfvEZYJbej4",
          },
          body: JSON.stringify({ query: updatedQuery, queryType: "multi" }),
        }
      );
  
      console.log("Response status:", response.status, response.statusText);
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
      }
  
      const data = await response.json();
      console.log("API response data:", data);
  
      return data.results;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  
  export default fetchCubeData;