"use client";

import Modal from "./Modal";
import Button from "./Button";
import Image from "next/image";
import { logout } from "@/lib/auth/actions";
import { useUserStore } from "@/app/providers/userContext";
import { useRouter } from "next/navigation";
import { Paths } from "@/lib/constants";

const SignoutModal = ({
  isOpen,
  updateOpen,
}: {
  isOpen: boolean;
  updateOpen: (state: boolean) => void;
}) => {
  const { reset } = useUserStore((s) => s);
  const router = useRouter();

  const handleSignout = async () => {
    await logout();
    reset();
    router.push(Paths.Home);
  };

  const handleCancel = () => {
    updateOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => updateOpen(false)}>
      <div className="text-center relative flex flex-col items-center min-w-[367px]">
        <Image
          src="/images/question-icon.svg"
          height={50}
          width={50}
          alt="Question Icon"
        />
        <h3 className="mb-5 mt-10">Sign Out</h3>

        <p className="text-xl">Are you sure you&apos;d like to sign out?</p>

        <div className="gap-5 flex mt-10 w-full justify-between">
          <Button
            standardBtn={"tertiary"}
            onClick={handleCancel}
            className="flex-1"
          >
            Cancel
          </Button>

          <Button
            standardBtn={"primary"}
            hasIcon
            className="text-primary flex-1"
            onClick={handleSignout}
          >
            Yes, Sign Out
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SignoutModal;
