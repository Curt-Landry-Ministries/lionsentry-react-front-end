import Image from "next/image";

const ProfilePhoto = ({
  src,
  name,
  ...props
}: {
  src: string | undefined;
  name?: string;
}) => {
  return (
    <div
      {...props}
      className="w-[170px] h-[170px] flex-shrink-0 relative flex justify-center rounded-full overflow-hidden bg-gradient-to-b from-[#FAFAFA] from-0% to-[#D3D3D3] to-100%"
    >
      {!!src ? (
        <Image
          src={src}
          fill
          alt={`${name} Profile Photo`}
          style={{
            objectFit: "cover",
            borderRadius: "100px",
          }}
        />
      ) : (
        <Image
          src="/icons/User.svg"
          width={100}
          height={100}
          alt={`Placeholder Profile Photo`}
        />
      )}
    </div>
  );
};

export default ProfilePhoto;
