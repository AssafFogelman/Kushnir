import * as z from 'zod';

export const checkoutSchema = z.object({
  shippingMethod: z.enum(['pickup', 'delivery']),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address'),
  street: z.string().min(1, 'Street is required'),
  number: z.string().min(1, 'House number is required'),
  floor: z.string().optional(),
  apartment: z.string().optional(),
  deliveryNotes: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  companyName: z.string().optional(),
  companyNumber: z.string().optional(),
  privacyPolicy: z.boolean().refine(val => val === true, {
    message: 'You must accept the privacy policy',
  }),
});
