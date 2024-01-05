import './select.scss';

type Props = {
  isSelected: boolean;
};

// eslint-disable-next-line react/prop-types
export const CheckIcon: React.FC<Props> = ({ isSelected }) => {
  return (
    <div className="select__icon">
      {isSelected && (
        <svg
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="16" height="16"
            rx="2" fill="#95BEFC" />
          <path
            d="M12 5L6.5 10.5L4 8"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};
