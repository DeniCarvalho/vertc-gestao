import { ReactNode } from 'react';

interface MyBrandButtonProps {
  children: ReactNode;
}

const MyBrandButton: React.FC<MyBrandButtonProps> = (props) => {
  return (
    <button className="p-2 bg-black text-white rounded-xl">
      {props.children}
    </button>
  );
};

export default MyBrandButton;
