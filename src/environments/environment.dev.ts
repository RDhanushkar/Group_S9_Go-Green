/* eslint-disable @typescript-eslint/naming-convention */
export const environment = {
  production: false,

  BASE_URL :"http://localhost:3000/",
  CUSTOMER_BASE_URL:"http://localhost:3000/customers/",
  CUSTOMER:{
    GET_ALL_CUSTOMERS:'list',
    GET_CUSTOMER:'view?userId=',
    UPDATE_CUSTOMER:'upadte?userId=',
    DELETE_CUSTOMER:'delete?userId=',
    SEARCH_CUSTOMER:'search?userId=',
    CREATE_CUSTOMER:'add'
  },
  // USER:{
  //   GET_ALL_CUSTOMERS:'view',
  //   GET_CUSTOMER:'view',
  //   UPDATE_CUSTOMER:'upadte',
  //   DELETE_CUSTOMER:'delete',
  //   SEARCH_CUSTOMER:'search',
  // }
};
