import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import Header from '../../Component/Header'



export default function Dashboard() {

  const [cartItems, setCartItems] = useState([]);
  const cart = {
    items: cartItems,
    addItem: (item: any) => {
      setCartItems([...cartItems, item]);
    }
  };
  const Products = [
    {
      name: 'Samsung',
      color: 'White',
      price: 20000
    },
    {
      name: 'Iphone',
      color: 'Black',
      price: 50000
    },
    {
      name: 'OnePlus',
      color: 'Blue',
      price: 30000
    }
  ]

  const addToCartHandler = (product: any) => {
    cart.addItem(product);
    console.log(cart.items.length);
  }

  return (
    <View style={styles.container}>
      <Header title={cart.items.length > 0 ? `Cart : ${cart.items.length} item(s)` : 'Cart'} />
      {Products.map((product) => (
        <View style={styles.productCard}>
          <Text >{product.name}</Text>
          <Text>{product.color}</Text>
          <Text>{product.price}</Text>
          <Button onPress={() => addToCartHandler(product)} title="Add to Cart" />
        </View>
      ))}

      <Button onPress={() => setCartItems([])} title="Empty Cart" />
    </View>
  )
}


const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  productCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
} 