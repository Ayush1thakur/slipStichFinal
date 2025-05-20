export const policies = [
  {
    title: "Refund Policy",
    para:`At **theSlipStitch**, each product is handmade with utmost care and attention to detail. We take quality very seriously, and your satisfaction is important to us.`,
    sections: [
      {
        heading: "Damaged or Defective Products",
        content: `If you believe you have received a damaged item or if the packaging appears tampered with upon delivery, **please do not accept the package.** Return it to the delivery personnel immediately and email us at **[${process.env.REACT_APP_EMAIL}](mailto:${process.env.REACT_APP_EMAIL})** with your **Order ID** and supporting photos of the package/item.

We will ensure a **brand-new replacement** is sent to you **at no additional cost**.`,
      },
      {
        heading: "Non-Returnable Items",
        content: `As our pieces are **custom-made to your size and preferences**, we **do not accept returns or exchanges for any other reason**, including change of mind, incorrect size, or design preference after the order has been placed.

We strongly urge you to **review product details carefully before placing your order.**`,
      },
    ],
  },
  {
    title: "Shipping Policy",
    sections: [
      {
        heading: "Processing Time",
        content: `Each item at **theSlipStitch** is handcrafted with love. Please allow **2 to 4 weeks** for us to create, process, and package your order before shipping.

`,
      },
      {
        heading: "Shipping Details",
        content: `- We currently ship across India.

- Once shipped, tracking details will be sent to your registered email.
- Shipping delays due to courier partners or external factors (like weather or strikes) are outside our control, but we’ll always try to support you as best we can.`,
      },
      {
        heading: "Delivery Charges",
        content: `Shipping charges (if any) are calculated at checkout. Free shipping offers may apply during promotions.`,
      },
    ],
  },
  {
    title: "Privacy Policy",
    para:"Your privacy matters to us. This policy explains how we collect, use, and protect your personal information.",
    sections: [
      {
        heading: "Information We Collect",
        content: `When you purchase from our store or sign up for updates, we collect:

- Your name, email, phone number, shipping address
- Your payment information (processed securely via third-party providers)
- Optional preferences or sizing details for custom orders`,
      },
      {
        heading: "How We Use Your Information",
        content: `Your data helps us:

- To process and fulfill your orders
- To provide customer support
- To send you updates, offers, and newsletters (if opted in)
- To improve our website and services`,
      },
      {
        heading: "Security of Your Data",
        content: `We take reasonable precautions to protect your data and do not store your credit card details. Payment gateways we partner with use encryption and comply with industry standards.`,
      },
      {
        heading: "Third-Party Services",
        content: `We may share your information with third-party providers (e.g., payment processors, courier services) only as necessary to fulfill your order. We will never sell or rent your information.`,
      },
      {
        heading: "Cookies",
        content: `We use cookies to enhance your browsing experience. You may disable cookies in your browser settings if preferred.`,
      },
      {
        heading: "Contact Us",
        content: `For privacy-related queries, contact us at:

**[${process.env.REACT_APP_EMAIL}](mailto:${process.env.REACT_APP_EMAIL})**`,
      },
    ],
  },
];
