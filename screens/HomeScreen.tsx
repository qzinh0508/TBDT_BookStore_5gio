// screens/HomeScreen.tsx
import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Header } from "../components/Header";
import { CategoryChips } from "../components/CategoryChips";
import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { BOOKS, CATEGORIES } from "../data"; // Import CATEGORIES từ data.ts

export function HomeScreen({
  cartCount,
  onPressBook,
  onPressCart,
}: {
  cartCount: number;
  onPressBook: (id: number) => void;
  onPressCart: () => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  return (
    <View style={styles.screen}>
      <Header />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Danh mục</Text>
        
        {/* TRUYỀN PROPS CHO CATEGORYCHIPS Ở ĐÂY */}
        <CategoryChips 
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <Text style={styles.sectionTitle}>Sách nổi bật</Text>
        <BookGrid books={BOOKS} onPressBook={onPressBook} />
      </ScrollView>

      <FloatingCartButton count={cartCount} onPress={onPressCart} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 140,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
    marginTop: 4,
  },
});