import AppointmentForm from "@/components/booking/appointment-form";

export default function Booking() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Book an Appointment</h1>
      <div className="max-w-2xl mx-auto">
        <AppointmentForm />
      </div>
    </div>
  );
}
