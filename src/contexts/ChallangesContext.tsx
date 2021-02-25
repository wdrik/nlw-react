import { createContext, ReactNode, useState } from 'react';

import challanges from '../../challanges.json';

interface Challange {
  type: 'body' | 'eye';
  description: string;
  amount: string;
}

interface ChallangesContextData {
  level: number;
  currentExperience: number;
  challangesCompleted: number;
  activeChallange: Challange;
  levelUp: () => void;
  startNewChallange: () => void;
}

interface ChallangesProviderProps {
  children: ReactNode;
}

export const ChallangesContext = createContext({} as ChallangesContextData);

export function ChallangesProvider({ children }: ChallangesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challangesCompleted, setChallangesCompleted] = useState(0);

  const [activeChallange, setActiveChallange] = useState(null);

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallange() {
    const randomChallangeIndex = Math.floor(Math.random() * challanges.length);
    const challange = challanges[randomChallangeIndex]

    setActiveChallange(challange)
  }

  return (
    <ChallangesContext.Provider
      value={{
        level,
        currentExperience,
        challangesCompleted,
        levelUp,
        startNewChallange,
        activeChallange
      }}
    >
      {children}
    </ChallangesContext.Provider>
  )
}
