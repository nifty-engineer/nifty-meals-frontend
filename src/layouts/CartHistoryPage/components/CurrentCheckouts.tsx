import { useAuth } from "../../../Auth/AuthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CurrentCheckoutsModel from "../../../models/CurrentCheckoutsModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { CheckoutsModal } from "./CheckoutsModal";

export const CurrentCheckouts = () => {
  const { authState, isAuthenticated } = useAuth();
  const [httpError, setHttpError] = useState(null);

  // Current Checkouts By User
  const [currentCheckoutsList, setCurrentCheckoutsList] = useState<
    CurrentCheckoutsModel[]
  >([]);
  const [isLoadingUserCheckouts, setIsLoadingUserCheckouts] = useState(true);
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    const fetchUserCurrentCheckouts = async () => {
      if (authState && isAuthenticated) {
        const url = `http://localhost:8080/api/meals/member/currentcheckouts`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.token}`,
            "Content-Type": "application/json",
          },
        };
        const currentCheckoutsResponse = await fetch(url, requestOptions);
        if (!currentCheckoutsResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const currentCheckoutsResponseJson =
          await currentCheckoutsResponse.json();
        setCurrentCheckoutsList(currentCheckoutsResponseJson);
      }
      setIsLoadingUserCheckouts(false);
    };
    fetchUserCurrentCheckouts().catch((error: any) => {
      setIsLoadingUserCheckouts(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [authState, checkout]);

  if (isLoadingUserCheckouts) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Desktop */}
      <div className="d-none d-lg-block mt-2">
        {currentCheckoutsList.length > 0 ? (
          <>
            <h5>Current Checkouts: </h5>

            {currentCheckoutsList.map((currentCheckout) => (
              <div key={currentCheckout.meal.id}>
                <div className="row mt-3 mb-3">
                  <div className="col-4 col-md-4 container">
                    {currentCheckout.meal?.img ? (
                      <img
                        src={currentCheckout.meal?.img}
                        width="226"
                        height="349"
                        alt="Meal"
                      />
                    ) : (
                      <img
                        src={require("./../../../Images/MealsImages/potato-dinner.jpg")}
                        width="226"
                        height="349"
                        alt="Meal"
                      />
                    )}
                  </div>
                  <div className="card col-3 col-md-3 container d-flex">
                    <div className="card-body">
                      <div className="mt-3">
                        <h4>Current Checkout</h4>
                        {currentCheckout.daysSinceCheckout > 0 ? (
                          <p className="text-secondary">
                            Checked out {currentCheckout.daysSinceCheckout} days
                            ago.
                          </p>
                        ) : (
                          <p className="text-success">Checked out today.</p>
                        )}
                        <div className="list-group mt-3">
                          <button
                            className="list-group-item list-group-item-action"
                            aria-current="true"
                            data-bs-toggle="modal"
                            data-bs-target={`#modal${currentCheckout.meal.id}`}
                          >
                            Manage Checkout
                          </button>
                          <Link
                            to={"search"}
                            className="list-group-item list-group-item-action"
                          >
                            Search more meals?
                          </Link>
                        </div>
                      </div>
                      <hr />
                      <p className="mt-3">
                        Help others find their adventure by reviewing your
                        checkout.
                      </p>
                      <Link
                        className="btn btn-primary"
                        to={`/checkout/${currentCheckout.meal.id}`}
                      >
                        Leave a review
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
                <CheckoutsModal
                  currentCheckoutsModel={currentCheckout}
                  mobile={false}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <h3 className="mt-3">No current checkouts</h3>
            <Link className="btn btn-primary" to={`search`}>
              Search for a new meal
            </Link>
          </>
        )}
      </div>

      {/* Mobile */}
      <div className="container d-lg-none mt-2">
        {currentCheckoutsList.length > 0 ? (
          <>
            <h5 className="mb-3">Current Checkouts: </h5>

            {currentCheckoutsList.map((currentCheckout) => (
              <div key={currentCheckout.meal.id}>
                <div className="d-flex justify-content-center align-items-center">
                  {currentCheckout.meal?.img ? (
                    <img
                      src={currentCheckout.meal?.img}
                      width="226"
                      height="349"
                      alt="Meal"
                    />
                  ) : (
                    <img
                      src={require("./../../../Images/MealsImages/potato-dinner.jpg")}
                      width="226"
                      height="349"
                      alt="Meal"
                    />
                  )}
                </div>
                <div className="card d-flex mt-5 mb-3">
                  <div className="card-body container">
                    <div className="mt-3">
                      <h4>Current Checkout</h4>
                      {currentCheckout.daysSinceCheckout > 0 ? (
                        <p className="text-secondary">
                          Checked out {currentCheckout.daysSinceCheckout} days
                          ago.
                        </p>
                      ) : (
                        <p className="text-success">Checked out today.</p>
                      )}
                      <div className="list-group mt-3">
                        <button
                          className="list-group-item list-group-item-action"
                          aria-current="true"
                          data-bs-toggle="modal"
                          data-bs-target={`#mobilemodal${currentCheckout.meal.id}`}
                        >
                          Manage Checkout
                        </button>
                        <Link
                          to={"search"}
                          className="list-group-item list-group-item-action"
                        >
                          Search more meals?
                        </Link>
                      </div>
                    </div>
                    <hr />
                    <p className="mt-3">
                      Help others find their adventure by reviewing your
                      checkout.
                    </p>
                    <Link
                      className="btn btn-primary"
                      to={`/checkout/${currentCheckout.meal.id}`}
                    >
                      Leave a review
                    </Link>
                  </div>
                </div>

                <hr />
                <CheckoutsModal
                  currentCheckoutsModel={currentCheckout}
                  mobile={true}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <h3 className="mt-3">No current checkouts</h3>
            <Link className="btn btn-primary" to={`search`}>
              Search for a new meal
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
