import { useEffect, useState } from "react";
import MealModel from "../../models/MealModel";
import { Pagination } from "../Utils/Pagination";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchMeal } from "./components/SearchMeal";

export const SearchMealsPage = () => {
  const [meals, setMeals] = useState<MealModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [mealsPerPage] = useState(5);
  const [totalAmountOfMeals, setTotalAmountOfMeals] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [categorySelection, setCategorySelection] = useState("Meal category");

  useEffect(() => {
    const fetchMeals = async () => {
      const baseUrl: string = "http://localhost:8080/api/meals";

      let url: string = "";

      if (searchUrl === "") {
        url = `${baseUrl}?page=${currentPage - 1}&size=${mealsPerPage}`;
      } else {
        let searchWithPage = searchUrl.replace(
          "<pageNumber>",
          `${currentPage - 1}`
        );
        url = baseUrl + searchWithPage;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJson = await response.json();

      const responseData = responseJson._embedded.meals;

      setTotalAmountOfMeals(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

      const loadedMeals: MealModel[] = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: responseData[key].id,
          title: responseData[key].title,
          description: responseData[key].description,
          quantity: responseData[key].copies,
          quantityAvailable: responseData[key].copiesAvailable,
          category: responseData[key].category,
          img: responseData[key].img,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [currentPage, searchUrl]);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const searchHandleChange = () => {
    setCurrentPage(1);
    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${mealsPerPage}`
      );
    }
    setCategorySelection("Meal category");
  };

  const categoryField = (value: string) => {
    setCurrentPage(1);
    if (
      value.toLowerCase() === "breakfast" ||
      value.toLowerCase() === "lunch" ||
      value.toLowerCase() === "dinner"
    ) {
      setCategorySelection(value);
      setSearchUrl(
        `/search/findByCategory?category=${value}&page=<pageNumber>&size=${mealsPerPage}`
      );
    } else {
      setCategorySelection("All");
      setSearchUrl(`?page=<pageNumber>&size=${mealsPerPage}`);
    }
  };

  const indexOfLastMeal: number = currentPage * mealsPerPage;
  const indexOfFirstMeal: number = indexOfLastMeal - mealsPerPage;
  let lastItem =
    mealsPerPage * currentPage <= totalAmountOfMeals
      ? mealsPerPage * currentPage
      : totalAmountOfMeals;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-labelledby="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn btn-outline-success"
                  onClick={() => searchHandleChange()}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {categorySelection}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li onClick={() => categoryField("All")}>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  <li onClick={() => categoryField("breakfast")}>
                    <a className="dropdown-item" href="#">
                      Breakfast
                    </a>
                  </li>
                  <li onClick={() => categoryField("lunch")}>
                    <a className="dropdown-item" href="#">
                      Lunch
                    </a>
                  </li>
                  <li onClick={() => categoryField("dinner")}>
                    <a className="dropdown-item" href="#">
                      Dinner
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {totalAmountOfMeals > 0 ? (
            <>
              <div className="mt-3">
                <h5>Number of results: ({totalAmountOfMeals})</h5>
              </div>
              <p>
                {indexOfFirstMeal + 1} to {lastItem} of {totalAmountOfMeals}{" "}
                items:
              </p>
              {meals.map((meal) => (
                <SearchMeal meal={meal} key={meal.id} />
              ))}
            </>
          ) : (
            <div className="m-5">
              <h3>Can't find what you are looking for?</h3>
              <a
                type="button"
                className="btn main-color btn-md px-4 me-md-2 fw-bold text-white"
                href="#"
              >
                Member Services
              </a>
            </div>
          )}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
};
