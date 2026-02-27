




export default function CalorieTrackerCard({ data }){
    return (
        <div className = 'bg-gray-300 rounded-3xl shadow-md p-6'>
            <h2 className="text-xl font-bold">Calorie Tracker</h2>
            <div className="flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🍎</div>
                    <p>{data?.message}</p>
                </div>
            </div>
        </div>
    );
}