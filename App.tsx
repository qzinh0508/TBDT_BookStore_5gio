// GIỜ 5 — Tổng hợp: Bottom Tab Layout & Hoàn thiện ứng dụng
// Minh hoạ riêng: Bài 1 (TabBar) + Bài 2 (CartScreen, đủ 3 vùng: cuộn / tổng tiền
// cố định / tab bar cố định). 3 tab còn lại (Trang chủ, Danh mục, Tài khoản) chỉ để
// TabBar có đủ 4 mục thật như đề bài — nội dung của chúng thuộc Giờ 2 và Giờ 4,
// nên ở đây chỉ để placeholder, tránh trùng lặp code với project gio2/gio4.
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TabBar, TabKey } from './components/TabBar';
import { CartScreen } from './screens/CartScreen';
import { BOOKS, CART_ITEMS } from './data';
import { HomeScreen } from './screens/HomeScreen';
import { CategoryChips } from './components/CategoryChips';
import { BookDetailScreen } from './screens/BookDetailScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('cart');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const selectedBook = BOOKS.find((b) => b.id === selectedBookId) ?? null;

  return (
    <SafeAreaView style={styles.root}>
      {/* flex:1 -> containing block cho TabBar (position:'absolute') bên dưới */}
      <View style={styles.body}>
        {activeTab === 'cart' ? (
          <CartScreen items={CART_ITEMS} />
        ) : activeTab === 'home' ? (
          <View style={styles.body}>
            {selectedBook ? (
              <BookDetailScreen
                book={selectedBook}
                onBack={() => setSelectedBookId(null)}
                onAddToCart={() => setCartCount((n) => n + 1)}
              />
            ) : (
              <HomeScreen
                cartCount={cartCount}
                onPressBook={(id) => setSelectedBookId(id)}
                onPressCart={() => setActiveTab("cart")}
              />
            )}
          </View>
        ) : activeTab === 'category' ? (
          <view style={styles.categoryContainer}>
            <Text style={styles.sectionTitle}>Danh mục</Text>
            <CategoryChips categories={[]} selectedCategory={''} onSelectCategory={function (category: string): void {
                  throw new Error('Function not implemented.');
                } } />
          </view>
        ) : (
          <Placeholder tab={activeTab} />
        )}
        <TabBar active={activeTab} onChange={setActiveTab} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function Placeholder({ tab }: { tab: TabKey }) {
  const note: Record<TabKey, string> = {
    home: '',
    category: '',
    cart: '',
    account: 'Tài liệu gốc không mô tả tab này, để trống.',
  };
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>{note[tab]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  body: { flex: 1 },placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  placeholderText: { textAlign: 'center', color: '#5B6B7F' },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
    marginTop: 4,
  },
  categoryContainer: {
    padding: 16,
    paddingBottom: 140,
  }
});