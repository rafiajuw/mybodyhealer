const Newsletter = () => {
  return (
    <section className="container mx-auto py-12 px-4 text-center bg-gray-100">
      <h2 className="text-3xl font-bold text-primary mb-4">Subscribe To Newsletter</h2>
      <p className="text-gray-700 mb-6">Get e-mail updates about our latest shops and special offers</p>
      <input type="email" placeholder="Enter email" className="p-2 border rounded w-64" />
      <button className="ml-2 btn-primary">Subscribe</button>
    </section>
  );
};

export default Newsletter;