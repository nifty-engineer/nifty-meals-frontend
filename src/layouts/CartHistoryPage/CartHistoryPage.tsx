import { CurrentCheckouts } from "./components/CurrentCheckouts";

export const CartHistoryPage = () => {
  return (
    <div className="container">
      <div className="mt-3">
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-loans"
            role="tabpanel"
            aria-labelledby="nav-loans-tab"
          >
            <CurrentCheckouts />
          </div>
        </div>
      </div>
    </div>
  );
};
