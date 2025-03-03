

import { useNavigate } from 'react-router-dom';
import { GoBackButton } from '../icons/GoBackButton';

function GoBack() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); 
  };

  return (
    <button onClick={goBack} className="bg-blue-500 text-white p-2 rounded">
      {<GoBackButton />}
    </button>
  );
}

export default GoBack;
