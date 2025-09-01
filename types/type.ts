export type dbBillboard = {
  id: string;
  billboardImage: string;
  title: string;
  productLink: string;
  description?: string;
};

export type dbCategory = {
  id: string;
  name: string;
  categoryImage: string;
  products: dbProduct[];
};

export type dbProduct = {
  id: string;
  name: string;
  description: string
  subDescription: string;
  productImage: string;
  price: number;
  discountPrice?: number;
  packageQuantity: string;
  packageQuantityType: string;
  inStocks: number;
  categoryId: string;
  orderItems: dbOrderItem[];
  reviews: dbReview[];    
  comments: dbComment[];    
};

export type dbReview = {
  id: string;
  rating: number;
  userId: string;
  productId: string;
};

export type dbComment = {
  id: string;
  content: string;
  userId: string;
  productId: string;
};


export type dbOrder = {
  id: string;
  paymentMethod: string;
  isPaid: boolean;
  name: string;
  mobileNumber: string;
  address: string;
  accountType: string;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "NEARBY" | "COMPLETED" | "CANCELLED" | "RETURNED";
  total: number;
  totalDiscount?: number | null;
  transactionId?: string | null;
  userId?: string | null;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  orderItems: dbOrderItem[];
};

export type dbOrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};
