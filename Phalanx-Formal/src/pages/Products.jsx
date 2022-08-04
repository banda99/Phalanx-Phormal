import React, {useState, useEffect} from 'react'
import { searchProducts } from '../dataFunctions';
// import './Cart_Main.css'

const BUTTON_DOWN = 'Button Down';
const SHORT_SLEEVE = 'Short Sleeve';
const ALL = 'All';
const DESCENDING = 'Descending'
const ASCENDING = 'Ascending'

/*ADD PRODUCTS HERE*/
export default function Products( {addToCart} ) {
      const [products, setProducts] = useState([]);
      const [category, setCategory] = useState(ALL);
      const [price, setPrice] = useState(ALL);
      const [search, setSearch] = useState(null)
      const [lastCategory, setLastCategory] = useState(null);
      const [lastPrice, setLastPrice] = useState(null);
      const [lastSearch, setLastSearch] = useState(null);
      // let lastCategory = null;

      const filterProducts = async (search, category, price) => {
          let prod = [];
          
          console.log(category)
          console.log(price)
          console.log(search)
          if(category !== "All" && price !== "All" && (search !== null && search !== ""))
            prod = await searchProducts(search, category, price);
          else if(category !== "All" && price !== "All")
            prod = await searchProducts(undefined, category, price);
          else if(price !== "All" && (search !== null && search !== ""))
            prod = await searchProducts(search, undefined, price);
          else if(category !== "All" && (search !== null && search !== ""))
            prod = await searchProducts(search, category, undefined);
          else if(price !== "All")
            prod = await searchProducts(undefined, undefined, price);
          else if(category !== "All")
            prod = await searchProducts(undefined, category, undefined);
          else if((search !== null && search !== ""))
            prod = await searchProducts(search, undefined, undefined);
          else
            prod = await searchProducts(undefined, undefined, undefined);
          return prod;
      }

      const ShowProds = () => {

        useEffect( () => {
          // console.log(category + " vs " + lastCategory);
          if(category !== lastCategory || price !== lastPrice || search !== lastSearch){
            async function getData(){
              try{
                const prod = await filterProducts(search, category, price);
                setProducts(prod);
              }
              catch(err){
                console.log(err);
              }
            }
            getData();
            setLastCategory(category);
            setLastPrice(price);
            setLastSearch(search);
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
    
      const goSearch = () =>{
        setSearch(document.getElementById('search').value)
      }
      
    /*filters go here*/
    return (
    <>
        <h1>Products</h1>
        Search:
        <input placeholder='Search terms' id='search'></input>
        Category:
        <select onChange={(e) => {setCategory(e.target.value)}}>
             <option value =  {ALL}>{ALL}</option>
             <option value =  {BUTTON_DOWN}>{BUTTON_DOWN}</option>
             <option value =  {SHORT_SLEEVE}>{SHORT_SLEEVE}</option>
        </select>
        Price:
        <select onChange={(e) => {setPrice(e.target.value)}}>
             <option value =  {ALL}>{ALL}</option>
             <option value =  {ASCENDING}>{ASCENDING}</option>
             <option value =  {DESCENDING}>{DESCENDING}</option>
        </select>
        <button onClick={goSearch}>Search</button>

        <div className="products">
        <ShowProds />
    </div>
    </>
    );
}