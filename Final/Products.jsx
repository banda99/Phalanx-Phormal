import React, {useState} from 'react'

const BUTTON_DOWN = 'Button Down';
const SHORT_SLEEVE = 'Short Sleeve'
const ALL = 'All';

/*ADD PRODUCTS HERE*/
export default function Products({ addToCart }) {
    const[products] = useState([
        {
            category: BUTTON_DOWN,
            name:'Button Down Shirt',
            cost: 35.99,
            image: 'https://st4.depositphotos.com/4189487/37972/i/600/depositphotos_379724518-stock-photo-white-classic-shirt-men-shirt.jpg'
        },
        {
          category: SHORT_SLEEVE,
          name:'Polo Shirt',
          cost: 19.99,
          image: 'https://www.fjallraven.com/49431c/globalassets/catalogs/fjallraven/f8/f815/f81511/f206/ovik_polo_shirt_m_81511-206_a_main_fjr.jpg?width=2000&height=2000&mode=BoxPad&bgcolor=fff&quality=80'
        },
        {
          category: SHORT_SLEEVE,
          name:'V Neck Shirt',
          cost: 15.99,
          image: 'https://github.com/pw879/CS-3773-SoftwareEngineering-Group-Project/blob/main/667x1000%20processed%20no%20BG/mens/mens%20T%20A.png?raw=true'
        },
      ]);
      
      const [category, setCategory] = useState(BUTTON_DOWN)

      const filterProducts = (category) => {
        if (category === "All")
          return products;
        else
          return products.filter((product) => product.category === category);
      }

      const [price, setPrice] = useState()
      
    /*filters go here*/
    return (
    <>
        <h1>Products</h1>
        Filter:
        <select onChange={(e) => setCategory(e.target.value)}>
            <option value =  {ALL}>{ALL}</option>
             <option value =  {BUTTON_DOWN}>{BUTTON_DOWN}</option>
             <option value =  {SHORT_SLEEVE}>{SHORT_SLEEVE}</option>
        </select>

        Price Filter:
        <select onChange={(e) => setCategory(e.target.value)}>
            <option value =  {ALL}>{ALL}</option>
             <option value =  {BUTTON_DOWN}>{BUTTON_DOWN}</option>
             <option value =  {SHORT_SLEEVE}>{SHORT_SLEEVE}</option>
        </select>

        <div className="products">
          {filterProducts(category).map((product, idx) => (
            <div className="product" key={idx}>  
                <h3>{product.name}</h3>
                <h4>${product.cost}</h4>
                <img src={product.image} alt={product.name} />
                <button onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
            </div>
        ))}
    </div>
    </>
    );
}