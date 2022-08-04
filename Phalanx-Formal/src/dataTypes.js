import db from './firebase.js'
import { collection, doc, FieldValue, getDoc, updateDoc} from 'firebase/firestore';
import { arrToString, stringToArr } from './dataFunctions.js';

class User {
    constructor(name, pass, email, first, last, addRef, phone){
        if(typeof name !== 'undefined')
            this.username = name;
        else
            this.username = "";
        if(typeof pass !== 'undefined')
            this.password = pass;
        else
            this.password = "";
        if(typeof email !== 'undefined')
            this.email = email;
        else
            this.email = "";
        if(typeof first !== 'undefined')
            this.first_name = first;
        else
            this.first_name = "";
        if(typeof last !== 'undefined')
            this.last_name = last;
        else
            this.last_name = "";
        if(typeof addRef !== 'undefined')
            this.address_id = addRef;
        else
            this.address_id = "";
        if(typeof phone !== 'undefined')
            this.phone_num = phone;
        else
            this.phone_num = 0;
    }

    // toDict(){
    //     const userDict = {
    //         username: this.username,
    //         password: this.password,
    //         email: this.email,
    //         first_name: this.first_name,
    //         last_name: this.last_name,
    //         address: this.addressRef,
    //         phone_num: this.phonenum
    //     };
    //     return userDict;
    // }
}

class Product {
    constructor(name, desc, sku, qty, price, discountRef, cat, img){
        // console.log(typeof sku);
        if(typeof name !== 'undefined')
            this.name = name;
        else
            this.name = "";
        if(typeof desc !== 'undefined')
            this.description = desc;
        else
            this.description = "";
        if(typeof sku !== 'undefined')
            this.SKU = sku;
        else{
            this.SKU = -1;
        }
        if(typeof qty !== 'undefined')
            this.quantity = qty;
        else
            this.quantity = 0;
        if(typeof price !== 'undefined')
            this.price = price;
        else
            this.price = 0.0;
        if(typeof discountRef !== 'undefined')
            this.discount_id = discountRef;
        else
            this.discount_id = "";
        if(typeof cat !== 'undefined')
            this.category = cat;
        else
            this.category = "";
        if(typeof img !== 'undefined')
            this.image = img;
        else
            this.image = "";
    }

    async addSku() {
        const skuRef = doc(db, 'product', 'skuNum');
        const skuDoc = await getDoc(skuRef);
        // console.log(skuDoc);
        const skuData = skuDoc.data();
        const curr_sku = skuData['current_sku'];
        await updateDoc(skuRef, ({
            current_sku: curr_sku+1
        }));
        this.SKU = curr_sku+1;
    }
    // toDict(){
    //     const productDict = {
    //         name: this.name,
    //         description: this.description,
    //         SKU: this.sku,
    //         quantity: this.quantity,
    //         price: this.price,
    //         discount: this.discountRef,
    //         category: this.category
    //     };
    //     return productDict;
    // }
}

class Discount {
    constructor(name, desc, percent){
        if(typeof name !== 'undefined')
            this.name = name;
        else
            this.name = "";
        if(typeof desc !== 'undefined')
            this.description = desc;
        else
            this.description = "";
        if(typeof percent !== 'undefined')
            this.discount_percent = percent;
        else
            this.discount_percent = 0;
    }

    // toDict(){
    //     const discountDict = {
    //         name: this.name,
    //         description: this.description,
    //         discount_percent: this.percent
    //     };
    //     return discountDict;
    // }
}

class Address {
    constructor(add, city, cntry, state, zip){
        if(typeof add !== 'undefined')
            this.address = add;
        else
            this.address = "";
        if(typeof city !== 'undefined')
            this.city = city;
        else
            this.city = "";
        if(typeof cntry !== 'undefined')
            this.country = cntry;
        else
            this.country = "";
        if(typeof state !== 'undefined')
            this.state = state;
        else
            this.state = "";
        if(typeof zip !== 'undefined')
            this.zip = zip;
        else
            this.zip = 0;
    }

    // toDict(){
    //     const addressDict = {
    //         address: this.address,
    //         city: this.city,
    //         country: this.country,
    //         state: this.state,
    //         zip: this.zip
    //     };
    //     return addressDict;
    // }
}

class Cart {
    constructor(userRef, total){
        if(typeof userRef !== 'undefined')
            this.user_id = userRef;
        else
            this.user_id = "";
        if(typeof total !== 'undefined')
            this.total = total;
        else
            this.total = 0.0;
    }

    // toDict(){
    //     const cartDict = {
    //         user_id: this.userRef,
    //         total: this.total
    //     };
    //     return cartDict;
    // }
}

class CartItem {
    constructor(cartRef, productRef, qty, price, discBool){
        if(typeof cartRef !== 'undefined')
            this.session_id = cartRef;
        else
            this.session_id = "";
        if(typeof productRef !== 'undefined')
            this.product_id = productRef;
        else
            this.product_id = "";
        if(typeof qty !== 'undefined')
            this.quantity = qty;
        else
            this.quantity = 0;
        if(typeof price !== 'undefined')
            this.price = price;
        else
            this.price = 0.0;
        if(typeof discBool !== 'undefined')
            this.discount_applied = discBool;
        else
            this.discount_applied = false;
    }

    // toDict(){
    //     const cartItemDict = {
    //         user_id: this.cartRef,
    //         product_id: this.productRef,
    //         quantity: this.quantity
    //     };
    //     return cartDict;
    // }
}

class Order {
    constructor(userRef, paymentRef, total, shipper, status){
        if(typeof userRef !== 'undefined')
            this.user_id = userRef;
        else
            this.user_id = "";
        if(typeof paymentRef !== 'undefined')
            this.payment_id = paymentRef;
        else
            this.payment_id = "";
        if(typeof total !== 'undefined')
            this.total = total;
        else
            this.total = 0.0;
        if(typeof shipper !== 'undefined')
            this.shipper = shipper;
        else
            this.shipper = "";
        if(typeof status !== 'undefined')
            this.status = status;
        else
            this.status = "";
    }

    // toDict(){
    //     const orderDict = {
    //         user_id: this.userRef,
    //         payment_id: this.paymentRef,
    //         total: this.total,
    //         shipper: this.shipper,
    //         status: this.status
    //     };
    //     return orderDict;
    // }
}

class OrderItem {
    constructor(orderRef, productRef, qty, price){
        if(typeof orderRef !== 'undefined')
            this.orderRef = orderRef;
        else
            this.orderRef = "";
        if(typeof productRef !== 'undefined')
            this.productRef = productRef;
        else
            this.productRef = "";
        if(typeof qty !== 'undefined')
            this.quantity = qty;
        else
            this.quantity = 0;
        if(typeof price !== 'undefined')
            this.price = price;
        else
            this.price = 0.0;
    }

    // toDict(){
    //     const cartItemDict = {
    //         order_id: this.orderRef,
    //         product_id: this.productRef,
    //         quantity: this.quantity
    //     };
    //     return cartItemDict;
    // }
}

class Payment_Details {
    constructor(userRef, type, provider, accNum, exp){
        if(typeof userRef !== 'undefined')
            this.user_id = userRef;
        else
            this.user_id = "";
        if(typeof type !== 'undefined')
            this.payment_type = type;
        else
            this.payment_type = "";
        if(typeof provider !== 'undefined')
            this.provider = provider;
        else
            this.provider = "";
        if(typeof accNum !== 'undefined')
            this.account_num = accNum;
        else
            this.account_num = 0;
        if(typeof exp !== 'undefined')
            this.expiry = exp;
        else
            this.expiry = "00/00";
    }

    // toDict(){
    //     const paymentDict = {
    //         user_id: this.userRef,
    //         payment_type: this.payment_type,
    //         provider: this.provider,
    //         account_num: this.account_num,
    //         expiry: this.expiry,
    //     };
    //     return paymentDict;
    // }
}

const userConverter = {
    toFirestore: (user) => {
        return {
            username: user.username,
            password: user.password,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            address_id: user.address_id,
            phone_num: user.phone_num
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.username, data.password, data.email, data.first_name, data.last_name, data.address, data.phone_num);
    }
};

const productConverter = {
    toFirestore: (prod) => {
        return {
            name: stringToArr(prod.name),
            description: stringToArr(prod.description),
            SKU: prod.SKU,
            quantity: prod.quantity,
            price: prod.price,
            discount_id: prod.discount_id,
            category: prod.category,
            image: prod.image
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Product(arrToString(data.name), arrToString(data.description), data.SKU, data.quantity, data.price, data.discount_id, data.category, data.image);
    }
};

const discountConverter = {
    toFirestore: (disc) => {
        return {
            name: disc.name,
            description: disc.description,
            discount_percent: disc.discount_percent
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Discount(data.name, data.description, data.discount_percent);
    }
};

const addressConverter = {
    toFirestore: (addr) => {
        return {
            address: addr.address,
            city: addr.city,
            country: addr.country,
            state: addr.state,
            zip: addr.zip
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Address(data.address, data.city, data.country, data.state, data.zip);
    }
};

const cartConverter = {
    toFirestore: (cart) => {
        return {
            user_id: cart.user_id,
            total: cart.total
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Cart(data.user_id, data.total);
    }
};

const cartItemConverter = {
    toFirestore: (cartItem) => {
        return {
            session_id: cartItem.session_id,
            product_id: cartItem.product_id,
            quantity: cartItem.quantity,
            price: cartItem.price,
            discount_applied: cartItem.discount_applied
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new CartItem(data.session_id, data.product_id, data.quantity, data.price, data.discount_applied);
    }
};

const orderConverter = {
    toFirestore: (order) => {
        return {
            user_id: order.user_id,
            payment_id: order.payment_id,
            total: order.total,
            shipper: order.shipper,
            status: order.status
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Order(data.user_id, data.payment_id, data.total, data.shipper, data.status);
    }
};

const orderItemConverter = {
    toFirestore: (orderItem) => {
        return {
            order_id: orderItem.orderRef,
            product_id: orderItem.productRef,
            quantity: orderItem.quantity,
            price: orderItem.price
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new OrderItem(data.order_id, data.product_id, data.quantity, data.price);
    }
};

const paymentConverter = {
    toFirestore: (payment) => {
        return {
            user_id: payment.user_id,
            payment_type: payment.payment_type,
            provider: payment.provider,
            account_num: payment.account_num,
            expiry: payment.expiry,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Order(data.user_id, data.payment_type, data.provider, data.account_num, data.expiry);
    }
};

function printDict(dict){
    for(const [key, value] of Object.entries(dict)){
        console.log(key + ": " + value);
    }
}

export {User,
        Product,
        Discount,
        Address,
        Cart,
        CartItem,
        Order,
        OrderItem,
        Payment_Details,
        userConverter,
        productConverter,
        discountConverter,
        addressConverter,
        cartConverter,
        cartItemConverter,
        orderConverter,
        orderItemConverter,
        paymentConverter,
        printDict
};