import CurrentCheckoutsModel from "../../../models/CurrentCheckoutsModel";

export const CheckoutsModal: React.FC<{
  currentCheckoutsModel: CurrentCheckoutsModel;
  mobile: boolean;
}> = (props) => {
  return (
    <div
      className="modal fade"
      id={
        props.mobile
          ? `mobilemodal${props.currentCheckoutsModel.meal.id}`
          : `modal${props.currentCheckoutsModel.meal.id}`
      }
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      key={props.currentCheckoutsModel.meal.id}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Current Checkout
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="mt-3">
                <div className="row">
                  <div className="col-2">
                    {props.currentCheckoutsModel.meal?.img ? (
                      <img
                        src={props.currentCheckoutsModel.meal?.img}
                        width="56"
                        height="87"
                        alt="Meal"
                      />
                    ) : (
                      <img
                        src={require("./../../../Images/MealsImages/potato-dinner.jpg")}
                        width="56"
                        height="87"
                        alt="Meal"
                      />
                    )}
                  </div>
                  <div className="col-10">
                    <h4>{props.currentCheckoutsModel.meal.title}</h4>
                  </div>
                </div>
                <br />
                {props.currentCheckoutsModel.daysSinceCheckout > 0 ? (
                  <p className="text-secondary">
                    Checked out {props.currentCheckoutsModel.daysSinceCheckout}{" "}
                    days ago.
                  </p>
                ) : (
                  <p className="text-success">Checked out today.</p>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
