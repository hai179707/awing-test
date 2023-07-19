import { useContext } from "react";
import { AppContext } from "../store/Context";
import { Types } from "../store/reducer";

function Views() {
  const {
    state: { views, currentView },
    dispatch,
  } = useContext(AppContext);

  const handleAddView = () => {
    document.getElementById("template")?.classList.remove("invalid");
    if (views[currentView].template === 0) {
      document.getElementById("template")?.classList.add("invalid");
    }
    document
      .querySelectorAll(".view-input")
      .forEach((v) => v.classList.remove("invalid"));
    const invalidField = views[views.length - 1].values?.filter(
      (v) => v.value === ""
    );
    if (invalidField) {
      invalidField.forEach((v) => {
        document.getElementById(v.name)?.classList.add("invalid");
      });
    }

    if (views[views.length - 1].template !== 0 && invalidField?.length === 0) {
      dispatch({
        type: Types.SelectView,
        payload: views.length,
      });
      dispatch({
        type: Types.AddView,
      });
    }
  };

  return (
    <div className="views">
      {views.map((view, index) => (
        <button
          key={index}
          className={currentView === index ? "current" : ""}
          onClick={() => {
            dispatch({
              type: Types.SelectView,
              payload: index,
            });
          }}
        >
          View {index}
        </button>
      ))}
      <button onClick={handleAddView}>+</button>

      <div>
        <label htmlFor="template">Template</label>
        <select
          name="template"
          id="template"
          value={views[currentView].template}
          style={{ marginInline: "5px" }}
          onChange={(e) => {
            dispatch({
              type: Types.SelectTemplate,
              payload: e.target.value,
            });
          }}
        >
          <option value={0}>None</option>
          <option value={1}>Template 1</option>
          <option value={2}>Template 2</option>
        </select>
        <span className="error-message">Error</span>
      </div>

      {views[currentView].values && (
        <table className="view-content">
          <tbody>
            {views[currentView].values?.map((item) => (
              <tr key={item.name}>
                <td>
                  <label htmlFor={item.name}>{item.name}</label>
                </td>
                <td>
                  <input
                    type="text"
                    name={item.name}
                    id={item.name}
                    value={item.value}
                    className="view-input"
                    onChange={(e) => {
                      dispatch({
                        type: Types.UpdateCurrentViewInpValue,
                        payload: {
                          name: item.name,
                          value: e.target.value,
                        },
                      });
                    }}
                  />
                  <span className="error-message">Error</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Views;
