import axios, {AxiosError} from 'axios';
import {RecipeProps} from '../types/recipes';
import {CategoryProps} from '../types/category';
import {IngredientProps} from '../types/ingredient';
import {TypeOfMealProps} from '../types/typeOfMeal';
import {FilterValuesProps} from '../types/filter-values';

export const BASE_URL = 'http://10.0.2.2:1337';
enum APIRoutes {
  Recipes = '/api/recipes',
  Categories = '/api/categories',
  Ingredients = '/api/ingridients',
  Types = '/api/types',
}

export const loadRecipesByRating = () =>
  axios
    .get<{data: RecipeProps[]}>(BASE_URL + APIRoutes.Recipes, {
      params: {
        fields: ['title', 'rating', 'duration'],
        sort: ['rating:DESC'],
        populate: {
          picture: {
            fields: ['url'],
          },
          typeOfMeal: {
            fields: ['title'],
          },
        },
      },
    })
    .then(response => response.data)
    .catch((error: AxiosError) => error);

export const loadRecipesByFilters = ({
  typeOfMeals,
  category,
  ingredients,
  duration,
  callories,
}: FilterValuesProps) => {
  const ingredientsParams = ingredients.map(ingredient => ({
    ingredients: {
      title: {
        $eq: ingredient,
      },
    },
  }));

  return axios
    .get<{data: RecipeProps[]}>(BASE_URL + APIRoutes.Recipes, {
      params: {
        fields: ['title', 'rating', 'duration'],
        filters: {
          typeOfMeal: {
            title: {
              $eq: typeOfMeals,
            },
          },
          category: {
            title: {
              $eq: category,
            },
          },
          $and: [
            ...ingredientsParams,
            {
              duration: {
                $gt: duration.bottomNumberValue,
              },
            },
            {
              duration: {
                $lt: duration.topNumberValue,
              },
            },
            {
              kcal: {
                $gt: callories.bottomNumberValue,
              },
            },
            {
              kcal: {
                $lt: callories.topNumberValue,
              },
            },
          ],
        },
        sort: ['rating:DESC'],
        populate: {
          picture: {
            fields: ['url'],
          },
          typeOfMeal: {
            fields: ['title'],
          },
        },
      },
    })
    .then(response => response.data)
    .catch((error: AxiosError) => error);
};

export const loadRecipesByCategory = (category: string) =>
  axios
    .get<{data: RecipeProps[]}>(BASE_URL + APIRoutes.Recipes, {
      params: {
        fields: ['title', 'rating', 'duration'],
        filters: {
          category: {
            title: {
              $eq: category,
            },
          },
        },
        sort: ['rating:DESC'],
        populate: {
          picture: {
            fields: ['url'],
          },
          typeOfMeal: {
            fields: ['title'],
          },
        },
      },
    })
    .then(response => response.data)
    .catch((error: AxiosError) => error);

export const loadAllCategories = () =>
  axios
    .get<{data: CategoryProps[]}>(BASE_URL + APIRoutes.Categories, {
      params: {
        fields: ['title'],
        sort: ['title:ASC'],
        populate: {
          picture: {
            fields: ['url'],
          },
        },
      },
    })
    .then(response => response.data)
    .catch((error: AxiosError) => error);

export const loadAllIngredients = () =>
  axios
    .get<{data: IngredientProps[]}>(BASE_URL + APIRoutes.Ingredients, {
      params: {
        fields: ['title'],
        sort: ['title:ASC'],
        populate: {
          picture: {
            fields: ['url'],
          },
        },
      },
    })
    .then(response => response.data)
    .catch((error: AxiosError) => error);

export const loadAllTypesOfMeals = () =>
  axios
    .get<{data: TypeOfMealProps[]}>(BASE_URL + APIRoutes.Types, {
      params: {
        fields: ['title'],
        populate: {
          picture: {
            fields: ['url'],
          },
        },
      },
    })
    .then(response => response.data)
    .catch((error: AxiosError) => error);

export const loadRecipe = (id: number) =>
  axios
    .get<{data: RecipeProps[]}>(BASE_URL + APIRoutes.Recipes, {
      params: {
        fields: [
          'title',
          'rating',
          'duration',
          'weight',
          'kcal',
          'servings',
          'level',
        ],
        filters: {
          id: {
            $eq: id,
          },
        },
        populate: {
          picture: {
            fields: ['url'],
          },
          typeOfMeal: {
            fields: ['title'],
          },
          category: {
            fields: ['title'],
            populate: {
              picture: {
                fields: ['url'],
              },
            },
          },
          steps: {
            fields: ['title', 'directions'],
          },
          ingredients: {
            fields: ['title'],
            populate: {
              picture: {
                fields: ['url'],
              },
            },
          },
        },
      },
    })
    .then(response => response.data)
    .catch((error: AxiosError) => error);
