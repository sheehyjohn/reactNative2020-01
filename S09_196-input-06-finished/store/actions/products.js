export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = productId => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => { 
        //any async code you want!
        const response = await fetch(
            'https://rn-2020-01.firebaseio.com/products.json'
            , {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageURL,
                price
            })
        });      //then / catch would go here - ToDo JS

        const resData  = await response.json();

        console.log(resData);

        dispatch({
            type: CREATE_PRODUCT,
                productData: {
                title,
                description,
                imageUrl,
                price
                }
        });  
    };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    }
  };
};
