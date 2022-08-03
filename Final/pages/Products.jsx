import React, {useState, useEffect} from 'react'
import { searchProducts, addCartItem } from '../dataFunctions';
// import './Cart_Main.css'

const BUTTON_DOWN = 'Button Down';
const SHORT_SLEEVE = 'Short Sleeve';
const ALL = 'All';

/*ADD PRODUCTS HERE*/
export default function Products( {addToCart} ) {
      const [products, setProducts] = useState([]);
      const [category, setCategory] = useState(ALL);
      const [lastCategory, setLastCategory] = useState(null);
      // let lastCategory = null;

      const filterProducts = async (category) => {
          let prod = [];
          if(category === 'All')
            prod = await searchProducts(undefined, undefined, undefined);
          else
            prod = await searchProducts(undefined, category, undefined);
          return prod;
        
      }

      const ShowProds = () => {

        useEffect( () => {
          // console.log(category + " vs " + lastCategory);
          if(category !== lastCategory){
            async function getData(){
              try{
                const prod = await filterProducts(category);
                setProducts(prod);
              }
              catch(err){
                console.log(err);
              }
            }
            getData();
            setLastCategory(category);
          }
        }, []);
        return products.map((product, idx) => (
          <div className="product" key={idx}>  
                <h3>{product[1].name}</h3>
                <h4>${product[1].price}</h4>
                <img src={product[1].image} alt={product[1].name} />
                <button onClick={() => addToCart(product[0])}>
                  Add to Cart
                </button>
            </div>
        ));
      }
      
    /*filters go here*/
    return (
    <>
        <h1>Products</h1>
        Filter:
        <select onChange={(e) => {setCategory(e.target.value)}}>
             <option value =  {ALL}>{ALL}</option>
             <option value =  {BUTTON_DOWN}>{BUTTON_DOWN}</option>
             <option value =  {SHORT_SLEEVE}>{SHORT_SLEEVE}</option>
        </select>

        <div className="products">
        <ShowProds />
    </div>
    </>
    );
}