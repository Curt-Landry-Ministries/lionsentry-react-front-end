import DatePicker from "react-datepicker";
import classNames from "classnames";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({ containerClass, ...props }: any) => {
  const CalContainer = ({
    className,
    children,
  }: {
    className: string;
    children: React.ReactNode;
  }) => {
    return (
      <div>
        <div
          className={classNames(
            "translate-y-1/2 !border-none shadow-calendar !rounded-lg p-6",
            className
          )}
        >
          <div className="relative [&_.react-datepicker\_\_day]:text-[15px] [&_.react-datepicker\_\_day]:m-1 hover:[&_.react-datepicker\_\_day:not([aria-disabled=true])]:!rounded-full [&_.react-datepicker\_\_day--keyboard-selected]:rounded-full [&_.react-datepicker\_\_day--keyboard-selected]:bg-primary [&_.react-datepicker\_\_day--keyboard-selected]:!text-white  hover:[&_.react-datepicker\_\_day:not([aria-disabled=true])]:bg-cloud-dark [&_.react-datepicker\_\_day--today]:text-primary hover:[&_.react-datepicker\_\_day:not([aria-disabled=true])]:text-primary [&_.react-datepicker\_\_day--selected]:rounded-full [&_.react-datepicker\_\_day--selected]:bg-primary  [&_.react-datepicker\_\_header]:!bg-white [&_.react-datepicker\_\_header]:border-none [&_.react-datepicker\_\_navigation-icon]:before:border-primary [&_.react-datepicker\_\_navigation-icon]:before:border-r-2 [&_.react-datepicker\_\_navigation-icon]:before:border-t-2 [&_.react-datepicker\_\_navigation-icon]:before:top-4 [&_h2.react-datepicker\_\_current-month]:!font-sans [&_.react-datepicker\_\_day-name]:text-inactive [&_.react-datepicker\_\_day-name]:uppercase [&_.react-datepicker\_\_day-name]:!tracking-widest [&_.react-datepicker\_\_day-name]:text-[10px]">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={classNames(
        "[&_.react-datepicker\\_\\_view-calendar-icon_input]:px-10 [&_.react-datepicker\\_\\_view-calendar-icon_input]:py-2 [&_.react-datepicker\\_\\_calendar-icon]:!h-6 [&_.react-datepicker\\_\\_calendar-icon]:!w-6",
        containerClass
      )}
    >
      <DatePicker
        {...props}
        showPopperArrow={false}
        calendarContainer={CalContainer}
        placeholderText={props.placeholder}
        allowSameDay={false}
        popperPlacement={"top"}
        showIcon={true}
        icon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 2V6M8 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z"
              stroke="#01A0CC"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
    </div>
  );
};

export default DateInput;
