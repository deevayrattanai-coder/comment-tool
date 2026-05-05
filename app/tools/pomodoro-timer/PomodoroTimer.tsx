"use client";

import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Timer,
  Coffee,
  TreePine,
  Trash2,
  Check,
  Plus,
  Clock,
  BookOpen,
  CheckCircle2,
  Target,
  Brain,
  Zap,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Mode = "pomodoro" | "shortBreak" | "longBreak";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const MODE_CONFIG = {
  pomodoro: { label: "Focus", icon: Timer, time: 25 },
  shortBreak: { label: "Break", icon: Coffee, time: 5 },
  longBreak: { label: "Deep Rest", icon: TreePine, time: 15 },
};

export default function PomodoroTimer() {
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const totalTime = MODE_CONFIG[mode].time * 60;

  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const offset = circumference - (progress / 100) * circumference;

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  const handleComplete = () => {
    setIsRunning(false);

    if (mode === "pomodoro") {
      setCompletedSessions((c) => c + 1);
      switchMode("shortBreak");
    } else {
      switchMode("pomodoro");
    }
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setTimeLeft(MODE_CONFIG[m].time * 60);
    setIsRunning(false);
  };

  const reset = () => {
    setTimeLeft(MODE_CONFIG[mode].time * 60);
    setIsRunning(false);
  };

  // Task Functions
  const addTask = () => {
    if (!taskInput.trim()) return;

    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: taskInput,
        completed: false,
      },
    ]);

    setTaskInput("");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const doneCount = tasks.filter((t) => t.completed).length;

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-10">
      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">Pomodoro Timer</h1>
        <p className="text-gray-400 text-sm">Stay focused. Stay productive.</p>
      </div>

      {/* Mode Switch */}
      <div className="flex gap-2 mb-6">
        {(Object.keys(MODE_CONFIG) as Mode[]).map((m) => {
          const Icon = MODE_CONFIG[m].icon;
          return (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition ${
                mode === m
                  ? "bg-purple-600 text-white"
                  : "bg-zinc-900 text-gray-400 hover:bg-zinc-800"
              }`}
            >
              <Icon size={16} />
              {MODE_CONFIG[m].label}
            </button>
          );
        })}
      </div>

      {/* Timer */}
      <motion.div
        className="relative flex items-center justify-center mb-10"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <div className="absolute w-[200px] h-[200px] bg-purple-600/20 blur-3xl rounded-full" />

        <svg width="220" height="220" className="-rotate-90">
          <circle
            cx="110"
            cy="110"
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            fill="none"
          />

          <circle
            cx="110"
            cy="110"
            r={radius}
            stroke="url(#grad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            fill="none"
            className="transition-all duration-1000"
          />

          <defs>
            <linearGradient id="grad">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute text-center">
          <div className="text-5xl font-bold tabular-nums">
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-10">
        <Button variant="ghost" size="icon" onClick={reset}>
          <RotateCcw />
        </Button>

        <Button
          onClick={() => setIsRunning(!isRunning)}
          className="rounded-full px-10 py-6 bg-gradient-to-r from-purple-600 to-indigo-600"
        >
          {isRunning ? <Pause /> : <Play />}
        </Button>
      </div>

      {/* TASK SECTION */}
      <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-4">Tasks</h2>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="What are you working on?"
            className="flex-1 bg-black border border-zinc-700 rounded-lg px-4 py-2 text-sm outline-none"
          />
          <button
            onClick={addTask}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-lg"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between bg-black border border-zinc-800 rounded-lg px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    task.completed
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600"
                      : "border-gray-500"
                  }`}
                >
                  {task.completed && <Check size={12} />}
                </button>

                <span
                  className={`text-sm ${
                    task.completed && "line-through text-gray-500"
                  }`}
                >
                  {task.text}
                </span>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-500 hover:text-red-400"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {tasks.length > 0 && (
          <div className="flex justify-between text-xs text-gray-400 mt-4">
            <span>
              Done: {doneCount}/{tasks.length}
            </span>
            <button onClick={clearCompleted} className="hover:text-red-400">
              Clear completed
            </button>
          </div>
        )}
      </div>

      <section className="py-16">
        <div className="container-tight px-4 max-w-4xl mx-auto">
          <article className="prose prose-invert max-w-none">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              What is the Pomodoro Technique?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The Pomodoro Technique is a time management method developed by
              Francesco Cirillo in the late 1980s. It uses a timer to break work
              into intervals, traditionally 25 minutes in length, separated by
              short breaks. Each interval is known as a pomodoro from the
              Italian word for tomato, after the tomato-shaped kitchen timer
              that Cirillo used as a university student.
            </p>

            <h3 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" /> How Does the Pomodoro
              Timer Work?
            </h3>
            <ol className="space-y-3 text-muted-foreground mb-8">
              {[
                {
                  title: "Add tasks",
                  desc: "Write down what you want to accomplish today.",
                },
                {
                  title: "Set the timer",
                  desc: "Set the Pomodoro timer for 25 minutes and focus on a single task.",
                },
                {
                  title: "Work until the timer rings",
                  desc: "Focus entirely on the task. Avoid all distractions.",
                },
                {
                  title: "Take a short break",
                  desc: "When the timer rings, take a 5-minute break to recharge.",
                },
                {
                  title: "Every 4 pomodoros, take a longer break",
                  desc: "After four work sessions, take a 15–30 minute break.",
                },
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary text-sm font-bold shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <strong className="text-foreground">{step.title}</strong> —{" "}
                    {step.desc}
                  </div>
                </li>
              ))}
            </ol>

            <h3 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" /> The Science Behind the
              Pomodoro Technique
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The attention span is the ability to concentrate on a single task.
              The greater our concentration, the easier it will be to complete
              the task. Studies have estimated that the optimal focus interval
              lasts approximately 20–25 minutes.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              It is natural to be distracted in search of new information, but
              it is also possible to focus again by refreshing the attention
              span through short breaks. This is the core principle behind the
              Pomodoro Technique — working with your brain natural rhythms
              rather than against them.
            </p>

            <h3 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" /> Benefits of Using a
              Pomodoro Timer
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                {
                  title: "Improved Focus",
                  desc: "Eliminates multitasking and trains deep concentration.",
                },
                {
                  title: "Better Time Estimation",
                  desc: "Learn how long tasks actually take over time.",
                },
                {
                  title: "Reduced Burnout",
                  desc: "Regular breaks prevent mental fatigue and exhaustion.",
                },
                {
                  title: "Increased Accountability",
                  desc: "Track your productive sessions and measure progress.",
                },
                {
                  title: "Combat Procrastination",
                  desc: "Starting is easier when you commit to just 25 minutes.",
                },
                {
                  title: "Work-Life Balance",
                  desc: "Clear boundaries between focused work and rest periods.",
                },
              ].map((benefit) => (
                <div
                  key={benefit.title}
                  className="p-4 bg-surface border-border/30"
                >
                  <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />{" "}
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" /> Who Uses the
              Pomodoro Technique?
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Pomodoro Technique is used by students, developers, writers,
              designers, and professionals worldwide. Many of your favorite
              YouTubers, influencers, and entrepreneurs use this technique to
              stay productive and manage their time effectively.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              If you find yourself easily distracted and procrastinating, this
              may be your antidote. Whether you are studying for exams, working
              on a project, or writing content — the Pomodoro Timer helps you
              stay on track and accomplish more in less time.
            </p>

            <h3 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary" /> What to Do During
              Pomodoro Breaks?
            </h3>
            <ul className="space-y-2 text-muted-foreground mb-8">
              {[
                "Stretch or do light exercises to refresh your body",
                "Grab a glass of water or a healthy snack",
                "Step away from the screen and rest your eyes",
                "Take a short walk or practice deep breathing",
                "Avoid checking social media — save that for longer breaks",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="font-display text-2xl font-bold text-foreground mb-4">
              Features of Our Pomodoro Timer
            </h3>
            <div className="grid md:grid-cols-2 gap-3 mb-8">
              {[
                "Customizable Pomodoro, short break, and long break durations",
                "Built-in task manager to track your to-do list",
                "Auto-start options for breaks and work sessions",
                "Desktop notification alerts when timer completes",
                "Sound notifications with adjustable volume",
                "Session counter to track your daily progress",
                "Keyboard shortcuts for hands-free control",
                "Clean, distraction-free design",
                "Works on all devices — desktop, tablet, and mobile",
                "No sign-up required — completely free",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-2 text-muted-foreground text-sm"
                >
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
