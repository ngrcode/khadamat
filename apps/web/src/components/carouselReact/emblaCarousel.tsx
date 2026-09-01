// import React, { useCallback, useEffect, useState } from 'react';
// import useEmblaCarousel from 'embla-carousel-react';

// type EmblaCarouselProps = {
//   slides: number[];
//   options?: any;
// };

// const EmblaCarousel: React.FC<EmblaCarouselProps> = ({ slides, options }) => {
//   const [emblaRef, emblaApi] = useEmblaCarousel(options);

//   const onSelect = useCallback(() => {
//     if (!emblaApi) return;
//     // Handle carousel events like selecting a new slide
//   }, [emblaApi]);

//   useEffect(() => {
//     if (!emblaApi) return;
//     emblaApi.on('select', onSelect); // Event listener for when a slide is selected
//   }, [emblaApi, onSelect]);

//   return (
//     <div className="embla" ref={emblaRef}>
//       <div className="embla__container">
//         {slides.map((index) => (
//           <div className="embla__slide" key={index}>
//             <div className="slide-content">Slide {index + 1}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EmblaCarousel;
