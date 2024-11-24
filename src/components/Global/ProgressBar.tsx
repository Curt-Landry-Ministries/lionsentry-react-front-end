const ProgressBar = ({
  current = 1,
  max = 10,
  subText = "Subtext",
}: {
  current: number;
  max: number;
  subText?: string;
}) => {
  return (
    <>
      <div className="flex justify-between text-xs text-inactive mb-1">
        <span>Progress</span>
        <span>{subText}</span>
      </div>

      <div className="bg-white h-6 w-full rounded-3xl shadow-progress-bar p-1">
        <div
          className={`bg-gradient-1 h-full rounded-3xl transition-all ease-in-out duration-1000`}
          style={{ width: (current / max) * 100 + "%" }}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
