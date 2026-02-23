type ShopCardProps = {
  name: string;
  image: string;
};

const ShopCard = ({ name, image }: ShopCardProps) => {
  return (
    <div className="flex flex-col items-center cursor-pointer">

      {/* Image */}
      <div className="
        relative
        w-[130px] h-[110px]
        sm:w-[180px] sm:h-[150px]
        rounded-xl sm:rounded-2xl
        overflow-hidden
        group
      ">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Name */}
      <p className="mt-2 text-xs sm:text-sm font-medium text-gray-800 text-center">
        {name}
      </p>

    </div>
  );
};

export default ShopCard;
