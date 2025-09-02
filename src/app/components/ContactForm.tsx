'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="btn-primary fixed bottom-4 right-4">
        Contact Us
      </button>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-primary mb-4">Contact Us</h2>
            <input type="text" placeholder="Name" className="w-full p-2 mb-2 border rounded" />
            <input type="email" placeholder="Email" className="w-full p-2 mb-2 border rounded" />
            <textarea placeholder="Message" className="w-full p-2 mb-2 border rounded h-24" />
            <div className="flex justify-end space-x-4">
              <button onClick={() => setIsOpen(false)} className="text-gray-500">
                Cancel
              </button>
              <button className="btn-primary">Send</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ContactForm;