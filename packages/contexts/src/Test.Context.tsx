import { ReactNode, createContext, useContext } from 'react';

const TestContext = createContext<{ testKey: string }>({
  testKey: 'testValue',
});

const TestContextProvider = ({ children }: { children: ReactNode }) => {
  const value = { testKey: 'testValue' };

  return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
};

export { TestContextProvider, TestContext };
