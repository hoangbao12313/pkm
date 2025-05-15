import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type/type'; // Nếu bạn có type này

type FoodItem = {
  id: string;
  name: string;
  type: string;
  price: number;
};

type CartItem = {
  id: string;
  foodId: string;
  name: string;
  price: number;
  quantity: number;
};

type CartProps = NativeStackScreenProps<RootStackParamList, 'Cart'>;

const Cart = ({ navigation }: CartProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndAddToCart = async () => {
      try {
        const foodSnapshot = await firestore().collection('FoodApp').get();

        const batch = firestore().batch();
        foodSnapshot.docs.forEach(doc => {
          const data = doc.data();
          const cartDocRef = firestore().collection('Cart').doc();
          batch.set(cartDocRef, {
            foodId: doc.id,
            name: data.name,
            price: data.price,
            quantity: 1,
            addedAt: firestore.FieldValue.serverTimestamp(),
          });
        });

        await batch.commit();

        const cartSnapshot = await firestore().collection('Cart').orderBy('addedAt', 'desc').get();
        const items: CartItem[] = cartSnapshot.docs.map(doc => ({
          id: doc.id,
          foodId: doc.data().foodId,
          name: doc.data().name,
          price: doc.data().price,
          quantity: doc.data().quantity || 1,
        }));

        setCartItems(items);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi load và thêm món:', error);
        setLoading(false);
      }
    };

    fetchAndAddToCart();
  }, []);

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹ {item.price} x {item.quantity}</Text>
      <Text style={styles.total}>Tổng: ₹ {item.price * item.quantity}</Text>
    </View>
  );

  if (loading) return <Text>Đang tải giỏ hàng...</Text>;

  if (cartItems.length === 0) {
    return <View style={styles.emptyContainer}><Text>Giỏ hàng trống</Text></View>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }} // cho nút không bị che
      />

      <TouchableOpacity
        style={styles.checkoutBtn}
        onPress={() => navigation.navigate('PaymentSuccess')}
      >
        <Text style={styles.checkoutBtnText}>Thanh Toán</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f6f6f6' },
  itemContainer: {
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: 'bold', color: '#a52a2a' },
  price: { fontSize: 16, color: 'green' },
  total: { fontSize: 16, fontWeight: 'bold', marginTop: 4 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  checkoutBtn: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#d32f2f',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  checkoutBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
