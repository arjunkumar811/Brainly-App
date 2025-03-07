
interface SidebarItemProps {
    icon: React.ReactNode; // or string, depending on what type of icon you're using
    text: string;
}
 
export function Sidebaritem ({icon, text}: SidebarItemProps) {
return <div className="flex
 text-gray-400 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-2 transition-all duration-150">



<div className="p-2" > 
    {icon} 
</div>

<div className="p-2">
{text}
    </div> 
</div>
}