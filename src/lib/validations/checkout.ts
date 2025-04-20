import { z } from 'zod';

// Define the translation keys for error messages
const errorMessages = {
  en: {
    phone: 'Phone number must be at least 10 digits',
    email: 'Invalid email address',
    street: 'Street is required',
    number: 'House number is required',
    firstName: 'First name is required',
    lastName: 'Last name is required',
    privacyPolicy: 'You must accept the privacy policy',
  },
  he: {
    phone: 'מספר הטלפון חייב להכיל לפחות 10 ספרות',
    email: 'כתובת אימייל לא תקינה',
    street: 'שם הרחוב נדרש',
    number: 'מספר הבית נדרש',
    firstName: 'שם פרטי נדרש',
    lastName: 'שם משפחה נדרש',
    privacyPolicy: 'עליך לאשר את מדיניות הפרטיות',
  },
};

// Create a function to get the appropriate error message
const getErrorMessage = (key: keyof typeof errorMessages.en, lang: 'en' | 'he' = 'en') => {
  return errorMessages[lang][key];
};

export const createCheckoutSchema = (lang: 'en' | 'he' = 'he') => {
  return z.object({
    shippingMethod: z.enum(['pickup', 'delivery']),
    phone: z.string().min(10, getErrorMessage('phone', lang)),
    email: z.string().email(getErrorMessage('email', lang)),
    street: z.string().min(1, getErrorMessage('street', lang)),
    number: z.string().min(1, getErrorMessage('number', lang)),
    floor: z.string().optional(),
    apartment: z.string().optional(),
    deliveryNotes: z.string().optional(),
    firstName: z.string().min(1, getErrorMessage('firstName', lang)),
    lastName: z.string().min(1, getErrorMessage('lastName', lang)),
    companyName: z.string().optional(),
    companyNumber: z.string().optional(),
    privacyPolicy: z.boolean().refine(val => val === true, {
      message: getErrorMessage('privacyPolicy', lang),
    }),
  });
};
