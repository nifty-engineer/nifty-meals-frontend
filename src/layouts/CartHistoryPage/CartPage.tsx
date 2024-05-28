import { useState } from "react";
import { CurrentCheckouts } from "./components/CurrentCheckouts";
import { UserCheckoutHistoryPage } from "./components/UserCheckoutHistoryPage";

export const CartPage = () => {
  const [historyClick, setHistoryClick] = useState(false);

  return (
    <div className="container">
      <div className="mt-3">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              onClick={() => setHistoryClick(false)}
              className="nav-link active"
              id="nav-currentcheckouts-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-currentcheckouts"
              type="button"
              role="tab"
              aria-controls="nav-currentcheckouts"
              aria-selected="true"
            >
              Current Checkouts
            </button>
            <button
              onClick={() => setHistoryClick(true)}
              className="nav-link"
              id="nav-history-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-history"
              type="button"
              role="tab"
              aria-controls="nav-history"
              aria-selected="false"
            >
              Your Checkout History
            </button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-currentcheckouts"
            role="tabpanel"
            aria-labelledby="nav-currentcheckouts-tab"
          >
            <CurrentCheckouts />
          </div>
          <div
            className="tab-pane fade"
            id="nav-history"
            role="tabpanel"
            aria-labelledby="nav-history-tab"
          >
            {historyClick ? <UserCheckoutHistoryPage /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};
