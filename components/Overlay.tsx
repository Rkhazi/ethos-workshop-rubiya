"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
  const { scrollYProgress } = useScroll();

  // Section 1 (0% to 20%) - Center
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Section 2 (25% to 45%) - Left aligned
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const x2 = useTransform(scrollYProgress, [0.2, 0.5], [-100, 0]);

  // Section 3 (55% to 75%) - Right aligned
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.9], [0, 1, 1, 0]);
  const x3 = useTransform(scrollYProgress, [0.5, 0.9], [100, 0]);

  return (
    <div className="pointer-events-none absolute left-0 top-0 z-10 w-full h-[500vh]">
      {/* Container that stretches over the scroll space */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden uppercase tracking-tighter">

        {/* Section 1 */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex items-center justify-center text-center p-8"
        >
          <h1 className="text-5xl md:text-8xl font-bold max-w-4xl tracking-tighter text-white">
            Ferrari SF71H <br />
            <span className="text-zinc-400">Creative Developer.</span>
          </h1>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          style={{ opacity: opacity2, x: x2 }}
          className="absolute inset-0 flex items-center justify-start p-8 md:p-24"
        >
          <h2 className="text-4xl md:text-7xl font-semibold max-w-2xl text-white">
            I build digital <span className="text-zinc-400 italic">experiences.</span>
          </h2>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          style={{ opacity: opacity3, x: x3 }}
          className="absolute inset-0 flex items-center justify-end text-right p-8 md:p-24"
        >
          <h2 className="text-4xl md:text-7xl font-semibold max-w-2xl text-white">
            Bridging design <span className="text-zinc-400 italic">&</span> engineering.
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
