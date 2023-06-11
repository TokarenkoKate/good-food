import {useState, useEffect} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {SingleRecipeProps} from '../../types/recipes';
import {capitalize, parseDurationToString} from '../../utils/utils';
import {BASE_URL} from '../../utils/services';
import Icon from '../icon/icon';
import Text from '../text/text';

interface RecipeCardProps extends SingleRecipeProps {
  id: number;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  duration,
  picture,
  rating,
  typeOfMeal,
  id,
}) => {
  const [ratio, setRatio] = useState(1);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const navigateToRecipeScreen = () => {
    navigation.navigate('RecipeDescriptionScreen', {id});
  };

  const stringDuration = parseDurationToString(duration);

  const currentImage = BASE_URL + picture.data.attributes.url;
  useEffect(() => {
    if (picture.data.attributes.url) {
      Image.getSize(currentImage, (width, height) => setRatio(width / height));
    }
  }, [currentImage]);

  return (
    <TouchableOpacity onPress={navigateToRecipeScreen}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: currentImage,
            }}
            style={[styles.image, {aspectRatio: ratio}]}
          />
          <View style={styles.duration}>
            <Icon
              size="extraSmall"
              color="white"
              variant="time"
              style={styles.icon}
            />
            <Text size="small" color="white">
              {stringDuration}
            </Text>
          </View>
          <View style={styles.rating}>
            <Icon
              size="extraSmall"
              color="black"
              variant="star"
              style={styles.icon}
            />
            <Text size="small" fontWeight="black">{`${rating}`}</Text>
          </View>
        </View>
        <Text size="large" fontWeight="semiBold" textStyle={styles.title}>
          {title}
        </Text>
        <Text size="medium" color="gray">
          {capitalize(typeOfMeal.data.attributes.title)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 6,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 6,
  },
  image: {
    width: '100%',
    borderRadius: 25,
  },
  duration: {
    position: 'absolute',
    top: 12,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  rating: {
    position: 'absolute',
    bottom: 12,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 5,
    backgroundColor: '#fddd5c',
  },
  icon: {
    marginRight: 4,
  },
  title: {
    marginBottom: 2,
  },
});
