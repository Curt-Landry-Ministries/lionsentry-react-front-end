export type TwoColumnTextType = {
  subText: string;
  title: string;
  mainText: string;
};
const TwoColumnText: React.FC<TwoColumnTextType> = ({
  subText,
  title,
  mainText,
}) => {
  return (
    <div className="pb-16 md:pb-24">
      <h3 className="block mb-3 font-normal text-2xl">{subText}</h3>
      <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-18">
        <div className="md:w-1/2">
          <h2 className="font-serif display-heading leading-none font-normal">
            {title}
          </h2>
        </div>
        <div className="md:w-1/2 pt-3">
          <p className="text-xl lg:text-2xl leading-snug">{mainText}</p>
        </div>
      </div>
    </div>
  );
};

export default TwoColumnText;
