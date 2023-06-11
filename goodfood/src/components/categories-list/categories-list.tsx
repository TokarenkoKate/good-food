import {FlatList, StyleSheet, View} from 'react-native';
import {CategoryProps} from '../../types/category';
import Category from '../category/category';

interface CategoriesListProps {
  categories: CategoryProps[];
  selectedCategory: string;
  onPressSelectCategory: (categoryTitle: string) => void;
}

const CategoriesList: React.FC<CategoriesListProps> = ({
  categories,
  selectedCategory,
  onPressSelectCategory,
}) => (
  <View style={styles.categoriesListContainer}>
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={styles.categoriesList}
      ListHeaderComponent={
        <Category
          title="popular"
          pictureSrc={require('../../assets/pictures/popular.png')}
          selectedCategory={selectedCategory}
          onPressSelectCategory={onPressSelectCategory}
        />
      }
      data={categories}
      keyExtractor={category => String(category.id)}
      renderItem={({item}) => (
        <Category
          title={item.attributes.title}
          pictureSrc={item.attributes.picture.data.attributes.url}
          selectedCategory={selectedCategory}
          onPressSelectCategory={onPressSelectCategory}
        />
      )}
    />
  </View>
);

export default CategoriesList;

const styles = StyleSheet.create({
  categoriesListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 26,
  },
  categoriesList: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
});
