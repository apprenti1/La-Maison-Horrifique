export default function StatsGrid() {
    const statsItems = [
        { id: 'experience', value: '5', label: 'Ans d\'expérience' },
        { id: 'players', value: '10K+', label: 'Joueurs terrifiés' },
        { id: 'sessions', value: '4', label: 'Sessions uniques' },
    ];

    return (
        <div className="grid grid-cols-3 gap-6 text-center">
            {statsItems.map((item) => (
                <div key={item.id}>
                    <div className="text-3xl font-bold text-white">{item.value}</div>
                    <div className="text-sm text-gray-400">{item.label}</div>
                </div>
            ))}
        </div>
    );
};
