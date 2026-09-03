export const HeroHeading = ({headingName}) => {
    return (
        <h1 className="flex text-white font-poppins font-medium text-8xl">{headingName}</h1>
    )
}

export const Description = ({descriptionTexts}) => {
    return (
        <h1 className="flex text-white/80 font-poppins font-medium">{descriptionTexts}</h1>
    )
}