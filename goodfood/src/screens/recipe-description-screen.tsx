import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AxiosError} from 'axios';
import {RootStackParamList} from '../App';
import {BASE_URL, loadRecipe} from '../utils/services';
import {capitalize} from '../utils/utils';
import {SingleRecipeProps} from '../types/recipes';
import Text from '../components/text/text';
import Icon from '../components/icon/icon';
import Loader from '../components/loader/loader';
import Warning from '../components/warning/warning';
import BackButton from '../components/buttons/back-button/back-button';
import IngredientsList from '../components/ingredients-list/ingredients-list';
import Badge from '../components/badge/badge';
import DirectionsList from '../components/directions-list/directions-list';

type RecipeDescriptionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'RecipeDescriptionScreen'
>;

const RecipeDescriptionScreen: React.FC<RecipeDescriptionScreenProps> = ({
  navigation,
  route,
}) => {
  const {id} = route.params;
  const [loadingError, setLoadingError] = useState(false);
  const [recipe, setRecipe] = useState<SingleRecipeProps | undefined>(
    undefined,
  );

  const loadRousources = () => {
    loadRecipe(id).then(data => {
      if (data instanceof AxiosError) {
        setLoadingError(true);
      } else if (data.data) {
        setRecipe(data.data[0].attributes);
      }
    });
  };

  useEffect(() => {
    loadRousources();
  }, []);

  if (loadingError) {
    return <Warning onReload={loadRousources} />;
  }

  return (
    <View style={styles.page}>
      {recipe ? (
        <ScrollView style={styles.container}>
          <Image
            style={styles.image}
            source={{uri: BASE_URL + recipe.picture.data.attributes.url}}
          />
          <BackButton onPress={navigation.goBack} />
          <View style={styles.contentContainer}>
            <View style={styles.titleRow}>
              <Text
                size="2extraLarge"
                fontWeight="semiBold"
                textStyle={{flex: 1}}>
                {recipe.title}
              </Text>
              <View style={styles.rating}>
                <Icon
                  size="medium"
                  color="black"
                  variant="star"
                  style={styles.ratingIcon}
                />
                <Text size="large" fontWeight="black">
                  {`${recipe.rating}`}
                </Text>
              </View>
            </View>
            <Text size="large" color="gray" textStyle={styles.subtitle}>
              {capitalize(recipe.category.data.attributes.title)}
            </Text>
            <View style={styles.badgesRow}>
              <Badge amount={recipe.duration} title="min" iconVariant="time" />
              <Badge
                amount={recipe.servings}
                title="Servings"
                iconVariant="servings"
              />
              <Badge amount={recipe.kcal} title="Cal" iconVariant="fire" />
              <Badge
                title={`${capitalize(recipe.level)}`}
                iconVariant="difficulty"
              />
            </View>
            <Text size="large" fontWeight="bold" textStyle={styles.subtitle}>
              Ingredients
            </Text>
            {recipe.ingredients.data && (
              <IngredientsList ingredients={recipe.ingredients.data} />
            )}
            <Text size="large" fontWeight="bold" textStyle={styles.subtitle}>
              Directions
            </Text>
            {recipe.steps.data && (
              <DirectionsList directions={recipe.steps.data} />
            )}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      )}
    </View>
  );
};

export default RecipeDescriptionScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
    height: '100%',
  },
  image: {
    width: '100%',
    height: 280,
    marginBottom: -20,
  },
  contentContainer: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#fddd5c',
  },
  ratingIcon: {
    marginRight: 6,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  loaderContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  subtitle: {
    marginBottom: 20,
  },
});
