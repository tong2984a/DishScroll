import React, { useEffect } from "react";

import "./App.css"

import { connect } from "react-redux";
import {
  selectHasMoreProductsToFetch,
  selectIsFetchingProducts,
  selectProducts
} from "./redux/product/product.selectors";
import {
  startInitialProductsFetch,
  startLoadingMoreProducts
} from "./redux/product/product.actions";
import usePaginationOnIntersection from "./hooks/usePaginationOnIntersection.hook";

function App({
  products,
  fetchProducts,
  fetchMoreProducts,
  hasMoreProductsToFetch,
  isFetchingProducts
}) {
  const fetchMoreOnIntersection = usePaginationOnIntersection(
    fetchMoreProducts,
    isFetchingProducts,
    hasMoreProductsToFetch
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (


  <div class="album py-5 bg-light">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {(products || []).map((product, index) => (
          <div class="col">
            <div
              key={product.id}
              className="card shadow-sm"
              ref={
                index + 1 === products.length
                  ? fetchMoreOnIntersection
                  : undefined
              }
            >
              <img src={product.fileURL} class="card-img-top" alt="dish" />
              <div class="card-body">
                <h5 class="card-title">{product.restaurant}</h5>
                <p class="card-text">{product.dish}</p>
              </div>
            </div>
          </div>
        ))}
        {isFetchingProducts && <p>Loading...</p>}
      </div>
    </div>
  </div>
  );
}

const mapStateToProps = (state) => ({
  products: selectProducts(state),
  isFetchingProducts: selectIsFetchingProducts(state),
  hasMoreProductsToFetch: selectHasMoreProductsToFetch(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(startInitialProductsFetch()),
  fetchMoreProducts: () => dispatch(startLoadingMoreProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
