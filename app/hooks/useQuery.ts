import { useLocalSearchParams } from "expo-router";

const useQuery = (): URLSearchParams => {
  const searchParams = useLocalSearchParams();
  const searchString = new URLSearchParams(searchParams as Record<string, string>).toString();
  return new URLSearchParams(searchString);
};

export default useQuery;
