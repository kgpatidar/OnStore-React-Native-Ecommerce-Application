const InitialState = {
  name: "ImaRedux",
  email: "",
  password: "",
  home: "",
  city: "",
  zipcode: "",
  state: "",
  id: "",
};

const UserDetailReducer = (state = InitialState, action) => {
  switch (action.type) {
    case "SAVE_USER_DATA":
      state.name = action.payload.username;
      state.email = action.payload.useremail;
      state.password = action.payload.userpassword;
      state.id = action.payload.userid;
      state.home = action.payload.userhome;
      state.zipcode = action.payload.userzipcode;
      state.city = action.payload.usercity;
      state.state = action.payload.userstate;
      return state;
    default:
      return state;
  }
};

export default UserDetailReducer;
