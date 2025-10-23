import { getColors } from '@/app/(private)/between-room/actions';
import { AddColor } from './add-color';
import { BigArt } from './big-art';

export async function Palitra() {
    const colors = await getColors();

    return (
        <div className="flex flex-col gap-3  pb-8">
            <div className="mt-4 pt-3 border-t-2 border-gray-400 flex gap-4 items-center">
                <h2 className="font-semibold text:base lg:text-lg">
                    Политра цветов
                </h2>
                <AddColor />
            </div>

            {colors.length > 0 ? (
                <BigArt colors={colors} />
            ) : (
                'Пока нет записей доступных цветов'
            )}
        </div>
    );
}
