// // src/components/NeatBackground.tsx
// import { useEffect, useRef } from 'react';
// import type { NeatConfig } from '@firecms/neat';
// import { NeatGradient } from '@firecms/neat';

// export type NeatBackgroundProps = {
//   config: NeatConfig;
//   /** Если true — блокирует клики сквозь фон (по умолчанию false) */
//   capturePointer?: boolean;
//   /** Если хочешь не на весь экран, а вписать в контейнер — поставь false и оберни нужный блок */
//   fullscreen?: boolean;
//   className?: string;
// };

// export default function NeatBackground({
//   config,
//   capturePointer = false,
//   fullscreen = true,
//   className = '',
// }: NeatBackgroundProps) {
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     // защита от SSR и от отсутствия контейнера
//     if (typeof window === 'undefined' || !containerRef.current) return;

//     // инициализация
//     const neat = new NeatGradient({
//       ref: containerRef.current,
//       ...config,
//     });

//     // пример: можно менять параметры динамически
//     // neat.speed = 6;

//     return () => {
//       neat.destroy();
//     };
//   }, [config]);

//   const basePositioning = fullscreen ? 'fixed inset-0' : 'absolute inset-0';

//   // pointer-events — чтобы фон не мешал кликам по интерфейсу
//   const pointer = capturePointer
//     ? 'pointer-events-auto'
//     : 'pointer-events-none';

//   return (
//     <div
//       ref={containerRef}
//       className={`${basePositioning} ${pointer} -z-10 ${className}`}
//       // Важно: контейнеру нужен явный размер. В fullscreen мы уже заняли экран via inset-0.
//     />
//   );
// }
