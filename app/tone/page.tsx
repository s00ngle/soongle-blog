"use client";

import { useEffect, useState } from "react";
import PageContainer from "@/components/PageContainer";
import * as Tone from "tone";

export default function TonePage() {
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize Tone.js after user interaction
  const initializeTone = async () => {
    // Start the audio context
    await Tone.start();

    const drum = new Tone.MembraneSynth().toDestination();
    const hat = new Tone.MetalSynth({
      envelope: {
        attack: 0.01,
        decay: 0.1,
        release: 0.3,
      },
    }).toDestination();

    new Tone.Loop((time) => {
      drum.triggerAttackRelease("C1", "8n", time);
      drum.triggerAttackRelease("C1", "8n", time + 0.5);
      drum.triggerAttackRelease("C1", "8n", time + 1);
      drum.triggerAttackRelease("C1", "8n", time + 1.5);
      hat.triggerAttackRelease("C1", "8n", time + 1.73);
      hat.triggerAttackRelease("C1", "8n", time + 1.86);
    }, 2).start(0);

    const bass = new Tone.FMSynth({
      oscillator: { type: "amsawtooth" },
      envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.8,
        release: 0.3,
      },
    }).toDestination();

    new Tone.Loop((time) => {
      bass.triggerAttackRelease("C1", "8n", time);
      bass.triggerAttackRelease("C2", "8n", time + 0.4);
      bass.triggerAttackRelease("C1", "8n", time + 0.8);
      bass.triggerAttackRelease("C2", "8n", time + 1.2);
      bass.triggerAttackRelease("C1", "8n", time + 1.6);
    }, 2).start(0);

    const melody = new Tone.PolySynth().toDestination();
    melody.set({
      volume: -5,
      oscillator: { type: "sawtooth" },
      envelope: {
        attack: 0.01,
        decay: 0.1,
        release: 5,
      },
    });

    new Tone.Loop((time) => {
      melody.triggerAttackRelease(["C2", "C4"], "8n", time);
      melody.triggerAttackRelease("E4", "16n", time + 0.4);
      melody.triggerAttackRelease("F4", "16n", time + 0.8);
      melody.triggerAttackRelease("E4", "16n", time + 1.28);
      melody.triggerAttackRelease(["C2", "C4"], "8n", time + 2.0);
      melody.triggerAttackRelease("E4", "16n", time + 2.4);
      melody.triggerAttackRelease("F4", "16n", time + 2.8);
      melody.triggerAttackRelease(["G4", "C4"], "16n", time + 3.28);
    }, 4).start(0);

    setIsInitialized(true);
  };

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      if (isInitialized) {
        Tone.Transport.stop();
        Tone.Transport.cancel();
        Tone.context.dispose();
      }
    };
  }, [isInitialized]);

  const handleDrumStart = async () => {
    // Initialize if not already done
    if (!isInitialized) {
      await initializeTone();
    }
    await Tone.Transport.start();
  };

  const handleDrumStop = async () => {
    await Tone.Transport.stop();
  };

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold">Tone.js</h1>
      <button
        onClick={handleDrumStart}
        className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Play
      </button>
      <button
        onClick={handleDrumStop}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Stop
      </button>
    </PageContainer>
  );
}
