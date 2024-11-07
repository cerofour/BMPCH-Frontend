import Carousel from 'react-bootstrap/Carousel';

type CustomCarouselItem = {
  src: string;
  alt: string;
  title: string;
  subcontent: string;
};

type CustomCarouselProps = {
  elements: CustomCarouselItem[];
  interval: number;
  theme: string;
};

function CustomCarousel({ elements, interval, theme }: CustomCarouselProps) {
  return (
    <Carousel data-bs-theme={theme} fade>
      {elements?.map((element: CustomCarouselItem, i: number) => 
          <Carousel.Item interval={interval}>
            <img
              key={i}
              className="d-block w-100"
              src={element.src}
              alt={element.alt}
            />
            <Carousel.Caption>
              <h3>{element.title}</h3>
              <b>{element.subcontent}</b>
            </Carousel.Caption>
          </Carousel.Item>
        )}
    </Carousel>
  );
}

export default CustomCarousel;