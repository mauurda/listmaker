import React, { ReactNode } from "react";
import { motion } from "framer-motion";

function Container({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <motion.div
      initial={{ opacity: 0.1 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-t from-green-700 to-green-900 min-h-screen text-white"
    >
      <div className="max-w-5xl px-4 mx-auto py-20">{children}</div>
    </motion.div>
  );
}

export default Container;
