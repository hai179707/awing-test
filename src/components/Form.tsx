import { useContext } from "react";
import { AppContext } from "../store/Context";
import { Types } from "../store/reducer";

function Form() {
  const { state: {formInputValues: {name, title}}, dispatch } = useContext(AppContext);

  return (
    <div className="form">
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="name">Name</label>
            </td>
            <td>
              <input
                type="text"
                value={name.value}
                id="name"
                name="name"
                className={name.valid ? '' : 'invalid'}
                onChange={(e) => {
                  dispatch({
                    type: Types.ChangeFormNameValue,
                    payload: e.target.value,
                  });
                }}
              />
              <span className="error-message">Error</span>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="title">Title</label>
            </td>
            <td>
              <input
                type="text"
                value={title.value}
                id="title"
                name="title"
                className={title.valid ? '' : 'invalid'}
                onChange={(e) => {
                  dispatch({
                    type: Types.ChangeFormTitleValue,
                    payload: e.target.value,
                  });
                }}
              />
              <span className="error-message">Error</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Form;
