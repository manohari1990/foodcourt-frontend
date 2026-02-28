import {
  useEffect,
  useState,
  useCallback,
} from "react";
// import { useDebounce } from "./useDebounce";
// import ClaimsTable from "./ClaimsTable";

// const API_URL = "https://api.example.com/claims";

function InsuranceClaimsPage() {
  // const [claims, setClaims] = useState([]);
  // const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    sortBy: "date",
    sortOrder: "desc",
    status: "",
    search: ""
  });

  // const debouncedSearch = useDebounce(query.search, 500);

  // // Memoized query params
  // const queryString = useMemo(() => {
  //   const params:any = new URLSearchParams({
  //     page: (query.page).toString,
  //     limit: query.limit,
  //     sortBy: query.sortBy,
  //     sortOrder: query.sortOrder,
  //     status: query.status,
  //     search: debouncedSearch,
  //   });
  //   return params.toString();
  // }, [query.page, query.limit, query.sortBy, query.sortOrder, query.status, debouncedSearch]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchClaims() {
      try {
        setLoading(true);
        setError(null);
        console.log(query)

        // const response = await fetch(`${API_URL}?${queryString}`, {
        //   signal: controller.signal
        // });

        // if (!response.ok) {
        //   throw new Error("Failed to fetch claims");
        // }

        // const data = await response.json();
        // setClaims(data.items);
        // setTotal(data.total);
      } catch (err:any) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchClaims();

    return () => controller.abort();
  }, []);

  // Stable handlers
  // const handlePageChange = useCallback((page:number) => {
  //   setQuery(prev => ({ ...prev, page }));
  // }, []);

  // const handleSort = useCallback((sortBy:string) => {
  //   setQuery(prev => ({
  //     ...prev,
  //     sortBy,
  //     sortOrder:
  //       prev.sortBy === sortBy && prev.sortOrder === "asc"
  //         ? "desc"
  //         : "asc"
  //   }));
  // }, []);

  const handleStatusFilter = useCallback((status:any) => {
    setQuery(prev => ({
      ...prev,
      status,
      page: 1
    }));
  }, []);

  const handleSearch = useCallback((e:any) => {
    setQuery(prev => ({
      ...prev,
      search: e.target.value,
      page: 1
    }));
  }, []);

  return (
    <div>
      <h2>Insurance Claims</h2>

      <input
        type="text"
        placeholder="Search claim..."
        onChange={handleSearch}
      />

      <select onChange={(e) => handleStatusFilter(e.target.value)}>
        <option value="">All</option>
        <option value="approved">Approved</option>
        <option value="pending">Pending</option>
        <option value="rejected">Rejected</option>
      </select>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* <ClaimsTable
        // claims={claims}
        // total={total}
        page={query.page}
        limit={query.limit}
        onPageChange={handlePageChange}
        onSort={handleSort}
        sortBy={query.sortBy}
        sortOrder={query.sortOrder}
      /> */}
    </div>
  );
}

export default InsuranceClaimsPage
