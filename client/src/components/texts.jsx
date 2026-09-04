export const HeroHeading = ({ headingName }) => {
  return (
    <h1 className="flex text-white font-poppins font-medium text-8xl">
      {headingName}
    </h1>
  );
};

export const Description = ({ descriptionTexts }) => {
  return (
    <h1 className="flex text-white/80 font-poppins font-medium">
      {descriptionTexts}
    </h1>
  );
};

export const DescriptionBlack = ({ descriptionTexts }) => {
  return (
    <h1 className="flex text-black/80 font-poppins font-medium">
      {descriptionTexts}
    </h1>
  );
};

export const Heading = ({ headingName }) => {
  return (
    <h1 className="flex text-black font-poppins font-medium text-[80px]">
      {headingName}
    </h1>
  );
};

export const SubHeading = ({ headingName }) => {
  return (
    <h1 className="flex text-black font-poppins font-light text-[40px]">
      {headingName}
    </h1>
  );
};