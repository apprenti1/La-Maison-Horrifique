import React from 'react';

type CardProps = {
  color: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  level: string;
  levelColor: string;
  minPlayers: number;
  maxPlayers: number;
};

export default function Card({ color, title, description, icon, duration, level, levelColor, minPlayers, maxPlayers }: CardProps) {
  return (
    <div className={`bg-gray-800 rounded-lg overflow-hidden shadow-2xl hover:shadow-[${color}]/20 transition-all duration-300 group`}>
        <div className={`h-48 bg-gradient-to-b from-[${color}]/80 to-black flex items-center justify-center`}>
            <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
        </div>
        <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
            <p className="text-gray-300 mb-4">{description}</p>
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">{duration} • {minPlayers}-{maxPlayers} joueurs</span>
                <span style={{ backgroundColor: levelColor }} className="px-3 py-1 rounded-full text-sm">{level}</span>
            </div>
        </div>
    </div>
  );
}

