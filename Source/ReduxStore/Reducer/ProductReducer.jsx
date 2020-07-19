const InitialState = {
  peoductrom: "",
  dproductbattery: "",
  productcolor: "",
  productcompany: "",
  productcpu: "",
  productdate: "",
  productfrontcamera: "",
  productheight: "",
  productid: "",
  productimage: "",
  productinch: "",
  productmodel: "",
  productnumberavailable: "",
  productprice: "",
  productram: "",
  productrating: "",
  productrearcamera: "",
  productwidth: "",
};

const ProductReducer = (state = InitialState, action) => {
  switch (action.type) {
    case "VIEW_PRODUCT":
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export default ProductReducer;
