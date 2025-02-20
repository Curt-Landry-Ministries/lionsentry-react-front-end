import Image from "next/image";
import Button from "../Global/Button";
import Link from "next/link";
import { AuthedPaths } from "@/lib/constants";

const DevotionalNone = ({ hideButton = false }: { hideButton?: boolean }) => {
  return (
    <div className="text-center space-y-7 p-5">
      <Image
        src="/icons/None.svg"
        alt="None Icon"
        width={40}
        height={40}
        className="mx-auto"
      />
      <p className="text-inactive text-xl">
        Once you set your goals, you will receive daily devotionals that help
        you further align to those goals you are currently working on.
      </p>
      {!hideButton && (
        <Button standardBtn={"primary"}>
          <Link href={AuthedPaths.Devotionals}>Generate Devotionals</Link>
        </Button>
      )}
    </div>
  );
};

export default DevotionalNone;
