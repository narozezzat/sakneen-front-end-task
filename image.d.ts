declare module 'next/image' {
    interface NextImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
      // Additional props or overrides can be added here
    }
  
    const Image: React.FC<NextImageProps>;
    export default Image;
  }
  