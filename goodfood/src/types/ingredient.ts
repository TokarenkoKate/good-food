export interface IngredientProps {
  id: number;
  attributes: {
    title: string;
    picture: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}
