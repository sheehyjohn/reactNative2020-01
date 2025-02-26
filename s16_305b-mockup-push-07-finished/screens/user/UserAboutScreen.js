import React from 'react';
import { View, Text, FlatList, Button, Platform, Alert, 
         StyleSheet,
         Card, Image,
         TouchableOpacity,
         TouchableNativeFeedback,
        } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
//import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
//import * as productsActions from '../../store/actions/products'; 
//import Card from '../UI/Card';

/*
const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;
  
    if (Platform.OS === 'android' && Platform.Version >= 21) {
      TouchableCmp = TouchableNativeFeedback;
    }
*/

const UserAboutScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = id => {
    props.navigation.navigate('EditProduct', { productId: id });
  };

  const deleteHandler = id => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        }
      }
    ]);
  };

  if (userProducts.length === 0) {
    return ( 
         
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.h1}>About Screen</Text>
                
                <View style={styles.imageContainer}>
                    {/*
                        <Image style={styles.image} source={{ uri: "https://cdn.pixabay.com/photo/2014/11/01/22/33/gold-513062_960_720.jpg"}} />                
                        <Image style={styles.image} source={{ require: "./assets/splash.png"}} />                
                    */}
                     <Image style={styles.image} source={require("../../assets/splash.png")}  />                
               
                </View>
                <Text style={styles.details}>Lorem Ipsom</Text>
                <Text style={styles.details}>Version: 1.b.c</Text>
                <Text style={styles.details}>Release: 28th August 2020</Text>
                
                
            </View>
         
        
    );
  }


/*
 <Card style={styles.product}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>About Screen</Text>
      </View>
        <View style={styles.touchable}>
          
            <View>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: "https://cdn.pixabay.com/photo/2014/11/01/22/33/gold-513062_960_720.jpg"}} />
              </View>
              <View style={styles.details}>
                <Text style={styles.title}>asdf</Text>
                <Text style={styles.price}>asdf</Text>
              </View>
              <View style={styles.actions}>
              <Text style={styles.price}>asdf</Text>
              </View>
            </View>
          
        </View>
      </Card> 
*/


/*
  return (
     
    <FlatList
    
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProductItem>
      )}
    />
     
  );
  */
};

export const screenOptions = navData => {
  return {
    //headerTitle: 'Your Products',
    headerTitle: 'About Us',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === 'android' ? 'md-construct' : 'ios-construct'}
          //onPress={() => {
          //  navData.navigation.navigate('EditProduct');
          //}}
        />
      </HeaderButtons>
    )
  };
};


const styles = StyleSheet.create({
    product: {
      height: 300,
      margin: 20
    },
    h1:{
        fontSize: 44
    },
    touchable: {
      borderRadius: 10,
      overflow: 'hidden'
    },
    imageContainer: {
      width: '80%',
      height: '45%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%'
    },
    details: {
      alignItems: 'center',
      height: '10%',
      padding: 10
    },
    title: {
      fontFamily: 'open-sans-bold',
      fontSize: 18,
      marginVertical: 2
    },
    price: {
      fontFamily: 'open-sans',
      fontSize: 14,
      color: '#888'
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '23%',
      paddingHorizontal: 20
    }
  });


export default UserAboutScreen;
