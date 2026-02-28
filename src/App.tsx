// // import AppRoutes from "./routes/AppRoutes"
// import { CartProvider } from "./store/store"
// import RetryFunctionCall from "./timepass/RetryFunctionCall"
// import CounterApp from "./timepass/Infosys/CounterApp"
// import SearchFilter from "./timepass/Infosys/SearchFilter"
// import ResponseLoaderError from "./timepass/Infosys/ResponseLoaderError"
// import Pagination from "./timepass/Infosys/Pagination"
// import ControlledAndUncontrolled from "./timepass/Infosys/ControlledAndUncontrolled"
// import PerformanceTrio from "./timepass/Infosys/PerformanceTrio"
// import Loginform from "./timepass/Infosys/LoginForm"
// import SearchableUserList from "./timepass/Hexaware/SearchableUserList"
// import StallsPage from "./pages/StallsPage"
// import UploadImages from "./pages/UploadImages"
// import SearchComponent from "./timepass/SearchComponent"
// import Timer from "./timepass/TimerReducer"
// import Cart from "./timepass/Hexaware/Cart"
// import MultiStepForm from "./timepass/MultiStepForm"
// import SearchSuggestions from "./timepass/SearchSuggestions"
// import UserSearch from "./timepass/UserSearch"
// import ProductListing from "./product-listing-module/ProductListing"


/**
 * React Query manages server state by 
 * fetching, caching, synchronizing, and 
 * updating API data automatically 
 * in React applications
 * React Query manages server state -- Fetching, Caching, Synchronization, Background updates
 * React Query focuses on -- Data lifecycle inside React
 * React Query still needs Axios or fetch underneath
//  */
import {loadSavedTheme, mountToggleTheme} from 'uni-theme-select'
import {useEffect} from 'react'

function App() {
    useEffect(() => {
      loadSavedTheme();
      mountToggleTheme({'containerId':'footer_section'})
    }, []);


    return (
      <>
        <section className="header">
          <header>
            <h1>My Header</h1>
            <p className="primary-font">Primary Font</p>
            <p className="secondary-font">Secondary Font</p>
          </header>
        </section>
        <section className="content">
          <div className="width-inherit">
            <h1>My Content</h1>
            <button className="primary-button">Primary Button</button>
            <button className="secondary-button">Secondary Button</button>
          </div>
        </section>
        <section className="footer" id="footer_section">
          <div className="width-inherit">
            <h1>My Footer</h1>
          </div>
        </section>
      </>
    )
 
    // <MultiStepForm />
    // <SearchSuggestions />
    // <UserSearch />
    // <ProductListing />


    // Infosys Sample coding questions
    // <>
    //   <Timer />
    //   {/* <SearchFilter /> */}
    //   {/* <ResponseLoaderError /> */}
    // </>
  // )
}

export default App


