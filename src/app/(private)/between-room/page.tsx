import { AddDoorBetween } from '@/components/between-room/add-door-between';
import { getBetweenDoors } from './actions';
import { TableBetween } from '@/components/between-room/table-between';

export default async function BetweenRoomPage() {
    const betweenDoors = await getBetweenDoors();
    return (
        <div className="pb-8">
            <div className="flex gap-3">
                <div className="flex flex-col">
                    <h2 className="text-lg md:text-xl font-semibold">
                        Страница межкомнатных дверей
                    </h2>
                    <p className="text-red-600 font-semibold">
                        Данные на 06.10.25г
                    </p>
                </div>
                <AddDoorBetween />
            </div>
            <button>Фильтер +</button>
            <TableBetween betweenDoors={betweenDoors} />
        </div>
    );
}
