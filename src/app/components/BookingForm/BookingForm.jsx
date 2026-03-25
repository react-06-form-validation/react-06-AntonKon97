'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createBookingSchema } from '../../schemas/bookingSchema';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './BookingForm.module.css';

export default function BookingForm() {
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    const fetchSlots = async () => {
      const res = await fetch('/api/time-slots');
      const data = await res.json();
      setTimeSlots(data);
    };

    fetchSlots();
  }, []);

  const schema = createBookingSchema(timeSlots);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    alert('Booking successful!');
    console.log(data);
  };

return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Booker Name</label>
        <input className={styles.input} {...register('bookerName')} />
        <ErrorMessage message={errors.bookerName?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Booker Email</label>
        <input className={styles.input} {...register('bookerEmail')} />
        <ErrorMessage message={errors.bookerEmail?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Event Name</label>
        <input className={styles.input} {...register('eventName')} />
        <ErrorMessage message={errors.eventName?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Event Date</label>
        <input type="date" className={styles.input} {...register('eventDate')} />
        <ErrorMessage message={errors.eventDate?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Number of Guests</label>
        <input type="number" className={styles.input} {...register('numberOfGuests')} />
        <ErrorMessage message={errors.numberOfGuests?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Time Slot</label>
        <select className={styles.input} {...register('timeSlot')}>
          <option value="">Select a time slot</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        <ErrorMessage message={errors.timeSlot?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Event Link</label>
        <input className={styles.input} {...register('eventLink')} />
        <ErrorMessage message={errors.eventLink?.message} />
      </div>

      <button className={styles.button} type="submit">
        Book Event
      </button>
    </form>
  );
}