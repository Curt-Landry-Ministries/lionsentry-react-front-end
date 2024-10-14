import Image from "next/image";
import Button from "../Global/Button";
import Link from "next/link";
import { AuthedPaths } from "@/lib/constants";

const DevotionalNone = () => {
  return (
    <div className="text-center space-y-7 p-5">
      <Image
        src="/icons/check-circle.svg"
        alt="Check Circle Icon"
        width={40}
        height={40}
        className="mx-auto"
      />
      <p className="text-inactive text-xl">
        Once you set your goals, you will receive daily devotionals that help
        you further align to those goals you are currently working on.
      </p>
      <Button standardBtn={"primary"}>
        <Link href={AuthedPaths.Goals}>Set Goals</Link>
      </Button>
    </div>
  );
};

export default DevotionalNone;
