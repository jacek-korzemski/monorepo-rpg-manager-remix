import { useContext } from 'react';
import { TestContext } from '@rpg-manager/contexts';

const useTestContext = () => {
  const context = useContext(TestContext);

  return context;
};

export default useTestContext;
