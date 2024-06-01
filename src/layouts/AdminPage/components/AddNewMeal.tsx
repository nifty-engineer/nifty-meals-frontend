import { useAuth } from "../../../Auth/AuthContext";
import { useState } from "react";
import AddMealRequest from "../../../models/AddMealRequest";

export const AddNewMeal = () => {
  const { authState, isAuthenticated } = useAuth();

  // New Meal
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [count, setCount] = useState(0);
  const [category, setCategory] = useState("Category");
  const [selectedImage, setSelectedImage] = useState<any>(null);

  // Displays
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  function categoryField(value: string) {
    setCategory(value);
  }

  async function base64ConversionForImages(e: any) {
    if (e.target.files[0]) {
      getBase64(e.target.files[0]);
    }
  }

  function getBase64(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setSelectedImage(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error", error);
    };
  }

  async function submitNewMeal() {
    const url = `http://localhost:8080/api/admin/secure/add/meal`;
    if (
      isAuthenticated &&
      title !== "" &&
      category !== "Category" &&
      description !== "" &&
      count >= 0
    ) {
      const meal: AddMealRequest = new AddMealRequest(
        title,
        description,
        count,
        category
      );
      meal.img = selectedImage;
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(meal),
      };

      const submitNewMealResponse = await fetch(url, requestOptions);
      if (!submitNewMealResponse.ok) {
        throw new Error("Something went wrong!");
      }
      setTitle("");
      setDescription("");
      setCount(0);
      setCategory("Category");
      setSelectedImage(null);
      setDisplayWarning(false);
      setDisplaySuccess(true);
    } else {
      setDisplayWarning(true);
      setDisplaySuccess(false);
    }
  }

  return (
    <div className="container mt-5 mb-5">
      {displaySuccess && (
        <div className="alert alert-success" role="alert">
          Meal added successfully
        </div>
      )}
      {displayWarning && (
        <div className="alert alert-danger" role="alert">
          All fields must be filled out
        </div>
      )}
      <div className="card">
        <div className="card-header">Add a new meal</div>
        <div className="card-body">
          <form method="POST">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label"> Category</label>
                <button
                  className="form-control btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {category}
                </button>
                <ul
                  id="addNewMealId"
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a
                      onClick={() => categoryField("breakfast")}
                      className="dropdown-item"
                    >
                      Breakfast
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => categoryField("lunch")}
                      className="dropdown-item"
                    >
                      Lunch
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => categoryField("dinner")}
                      className="dropdown-item"
                    >
                      Dinner
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Count</label>
              <input
                type="number"
                className="form-control"
                name="Count"
                required
                onChange={(e) => setCount(Number(e.target.value))}
                value={count}
              />
            </div>
            <input type="file" onChange={(e) => base64ConversionForImages(e)} />
            <div>
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={submitNewMeal}
              >
                Add Meal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
