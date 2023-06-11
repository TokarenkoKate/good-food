export interface FilterValuesProps {
  category: string | undefined;
  ingredients: string[];
  typeOfMeals: string | undefined;
  callories: {
    bottomNumberValue: number | undefined;
    topNumberValue: number | undefined;
  };
  duration: {
    bottomNumberValue: number | undefined;
    topNumberValue: number | undefined;
  };
}
