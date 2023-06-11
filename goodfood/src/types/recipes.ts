import {CategoryProps} from './category';
import {IngredientProps} from './ingredient';
import {TypeOfMealProps} from './typeOfMeal';

export interface RecipeProps {
  id: number;
  attributes: SingleRecipeProps;
}

export interface SingleRecipeProps {
  title: string;
  weight: number;
  kcal: number;
  duration: number;
  servings: number;
  rating: number;
  level: string;
  picture: {
    data: {
      id: number;
      attributes: {
        url: string;
      };
    };
  };
  steps: {
    data: {
      id: number;
      attributes: {
        title: string;
        directions: string;
      };
    }[];
  };
  category: {
    data: CategoryProps;
  };
  typeOfMeal: {
    data: TypeOfMealProps;
  };
  ingredients: {
    data: IngredientProps[];
  };
}
