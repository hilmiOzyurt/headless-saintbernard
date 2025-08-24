export interface ProductNode {
  id: string;
  title: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  options: [
    {
      id: string;
      name: string;
      values: string[];
    }
  ];
  featuredImage?: {
    url: string;
    altText: string;
  };
  variants: {
    edges: {
      node: {
        id: string;
        selectedOptions: {
          name: string;
          value: string;
        }[];
      };
    }[];
  };
  images: {
    edges: {
      node: {
        url: string;
        altText: string;
      };
    }[];
  };
  tags: string[];
  description: string;
  quantity: number;
  descriptionHtml: string;
}

export interface ProductEdge {
  node: ProductNode;
}
