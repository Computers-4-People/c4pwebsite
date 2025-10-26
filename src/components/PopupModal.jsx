import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function PopupModal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dimmed background */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose} // click outside to close
          />

          {/* Modal card */}
          <motion.div
            className="fixed z-[110] inset-0 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 text-left">
              {children}

              <button
                onClick={onClose}
                className="mt-6 w-full bg-c4p text-white font-semibold py-3 rounded-lg shadow-lg shadow-black/30"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
