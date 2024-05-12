import { Link } from "react-router-dom";

export const SuccessStories = () => {
  return (
    <div>
      <div className="d-none d-lg-block">
        <div className="row g-0 mt-5">
          <div className="col-sm-6 col-md-6">
            <div className="col-image-left"></div>
          </div>
          <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
            <div className="ml-2">
              <h1>What have you been enjoying?</h1>
              <p className="lead">
                The nifty-meals team would love to know what you have been
                enjoying. Whether it is to lose weight or just eat healthy, we
                will be able to provide the top meal kit for you!
              </p>
              <Link
                type="button"
                className="btn main-color btn-lg text-white"
                to="#"
              >
                Explore top meals
              </Link>
            </div>
          </div>
        </div>
        <div className="row g-0">
          <div
            className="col-4 col-md-4 container d-flex 
                        justify-content-center align-items-center"
          >
            <div className="ml-2">
              <h1>Our collection is always changing!</h1>
              <p className="lead">
                Make sure to check in daily as our collection is always
                changing! We work nonstop to provide the most delicious meal
                selection possible for our nifty-meal family! We are diligent
                about our meal selection and our meals are always going to be
                our top priority.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6">
            <div className="col-image-right"></div>
          </div>
        </div>
      </div>

      {/* Mobile Heros */}
      <div className="d-lg-none">
        <div className="container">
          <div className="m-2">
            <div className="col-image-left"></div>
            <div className="mt-2">
              <h1>What have you been enjoying?</h1>
              <p className="lead">
                The nifty-meals team would love to know what you have been
                enjoying. Whether it is to lose weight or just eat healthy, we
                will be able to provide the top meal kit for you!
              </p>
              <Link
                type="button"
                className="btn main-color btn-lg text-white"
                to="#"
              >
                Explore top meals
              </Link>
            </div>
          </div>
          <div className="m-2">
            <div className="col-image-right"></div>
            <div className="mt-2">
              <h1>Our collection is always changing!</h1>
              <p className="lead">
                Try to check in daily as our collection is always changing! We
                work nonstop to provide the most delicious meal selection
                possible for our nifty-meal customers! We are diligent about our
                meal selection and our meals are always going to be our top
                priority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
