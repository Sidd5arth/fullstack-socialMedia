import { useEffect, useState, useContext } from "react";
import { Database } from "../supabase";
import AppContext from "../context/app-context";

interface GraphQLResponse<T> {
  data: T;
}

// Function to fetch data using a GraphQL query
async function fetchData<T>(query: string): Promise<GraphQLResponse<T>> {
  const response = await fetch(
    "https://djstzjejdnfaizwrtinh.supabase.co/graphql/v1",
    {
      method: "POST",
      headers: {
        apiKey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqc3R6amVqZG5mYWl6d3J0aW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYwMDMzOTYsImV4cCI6MjAxMTU3OTM5Nn0.VkydOrueYpqOv1SNcs4XQzlQ9ausb6wh2KaQIGBZ2jk",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: {} }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  const data: GraphQLResponse<T> = await response.json();
  return data;
}

// Custom hook for fetching data with GraphQL query
function useGraphQLQuery<T>(query: string) {
  const [data, setData] = useState<GraphQLResponse<T> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const {userData} = useContext(AppContext)


  useEffect(() => {
    if(userData.user && query){
      fetchData<T>(query)
      .then((result) => {
        setData((prevData) => ({
          ...prevData,
          data: result.data,
        }));
        setLoading(false);
      })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [query]);
  console.log(data);
  console.log(loading);
  console.log(error);
  return { data, loading, error };
}

export default useGraphQLQuery;