import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { loadProducts } from '../../store/products/Products.actions';
import ProductCard  from '../../components/ProductCard/ProductCard';
import './Products.css'
import '../Login/Login';

function Products() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  useEffect(() => {
    async function load() {
     await dispatch(loadProducts());
    }
    load();
  }, [dispatch]);

  
  return (
    <section className="grid">
      <Carousel showThumbs={false}>
        { Object.keys(products).map((key) => {
          const product = products[key];
          return <ProductCard data={product} key={key} />
          })
        }
      </Carousel>
    </section>
  );
}

export default Products;