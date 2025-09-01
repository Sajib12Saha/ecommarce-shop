import z, { email } from "zod";



export const registerSchema = z.object({
  name: z.string().min(1, { message: "নামটি অবশ্যই দিতে হবে।" }),
  email: z.string().email({ message: "সঠিক ইমেইল ঠিকানা দিন।" }),
  password: z.string().min(4, { message: "পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে।" }),
});

export const logInSchema = z.object({
  email: z.string().email({ message: "সঠিক ইমেইল ঠিকানা দিন।" }),
  password: z.string().min(4, { message: "পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে।" }),
});


export const orderFormSchema = z.object({
  paymentMethod: z.string().min(1, "পেমেন্ট মেথড আবশ্যক"),
  isPaid: z.boolean().default(false),
  mobileNumber: z
    .string()
    .min(10, "মোবাইল নাম্বার কমপক্ষে 10 ডিজিট হতে হবে")
    .max(15, "মোবাইল নাম্বার সর্বোচ্চ 15 ডিজিট হতে পারবে")
    .regex(/^\+?[0-9]\d{1,14}$/, "অবৈধ মোবাইল নাম্বার"),
  address: z.string().min(5, "ঠিকানা কমপক্ষে 5 অক্ষরের হতে হবে"),
});

// ✅ Order Item Form Schema
export const orderItemFormSchema = z.object({
  orderId: z.string().min(1, "অর্ডার আইডি আবশ্যক"),
  productId: z.string().min(1, "প্রোডাক্ট আইডি আবশ্যক"),
});
