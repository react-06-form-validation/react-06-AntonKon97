import { z } from 'zod';

export const createBookingSchema = (timeSlots) =>
  z.object({
    bookerName: z
      .string()
      .min(2, 'Booker name must be at least 2 characters'),

    bookerEmail: z
      .string()
      .email('Invalid email format')
      .optional()
      .or(z.literal('')),

    eventName: z
      .string()
      .min(2, 'Event name must be at least 2 characters'),

    eventDate: z
      .string()
      .refine((date) => new Date(date) > new Date(), {
        message: 'Event date must be in the future',
      }),

    numberOfGuests: z
      .coerce.number()
      .int('Must be an integer')
      .min(1, 'Minimum 1 guest')
      .max(10, 'Maximum 10 guests'),

    timeSlot: z.enum(timeSlots, {
      errorMap: () => ({ message: 'Invalid time slot selected' }),
    }),

    eventLink: z
      .string()
      .url('Invalid URL format'),
  });
