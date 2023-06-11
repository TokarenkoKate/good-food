import {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AxiosError} from 'axios';
import {RootStackParamList} from '../App';
import {
  loadAllCategories,
  loadAllIngredients,
  loadAllTypesOfMeals,
  loadRecipesByCategory,
  loadRecipesByFilters,
  loadRecipesByRating,
} from '../utils/services';
import {capitalize} from '../utils/utils';
import {CategoryProps} from '../types/category';
import {RecipeProps} from '../types/recipes';
import {IngredientProps} from '../types/ingredient';
import {TypeOfMealProps} from '../types/typeOfMeal';
import {FilterValuesProps} from '../types/filter-values';
import Text from '../components/text/text';
import Avatar from '../components/avatar/avatar';
import CategoriesList from '../components/categories-list/categories-list';
import RecipesList from '../components/recipes-list/recipes-list';
import Loader from '../components/loader/loader';
import Warning from '../components/warning/warning';
import FilterModal from '../components/filter-modal/filter-modal';
import FilterOpenButton from '../components/buttons/filter-open-button/filter-open-button';

type RecipesSelectionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'RecipesSelectionScreen'
>;

const initialFiltersState: FilterValuesProps = {
  category: undefined,
  ingredients: [],
  typeOfMeals: undefined,
  callories: {
    bottomNumberValue: undefined,
    topNumberValue: undefined,
  },
  duration: {
    bottomNumberValue: undefined,
    topNumberValue: undefined,
  },
};

const RecipesSelectionScreen: React.FC<RecipesSelectionScreenProps> = () => {
  const [recipes, setRecipes] = useState<RecipeProps[] | undefined>(undefined);
  const [categories, setCategories] = useState<CategoryProps[] | undefined>(
    undefined,
  );
  const [ingredients, setIngredients] = useState<IngredientProps[] | undefined>(
    undefined,
  );
  const [typesOfMeals, setTypesOfMeals] = useState<
    TypeOfMealProps[] | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [currentSelectedCategory, setSelectedCategory] = useState('popular');
  const [filterValues, setFilterValues] =
    useState<FilterValuesProps>(initialFiltersState);

  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  const resetFilterValues = () => {
    setFilterValues(initialFiltersState);
  };

  const setCurrentLoadingError = () => {
    setLoadingError(true);
    setRecipes(undefined);
  };

  const closeModalAndResetFilterValues = () => {
    resetFilterValues();
    setSelectedCategory('popular');
    setFilterModalVisible(false);
    loadDefaultPopularRecipes();
  };

  const loadDefaultPopularRecipes = () => {
    setIsLoading(true);
    loadRecipesByRating().then(data => {
      if (data instanceof AxiosError) {
        setCurrentLoadingError();
      } else if (data.data) {
        setRecipes(data.data);
        setIsLoading(false);
      }
    });
  };

  const onPressSelectCategory = (category: string) => {
    setIsLoading(true);
    setSelectedCategory(category);
    if (category === 'popular') {
      loadDefaultPopularRecipes();
    } else {
      setFilterValues({...initialFiltersState, category});
      loadRecipesByCategory(category).then(data => {
        if (data instanceof AxiosError) {
          setCurrentLoadingError();
        } else if (data.data) {
          setRecipes(data.data);
          setIsLoading(false);
        }
      });
    }
  };

  const loadRecipesWithFilter = () => {
    setIsLoading(true);
    if (filterValues.category) {
      setSelectedCategory(filterValues.category);
    } else {
      setSelectedCategory('popular');
    }
    setFilterModalVisible(false);
    loadRecipesByFilters(filterValues).then(data => {
      if (data instanceof AxiosError) {
        setCurrentLoadingError();
      } else if (data.data) {
        setRecipes(data.data);
        setIsLoading(false);
      }
    });
  };

  const loadRousources = () => {
    Promise.all([
      loadRecipesByRating(),
      loadAllCategories(),
      loadAllIngredients(),
      loadAllTypesOfMeals(),
    ])
      .then(data => {
        if (
          data[0] instanceof AxiosError ||
          data[1] instanceof AxiosError ||
          data[2] instanceof AxiosError ||
          data[3] instanceof AxiosError
        ) {
          setCurrentLoadingError();
        } else if (
          data[0].data &&
          data[1].data &&
          data[2].data &&
          data[3].data
        ) {
          setRecipes(data[0].data);
          setCategories(data[1].data);
          setIngredients(data[2].data);
          setTypesOfMeals(data[3].data);
        }
      })
      .catch(() => setCurrentLoadingError());
  };

  useEffect(() => {
    loadRousources();
  }, []);

  return (
    <View style={styles.container}>
      {recipes && (
        <ScrollView style={styles.scrollView}>
          <Avatar style={styles.avatar} />
          <View style={styles.titleContainer}>
            <Text size="medium" color="lightGray" textStyle={styles.title}>
              Hello, Teresa!
            </Text>
            <View style={styles.titleRow}>
              <Text
                size="extraLarge"
                fontWeight="bold"
                textStyle={styles.partOfTitle}>
                Make your own food, stay at
              </Text>
              <Text size="extraLarge" fontWeight="bold" color="yellow">
                home
              </Text>
            </View>
          </View>
          {categories && (
            <CategoriesList
              categories={categories}
              selectedCategory={currentSelectedCategory}
              onPressSelectCategory={onPressSelectCategory}
            />
          )}
          {recipes && currentSelectedCategory && (
            <View style={styles.subtitleContainer}>
              <View style={styles.subtitleRow}>
                <Text
                  size="extraLarge"
                  fontWeight="bold"
                  textStyle={styles.currentCategoryTitle}>
                  {`${capitalize(currentSelectedCategory)} Recipes`}
                </Text>
                <Text size="medium" color="lightGray">
                  {`Found ${recipes.length}`}
                </Text>
              </View>
              <FilterOpenButton openFilterModal={openFilterModal} />
            </View>
          )}
          {recipes && <RecipesList recipes={recipes} isLoading={isLoading} />}
          <FilterModal
            isFilterModalVisible={isFilterModalVisible}
            categories={categories}
            ingredients={ingredients}
            typesOfMeals={typesOfMeals}
            filterValues={filterValues}
            setFilterValues={setFilterValues}
            onPressFilterRecipes={loadRecipesWithFilter}
            closeModalAndResetFilterValues={closeModalAndResetFilterValues}
          />
        </ScrollView>
      )}
      {!recipes && !loadingError && (
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      )}
      {!recipes && loadingError && <Warning onReload={loadRousources} />}
    </View>
  );
};

export default RecipesSelectionScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#ffffff',
  },
  scrollView: {
    paddingVertical: 20,
  },
  avatar: {
    marginHorizontal: 20,
  },
  titleContainer: {
    marginBottom: 26,
    marginHorizontal: 20,
  },
  titleRow: {
    flexDirection: 'row',
  },
  title: {
    marginBottom: 6,
  },
  partOfTitle: {
    marginRight: 6,
  },
  currentCategoryTitle: {
    marginBottom: 20,
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginBottom: 26,
    paddingHorizontal: 20,
  },
  subtitleRow: {
    justifyContent: 'center',
  },
  loaderContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});
