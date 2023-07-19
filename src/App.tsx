import { AppContext } from "./store/Context";
import { useContext } from "react";
import { Types } from "./store/reducer";
import Form from "./components/Form";
import Views from "./components/Views";

function App() {
  const { state, dispatch } = useContext(AppContext);

  const handleSubmit = () => {
    // Validate name input
    if (state.formInputValues.name.value === "") {
      dispatch({
        type: Types.SetNameError,
        payload: false,
      });
    } else {
      dispatch({
        type: Types.SetNameError,
        payload: true,
      });
    }
    // Validate title input
    if (state.formInputValues.title.value === "") {
      dispatch({
        type: Types.SetTitleError,
        payload: false,
      });
    } else {
      dispatch({
        type: Types.SetTitleError,
        payload: true,
      });
    }
    // Validate template select
    if (state.views[state.views.length - 1].template === 0) {
      document.getElementById("template")?.classList.add("invalid");
    } else {
      document.getElementById("template")?.classList.remove("invalid");
    }

    document
      .querySelectorAll(".view-input")
      .forEach((v) => v.classList.remove("invalid"));
    const invalidField = state.views[state.views.length - 1].values?.filter(
      (v) => v.value === ""
    );
    if (invalidField) {
      invalidField.forEach((v) => {
        document.getElementById(v.name)?.classList.add("invalid");
      });
    }
    // Alert
    if (
      state.formInputValues.name.value === "" ||
      state.formInputValues.title.value === "" ||
      state.views[state.views.length - 1].template === 0 ||
      state.views[state.views.length - 1].values?.filter((v) => v.value === "")
        .length !== 0
    ) {
      alert("Vui lòng nhập đủ thông tin!");
    } else {
      alert("Thành công!");
    }
  };

  return (
    <div className="App">
      <div className="container">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
        <br />
        <hr />
        <div className="step-list">
          <button
            className={state.step === 0 ? "current" : ""}
            onClick={() => {
              dispatch({
                type: Types.ChangeCurrentStep,
                payload: 0,
              });
            }}
          >
            0
          </button>
          <button
            className={state.step === 1 ? "current" : ""}
            onClick={() => {
              dispatch({
                type: Types.ChangeCurrentStep,
                payload: 1,
              });
            }}
          >
            1
          </button>
        </div>
        {state.step === 0 ? <Form /> : <Views />}
      </div>
    </div>
  );
}

export default App;
