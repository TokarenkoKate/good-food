export interface CategoryProps {
  id: number;
  attributes: SingleCategoryProps;
}

export interface SingleCategoryProps {
  title: string;
  picture: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}
