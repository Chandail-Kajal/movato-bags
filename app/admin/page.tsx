import { HeroAdmin } from "@/components/admin/HeroSectionAdmin";
import { ShopSectionAdmin } from "@/components/admin/ShopSectionAdmin";

export default function AdminPanel() {
    return <div className="flex flex-col w-full h-full">
        <HeroAdmin />
        <ShopSectionAdmin />
    </div>
}