import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Dispatch, SetStateAction, useState} from 'react';
import {CategoryProps} from '../../types/category';
import {IngredientProps} from '../../types/ingredient';
import {TypeOfMealProps} from '../../types/typeOfMeal';
import {FilterValuesProps} from '../../types/filter-values';
import Text from '../text/text';
import BottomModal from '../bottom-modal/bottom-modal';
import FilterButton from '../buttons/filter-button/filter-button';
import Button from '../buttons/button/button';

interface FilterModalProps {
  isFilterModalVisible: boolean;
  categories: CategoryProps[] | undefined;
  ingredients: IngredientProps[] | undefined;
  typesOfMeals: TypeOfMealProps[] | undefined;
  filterValues: FilterValuesProps;
  setFilterValues: Dispatch<SetStateAction<FilterValuesProps>>;
  onPressFilterRecipes: () => void;
  closeModalAndResetFilterValues: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isFilterModalVisible,
  categories,
  ingredients,
  typesOfMeals,
  filterValues,
  setFilterValues,
  onPressFilterRecipes,
  closeModalAndResetFilterValues,
}) => {
  const [showMoreIngredients, setShowMoreIndredients] = useState(false);

  const onPressShowMoreIngredients = () =>
    setShowMoreIndredients(!showMoreIngredients);

  const setCurrentFilter = (key: keyof FilterValuesProps, value: any) => {
    if (key === 'ingredients') {
      const currentIngredients = filterValues.ingredients;
      if (currentIngredients) {
        const indexOfCurrentIngredient = currentIngredients.indexOf(value);
        let updatedIngredients;
        if (indexOfCurrentIngredient !== -1) {
          updatedIngredients = [
            ...currentIngredients.slice(0, indexOfCurrentIngredient),
            ...currentIngredients.slice(indexOfCurrentIngredient + 1),
          ];
        } else {
          updatedIngredients = [...currentIngredients, value];
        }
        setFilterValues({...filterValues, ingredients: updatedIngredients});
      }
    } else if (key === 'callories' || key === 'duration') {
      if (
        filterValues[key].bottomNumberValue === value.bottomNumberValue &&
        filterValues[key].topNumberValue === value.topNumberValue
      ) {
        setFilterValues({
          ...filterValues,
          [key]: {
            bottomNumberValue: undefined,
            topNumberValue: undefined,
          },
        });
      } else {
        setFilterValues({...filterValues, [key]: value});
      }
    } else if (filterValues[key] === value) {
      setFilterValues({...filterValues, [key]: undefined});
    } else {
      setFilterValues({...filterValues, [key]: value});
    }
  };

  return (
    <BottomModal
      isModalVisible={isFilterModalVisible}
      setModalVisible={closeModalAndResetFilterValues}>
      <ScrollView>
        <TouchableWithoutFeedback>
          <View style={styles.container}>
            <Text size="2extraLarge" fontWeight="bold" textStyle={styles.title}>
              Filters
            </Text>
            {categories && (
              <View style={styles.filterGroup}>
                <Text
                  size="extraLarge"
                  fontWeight="semiBold"
                  textStyle={styles.subtitle}>
                  Categories
                </Text>
                <View style={styles.filterButtonList}>
                  {categories.map(category => (
                    <FilterButton
                      key={category.id}
                      filterKey="category"
                      value={category.attributes.title}
                      filterValues={filterValues}
                      onPressSetFilter={setCurrentFilter}
                    />
                  ))}
                </View>
              </View>
            )}
            {ingredients && (
              <View style={styles.filterGroup}>
                <Text
                  size="extraLarge"
                  fontWeight="semiBold"
                  textStyle={styles.subtitle}>
                  Ingredients
                </Text>
                <View style={styles.filterButtonList}>
                  {ingredients.slice(0, 10).map(ingredient => (
                    <FilterButton
                      key={ingredient.id}
                      filterKey="ingredients"
                      value={ingredient.attributes.title}
                      filterValues={filterValues}
                      onPressSetFilter={setCurrentFilter}
                    />
                  ))}
                  {showMoreIngredients &&
                    ingredients
                      .slice(10)
                      .map(ingredient => (
                        <FilterButton
                          key={ingredient.id}
                          filterKey="ingredients"
                          value={ingredient.attributes.title}
                          filterValues={filterValues}
                          onPressSetFilter={setCurrentFilter}
                        />
                      ))}
                </View>
                <TouchableOpacity
                  onPress={onPressShowMoreIngredients}
                  style={styles.showMoreTitle}>
                  <Text color="lightGray" fontWeight="semiBold">
                    {!showMoreIngredients
                      ? 'Show more ingredients'
                      : 'Show less ingredients'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {typesOfMeals && (
              <View style={styles.filterGroup}>
                <Text
                  size="extraLarge"
                  fontWeight="semiBold"
                  textStyle={styles.subtitle}>
                  Types of meal
                </Text>
                <View style={styles.filterButtonList}>
                  {typesOfMeals.map(type => (
                    <FilterButton
                      key={type.id}
                      filterKey="typeOfMeals"
                      value={type.attributes.title}
                      filterValues={filterValues}
                      onPressSetFilter={setCurrentFilter}
                    />
                  ))}
                </View>
              </View>
            )}
            <View style={styles.filterGroup}>
              <Text
                size="extraLarge"
                fontWeight="semiBold"
                textStyle={styles.subtitle}>
                Calories
              </Text>
              <View style={styles.filterButtonList}>
                <FilterButton
                  key="c1"
                  filterKey="callories"
                  value="Less than 200 kkal"
                  bottomNumberValue={0}
                  topNumberValue={200}
                  filterValues={filterValues}
                  onPressSetFilter={setCurrentFilter}
                />
                <FilterButton
                  key="c2"
                  filterKey="callories"
                  value="200 - 400"
                  bottomNumberValue={200}
                  topNumberValue={400}
                  filterValues={filterValues}
                  onPressSetFilter={setCurrentFilter}
                />
                <FilterButton
                  key="c3"
                  filterKey="callories"
                  value="400 - 600"
                  bottomNumberValue={400}
                  topNumberValue={600}
                  filterValues={filterValues}
                  onPressSetFilter={setCurrentFilter}
                />
                <FilterButton
                  key="c4"
                  filterKey="callories"
                  value="600 - 800"
                  bottomNumberValue={600}
                  topNumberValue={800}
                  filterValues={filterValues}
                  onPressSetFilter={setCurrentFilter}
                />
                <FilterButton
                  key="c5"
                  filterKey="callories"
                  value="More than 800"
                  bottomNumberValue={800}
                  topNumberValue={3000}
                  filterValues={filterValues}
                  onPressSetFilter={setCurrentFilter}
                />
              </View>
            </View>
            <View style={styles.filterGroup}>
              <Text
                size="extraLarge"
                fontWeight="semiBold"
                textStyle={styles.subtitle}>
                Cooking time
              </Text>
              <View style={styles.filterButtonList}>
                <FilterButton
                  key="d1"
                  filterKey="duration"
                  value="Less than 15 min"
                  bottomNumberValue={0}
                  topNumberValue={15}
                  filterValues={filterValues}
                  onPressSetFilter={setCurrentFilter}
                />
                <FilterButton
                  key="d2"
                  filterKey="duration"
                  value="Less than 30 min"
                  bottomNumberValue={0}
                  topNumberValue={30}
                  filterValues={filterValues}
                  onPressSetFilter={setCurrentFilter}
                />
                <FilterButton
                  key="d3"
                  filterKey="duration"
                  value="Less than 45 min"
                  bottomNumberValue={0}
                  topNumberValue={45}
                  filterValues={filterValues}
                  onPressSetFilter={setCurrentFilter}
                />
                <FilterButton
                  key="d4"
                  filterKey="duration"
                  value="Less than 1 hour"
                  bottomNumberValue={0}
                  topNumberValue={60}
                  filterValues={filterValues}
                  onPressSetFilter={setCurrentFilter}
                />
                <FilterButton
                  key="d5"
                  filterKey="duration"
                  value="More than 1 hour"
                  bottomNumberValue={60}
                  topNumberValue={300}
                  filterValues={filterValues}
                  onPressSetFilter={setCurrentFilter}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <Button
          onPress={closeModalAndResetFilterValues}
          style={styles.cancelButton}>
          Cancel
        </Button>
        <Button onPress={onPressFilterRecipes} style={styles.confirmButton}>
          Confirm
        </Button>
      </View>
    </BottomModal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
    paddingHorizontal: 25,
  },
  filterGroup: {
    marginBottom: 10,
  },
  filterButtonList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  title: {
    alignSelf: 'center',
  },
  subtitle: {
    marginBottom: 6,
  },
  showMoreTitle: {
    marginTop: 5,
  },
  buttonsContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 25,
    paddingVertical: 10,
    backgroundColor: '#bec2c7',
  },
  cancelButton: {
    width: '40%',
    backgroundColor: '#969eac',
  },
  confirmButton: {
    width: '40%',
  },
});
