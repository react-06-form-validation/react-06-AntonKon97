import { z } from 'zod';

export const createBookingSchema = (timeSlots) =>
  z.object({
    bookerName: z
      .string()
      .min(2, 'Booker name must be at least 2 characters long'),

    bookerEmail: z
      .string()
      .email('Invalid email address')
      .optional()
      .or(z.literal('')),

    eventName: z
      .string()
      .min(2, 'Event name must be at least 2 characters long'),

    eventDate: z
      .coerce.date()
      .refine((date) => date > new Date(), {
        message: 'Event date must be in the future',
      }),

    numberOfGuests: z
      .coerce.number()
      .int()
      .min(1, 'Number of Guests must be at least 1')
      .max(10, 'Number of Guests must be less than or equal to 10'),

    timeSlot: z
      .string()
      .refine((slot) => timeSlots.includes(slot), {
        message: 'Selected time slot is unavailable',
      }),

    eventLink: z
      .string()
      .url('Invalid URL. Please enter a valid event link'),
  });