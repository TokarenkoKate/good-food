import {StyleSheet, View} from 'react-native';
import {RecipeProps} from '../../types/recipes';
import RecipeCard from '../recipe-card/recipe-card';
import Loader from '../loader/loader';

interface RecipesListProps {
  recipes: RecipeProps[];
  isLoading: boolean;
}

const RecipesList: React.FC<RecipesListProps> = ({recipes, isLoading}) => (
  <View style={styles.container}>
    {!isLoading ? (
      <View style={styles.listContainer}>
        <View style={styles.column}>
          {recipes
            .filter((_, index) => index % 2 === 0)
            .map(recipe => (
              <RecipeCard
                {...recipe.attributes}
                id={recipe.id}
                key={recipe.id}
              />
            ))}
        </View>
        <View style={styles.column}>
          {recipes
            .filter((_, index) => index % 2 !== 0)
            .map(recipe => (
              <RecipeCard
                {...recipe.attributes}
                id={recipe.id}
                key={recipe.id}
              />
            ))}
        </View>
      </View>
    ) : (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    )}
  </View>
);

export default RecipesList;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  listContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  column: {
    flex: 1,
  },
  loaderContainer: {
    paddingTop: 30,
  },
});
