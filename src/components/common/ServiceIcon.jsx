import Image from "next/image";

const SIZE_CLASSES = {
  sm: "h-10 w-10",
  md: "h-14 w-14",
  lg: "h-24 w-24",
};

export default function ServiceIcon({
  src,
  alt,
  size = "md",
  className = "",
}) {
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  return (
    <div
      className={`flex items-center h-20 w-20 justify-center rounded-full border-2 border-gray-300 `}
    >
      <Image
        src={src}
        alt={alt}
        width={64}
        height={64}
        className="h-3/4 w-3/4 object-contain scale-110"
      />
    </div>
  );
}

