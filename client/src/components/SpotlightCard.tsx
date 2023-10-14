import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import type { MouseEvent } from 'react';

interface Props {
  children: React.ReactNode;
}

export default function SpotlightCard({ children }: Props) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handeMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative rounded-xl border border-white/10 bg-neutral-900 p-6"
      onMouseMove={handeMouseMove}>
      <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  650px circle at ${mouseX}px ${mouseY}px,
                  rgba(14, 120, 233, 0.15),
                  transparent 80%
                )
              `,
            }}
          />
      <div>
         {children}
      </div>
    </div>
 )
}
