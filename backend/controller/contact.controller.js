import Contact from "../schema/contact.model.js";
import transporter from "../config/mailer.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Save message in MongoDB
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Send email to admin
    await transporter.sendMail({
      from: `"Notebook Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `New Contact Message: ${subject}`,
      html: `
        <h2>New Contact Us Message</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>

        <h3>Message:</h3>
        <p>${message}</p>
      `,
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: `"Notebook" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your message",
      html: `
        <h2>Hello ${name},</h2>

        <p>Thank you for contacting us.</p>

        <p>We have received your message regarding:</p>

        <p><strong>${subject}</strong></p>

        <p>Our team will get back to you soon.</p>

        <br />

        <p>Regards,<br />Notebook Team</p>
      `,
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      contact,
    });

  } catch (error) {
    console.error("Contact error:", error);

    return res.status(500).json({
      success: false,
      message: "Message could not be sent",
    });
  }
};