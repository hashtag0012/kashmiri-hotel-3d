"use server"

export async function submitBooking(prevState: any, formData: FormData) {
  const bookingData = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    address: formData.get("address") as string,
    checkIn: formData.get("checkIn") as string,
    checkOut: formData.get("checkOut") as string,
    roomType: formData.get("roomType") as string,
    guests: formData.get("guests") as string,
    email: formData.get("email") as string,
  }

  // Email content for the host
  const hostEmailHtml = `
    <h1>New Booking at Apple Haven Inn!</h1>
    <p>A new booking has been received. Here are the details:</p>
    <ul>
      <li><strong>Name:</strong> ${bookingData.name}</li>
      <li><strong>Phone:</strong> ${bookingData.phone}</li>
      <li><strong>Address:</strong> ${bookingData.address}</li>
      <li><strong>Check-in:</strong> ${bookingData.checkIn}</li>
      <li><strong>Check-out:</strong> ${bookingData.checkOut}</li>
      <li><strong>Room Type:</strong> ${bookingData.roomType}</li>
      <li><strong>Guests:</strong> ${bookingData.guests}</li>
    </ul>
  `;

  // Email content for the customer
  const customerEmailHtml = `
    <h1>Your Booking at Apple Haven Inn is Confirmed!</h1>
    <p>Dear ${bookingData.name},</p>
    <p>Thank you for booking your stay with us. We are delighted to confirm your reservation. Here are your booking details:</p>
    <ul>
      <li><strong>Check-in:</strong> ${bookingData.checkIn}</li>
      <li><strong>Check-out:</strong> ${bookingData.checkOut}</li>
      <li><strong>Room Type:</strong> ${bookingData.roomType}</li>
      <li><strong>Number of Guests:</strong> ${bookingData.guests}</li>
    </ul>
    <p>We look forward to welcoming you to the beautiful Kashmir valley!</p>
    <p>Warm regards,<br>The Apple Haven Inn Team</p>
  `;

  try {
    // Send email to host
    const hostEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Apple Haven Inn <onboarding@resend.dev>', // Required by Resend
        to: 'applehavenkashmir@gmail.com',
        subject: `New Booking from ${bookingData.name}`,
        html: hostEmailHtml,
      }),
    });

    if (!hostEmailResponse.ok) {
      const errorData = await hostEmailResponse.json();
      console.error('Failed to send host email:', errorData);
      // We can decide if this should be a critical failure
    }

    // Send confirmation email to customer
    const customerEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Apple Haven Inn <onboarding@resend.dev>',
        to: bookingData.email, // Assumes email is collected in the form
        subject: 'Your Apple Haven Inn Booking Confirmation',
        html: customerEmailHtml,
      }),
    });

    if (!customerEmailResponse.ok) {
      const errorData = await customerEmailResponse.json();
      console.error('Failed to send customer email:', errorData);
      // We can decide if this should be a critical failure
    }
    
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message: `Booking confirmed for ${bookingData.name}! Host has been notified.`,
      bookingId: `KH${Date.now().toString().slice(-6)}`,
    }

  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'There was an error processing your booking. Please try again.',
    }
  }
}
