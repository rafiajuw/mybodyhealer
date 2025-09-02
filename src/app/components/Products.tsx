const Products = () => {
  return (
    <section className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-primary text-center mb-8">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Zerodaks', price: '$20.00' },
          { name: 'Sakara Mork', price: '$30.00' },
          { name: 'NK Defense', price: '$100.00' },
        ].map((product, index) => (
          <div key={index} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
            <div className="h-32 bg-gray-200 mb-4" />
            <h3 className="font-bold text-primary">{product.name}</h3>
            <p className="text-gray-700">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;