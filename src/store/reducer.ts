import { InitStateType, ViewsType } from "./Context";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  ChangeCurrentStep = "CHANGE_CURRENT_STEP",
  ChangeFormNameValue = "CHANGE_FORM_NAME_VALUE",
  ChangeFormTitleValue = "CHANGE_FORM_TITLE_VALUE",
  SetNameError = "SET_NAME_ERROR",
  SetTitleError = "SET_TITLE_ERROR",
  SelectTemplate = "SELECT_TEMPLATE",
  SelectView = "SELECT_VIEW",
  UpdateCurrentViewInpValue = "UPDATE_CURRENT_VIEW_INP_VALUE",
  AddView = "ADD_VIEW",
  ChangeTemplateInputValue = "CHANGE_TEMPLATE_INPUT_VALUE",
}

type PayloadType = {
  [Types.ChangeCurrentStep]: number;
  [Types.ChangeFormNameValue]: string;
  [Types.ChangeFormTitleValue]: string;
  [Types.SetNameError]: boolean;
  [Types.SetTitleError]: boolean;
  [Types.SelectTemplate]: number;
  [Types.SelectView]: number;
  [Types.AddView]: any;
  [Types.UpdateCurrentViewInpValue]: {
    name: string;
    value: string
  };
  [Types.ChangeTemplateInputValue]: {
    index: number;
    values: ViewsType;
  };
};

export type Action = ActionMap<PayloadType>[keyof ActionMap<PayloadType>];

function reducer(state: InitStateType, action: Action) {
  switch (action.type) {
    case Types.ChangeCurrentStep:
      return {
        ...state,
        step: action.payload,
      };
    case Types.ChangeFormNameValue:
      state.formInputValues.name.value = action.payload;
      return {
        ...state,
      };
    case Types.ChangeFormTitleValue:
      state.formInputValues.title.value = action.payload;
      return {
        ...state,
      };

    case Types.SetNameError:
      state.formInputValues.name.valid = action.payload;
      return {
        ...state,
      };

    case Types.SetTitleError:
      state.formInputValues.title.valid = action.payload;
      return {
        ...state,
      };
    case Types.SelectTemplate:
      state.views[state.currentView].template = +action.payload;
      if(+action.payload === 0 && state.views[state.currentView].values) {
       delete state.views[state.currentView].values
      }
      if(+action.payload === 1) {
        state.views[state.currentView].values = [
          {
            name: 'email',
            value: '',
            valid: true
          },
          {
            name: 'age',
            value: '',
            valid: true
          },
          {
            name: 'gender',
            value: '',
            valid: true
          },
        ]
      }
      if(+action.payload === 2) {
        state.views[state.currentView].values = [
          {
            name: 'id',
            value: '',
            valid: true
          },
          {
            name: 'username',
            value: '',
            valid: true
          },
          {
            name: 'password',
            value: '',
            valid: true
          },
        ]
      }
      return {
        ...state,
      };
    case Types.UpdateCurrentViewInpValue: 
      state.views[state.currentView].values?.forEach(v => {if(v.name === action.payload.name) v.value = action.payload.value})
      
      return {
        ...state
      }
    case Types.SelectView:  
      return {
      ...state,
        currentView: action.payload,
      };
    case Types.AddView:
      return {
        ...state,
        views: [...state.views, { id: state.currentView, template: 0}],
        currentView: state.currentView,
      };
    case Types.ChangeTemplateInputValue:
      state.views[action.payload.index] = { ...action.payload.values };
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default reducer;
