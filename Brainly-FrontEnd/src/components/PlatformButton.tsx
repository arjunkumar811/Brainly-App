interface PlatformButtonProps {
    name: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
    gradient: string;
    span?: number;
}

export function PlatformButton({ name, icon, isActive, onClick, gradient, span = 1 }: PlatformButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${span === 2 ? 'col-span-2' : ''} ${
                isActive
                    ? `bg-gradient-to-r ${gradient} text-white shadow-lg transform scale-105`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
            <div className="flex items-center justify-center gap-2">
                {icon}
                <span>{name}</span>
            </div>
        </button>
    );
}
