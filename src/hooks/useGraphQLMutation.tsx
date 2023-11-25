import { useState, useEffect, useContext } from 'react';
import AppContext from '../context/app-context';

interface GraphQLResponse<T> {
  data:T
}

async function fetchData<T>(query: string, variables: any): Promise<GraphQLResponse<T>> {
  const response = await fetch("https://djstzjejdnfaizwrtinh.supabase.co/graphql/v1", {
    method: "POST",
    headers: {
      apiKey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqc3R6amVqZG5mYWl6d3J0aW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYwMDMzOTYsImV4cCI6MjAxMTU3OTM5Nn0.VkydOrueYpqOv1SNcs4XQzlQ9ausb6wh2KaQIGBZ2jk",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  const data: GraphQLResponse<T> = await response.json();

  return data;
}

function useGraphQLMutation<T>() {
  const { userData } = useContext(AppContext);
  const [mutationData, setMutationData] = useState<any | null>(null);
  const [mutationLoading, setMutationLoading] = useState<boolean>(false);
  const [mutationError, setMutationError] = useState<Error | null>(null);

  const executeMutation = async (mutation: string, variables: any) => {
    console.log(mutation, variables)
    setMutationLoading(true);

    try {
      const queryResult = await fetchData<T>(mutation, variables);
      setMutationData(queryResult.data);
      setMutationLoading(false);
    } catch (error) {
      setMutationLoading(false);
    }
  };

  return { mutationData, mutationLoading, mutationError, executeMutation };
}

export default useGraphQLMutation;
