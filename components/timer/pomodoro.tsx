import React, { useEffect, useState } from 'react';

interface Props {
  workTime: number;        // in minutes
  shortBreakTime: number;   // in minutes
  longBreakTime: number;    // in minutes
}

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export default function PomodoroTimer({ workTime, shortBreakTime, longBreakTime }: Props) {
  const [mode, setMode] = useState<TimerMode>('work');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(workTime * 60);
  const [completedCycles, setCompletedCycles] = useState<number>(0);

  useEffect(() => {
    if (mode === 'work') setSecondsLeft(workTime * 60);
    else if (mode === 'shortBreak') setSecondsLeft(shortBreakTime * 60);
    else if (mode === 'longBreak') setSecondsLeft(longBreakTime * 60);
  }, [mode, workTime, shortBreakTime, longBreakTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    } else if (secondsLeft === 0) {
      handleTimerExpiry();
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isActive, secondsLeft]);

  const handleTimerExpiry = () => {
    setIsActive(false);
    if (mode === 'work') {
      const nextCycleCount = completedCycles + 1;
      setCompletedCycles(nextCycleCount);
      if (nextCycleCount % 4 === 0) setMode('longBreak');
      else setMode('shortBreak');
    } else {
      setMode('work');
    }
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setMode('work');
    setSecondsLeft(workTime * 60);
    setCompletedCycles(0);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-900 text-white rounded-2xl max-w-sm mx-auto border border-slate-800">
      <h2 className="text-2xl font-bold mb-1 uppercase tracking-wider">
        {mode === 'work' ? '📚 Study Time' : mode === 'shortBreak' ? '☕ Short Break' : '🌴 Long Break'}
      </h2>
      <p className="text-xs text-slate-400 mb-6">Completed Cycles: {completedCycles}</p>
      <div className="text-6xl font-mono font-bold mb-8 text-emerald-400 tabular-nums">
        {formatTime(secondsLeft)}
      </div>
      <div className="flex gap-4 w-full justify-center">
        <button onClick={toggleTimer} className={`px-6 py-2 rounded-xl font-semibold ${isActive ? 'bg-amber-500' : 'bg-emerald-500'} text-slate-950`}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer} className="px-6 py-2 bg-slate-700 text-slate-200 rounded-xl font-semibold">
          Reset
        </button>
      </div>
    </div>
  );
}