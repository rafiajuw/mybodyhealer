'use client';

import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Gareth Smith',
      role: 'System Analyst',
      text: 'Far away, behind the word mountains, they deliver the best holistic healing solutions.',
      rating: 5,
    },
    {
      name: 'Jane Doe',
      role: 'Marketing Manager',
      text: 'Excellent products and outstanding customer service. My wellness improved drastically!',
      rating: 4,
    },
    {
      name: 'John Lee',
      role: 'Interface Designer',
      text: 'Highly recommend My Body Healer for anyone seeking quality and professionalism.',
      rating: 5,
    },
  ];

  return (
    <section className="container mx-auto py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
        Our Satisfied Customers Say
      </h2>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex"
          initial={{ x: 0 }}
          animate={{ x: '-100%' }}
          transition={{ duration: 25, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
        >
          {testimonials.concat(testimonials).map((test, index) => (
            <div key={index} className="min-w-[320px] max-w-sm px-4">
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
                <p className="text-gray-700 italic mb-4">“{test.text}”</p>
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={`h-5 w-5 ${
                        i < test.rating ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <h4 className="mt-2 font-semibold text-primary">{test.name}</h4>
                <p className="text-gray-500 text-sm">{test.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
