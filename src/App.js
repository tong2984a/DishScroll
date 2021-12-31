import React, { useEffect } from "react";
import {Container, Nav, Navbar} from 'react-bootstrap';
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

  const handleFilter = (filter) => {
    fetchProducts(filter)
  }

  useEffect(() => {
    fetchProducts("");
  }, [fetchProducts]);

  return (
    <main>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">VEGAN DISH DIRECTORY</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" onClick={() => handleFilter('HK Island')}>Hong Kong 香港島</Nav.Link>
              <Nav.Link href="#" onClick={() => handleFilter('Kowloon')}>Kowloon 九龍</Nav.Link>
              <Nav.Link href="#" onClick={() => handleFilter('New Territories')}>New Territories 新界</Nav.Link>
              <Nav.Link href="#" onClick={() => handleFilter('Outlying Islands')}>Outlying Islands 離島</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {(products || []).map((product, index) => (
              <div key={product.id} className="col">
                <div
                  key={product.id}
                  className="card shadow-sm"
                  ref={
                    index + 1 === products.length
                      ? fetchMoreOnIntersection
                      : undefined
                  }
                >
                  <img src={product.fileURL} className="card-img-top" alt="dish" />
                  <div className="card-body">
                    <h5 className="card-title">{product.restaurant}</h5>
                    <p className="card-text">{product.address_c}</p>
                    <p className="card-text">{product.dish}</p>
                    <p className="card-text"><a href={product.reviewUrl}>Reviews</a></p>
                  </div>
                </div>
              </div>
            ))}
            {isFetchingProducts && <p>Loading...</p>}
          </div>
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = (state) => ({
  products: selectProducts(state),
  isFetchingProducts: selectIsFetchingProducts(state),
  hasMoreProductsToFetch: selectHasMoreProductsToFetch(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: (filter) => dispatch(startInitialProductsFetch(filter)),
  fetchMoreProducts: () => dispatch(startLoadingMoreProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
