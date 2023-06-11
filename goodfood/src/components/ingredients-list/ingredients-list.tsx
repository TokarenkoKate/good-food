import {View, Image, StyleSheet} from 'react-native';
import {BASE_URL} from '../../utils/services';
import {capitalize} from '../../utils/utils';
import {IngredientProps} from '../../types/ingredient';
import Text from '../text/text';

interface IngredientsListProps {
  ingredients: IngredientProps[];
}

const IngredientsList: React.FC<IngredientsListProps> = ({ingredients}) => (
  <View style={styles.container}>
    {ingredients.map(ingredient => (
      <View style={styles.ingredientContainer} key={ingredient.id}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: BASE_URL + ingredient.attributes.picture.data.attributes.url,
            }}
            style={styles.image}
          />
        </View>
        <Text size="large" fontWeight="semiBold">
          {capitalize(ingredient.attributes.title)}
        </Text>
      </View>
    ))}
  </View>
);

export default IngredientsList;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    gap: 10,
  },
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 25,
    height: 25,
  },
  imageContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderRadius: 17,
    backgroundColor: '#ffe5b4',
  },
});
